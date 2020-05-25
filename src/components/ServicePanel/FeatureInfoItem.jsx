import React, { useContext } from 'react'
import style from './FeatureInfoItem.module.scss'
import uniqid from 'uniqid'
import { store } from '../../Utils/store.js'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={ classes.root } { ...other }>
      <Typography variant="h6">{ children }</Typography>
      { onClose ? (
        <IconButton aria-label="close" className={ classes.closeButton } onClick={ onClose }>
          <CloseIcon />
        </IconButton>
      ) : null }
    </MuiDialogTitle>
  )
})
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const FeatureInfoItem = () => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
    dispatch({
      type: "HIDE_FEATURES",
      info: featureContext.state.info
    })
  }

  const featureContext = useContext(store)
  const { dispatch } = featureContext

  const testFormat = (s) => {
    if (typeof s === 'object') return 'isObject'
    const rX = /^((\d+)|(true|false)|(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\+\d{2})|([\w\W]+))$/i
    const M = rX.exec(s)
    if (!M) return ''
    switch (M[1]) {
      case M[2]: return 'isNumeric'
      case M[3]: return 'isBoolean'
      case M[4]: return 'isDate'
      case M[5]: {
        if (M[5].length === 50 || M[5].length === 194) {
          return 'isBboxInternal'
        } else if (M[5].startsWith('{"type":"Point"')) {
          return 'isBboxJsonPoint'
        } else if (M[5].startsWith('{"type":"Polygon"')) {
          return 'isBboxJsonPolygon'
        } else if (M[5].startsWith('BOX(')) {
          return 'isBboxSimple'
        } else {
          return 'isString'
        }
      }
      default: return false
    }
  }

  const prepareItemFormat = (v) => {
    const test = testFormat(v)
    switch (test) {
      case 'isNumeric': return <>{ v }</>
      case 'isBoolean': return <>{ v }</>
      case 'isDate': return <>{ v }</> // TODO: formatt?
      case 'isBboxInternal': return <>BBOX db internal</> // TODO: klikke for å vise?
      case 'isBboxJsonPoint': return <>BBOX point</> // TODO: klikke for å vise?
      case 'isBboxJsonPolygon': return <>BBOX polygon</> // TODO: klikke for å vise?
      case 'isBboxSimple': return <>{ v }</> // TODO: klikke for å vise?
      case 'isString': return <>{ v }</>
      default: return <></>
    }
  }

  const prepareFeature = (info) => {
    let layers = []
    for (const key in info) {
      let layer = info[key]
      let featureRow = []
      if (Array.isArray(layer)) {
        for (const key in layer) {
          if (key !== 'name') {
            const feature = layer[key]
            for (const key in feature) {
              const items = feature[key]
              if (typeof items !== "string") {
                for (let [key, value] of Object.entries(items)) {
                  featureRow.push(<li key={ uniqid(key) }><i>{ key } </i> = <strong>{ prepareItemFormat(value) }</strong> </li>)
                }
              } else {
                featureRow.push(<li key={ uniqid(key) }><i>{ 'FeatureID' } </i> = <strong>{ prepareItemFormat(items) }</strong> </li>)
              }
            }
          }
        }
      } else {
        for (let [key, value] of Object.entries(layer)) {
          featureRow.push(<li key={ uniqid(key) }><i>{ key } </i> = <strong>{ prepareItemFormat(value) }</strong> </li>)
        }
      }
      layers.push(<React.Fragment key={ uniqid(key) }><h3>{ key }</h3><ul>{ featureRow }</ul></React.Fragment>)
    }
    return (<div className={ style.ulContainer } key={ uniqid() }>{ layers }</div>)
  }

  const featureContent = () => {
    if (Array.isArray(featureContext.state.info)) {
      return featureContext.state.info.map((info) => prepareFeature(info))
    } else {
      return <div>No info</div>
    }
  }

  return (
  <Dialog onClose={ handleClose } aria-labelledby="customized-dialog-title" open={ featureContext.state.show }>
      <DialogTitle id="customized-dialog-title" onClose={ handleClose }>
        Egenskaper <span> ( { featureContext.state.info ? featureContext.state.info.length : 0 } )</span>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          { featureContent() }
        </Typography>
      </DialogContent>
    </Dialog>
  )
}

export default FeatureInfoItem
