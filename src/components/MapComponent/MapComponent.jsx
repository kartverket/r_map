import React, { useState, useLayoutEffect } from "react"
import queryString from "query-string"
import setQuery from "set-query-string"

import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil"
import { map, eventHandler, mapConfig } from "../../MapUtil/maplibHelper"
import { Messaging } from '../../Utils/communication'


const MapComponent = (props) => {
  const [wms, setWMS] = useState()
  const queryValues = queryString.parse(window.location.search)
  let internMap = map
  mapConfig.coordinate_system = queryValues['crs'] || props.crs

  let lon = Number(queryValues["lon"] || props.lon)
  let lat = Number(queryValues["lat"] || props.lat)
  let zoom = Number(queryValues["zoom"] || props.zoom)
  let newMapConfig = Object.assign({}, mapConfig, {
    center: [lon, lat],
    zoom: zoom
  })

  useLayoutEffect(() => {
    window.olMap = internMap.Init("map", newMapConfig)
    internMap.AddZoom()
    internMap.AddScaleLine()
    eventHandler.RegisterEvent("MapMoveend", updateMapInfoState)
    addWMS()
    window.olMap.on('click', function (evt) {
      const feature = window.olMap.forEachFeatureAtPixel(evt.pixel, (feature, layer) => feature)
      if (feature) {
        const coord = feature.getGeometry().getCoordinates()
        let content = feature.get('n')
        let message = {
          cmd: 'featureSelected',
          featureId: feature.getId(),
          properties: content,
          coordinates: coord
        }
        Messaging.postMessage(JSON.stringify(message))
      }
    })
  }, [internMap])

  const updateMapInfoState = () => {
    let center = map.GetCenter()
    const queryValues = queryString.parse(window.location.search)
    //this.props = { lon: center.lon, lat: center.lat, zoom: center.zoom }
    queryValues.lon = center.lon
    queryValues.lat = center.lat
    queryValues.zoom = center.zoom
    setQuery(queryValues)
  }

  const addWMS = () => {
    props.services.forEach(service => {
      let meta = {}
      switch (service.DistributionProtocol) {
        case 'WMS':
        case 'WMS-tjeneste':
        case 'OGC:WMS':
          CapabilitiesUtil.parseWmsCapabilities(service.GetCapabilitiesUrl)
            .then(capa => {
              meta = CapabilitiesUtil.getWMSMetaCapabilities(capa)
              meta.Type = 'OGC:WMS'
              meta.Params = service.customParams || ''
              if (service.addLayers.length > 0) {
                let layersToBeAdded = []
                layersToBeAdded = capa.Capability.Layer.Layer.filter(
                  e => service.addLayers.includes(e.Name)
                )
                if (layersToBeAdded.length === 0 || layersToBeAdded.length !== service.addLayers.length) {
                  layersToBeAdded = []
                  service.addLayers.forEach(layerName => {
                    layersToBeAdded.push({ Name: layerName })
                  })
                }
                layersToBeAdded.forEach(layer => {
                  let laycapaLayerer = CapabilitiesUtil.getOlLayerFromWmsCapabilities(meta, layer)
                  window.olMap.addLayer(laycapaLayerer)
                })
              }
            })
            .then(layers => {
              console.log('Added wms layers ready')
            })
            .catch(e => console.warn(e))
          break
        case 'GEOJSON':
          CapabilitiesUtil.getGeoJson(service.url)
            .then(layers => {
              meta.Type = 'GEOJSON'
              meta.ShowPropertyName = service.ShowPropertyName || 'id'
              meta.EPSG = service.EPSG || 'EPSG:4326'
              if (service.addLayers.length > 0) {
                if (layers.name === service.addLayers['0']) {
                  let currentLayer = CapabilitiesUtil.getOlLayerFromGeoJson(meta, layers)
                  window.olMap.addLayer(currentLayer)
                }
              }
            })
            .catch(e => console.warn(e))
          break
        default:
          console.warn('No service type specified')
          break
      }
    })
  }

  return (
    <div
      id="map"
      style={ {
        position: "relative",
        width: "100%",
        height: "100%",
        zIndex: 0
      } }
      tabindex="0"
    />
  )
}

MapComponent.defaultProps = {
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  crs: 'EPSG:25833'
}
export default MapComponent
