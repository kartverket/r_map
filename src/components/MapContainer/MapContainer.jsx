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
import FeatureInfoItem from '../ServicePanel/FeatureInfoItem'
import 'ol/ol.css'

import { StateProvider } from '../../Utils/store.jsx'

const ServiceListItem = (props) => <ServicePanel services={ props.listItem } removeMapItem={ props.removeMapItem } draggable />

const MapContainer = ({
  crs = 'EPSG:25833',
  lat = 7197860,
  lon = 396722,
  removeMapItem = null,
  services = [],
  zoom = 4
}) => {
  const [expanded, toggleExpand] = useState(false)
  const [wms, setWMS] = useState()
  const [activeTab, setActiveTab] = useState('layers')
  const queryValues = queryString.parse(window.location.search)
  let internMap = map
  mapConfig.coordinate_system = queryValues['crs'] || crs

  lon = Number(queryValues["lon"] || lon)
  lat = Number(queryValues["lat"] || lat)
  zoom = Number(queryValues["zoom"] || zoom)

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
    let servicesToRender = services
    if (wms) {
      const addedWms = {
        'Title': 'Added WMS from url',
        'DistributionProtocol': 'OGC:WMS',
        'GetCapabilitiesUrl': wms,
        addLayers: []
      }
      servicesToRender = services.concat(addedWms)
    }

    return servicesToRender.map((listItem, i) => (
      <ServiceListItem listItem={ listItem } removeMapItem={ removeMapItem } key={ i } map={ map } />
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
            <div className={ `${style.tabs} ${expanded ? style.closed : style.open}` }>
              <div className={ style.tabList } role="tablist" aria-label="Kartfaner">
                <button
                  type="button"
                  role="tab"
                  aria-selected={ activeTab === 'search' }
                  className={ `${style.tabButton} ${activeTab === 'search' ? style.active : ''}` }
                  onClick={ () => setActiveTab('search') }
                >
                  Søk
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={ activeTab === 'layers' }
                  className={ `${style.tabButton} ${activeTab === 'layers' ? style.active : ''}` }
                  onClick={ () => setActiveTab('layers') }
                >
                  Visning
                </button>
              </div>
              <div className={ activeTab === 'search' ? style.tabPanel : style.hiddenPanel }>
                <SearchBar />
              </div>
              <div className={ `${style.search} ${activeTab === 'layers' ? style.tabPanel : style.hiddenPanel}` }>
                <div id="ServiceList">{ renderServiceList() }</div>
              </div>
            </div>
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
      { internMap ? <Position map={ internMap } projection={ crs }></Position> : null }
      <div id="mapPopover">
        <FeatureInfoItem info={ '' } show={ false }></FeatureInfoItem>
      </div>
    </div>
    </StateProvider>
  )
}
export default MapContainer
