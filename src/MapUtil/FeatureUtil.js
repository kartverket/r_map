import { XMLParser } from "fast-xml-parser"

const parser = new XMLParser({
  // attributes are kept because some services carry the feature id (fid/gml:id) there,
  // and with no prefix they read like any other field further down
  ignoreAttributes: false,
  attributeNamePrefix: "",
  allowBooleanAttributes: true,
  // v5 name for the ignoreNameSpace option we used before the Vite rewrite (af82016):
  // strips the prefix from both tag AND attribute names, and drops xmlns:* attributes
  // entirely. Without it the xmlns declarations on the GML root survive as sibling keys
  // of the layer nodes and get rendered as bogus "layers" in the feature info panel.
  // A transformTagName callback is not enough - it never sees attribute names.
  removeNSPrefix: true
})

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

// GML responses nest inconsistently, so both helpers below are about not trusting the
// shape: fast-xml-parser gives a bare object for one child and an array for several,
// and mixes scalar attributes in among the element children.
const isObject = (v) => typeof v === 'object' && v !== null
const toArray = (v) => (Array.isArray(v) ? v : [v])

export const parseGmlFeatureInfo = (data) => {
  const parsedGml = parser.parse(data)
  let root = null
  if (parsedGml.msGMLOutput) {
    // MapServer: <msGMLOutput><x_layer><x_feature><field>...
    root = parsedGml.msGMLOutput
  } else if (parsedGml.FeatureCollection) {
    // WFS/GML: <FeatureCollection><featureMember><x><field>... - no layer level,
    // and featureMember is an array as soon as the click hits more than one feature
    root = parsedGml.FeatureCollection.featureMember
  }
  // an empty or unrecognised response parses to '' or undefined - bail out with the
  // same shape we return otherwise, so callers never have to special-case it
  if (!isObject(root)) return [{}]

  // Transform the object to a more readable format, the same type as the plain text
  const r_layer = {}
  // push rather than assign: a layer with several hits used to overwrite itself and
  // only ever showed the last feature
  const addFeature = (layername, featurename, fields) => {
    if (!r_layer[layername]) r_layer[layername] = []
    r_layer[layername].push({ [featurename]: fields })
  }

  // one iteration for msGMLOutput, one per featureMember for a FeatureCollection.
  // Iterating the array directly (rather than for..in over its indices) keeps us from
  // inventing layers named "0", "1", ...
  for (const node of toArray(root)) {
    if (!isObject(node)) continue
    for (const [key, content] of Object.entries(node)) {
      // attributes of the root element parse to scalars alongside the layer nodes.
      // Treating one as a layer would walk a string character by character and list
      // every letter as a separate field, so anything not an object is not a layer.
      if (!isObject(content)) continue
      const layername = key.split('_layer')[0]
      // element children are the features; scalar children are this node's own fields
      const children = Object.entries(content).filter(([, v]) => isObject(v))
      if (children.length) {
        // msGMLOutput: the layer wraps one or more <x_feature> elements
        for (const [childKey, child] of children) {
          for (const feature of toArray(child)) {
            addFeature(layername, childKey.split('_')[0], feature)
          }
        }
      } else {
        // FeatureCollection: the featureMember child already holds the fields, so it is
        // both the layer and the feature. Wrapping it the same way keeps the output
        // shape uniform for FeatureInfoItem, which expects layer -> [ { name: fields } ]
        addFeature(layername, layername, content)
      }
    }
  }
  return [r_layer]
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
      if (value !== undefined) {
        obj[key] = value.replace(/'/g, '').trim()
      }
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
      let layerName = '';
      if (subf && subf.length > 0) {
        layerName = subf.splice(0, 1)[0].split('Layer ')[1].replace(/'/g, '');
      }
        r_layer[layerName] = subf.map((f) => {
        let feature = f.split(/(Feature[^\r\n]*)/)
        feature.shift()
        let feature1 = feature.splice(0, 1)[0].split('Feature ')[1].replace(/:/g, '').trim()
        if (Array.isArray(feature) && (feature[0].length > 1)) {
          feature = feature.map((item) => {
            item = item.trim().replace(/=(?=\s)/g, ':').split('\n');
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
