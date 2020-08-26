"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCancelPrintUrl = exports.generateStatusPrintDownloadUrl = exports.generatePrintDownloadUrl = exports.generatePrintUrl = exports.generateUrlPrintCapabilities = exports.isNotOutOfBounds = exports.isOutOfBounds = exports.getCoordinateSystems = exports.getSOSIfromEPSG = exports.generateFaqUrl = exports.generateEiendomAddress = exports.generateMatrikkelWfsFilterUrl = exports._constructMarkingFilter = exports.generateSearchMatrikkelNummerUrl = exports.generateGeoJSONSaveUrl = exports.generateGeoJSONUrl = exports.generateEmergencyPosterPreviewImageUrl = exports.generateSearchStedsnavnBboxUrl = exports.generateEmergencyPosterPointUrl = exports.generateLagFargeleggingskartUrl = exports.generateLagTurkartUrl = exports.generateSeHavnivaaUrl = exports.generateKoordTransUrl = exports.generateFaktaarkUrl = exports.generateSeEiendomUrl = exports.generateMatrikkelInfoUrl = exports.generateAdressePunktsokUrl = exports.generateAdresseSokUrl = exports.generateElevationPointUrl = exports.generateSearchAdresseUrl = exports.generateStedsnavnSokUrl = exports.generateSearchStedsnavnUrl = exports.generateSearchMatrikkelAdresseUrl = exports.generateSearchMatrikkelVegUrl = exports.generateEmergencyPosterServiceUrl = exports.generateMapLinkServiceUrl = exports.generateElevationChartServiceUrl = exports.uploadGpxFileService = exports.generateWhat3WordsServiceUrl = void 0;

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'https://www.norgeskart.no/';
var urlOpenWps = 'https://openwps.statkart.no/skwms1/';
var urlOpenWms = 'http://openwms.statkart.no/skwms1/';
var urlGeonorge = 'https://ws.geonorge.no/';
var urlSeEiendom = 'http://www.seeiendom.no/';
var urlFaktaark = 'https://stadnamn.kartverket.no/fakta/';
var urlHavnivaa = "http://api.sehavniva.no/";
var urlAdresseSok = 'https://ws.geonorge.no/adresser/v1/sok';
var urlAdressePunktsok = 'https://ws.geonorge.no/adresser/v1/punktsok';

var generateWhat3WordsServiceUrl = function generateWhat3WordsServiceUrl() {
  return url + 'ws/w3w.py';
};

exports.generateWhat3WordsServiceUrl = generateWhat3WordsServiceUrl;

var uploadGpxFileService = function uploadGpxFileService() {
  return url + 'ws/upload-gpx.py';
};

exports.uploadGpxFileService = uploadGpxFileService;

var generateElevationChartServiceUrl = function generateElevationChartServiceUrl(gpxFile) {
  return urlOpenWps + "wps.elevation2?request=Execute&service=WPS&version=1.0.0&identifier=elevationChart&dataInputs=gpx=@xlink:href=" + gpxFile;
};

exports.generateElevationChartServiceUrl = generateElevationChartServiceUrl;

var generateMapLinkServiceUrl = function generateMapLinkServiceUrl(config) {
  var service = encodeURIComponent(config.service);
  var request = encodeURIComponent(config.request);
  var crs = encodeURIComponent(config.CRS);
  var format = encodeURIComponent(config.FORMAT);
  var bgcolor = encodeURIComponent(config.BGCOLOR);
  var transparent = encodeURIComponent(config.TRANSPARENT);
  var layers = encodeURIComponent(config.LAYERS);
  var version = encodeURIComponent(config.VERSION);
  var width = encodeURIComponent(config.WIDTH);
  var height = encodeURIComponent(config.HEIGHT);
  var bbox = encodeURIComponent(config.BBOX);
  return urlOpenWms + "wms.topo4?service=" + service + "&request=" + request + "&CRS=" + crs + "&FORMAT=" + format + "&BGCOLOR=" + bgcolor + "&TRANSPARENT=" + transparent + "&LAYERS=" + layers + "&VERSION=" + version + "&WIDTH=" + width + "&HEIGHT=" + height + "&BBOX=" + bbox;
};

