import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import queryString from "query-string"
import setQuery from "set-query-string"

import pin_orange from '../../assets/img/pin-md-orange.png'
import pin_blue from '../../assets/img/pin-md-blueish.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./SearchBar.module.scss"

import { transform } from 'ol/proj'
import { Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source.js'
import Feature from 'ol/Feature.js'
import { Style } from 'ol/style'
import { Icon } from 'ol/style'
import Point from 'ol/geom/Point'

import { generateAdresseSokUrl, generateSearchStedsnavnUrl } from "../../Utils/n3api"
const parser = require('fast-xml-parser')

const defaultZoom = 13
const vectorSource = new VectorSource({})

const SearchResult = (props) => {
  const vectorLayer = new VectorLayer({ source: vectorSource })
  window.olMap.addLayer(vectorLayer)
  const icon_orange = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: pin_orange
    })
  })
  const icon_blue = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: pin_blue
    })
  })
  let features = []

  const showInfoMarker = (coordinate) => {
    let iconFeature = new Feature({ geometry: new Point(coordinate) })
    iconFeature.setStyle(icon_orange)
    vectorSource.addFeature(iconFeature)
  }
  const centerPosition = (coordinate) => {
    features.forEach(feature => feature.setStyle(icon_orange))
    window.olMap.getView().setCenter(coordinate)
    const activeZoom = window.olMap.getView().getZoom()
    if (activeZoom < defaultZoom) {
      window.olMap.getView().setZoom(defaultZoom)
    }
    features = vectorSource.getFeaturesAtCoordinate(coordinate)
    features.forEach(feature => feature.setStyle(icon_blue))
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
  let queryValues = queryString.parse(window.location.search)
  const [searchText, setSearchText] = useState(queryValues["search"])
  const [searchResult, setSearchResult] = useState()
  const [searchResultSSR, setSearchResultSSR] = useState()
  const { placeholder } = props
  const [expandedAdress, setStateAdress] = useState(false)
  const [expandedSsr, setStateSsr] = useState(false)

  useEffect(() => {
    if (searchText) {
      vectorSource.clear()
      setQuery({ search: searchText })
      fetch(generateAdresseSokUrl(searchText))
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          return response.json()
        })
        .then(result => { setSearchResult(result) })
        .catch(error => { console.warn(error) })

      fetch(generateSearchStedsnavnUrl(searchText, 0, 15))
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
            response.sokRes.stedsnavn = Array.isArray(response.sokRes.stedsnavn) ? response.sokRes.stedsnavn : new Array(response.sokRes.stedsnavn)
            response.sokRes.stedsnavn ? setSearchResultSSR(response) : setSearchResultSSR('')
          } else {
            setSearchResultSSR(null)
          }
        })
        .catch(error => { console.warn(error) })
    } else {
      setSearchResult('')
      setSearchResultSSR('')
      vectorSource.clear()
      setQuery()
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
        <input className={ style.searchInput } onChange={ onChangeBound } placeholder={ placeholder } type="text" value={ searchText } aria-describedby="button-addon1" />
        <div className='input-group-append'>
          <button className="btn btn-link" type="button" id="button-addon1" onClick={ () => resetSearch() }>{ searchText ? <FontAwesomeIcon icon={ "times" } /> : '' }</button>
        </div>
      </div>
      <div className={ style.searchResult }>
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
