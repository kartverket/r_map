import parser from "fast-xml-parser"

export const parseFeatureInfo = (data, format) => {
  switch (format) {
    case 'text/plain': {
      return parsePlainFeatureInfo(data)
    }
    case 'text/html': {
      return data
    }
    case 'text/xml': {
      // ArcGis Simple XML with just fields
      // Or GML v ?
      return parseGmlFeatureInfo(data)
    }
    case 'text/xml; subtype=gml/3.1.1': {
      return parseGmlFeatureInfo(data)
    }
    case 'application/vnd.ogc.gml': {
      return parseGmlFeatureInfo(data)
    }
    case 'application/vnd.ogc.gml/3.1.1': {
      return parseGmlFeatureInfo(data)
    }
    case 'application/json': {
      return data
    }
    default:
      return parsePlainFeatureInfo(data)
  }

}
export const parseCSV = (data) => {
  const cellDelims = ";"
  const lineDelims = "; "
  let line = []
  let lines = []
  let layer = {}
  let layername = ''

  if (data.startsWith('@')) {
    layername = data.substring(data.indexOf('@') + 1, data.indexOf(' '))
    data = data.substring(data.indexOf(' ') + 1)
  }
  data = data.split(lineDelims)
  data.pop()
  for (let i = 0; i < data.length; i++) {
    line = data[i].split(cellDelims)
    lines.push(line)
  }
  layer[layername] = mergeArrayToObject(lines[0], lines[1])
  return [layer]
}

export const parseGmlFeatureInfo = (data) => {
  let returnValue = ''
  const parsedGml = parser.parse(data, {
    ignoreAttributes: false,
    ignoreNameSpace: true,
    attributeNamePrefix: "",
    allowBooleanAttributes: true
  })
  if (parsedGml.msGMLOutput) {
    returnValue = parsedGml.msGMLOutput
  } else if (parsedGml.FeatureCollection) {
    returnValue = parsedGml.FeatureCollection.featureMember
  }
  return [returnValue]
}
const mergeArrayToObject = (array_1, array_2) => {
  let obj = {}
  for (let i = 0; i < array_1.length; i++) {
    obj[array_1[i]] = array_2[i]
  }
  return obj
}
const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    if (typeof item === 'string' && item.length > 0) {
      let [key, value] = item.trim().split(' :')
      obj[key] = value.replace(/'/g, '').trim()
    } else {
      if (item.objid) {
        obj[item.objid] = item
      } else if (item.fid) {
        obj[item.fid] = item
      } else {
        obj[0] = item
      }
    }
    return obj
  }, {})

export const parsePlainFeatureInfo = (data) => {
  let parsedFeatureInfo
  if (data === "no features were found" || data.includes('Search returned no results')) return ''
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
        feature.shift()
        let feature1 = feature.splice(0, 1)[0].split('Feature ')[1].replace(/:/g, '').trim()
        if (Array.isArray(feature) && (feature[0].length > 1)) {
          feature = feature.map((item) => {
            item = item.trim().replace(/=/g, ':').split('\n')
            return arrayToObject(item)
          })
          return arrayToObject(feature)
        } else {
          return {
            feature: feature1
          }
        }
      })
      return r_layer
    })
  } else if (parseCSV(data).length !== 0) {
    parsedFeatureInfo = parseCSV(data)
  } else {
    parsedFeatureInfo = [data]
  }
  return parsedFeatureInfo
}