exports.generateMapLinkServiceUrl = generateMapLinkServiceUrl;

var generateEmergencyPosterServiceUrl = function generateEmergencyPosterServiceUrl(config) {
  var locationName = encodeURIComponent(config.locationName);
  var position1 = encodeURIComponent(config.position1);
  var position2 = encodeURIComponent(config.position2);
  var street = encodeURIComponent(config.street);
  var place = encodeURIComponent(config.place);
  var matrikkel = encodeURIComponent(config.matrikkel);
  var utm = encodeURIComponent(config.utm);
  var posDez = encodeURIComponent(config.posDez);
  var map = encodeURIComponent(config.map);
  return urlGeonorge + "/fop/fop?locationName=" + locationName + "&position1=" + position1 + "&position2=" + position2 + "&street=" + street + "&place=" + place + "&matrikkel=" + matrikkel + "&utm=" + utm + "&posDez=" + posDez + "&map=" + map;
};

exports.generateEmergencyPosterServiceUrl = generateEmergencyPosterServiceUrl;

var generateSearchMatrikkelVegUrl = function generateSearchMatrikkelVegUrl(query) {
  return urlGeonorge + "norgeskart/v1/matrikkel/veg/" + encodeURIComponent(query);
};

exports.generateSearchMatrikkelVegUrl = generateSearchMatrikkelVegUrl;

var generateSearchMatrikkelAdresseUrl = function generateSearchMatrikkelAdresseUrl(query) {
  return urlGeonorge + "norgeskart/v1/matrikkel/adr/" + encodeURIComponent(query);
};

exports.generateSearchMatrikkelAdresseUrl = generateSearchMatrikkelAdresseUrl;

var generateSearchStedsnavnUrl = function generateSearchStedsnavnUrl(query, side, antall) {
  if (query) {
    var testquery = query.split(',');

    if (testquery.length >= 2) {
      query = testquery[0] + "*&fylkeKommuneNavnListe=+" + testquery[1].trim();
      return urlGeonorge + "SKWS3Index/v2/ssr/sok?navn=" + query + "&eksakteForst=true&antPerSide=" + antall + "&epsgKode=32633&side=" + side;
    }
  }

  return urlGeonorge + "SKWS3Index/v2/ssr/sok?navn=" + query + "*&eksakteForst=true&antPerSide=" + antall + "&epsgKode=32633&side=" + side;
};

exports.generateSearchStedsnavnUrl = generateSearchStedsnavnUrl;

var generateStedsnavnSokUrl = function generateStedsnavnSokUrl(query, side, antall) {
  side += 1;
  return "https://norgeskart.no/ws/px.py?https://wstest.geonorge.no/stedsnavn/v1/stedsnavn?sok=".concat(query, "&treffPerSide=").concat(antall, "&side=").concat(side);
};

exports.generateStedsnavnSokUrl = generateStedsnavnSokUrl;

var generateSearchAdresseUrl = function generateSearchAdresseUrl(query) {
  return urlGeonorge + "AdresseWS/adresse/sok?sokestreng=" + encodeURIComponent(query) + "&antPerSide=100&side=0";
};

exports.generateSearchAdresseUrl = generateSearchAdresseUrl;

var generateElevationPointUrl = function generateElevationPointUrl(lat, lon, epsgNumber) {
  return url + 'ws/elev.py?lat=' + lat + '&lon=' + lon + '&epsg=' + epsgNumber;
};

exports.generateElevationPointUrl = generateElevationPointUrl;

var generateAdresseSokUrl = function generateAdresseSokUrl(query) {
  query = typeof query === 'string' ? query : '';
  query = query.indexOf(',') !== -1 ? query.replace(',', '*') : query + '*';
  return urlAdresseSok + '?sok=' + encodeURIComponent(query) + '&treffPerSide=100';
};

