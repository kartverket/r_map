import parser from "fast-xml-parser"

export const SET_FEATURES = 'SET_FEATURES'
export const SHOW_FEATURES = 'SHOW_FEATURES'
export const HIDE_FEATURES = 'HIDE_FEATURES'

const parseGmlFeatureInfo = (data) => {
  const parsedGml = parser.parse(data, {
    ignoreAttributes: false,
    ignoreNameSpace : true,
    attributeNamePrefix: "",
    allowBooleanAttributes: true
  })
  return parsedGml.msGMLOutput
}

const parsePlainFeatureInfo = (data) => {
  let parsedFeatureInfo
  if (data.includes('Layer')) {
    let featureInfo = data.split("\n\n")
    featureInfo.shift()
    parsedFeatureInfo = featureInfo.map((layer) => {
      let r_layer = {}
      let subf = layer.split(/(Layer[^\r\n]*)/)
      subf.shift()
      let layerName = subf.splice(0, 1)[0].split('Layer ')[1].replace(/'/g, '')
      r_layer[layerName] = subf.map((f) => {
        let feature = f.split(/(Feature[^\r\n]*)/)
        let tmp_feature = {}
        feature.shift()
        let faetureId = feature.splice(0, 1)[0].split('Feature ')[1].replace(/:/g, '').trim()
        feature = feature.map((item) => {
          item = item.trim()
          item = item.replace(/=/g, ':').split('\n').map((item) => {
            let obj = {}
            let [key, value] = item.trim().split(' :')
            obj[key] = value.replace(/'/g, '').trim()
            return obj
          })
          return { ...item }
        })
        tmp_feature[faetureId] = feature.flat()
        return tmp_feature
      })
      return r_layer
    })
    /*
      let message = {
        cmd: 'featureSelected',
        properties: data,
      }
      Messaging.postMessage(JSON.stringify(message))
    */
  }
  return parsedFeatureInfo
}

export const setFeature = (features) => {
  return {
    type: SET_FEATURES,
    info: parseGmlFeatureInfo(features)
  }
}

export const hideFeatureInfo = (features) => ({
  type: HIDE_FEATURES,
  info: features
})

