import React, { useState, useLayoutEffect } from "react"
import { map, eventHandler, mapConfig } from "../../MapUtil/maplibHelper"
import queryString from "query-string"
import setQuery from "set-query-string"
import BackgroundChooser from "../BackgroundChooser/BackgroundChooser"
import ServicePanel from "../ServicePanel/ServicePanel"
import SearchBar from "../SearchBar/SearchBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./MapContainer.module.scss"
import Position from '../Position/Position'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import FeatureInfoItem from '../ServicePanel/FeatureInfoItem'
import 'ol/ol.css'

import { StateProvider } from '../../Utils/store.js'

const ServiceListItem = (props) => <ServicePanel services={ props.listItem } removeMapItem={ props.removeMapItem } draggable />

const MapContainer = (props) => {
  const [expanded, toggleExpand] = useState(false)
  const [wms, setWMS] = useState()
  const queryValues = queryString.parse(window.location.search)
  let internMap = map
  mapConfig.coordinate_system = queryValues['crs'] || props.crs

  let lon = Number(queryValues["lon"] || props.lon)
  let lat = Number(queryValues["lat"] || props.lat)
  let zoom = Number(queryValues["zoom"] || props.zoom)

  let defaultConfig = JSON.parse(JSON.stringify(mapConfig))
  let newMapConfig = Object.assign({}, defaultConfig, {
    center: [lon, lat],
    zoom: zoom
  })

  useLayoutEffect(() => {
    window.olMap = internMap.Init("map", newMapConfig)
    internMap.AddZoom()
    internMap.AddScaleLine()
    eventHandler.RegisterEvent("MapMoveend", updateMapInfoState)
  }, [internMap])

  const renderServiceList = () => {
    if (wms) {
      const addedWms = {
        'Title': 'Added WMS from url',
        'DistributionProtocol': 'OGC:WMS',
        'GetCapabilitiesUrl': wms,
        addLayers: []
      }
      props.services.push(addedWms)
    }

    return props.services.map((listItem, i) => (
      <ServiceListItem listItem={ listItem } removeMapItem={ props.removeMapItem ? props.removeMapItem : null } key={ i } map={ map } />
    ))
  }

  const updateMapInfoState = () => {
    let center = map.GetCenter()
    const queryValues = queryString.parse(window.location.search)
    queryValues.lon = center.lon
    queryValues.lat = center.lat
    queryValues.zoom = center.zoom
    setQuery(queryValues)
  }

  const showDefaultTab = () => {
    return 'layers'
    /*
    if (props.services.length) {
      return 'layers'
    }
    else
      return 'search'
    */
  }

  const toogleMap = () => {
    window.history.back()
    // TODO: get paramtere to check for url til goto for closing map
  }

  return (
    <StateProvider>
      <div id="MapContainer" className={ `${style.mapContainer}` }>
      <BackgroundChooser />
      <div>
        <div>
          <div className={ style.closeMap }>
            <FontAwesomeIcon title="Lukk kartet" onClick={ () => toogleMap() } className={ style.toggleBtn } icon={ "times" } />
            <span className={ style.closeButtonLabel }>Lukk kartet</span>
          </div>
          <div className={ `${style.container} ${expanded ? style.closed : style.open}` }>
            <FontAwesomeIcon onClick={ () => toggleExpand(!expanded) } className={ style.toggleBtn } icon={ expanded ? ["fas", "layer-group"] : "times" } />
            <Tabs className={ `${style.tabs} ${expanded ? style.closed : style.open}` } defaultActiveKey={ showDefaultTab() } id="tab">
              <Tab eventKey="search" title="Søk" >
                <SearchBar />
              </Tab>
              <Tab className={ `${style.search} ${expanded ? style.closed : style.open}` } eventKey="layers" title="Visning">
                <div id="ServiceList">{ renderServiceList() }</div>
              </Tab>
            </Tabs>
          </div>
        </div>

      </div>
      <div id="map"
        style={ {
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 0
          } }
          tabIndex="0"
      />
      { internMap ? <Position map={ internMap } projection={ props.crs }></Position> : null }
      <div id="mapPopover">
        <FeatureInfoItem info={ '' } show={ false }></FeatureInfoItem>
      </div>
    </div>
    </StateProvider>
  )
}
MapContainer.defaultProps = {
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  crs: 'EPSG:25833'
}

export default MapContainer