exports.generateAdresseSokUrl = generateAdresseSokUrl;

var generateAdressePunktsokUrl = function generateAdressePunktsokUrl(radius, lat, lon) {
  return urlAdressePunktsok + '?radius=' + radius + '&lat=' + lat + '&lon=' + lon + '&treffPerSide=10';
};

exports.generateAdressePunktsokUrl = generateAdressePunktsokUrl;

var generateMatrikkelInfoUrl = function generateMatrikkelInfoUrl(minx, miny, maxx, maxy) {
  return url + "ws/wfs.teig.py?bbox=" + minx + "," + miny + "," + maxx + "," + maxy;
};

exports.generateMatrikkelInfoUrl = generateMatrikkelInfoUrl;

var generateSeEiendomUrl = function generateSeEiendomUrl(knr, gnr, bnr, fnr, snr) {
  return urlSeEiendom + "eiendom/" + knr + "/" + gnr + "/" + bnr + "/" + fnr + "/" + snr;
};

exports.generateSeEiendomUrl = generateSeEiendomUrl;

var generateFaktaarkUrl = function generateFaktaarkUrl(stedsnummer) {
  return urlFaktaark + stedsnummer;
};

exports.generateFaktaarkUrl = generateFaktaarkUrl;

var generateKoordTransUrl = function generateKoordTransUrl(ost, nord, resSosiKoordSys, sosiKoordSys) {
  resSosiKoordSys = resSosiKoordSys || 84;
  sosiKoordSys = sosiKoordSys || 84;
  return urlGeonorge + 'transApi?ost=' + ost + '&nord=' + nord + '&fra=' + sosiKoordSys + '&til=' + resSosiKoordSys;
};

exports.generateKoordTransUrl = generateKoordTransUrl;

var generateSeHavnivaaUrl = function generateSeHavnivaaUrl(lat, lon) {
  return urlHavnivaa + "tideapi.php?lat=" + lat + "&lon=" + lon + "&lang=nb&year=" + new Date().getFullYear() + "&place=&tide_request=tidetable";
};

exports.generateSeHavnivaaUrl = generateSeHavnivaaUrl;

var generateLagTurkartUrl = function generateLagTurkartUrl() {
  return urlGeonorge + "freeprint/getprint_sverige.py";
};

exports.generateLagTurkartUrl = generateLagTurkartUrl;

var generateLagFargeleggingskartUrl = function generateLagFargeleggingskartUrl() {
  return urlGeonorge + "freeprint/getprint_f.py";
};

exports.generateLagFargeleggingskartUrl = generateLagFargeleggingskartUrl;

var generateEmergencyPosterPointUrl = function generateEmergencyPosterPointUrl(lat, lon) {
  return url + 'ws/emergencyPoster.py?&lon=' + lon + ',lat=' + lat;
};

exports.generateEmergencyPosterPointUrl = generateEmergencyPosterPointUrl;

var generateSearchStedsnavnBboxUrl = function generateSearchStedsnavnBboxUrl(minx, miny, maxx, maxy) {
  return urlGeonorge + 'SKWS3Index/ssr/sok?&nordLL=' + miny + '&ostLL=' + minx + '&nordUR=' + maxy + '&ostUR=' + maxx + '&epsgKode=32633';
};

exports.generateSearchStedsnavnBboxUrl = generateSearchStedsnavnBboxUrl;

var generateEmergencyPosterPreviewImageUrl = function generateEmergencyPosterPreviewImageUrl(minx, miny, maxx, maxy) {
  return urlOpenWms + 'wms.topo4?service=WMS&request=GetMap&CRS=EPSG:32633&FORMAT=image%2Fjpeg&BGCOLOR=0xFFFFFF&TRANSPARENT=false&LAYERS=topo4_WMS&VERSION=1.3.0&WIDTH=' + window.innerWidth + '&HEIGHT=' + window.innerHeight + '&BBOX=' + minx + ',' + miny + ',' + maxx + ',' + maxy;
};

exports.generateEmergencyPosterPreviewImageUrl = generateEmergencyPosterPreviewImageUrl;

