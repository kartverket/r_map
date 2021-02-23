import React, { useState, useLayoutEffect } from "react"
import { map, mapConfig } from "../../MapUtil/maplibHelper"
import queryString from "query-string"
import BackgroundChooser from "../BackgroundChooser/BackgroundChooser"
import ServicePanel from "../ServicePanel/ServicePanel"
import SearchBar from "../SearchBar/SearchBar"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import PropTypes from "prop-types"
import { IconButton, Tabs, Tab } from '@material-ui/core'
import Position from '../Position/Position'
import FeatureInfoItem from '../ServicePanel/FeatureInfoItem'
import { StateProvider } from '../../Utils/store.js'
import style from "./MapContainer.module.scss"
import { useIntl } from 'react-intl'

const ServiceListItem = (props) => <ServicePanel services={ props.listItem } removeMapItem={ props.removeMapItem } draggable />

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={ value !== index }
      id={ `simple-tabpanel-${index}` }
      aria-labelledby={ `simple-tab-${index}` }
      { ...other }
    >
      <Box p={ 1 }>{ children }</Box>
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}
const MapContainer = (props) => {
  const [value, setValue] = React.useState(1)
  const [expanded, toggleExpand] = useState(false)
  const [wms, setWMS] = useState()
  const intl = useIntl()
  const queryValues = queryString.parse(window.location.search, { arrayFormat: 'comma' })
  console.log(queryValues)
  let internMap = map

  mapConfig.coordinate_system = queryValues['crs'] || props.crs

  let defaultConfig = JSON.parse(JSON.stringify(mapConfig))
  let newMapConfig = Object.assign({}, defaultConfig, {
    center: [props.lon, props.lat],
    zoom: props.zoom
  })

  useLayoutEffect(() => {
    const queryValues = queryString.parse(window.location.search, { arrayFormat: 'comma' })
    console.log(queryValues)
    window.olMap = internMap.Init("map", newMapConfig)
    internMap.AddZoom()
    internMap.AddScaleLine()
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

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <StateProvider>
      <div id="MapContainer" className={ `${style.mapContainer}` }>
        <BackgroundChooser />
        <div>
          <div>
            <div className={ `${style.container} ${expanded ? style.closed : style.open}` }>
              <IconButton aria-label="expand" onClick={ () => toggleExpand(!expanded) }>
                { expanded ? <ExpandLess /> : <ExpandMore /> }
              </IconButton>
              <Tabs value={ value } variant="fullWidth" onChange={ handleChange } indicatorColor="primary" textColor="primary">
                <Tab label={intl.formatMessage({ id: 'search' }) } value={ 0 } />
                <Tab label={intl.formatMessage({ id: 'show' }) } value={ 1 } />
              </Tabs>
              <TabPanel value={ value } index={ 0 }><SearchBar /></TabPanel>
              <TabPanel value={ value } index={ 1 }>{ renderServiceList() }</TabPanel>
            </div>
          </div>

        </div>
        <div id="map" className="map"
          style={ {
            position: "relative",
            width: "100%",
            height: "100vh",
            zIndex: 0
          } }
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
