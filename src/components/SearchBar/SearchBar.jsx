import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import queryString from "query-string"
import setQuery from "set-query-string"
import pin_orange from '../../assets/img/pin-md-orange.png'
import pin_blue from '../../assets/img/pin-md-blueish.png'
import pin_red from '../../assets/img/pin-md-red.png'
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import { makeStyles } from '@material-ui/core/styles'
import { TextField, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import style from "./SearchBar.module.scss"
import { transform } from 'ol/proj'
import { Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source.js'
import Feature from 'ol/Feature.js'
import { Style, Icon } from 'ol/style'
import Point from 'ol/geom/Point'
import { generateAdresseSokUrl, generateSearchStedsnavnUrl, generateStedsnavnSokUrl } from "../../Utils/n3api"
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
  const icon_red = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: pin_red
    })
  })

  let features = []

  const showInfoMarker = (coordinate) => {
    let iconFeature = new Feature({ geometry: new Point(coordinate) })
    iconFeature.setStyle(icon_orange)
    vectorSource.addFeature(iconFeature)
  }
  const showRedInfoMarker = (coordinate) => {
    let iconFeature = new Feature({ geometry: new Point(coordinate) })
    iconFeature.setStyle(icon_red)
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
    <List component="nav" dense={true} aria-label="search results">
      {
        props.searchResult.searchResult && props.searchResult.searchResult.adresser.map((data, idx) => {
          showInfoMarker(constructPoint(data.representasjonspunkt))
          return (
            <div key={ idx }>
              <ListItem color="primary" button onClick={ () => { centerPosition(constructPoint(data.representasjonspunkt)) } }>
                <ListItemText primary={ data.adressetekst + ', ' + data.kommunenavn } />
              </ListItem>
              <Divider />
            </div>
          )
        })
      }
      {
        props.searchResult.searchResultSSR && props.searchResult.searchResultSSR.sokRes.stedsnavn.map((data, idx) => {
          showInfoMarker(constructPoint({ lon: data.aust, lat: data.nord, epsg: 'EPSG:25833' }))
          return (
            <div key={ idx }>
              <ListItem button onClick={ () => { centerPosition(constructPoint({ lon: data.aust, lat: data.nord, epsg: 'EPSG:25833' })) } }>
                <ListItemText primary={ data.stedsnavn + ', ' + data.kommunenavn } />
              </ListItem>
              <Divider />
            </div>
          )
        })
      }
      {
        props.searchResult.searchResultStedsnavn && props.searchResult.searchResultStedsnavn.map((data, idx) => {
          //console.log(data)
          let lon, lat
          if (data.navneobjekttype !== 'adressenavn') {
            if (data.geometri.type === "Point") {
              lon = data.geometri.coordinates[0]
              lat = data.geometri.coordinates[1]
            } else if (data.geometri.type === "MultiPoint") {
              lon = data.geometri.coordinates[0][0]
              lat = data.geometri.coordinates[0][1]
            } else {
              console.error('error! No yet supported geometri type')
              return ('')
            }
            showRedInfoMarker(constructPoint({ lon: lon, lat: lat, epsg: 'EPSG:4326' }))
          } else if (data.navneobjekttype === 'adressenavn') {
            if (data.geometri.type === "Point") {
              lon = data.geometri.coordinates[0]
              lat = data.geometri.coordinates[1]
              showRedInfoMarker(constructPoint({ lon: lon, lat: lat, epsg: 'EPSG:4326' }))
            } else if (data.geometri.type === "MultiPoint") {
              data.geometri.coordinates.forEach(coordinate => {
                showRedInfoMarker(constructPoint({ lon: coordinate[0], lat: coordinate[1], epsg: 'EPSG:4326' }))
              });
              // Menupunkt med bare første pkt
              lon = data.geometri.coordinates[0][0]
              lat = data.geometri.coordinates[0][1]
            } else {
              console.error('error! No yet supported geometri type')
              return ('')
            }
          }
          return (
            <div key={ idx }>
              <ListItem button onClick={ () => { centerPosition(constructPoint({ lon: lon, lat: lat, epsg: 'EPSG:4326' })) } }>
                <ListItemText primary={ `${data.stedsnavn[0].skrivemte},  ${data.kommuner[0].kommunenavn }` } />
              </ListItem>
              <Divider />
            </div>
          )
        })
      }

    </List >
  )
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2,0),
    },
  },
}));
/**
 * SearchBar to be used in MapContainer
 * @param {*} props
 */
const SearchBar = props => {
  let queryValues = queryString.parse(window.location.search)
  const [searchText, setSearchText] = useState(queryValues["search"])
  const [searchResult, setSearchResult] = useState()
  const [searchResultSSR, setSearchResultSSR] = useState()
  const [searchResultStedsnavn, setSearchResultStedsnavn] = useState()
  const { placeholder } = props
  const [expandedAdress, setStateAdress] = useState(false)
  const [expandedSsr, setStateSsr] = useState(false)
  const [expandedStedsnavn, setStateStedsnavn] = useState(false)
  const classes = useStyles();
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

      fetch(generateStedsnavnSokUrl(searchText, 0, 15))
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText)
          }
          return response.json()
        })
        .then(result => {
          if (result.navn) {
            //console.log(result.navn)
            setSearchResultStedsnavn(result.navn)
          } else {
            setSearchResultStedsnavn(null)
          }
        })
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
      setSearchResultStedsnavn('')
      vectorSource.clear()
      setQuery()
    }
  }, [searchText])

  const onChangeBound = (event) => {
    setSearchText(event.target.value)
  }

  return (
    <>
      <form className={ classes.root } noValidate autoComplete="off">
        <TextField id="standard-search" label="Search field" variant="outlined" size="small" fullWidth type="search" placeholder={ placeholder } onChange={ onChangeBound } />
      </form>
      <div >
        {
          searchResult && (
            <>
              <div>
                <div onClick={ () => setStateAdress(!expandedAdress) } className={ style.expandBtn } >
                  <span className={ style.ellipsisToggle }>ADRESSER</span>
                  { expandedAdress ? <ExpandLess /> : <ExpandMore /> }
                </div>
                <div className={ expandedAdress ? `${style.selected} ${style.open}` : style.selected } >
                  <SearchResult searchResult={ { searchResult } }></SearchResult>
                </div>
              </div>
              <div>
                <div onClick={ () => setStateSsr(!expandedSsr) } className={ style.expandBtn } >
                  <span className={ style.ellipsisToggle }>SSR</span>
                  { expandedSsr ? <ExpandLess /> : <ExpandMore /> }
                </div>
                <div className={ expandedSsr ? `${style.selected} ${style.open}` : style.selected } >
                  <SearchResult searchResult={ { searchResultSSR } }></SearchResult>
                </div>
              </div>
              <div>
                <div onClick={ () => setStateStedsnavn(!expandedStedsnavn) } className={ style.expandBtn } >
                  <span className={ style.ellipsisToggle }>STEDSNAVN</span>
                  { expandedStedsnavn ? <ExpandLess /> : <ExpandMore /> }
                </div>
                <div className={ expandedStedsnavn ? `${style.selected} ${style.open}` : style.selected } >
                  <SearchResult searchResult={ { searchResultStedsnavn } }></SearchResult>
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