var generateGeoJSONUrl = function generateGeoJSONUrl(hash, save) {
  var params = {};
  params.hash = hash;

  if (save) {
    params.save = true;
  }

  return url + 'ws/get-json.py?' + _queryString.default.stringify(params);
};

exports.generateGeoJSONUrl = generateGeoJSONUrl;

var generateGeoJSONSaveUrl = function generateGeoJSONSaveUrl() {
  return url + 'ws/upload-json.py';
};

exports.generateGeoJSONSaveUrl = generateGeoJSONSaveUrl;

var generateSearchMatrikkelNummerUrl = function generateSearchMatrikkelNummerUrl(query) {
  return urlGeonorge + 'norgeskart/v1/matrikkel/eie/' + query;
};

exports.generateSearchMatrikkelNummerUrl = generateSearchMatrikkelNummerUrl;

var _constructMarkingFilter = function _constructMarkingFilter(property) {
  return property.kommunenr + '-' + property.gardsnr + '-' + property.bruksnr + '-' + property.festenr + '-' + property.seksjonsnr;
};

exports._constructMarkingFilter = _constructMarkingFilter;

var generateMatrikkelWfsFilterUrl = function generateMatrikkelWfsFilterUrl(property) {
  return urlGeonorge + 'norgeskart/v1/teiger/' + _constructMarkingFilter(property) + '/';
};

exports.generateMatrikkelWfsFilterUrl = generateMatrikkelWfsFilterUrl;

var generateEiendomAddress = function generateEiendomAddress(kommunenr, gardsnr, bruksnr, festnr, sectionsnr) {
  var baseUrl = url + 'ws/eiendom.py?';

  if (festnr !== "0") {
    if (sectionsnr === "0") {
      baseUrl += kommunenr + "-" + gardsnr + "/" + bruksnr + "/" + festnr;
    } else {
      baseUrl += kommunenr + "-" + gardsnr + "/" + bruksnr + "/" + festnr + "/" + sectionsnr;
    }
  } else {
    baseUrl += kommunenr + "-" + gardsnr + "/" + bruksnr;
  }

  return baseUrl + '&KILDE:Eiendom KOMMUNENR:' + kommunenr + ' GARDSNR:' + gardsnr + ' BRUKSNR:' + bruksnr + ' SEKSJONSNR:' + sectionsnr + ' FESTENR:' + festnr;
};

exports.generateEiendomAddress = generateEiendomAddress;

var generateFaqUrl = function generateFaqUrl(code) {
  return url + 'ws/faq.py?code=' + code;
};
/*
 // No CORS
 const generateSeHavnivaaUrl =  (lat, lon) => {
 return urlHavnivaa + "tideapi.php?lat=" + lat + "&lon=" + lon + "&refcode=cd&place=&lang=nb&file=&tide_request=locationlevels"

 }                const generateSearchEiendomUrl =  (query) => {
 return "http://eiendom.statkart.no/Search.ashx?filter=KILDE:sted,matreiendom,SITEURLKEY:httpwwwseeiendomno,LESEGRUPPER:guests&term=" + query
 }
 */


