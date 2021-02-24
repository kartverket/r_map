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
import MultiLineString from 'ol/geom/MultiLineString'
import MultiPoint from 'ol/geom/MultiPoint'
import MultiPolygon from 'ol/geom/MultiPolygon'
import Polygon from 'ol/geom/Polygon'
import LinearRing from 'ol/geom/LinearRing'
import LineString from 'ol/geom/LineString'
import Circle from 'ol/geom/Circle';
import {Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import { generateAdresseSokUrl, generateSearchStedsnavnUrl, generateStedsnavnSokUrl } from "../../Utils/n3api"
const parser = require('fast-xml-parser')
const defaultZoom = 13
const vectorSource = new VectorSource({})
const SearchResult = (props) => {
  // console.log('Search results...')
  const vectorLayer = new VectorLayer({ source: vectorSource })
  window.olMap.addLayer(vectorLayer)
  const image = new CircleStyle({
    radius: 5,
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.1)',
    }),
    stroke: new Stroke({color: 'red', width: 2}),
  });
  const styles = {
    'Point': new Style({
      image: image,
    }),
    'LineString': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 2,
      }),
    }),
    'MultiLineString': new Style({
      stroke: new Stroke({
        color: 'green',
        width: 2,
      }),
    }),
    'MultiPoint': new Style({
      image: image,
    }),
    'MultiPolygon': new Style({
      stroke: new Stroke({
        color: 'yellow',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 0, 0.1)',
      }),
    }),
    'Polygon': new Style({
      stroke: new Stroke({
        color: 'blue',
        lineDash: [4],
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    }),
    'GeometryCollection': new Style({
      stroke: new Stroke({
        color: 'magenta',
        width: 2,
      }),
      fill: new Fill({
        color: 'magenta',
      }),
      image: new CircleStyle({
        radius: 10,
        fill: null,
        stroke: new Stroke({
          color: 'magenta',
        }),
      }),
    }),
    'Circle': new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.2)',
      }),
    }),
  };
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
  const setFeature = (geometry) => {
    let feature;
    switch (geometry.type) {
      case 'MultiLineString':
        feature = new Feature({ geometry: new MultiLineString(geometry.coordinates) })
        break;
      case 'MultiPoint':
        feature = new Feature({ geometry: new MultiPoint(geometry.coordinates) })
        break;
      case 'MultiPolygon':
        feature = new Feature({ geometry: new MultiPolygon(geometry.coordinates) })
        break;
      case 'Polygon':
        feature = new Feature({ geometry: new Polygon(geometry.coordinates) })
        break;
      case 'LinearRing':
        feature = new Feature({ geometry: new LinearRing(geometry.coordinates) })
        break;
      case 'LineString':
        feature = new Feature({ geometry: new LineString(geometry.coordinates) })
        break;
      case 'Circle':
        feature = new Feature({ geometry: new Circle(geometry.coordinates) })
        break;
      default:
        break
    }
    feature.getGeometry().transform('EPSG:4326', 'EPSG:25833')
    feature.setStyle(styles[geometry.type])
    return feature
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
  const zoomToFeature = (feature) => {
    const ext = feature.getGeometry().getExtent();
    window.olMap.getView().fit(ext, window.olMap.getSize());
  }
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
          let lon, lat, ssrfeature
          if (data.navneobjekttype !== 'adressenavn') {
            if (data.geojson.geometry.type === "Point") {
              lon = data.geojson.geometry.coordinates[0]
              lat = data.geojson.geometry.coordinates[1]
              showRedInfoMarker(constructPoint({ lon: lon, lat: lat, epsg: 'EPSG:4326' }))
            } else {
              ssrfeature = setFeature(data.geojson.geometry)
              vectorSource.addFeature(ssrfeature)
            }
          } else if (data.navneobjekttype === 'adressenavn') {
            if (data.geojson.geometry.type === "Point") {
              lon = data.geojson.geometry.coordinates[0]
              lat = data.geojson.geometry.coordinates[1]
              showRedInfoMarker(constructPoint({ lon: lon, lat: lat, epsg: 'EPSG:4326' }))
            } else {
              ssrfeature = setFeature(data.geojson.geometry)
              vectorSource.addFeature(ssrfeature)
            }
          }
          return (
            <div key={ idx }>
              <ListItem button onClick={ () => {
                if (ssrfeature) {
                  console.log(ssrfeature.getId())
                  zoomToFeature(ssrfeature)
                } else {
                  centerPosition(constructPoint({ lon: lon, lat: lat, epsg: 'EPSG:4326' }))
                }
              } }>
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
      //console.log('New search...')
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
            setSearchResultStedsnavn(result.navn)
          } else {
            setSearchResultStedsnavn(null)
          }
        })
        .catch(error => { console.warn(error) })
/*         fetch(generateSearchStedsnavnUrl(searchText, 0, 15))
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
 */    } else {
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
{/*               <div>
                <div onClick={ () => setStateSsr(!expandedSsr) } className={ style.expandBtn } >
                  <span className={ style.ellipsisToggle }>SSR</span>
                  { expandedSsr ? <ExpandLess /> : <ExpandMore /> }
                </div>
                <div className={ expandedSsr ? `${style.selected} ${style.open}` : style.selected } >
                  <SearchResult searchResult={ { searchResultSSR } }></SearchResult>
                </div>
              </div>
 */}              <div>
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
