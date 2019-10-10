import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'

import { transform } from 'ol/proj'
import Overlay from 'ol/Overlay';
import queryString from "query-string"
import setQuery from "set-query-string"

import { generateAdresseSokUrl, generateSearchStedsnavnUrl } from "../../Utils/n3api"
import "./SearchBar.scss"
import pin from '../../../src/assets/img/pin-md-orange.png'

const parser = require('fast-xml-parser');


const SearchResult = (props) => {
  window.olMap.getOverlays().clear()

  const showInfoMarker = (coordinate) => {
    let markerElement = document.createElement('img')
    markerElement.src = pin

    const marker = new Overlay({
      position: coordinate,
      positioning: "center-center",
      element: markerElement,
      stopEvent: false
    })
    window.olMap.addOverlay(marker)
  }
  const centerPosition = (coordinate) => {
    window.olMap.getView().setCenter(coordinate)
  }
  const constructPoint = (coord, epsgTo = 'EPSG:25833') => transform([Number(coord.lon), Number(coord.lat)], coord.epsg, epsgTo)

  return (
    <div className="searchResult list-group">
      {
        props.searchResult.searchResult && props.searchResult.searchResult.adresser.map((data, idx) => {
        showInfoMarker(constructPoint(data.representasjonspunkt))
        return (
          <button type="button" key={ idx } className="list-group-item list-group-item-action" onClick={ () => { centerPosition(constructPoint(data.representasjonspunkt)) } }>
            Adresse: { data.adressetekst } , { data.kommunenavn }
          </button>
        )
      }) }
      {
        props.searchResult.searchResultSSR && props.searchResult.searchResultSSR.sokRes.stedsnavn.map((data, idx) => {
          showInfoMarker(constructPoint({ lon: data.aust, lat: data.nord, epsg: 'EPSG:25833' }))
        return (
          <button type="button" key={ idx } className="list-group-item list-group-item-action" onClick={ () => { centerPosition(constructPoint({ lon: data.aust, lat: data.nord, epsg: 'EPSG:25833' })) } }>
            Stedsnavn: { data.stedsnavn } , { data.kommunenavn }
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
  let queryValues = queryString.parse(window.location.search)
  const [searchText, setSearchText] = useState(queryValues["search"])
  const [searchResult, setSearchResult] = useState()
  const [searchResultSSR, setSearchResultSSR] = useState()
  const { placeholder } = props

  useEffect(() => {
    if (searchText) {
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

      fetch(generateSearchStedsnavnUrl(searchText,1,15))
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response.text()
      })
        .then(result => {
          let response = parser.parse(result)
          response.sokRes.stedsnavn ? setSearchResultSSR(response) : setSearchResultSSR('')
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

  return (
    <>
      <div className='input-group col col-lg-2'>
        <input className='form-control' onChange={ onChangeBound } placeholder={ placeholder } type="text" value={ searchText } aria-describedby="button-addon1"/>
      </div>
      <div>
        {
          searchResult && <SearchResult searchResult={ { searchResult, searchResultSSR } }></SearchResult>
        }
      </div>
    </>
  )
}

SearchBar.propTypes = {
  classNames: PropTypes.string,
  searchText: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  onSearchClick: PropTypes.func
}

SearchBar.defaultProps = {
  classNames: '',
  searchText: '',
  placeholder: 'Search text',
  onChange: null,
  onEnter: null,
  onSearchClick: null,
}

export default SearchBar