exports.generateFaqUrl = generateFaqUrl;
var sosiCodes = [{
  ESRI: null,
  EPSG: 4326,
  SOSI: 84,
  name: 'EU89 - Geografisk, grader (Lat/Lon)',
  viewable: false,
  key: 'EU89_Lat_Lon',
  type: 'standard',
  bbox: {
    // WGS84
    MinX: 3.844925191,
    MaxX: 31.95907717,
    MinY: 57.69458922,
    // Norway
    MaxY: 71.45477563 // Norway

  }
}, //viewable, but not necessary in selectors
{
  ESRI: 25831,
  EPSG: 25831,
  SOSI: 21,
  name: 'EU89, UTM-sone 31',
  viewable: true,
  key: 'EU89_UTM_31',
  type: 'standard',
  bbox: {}
}, {
  ESRI: 25832,
  EPSG: 25832,
  SOSI: 22,
  name: 'EU89, UTM-sone 32',
  viewable: true,
  key: 'EU89_UTM_32',
  type: 'standard',
  bbox: {
    // UTM zone 32
    MinX: 229614.1053,
    MaxX: 751898.5673,
    MinY: 6401682.026,
    // Norway
    MaxY: 7231445.376 // Norway

  }
}, {
  ESRI: 25833,
  EPSG: 25833,
  SOSI: 23,
  name: 'EU89, UTM-sone 33',
  viewable: true,
  key: 'EU89_UTM_33',
  type: 'standard',
  bbox: {
    // UTM zone 33
    MinX: 288889.7639,
    MaxX: 804809.936,
    MinY: 7211211.98,
    // Norway
    MaxY: 7866186.306 // Norway
    // alternative
    // UTM zone 33 for all of Norway

    /*
    MinX : -128551.4542,
    MaxX : 1148218.099,
    MinY : 6404024.705, // Norway
    MaxY : 8010780.591 // Norway
    */

  }
}, {
  ESRI: 25834,
  EPSG: 25834,
  SOSI: 24,
  name: 'EU89, UTM-sone 34',
  viewable: true,
  key: 'EU89_UTM_34',
  type: 'standard',
  bbox: {
    // UTM zone 34
    MinX: 389363.4613,
    MaxX: 624301.8048,
    MinY: 7565200.998,
    // Norway
    MaxY: 7930309.032 // Norway

  }
}, {
  ESRI: 25835,
  EPSG: 25835,
  SOSI: 25,
  name: 'EU89, UTM-sone 35',
  viewable: true,
  key: 'EU89_UTM_35',
  type: 'standard',
  bbox: {
    // UTM zone 35
    MinX: 253177.3653,
    MaxX: 683621.7167,
    MinY: 7603094,
    // Norway
    MaxY: 7924929.221 // Norway

  }
}, {
  ESRI: 25836,
  EPSG: 25836,
  SOSI: 26,
  name: 'EU89, UTM-sone 36',
  viewable: true,
  key: 'EU89_UTM_36',
  type: 'standard',
  bbox: {}
}, {
  ESRI: 27391,
  EPSG: 27391,
  SOSI: 1,
  name: 'NGO1948, Gauss-K. Akse 1',
  viewable: false,
  key: 'NGO1948_GaussK_1',
  type: 'extended',
  bbox: {
    // NGO1948 Axis 1-4
    MinX: -368207.9294,
    MaxX: 172305.8,
    MinY: -28995.15926,
    // Norway
    MaxY: 808453.3338 // Norway

  }
}, {
  ESRI: 27392,
  EPSG: 27392,
  SOSI: 2,
  name: 'NGO1948, Gauss-K. Akse 2',
  viewable: false,
  key: 'NGO1948_GaussK_2',
  type: 'extended',
  bbox: {
    // NGO1948 Axis 1-4
    MinX: -368207.9294,
    MaxX: 172305.8,
    MinY: -28995.15926,
    // Norway
    MaxY: 808453.3338 // Norway

  }
}, {
  ESRI: 27393,
  EPSG: 27393,
  SOSI: 3,
  name: 'NGO1948, Gauss-K. Akse 3',
  viewable: false,
  key: 'NGO1948_GaussK_3',
  type: 'extended',
  bbox: {
    // NGO1948 Axis 1-4
    MinX: -368207.9294,
    MaxX: 172305.8,
    MinY: -28995.15926,
    // Norway
    MaxY: 808453.3338 // Norway

  }
}, {
  ESRI: 27394,
  EPSG: 27394,
  SOSI: 4,
  name: 'NGO1948, Gauss-K. Akse 4',
  viewable: false,
  key: 'NGO1948_GaussK_4',
  type: 'extended',
  bbox: {
    // NGO1948 Axis 1-4
    MinX: -368207.9294,
    MaxX: 172305.8,
    MinY: -28995.15926,
    // Norway
    MaxY: 808453.3338 // Norway

  }
}, {
  ESRI: 27395,
  EPSG: 27395,
  SOSI: 5,
  name: 'NGO1948, Gauss-K. Akse 5',
  viewable: false,
  key: 'NGO1948_GaussK_5',
  type: 'extended',
  bbox: {
    // NGO1948 Axis 5-8
    MinX: -312424.3471,
    MaxX: 410629.5171,
    MinY: 808453.3338,
    // Norway
    MaxY: 1507978.752 // Norway

  }
}, {
  ESRI: 27396,
  EPSG: 27396,
  SOSI: 6,
  name: 'NGO1948, Gauss-K. Akse 6',
  viewable: false,
  key: 'NGO1948_GaussK_6',
  type: 'extended',
  bbox: {
    // NGO1948 Axis 5-8
    MinX: -312424.3471,
    MaxX: 410629.5171,
    MinY: 808453.3338,
    // Norway
    MaxY: 1507978.752 // Norway

  }
}, {
  ESRI: 27397,
  EPSG: 27397,
  SOSI: 7,
  name: 'NGO1948, Gauss-K. Akse 7',
  viewable: false,
  key: 'NGO1948_GaussK_7',
  type: 'extended',
  bbox: {
    // NGO1948 Axis 5-8
    MinX: -312424.3471,
    MaxX: 410629.5171,
    MinY: 808453.3338,
    // Norway
    MaxY: 1507978.752 // Norway

  }
}, {
  ESRI: 27398,
  EPSG: 27398,
  SOSI: 8,
  name: 'NGO1948, Gauss-K. Akse 8',
  viewable: false,
  key: 'NGO1948_GaussK_8',
  type: 'extended',
  bbox: {
    // NGO1948 Axis 5-8
    MinX: -312424.3471,
    MaxX: 410629.5171,
    MinY: 808453.3338,
    // Norway
    MaxY: 1507978.752 // Norway

  }
}, {
  ESRI: null,
  EPSG: null,
  SOSI: 50,
  name: 'ED50 - Geografisk, grader',
  viewable: false,
  key: 'ED50',
  type: 'extended',
  bbox: {}
}, {
  ESRI: 23031,
  EPSG: 23031,
  SOSI: 31,
  name: 'ED50, UTM-sone 31',
  viewable: false,
  key: 'ED50_UTM_31',
  type: 'extended',
  bbox: {}
}, {
  ESRI: 23032,
  EPSG: 23032,
  SOSI: 32,
  name: 'ED50, UTM-sone 32',
  viewable: false,
  key: 'ED50_UTM_32',
  type: 'extended',
  bbox: {}
}, {
  ESRI: 23033,
  EPSG: 23033,
  SOSI: 33,
  name: 'ED50, UTM-sone 33',
  viewable: false,
  key: 'ED50_UTM_33',
  type: 'extended',
  bbox: {}
}, {
  ESRI: 23034,
  EPSG: 23034,
  SOSI: 34,
  name: 'ED50, UTM-sone 34',
  viewable: false,
  key: 'ED50_UTM_34',
  type: 'extended',
  bbox: {}
}, {
  ESRI: 23035,
  EPSG: 23035,
  SOSI: 35,
  name: 'ED50, UTM-sone 35',
  viewable: false,
  key: 'ED50_UTM_35',
  type: 'extended',
  bbox: {}
}, {
  ESRI: 23036,
  EPSG: 23036,
  SOSI: 36,
  name: 'ED50, UTM-sone 36',
  viewable: false,
  key: 'ED50_UTM_36',
  type: 'extended',
  bbox: {}
}
/*
        ,{
          Name: "Lokalt nett, Oslo",
          SOSI: 101,
          bbox: {
            MinX : -13231.52378,
            MaxX : 13557.59229,
            MinY : -11742.49708,
            MaxY : 25100.80578
          }
        }
*/
//{ESRI: null,EPSG: null,SOSI: null,name: 'what3words',viewable: false,forward: true,key: 'w3w',type: 'extended',bbox: {}}
//{'ESRI': null, 'EPSG': null, 'SOSI': null, 'name': 'Geohash', 'viewable': false, 'forward': true}
//{'ESRI': null, 'EPSG': null, 'SOSI': 53, 'name': 'Møre-A'},
//{'ESRI': null, 'EPSG': null, 'SOSI': 54, 'name': 'Møre-B'},
//{'ESRI': null, 'EPSG': null, 'SOSI': 84, 'name': 'EU89, Geografisk, sekunder'}
//{'ESRI': 4230, 'EPSG': 4230, 'SOSI': 4230, 'name': 'ED50 Geografisk, grader'},
//{'ESRI': 4231, 'EPSG': null, 'SOSI': 4231, 'name': 'ED87 Geografisk, grader'},
//{'ESRI': 4273, 'EPSG': 4273, 'SOSI': 4273, 'name': 'NGO1948 Geografisk, grader'},
//{'ESRI': null, 'EPSG': 4322, 'SOSI': 4322, 'name': 'WGS72 Geografisk, grader'},
//{'ESRI': 4326, 'EPSG': 4326, 'SOSI': 4326, 'name': 'EU89/WGS84 Geografisk, grader'}
];

