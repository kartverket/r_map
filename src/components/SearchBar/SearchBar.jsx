import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'

import { transform } from 'ol/proj'
import Overlay from 'ol/Overlay'
import queryString from "query-string"
import setQuery from "set-query-string"

import { generateAdresseSokUrl, generateSearchStedsnavnUrl } from "../../Utils/n3api"
import pin from '../../../src/assets/img/pin-md-orange.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./SearchBar.module.scss"

import { useDispatch, useSelector } from 'react-redux'
import { updateSearchString } from '../../actions/SearchActions'

const parser = require('fast-xml-parser')


const SearchResult = (props) => {
  const showInfoMarker = (coordinate) => {
    let markerElement = document.createElement('img')
    markerElement.src = pin

    const marker = new Overlay({
      position: coordinate,
      positioning: "center-center",
      element: markerElement
    })
    window.olMap.addOverlay(marker)
  }
  const centerPosition = (coordinate) => {
    window.olMap.getView().setCenter(coordinate)
  }
  const constructPoint = (coord, epsgTo = 'EPSG:25833') => transform([Number(coord.lon), Number(coord.lat)], coord.epsg, epsgTo)

  return (
    <div className="list-group">
      {
        props.searchResult.searchResult && props.searchResult.searchResult.adresser.map((data, idx) => {
          showInfoMarker(constructPoint(data.representasjonspunkt))
          return (
            <button type="button" key={ idx } className="list-group-item list-group-item-action" onClick={ () => { centerPosition(constructPoint(data.representasjonspunkt)) } }>
              { data.adressetekst } , { data.kommunenavn }
            </button>
          )
        })
      }
      {
        props.searchResult.searchResultSSR && props.searchResult.searchResultSSR.sokRes.stedsnavn.map((data, idx) => {
          showInfoMarker(constructPoint({ lon: data.aust, lat: data.nord, epsg: 'EPSG:25833' }))
          return (
            <button type="button" key={ idx } className="list-group-item list-group-item-action" onClick={ () => { centerPosition(constructPoint({ lon: data.aust, lat: data.nord, epsg: 'EPSG:25833' })) } }>
              { data.stedsnavn } , { data.kommunenavn }
            </button>
          )
        })
      }
    </div >
  )
}
/**
 * SearchBar to be used in MapContainer
 * @param {*} props
 */
const SearchBar = props => {
  const search_query = useSelector(state => state.search_query)
  const dispatch = useDispatch()

  let queryValues = queryString.parse(window.location.search)
  const [searchText, setSearchText] = useState(queryValues["search"])
  const [searchResult, setSearchResult] = useState()
  const [searchResultSSR, setSearchResultSSR] = useState()
  const { placeholder } = props
  const [expandedAdress, setStateAdress] = useState(false)
  const [expandedSsr, setStateSsr] = useState(false)

  useEffect(() => {
    if (searchText) {
      window.olMap.getOverlays().clear()
      dispatch(updateSearchString(searchText))

      queryValues.search = searchText
      setQuery(queryValues)
      fetch(generateAdresseSokUrl(searchText))
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          return response.json()
        })
        .then(result => { setSearchResult(result) })
        .catch(error => { console.warn(error) })

      fetch(generateSearchStedsnavnUrl(searchText, 1, 15))
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          return response.text()
        })
        .then(result => {
          let response = parser.parse(result)
          if (response.sokRes.stedsnavn) {
            response.sokRes.stedsnavn = response.sokRes.stedsnavn[response.sokRes.stedsnavn.length - 1] === "" ? response.sokRes.stedsnavn.slice(0, response.sokRes.stedsnavn.length - 1) : response.sokRes.stedsnavn
            response.sokRes.stedsnavn ? setSearchResultSSR(response) : setSearchResultSSR('')
          } else {
            setSearchResultSSR(null)
          }
        })
        .catch(error => { console.warn(error) })
    } else {
      setSearchResult('')
      setSearchResultSSR('')
      window.olMap.getOverlays().clear()
    }
  }, [searchText])

  const onChangeBound = (event) => {
    setSearchText(event.target.value)
  }
  //const updateQuery = search_query => dispatch({ type: 'UPDATE_SEARCH_STRING', payload: search_query })
  const resetSearch = () => {
    setSearchText("")
  }

  return (
    <>
      <div className='input-group col'>
        <input className={style.searchInput} onChange={ onChangeBound } placeholder={ placeholder } type="text" value={ searchText } aria-describedby="button-addon1" />
        <div className='input-group-append'>
          <button className="btn btn-link" type="button" id="button-addon1" onClick={ () => resetSearch() }>{ searchText ? <FontAwesomeIcon icon={ "times" } /> : '' }</button>
        </div>
      </div>
      <div className={style.searchResult}>
        {
          searchResult && (
            <>
              <div>
                <div onClick={ () => setStateAdress(!expandedAdress) } className={ style.expandBtn } >
                  <span className={ style.ellipsisToggle }>ADRESSER</span>
                  <FontAwesomeIcon icon={ expandedAdress ? ['fas', 'angle-up'] : ['fas', 'angle-down'] } />
                </div>
                <div className={ expandedAdress ? `${style.selected} ${style.open}` : style.selected } >
                  <SearchResult searchResult={ { searchResult } }></SearchResult>
                </div>
              </div>
              <div>
                <div onClick={ () => setStateSsr(!expandedSsr) } className={ style.expandBtn } >
                  <span className={ style.ellipsisToggle }>STEDSNAVN</span>
                  <FontAwesomeIcon icon={ expandedSsr ? ['fas', 'angle-up'] : ['fas', 'angle-down'] } />
                </div>
                <div className={ expandedSsr ? `${style.selected} ${style.open}` : style.selected } >
                  <SearchResult searchResult={ { searchResultSSR } }></SearchResult>
                </div>
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

SearchBar.propTypes = {
  searchText: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  onSearchClick: PropTypes.func
}

SearchBar.defaultProps = {
  searchText: '',
  placeholder: 'Søk etter steder eller adresser',
  onChange: null,
  onEnter: null,
  onSearchClick: null,
}

export default SearchBar