var getSOSIfromEPSG = function getSOSIfromEPSG(epsg) {
  return sosiCodes.filter(function (el) {
    return el.EPSG === epsg;
  }).map(function (obj) {
    return obj.SOSI;
  })[0];
};

exports.getSOSIfromEPSG = getSOSIfromEPSG;

var getCoordinateSystems = function getCoordinateSystems(type) {
  var result = {};
  sosiCodes.filter(function (el) {
    return el.type === type;
  }).filter(Boolean).map(function (obj) {
    var rObj = {};
    rObj[obj.SOSI] = obj.key;
    return rObj;
  }).forEach(function (element) {
    for (var i in element) {
      result[i] = element[i];
    }
  });
  return result;
};

exports.getCoordinateSystems = getCoordinateSystems;

var isOutOfBounds = function isOutOfBounds(coordinates) {
  return sosiCodes.filter(function (el) {
    return coordinates.north.value < el.bbox.MinX || coordinates.north.value > el.bbox.MaxX || coordinates.east.value < el.bbox.MinY || coordinates.east.value > el.bbox.MaxY;
  }).map(function (obj) {
    return obj;
  });
};

exports.isOutOfBounds = isOutOfBounds;

var isNotOutOfBounds = function isNotOutOfBounds(coordinates) {
  return sosiCodes.filter(function (el) {
    return coordinates.north.value > el.bbox.MinX && coordinates.north.value < el.bbox.MaxX && coordinates.east.value > el.bbox.MinY && coordinates.east.value < el.bbox.MaxY;
  }).map(function (obj) {
    return obj;
  });
};

exports.isNotOutOfBounds = isNotOutOfBounds;

var generateUrlPrintCapabilities = function generateUrlPrintCapabilities(appId) {
  return urlGeonorge + "print/" + appId + "/capabilities.json";
};

exports.generateUrlPrintCapabilities = generateUrlPrintCapabilities;

var generatePrintUrl = function generatePrintUrl(appId) {
  return urlGeonorge + "print/" + appId + "/report.pdf";
};

exports.generatePrintUrl = generatePrintUrl;

var generatePrintDownloadUrl = function generatePrintDownloadUrl(downloadUrl) {
  return urlGeonorge.slice(0, -1) + downloadUrl;
};

exports.generatePrintDownloadUrl = generatePrintDownloadUrl;

var generateStatusPrintDownloadUrl = function generateStatusPrintDownloadUrl(statusUrl) {
  return urlGeonorge.slice(0, -1) + statusUrl;
};

exports.generateStatusPrintDownloadUrl = generateStatusPrintDownloadUrl;

var generateCancelPrintUrl = function generateCancelPrintUrl(refNum) {
  return urlGeonorge + 'print/cancel/' + refNum;
};

exports.generateCancelPrintUrl = generateCancelPrintUrl;