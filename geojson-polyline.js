var assign = require('object-assign')
var polyline = require('@mapbox/polyline')

var GeoJSONPolyline = module.exports = {
  // Pick and choose your verbs
  encode: geo2poly,
  decode: poly2geo,
  //
  geojson: poly2geo,
  geoJson: poly2geo,
  geoJSON: poly2geo,
  //
  polyline: geo2poly,
  polyLine: geo2poly,
  //
  toEncoded: geo2poly,
  fromEncoded: poly2geo,
  //
  toGeoJSON: poly2geo,
  fromGeoJSON: geo2poly,
  //
  toPolyline: geo2poly,
  fromPolyline: poly2geo
}

/**
 * Encodes a GeoJSON geometry as a polyline.
 *
 * @param {Object} geojson
 * @param {Object} options
 * @returns {Object} encoded geojson
 */
function geo2poly (geojson, options) {
  var precision = typeof (options) === 'object' && options.precision

  switch (geojson.type) {
    // Coordinate arrays
    case 'Point': {
      return assign({}, geojson, {
        coordinates: encode([geojson.coordinates], precision)
      })
    }
    case 'MultiPoint':
    case 'LineString': {
      return assign({}, geojson, {
        coordinates: encode(geojson.coordinates, precision)
      })
    }
    // Arrays of coordinates
    case 'MultiLineString':
    case 'Polygon': {
      return assign({}, geojson, {
        coordinates: geojson.coordinates.map(function (coords) {
          return encode(coords, precision)
        })
      })
    }
    case 'Feature': {
      return assign({}, geojson, {
        geometry: geo2poly(geojson.geometry, precision)
      })
    }
    case 'FeatureCollection': {
      return assign({}, geojson, {
        features: geojson.features.map(function (feature) {
          return geo2poly(feature, precision)
        })
      })
    }
    case 'GeometryCollection': {
      return assign({}, geojson, {
        geometries: geojson.geometries.map(function (geo) {
          return geo2poly(geo, precision)
        })
      })
    }
    case 'MultiPolygon': {
      return assign({}, geojson, {
        coordinates: geojson.coordinates.map(function (polygons) {
          return polygons.map(function (coords) {
            return encode(coords, precision)
          })
        })
      })
    }
    // Return the original object for unsupported types
    default:
      return geojson
  }
}

/**
 * Decode a polyline-encoded GeoJSON geometry.
 *
 * @param {Object} geojson
 * @param {Object} options
 * @returns {Object} decoded geojson
 */
function poly2geo (geojson, options) {
  var precision = typeof (options) === 'object' && options.precision

  switch (geojson.type) {
    // Translate a single-element array back to a single coordinate array
    case 'Point': {
      return assign({}, geojson, {
        coordinates: decode(geojson.coordinates, precision)[0]
      })
    }
    // Decode into a coordinate array
    case 'MultiPoint':
    case 'LineString': {
      return assign({}, geojson, {
        coordinates: decode(geojson.coordinates, precision)
      })
    }
    // Arrays of coordinate arrays
    case 'MultiLineString':
    case 'Polygon': {
      return assign({}, geojson, {
        coordinates: geojson.coordinates.map(function (coords) {
          return decode(coords, precision)
        })
      })
    }
    // Arrays of polygons
    case 'MultiPolygon': {
      return assign({}, geojson, {
        coordinates: geojson.coordinates.map(function (polygons) {
          return polygons.map(function (coords) {
            return decode(coords, precision)
          })
        })
      })
    }
    // GeoJSON object is
    case 'Feature': {
      return assign({}, geojson, {
        geometry: poly2geo(geojson.geometry, precision)
      })
    }
    case 'FeatureCollection': {
      return assign({}, geojson, {
        features: geojson.features.map(function (feature) {
          return poly2geo(feature, precision)
        })
      })
    }
    case 'GeometryCollection': {
      return assign({}, geojson, {
        geometries: geojson.geometries.map(function (geometry) {
          return poly2geo(geometry, precision)
        })
      })
    }
    // Return the original object for unsupported types
    default:
      return geojson
  }
}

function encode (coordinates, precision) {
  return polyline.encode(flip(coordinates), precision)
}
function decode (str, precision) {
  return flip(polyline.decode(str, precision))
}
function flip (coords) {
  var flipped = []
  for (var i = 0; i < coords.length; i++) {
    flipped.push(coords[i].slice().reverse())
  }
  return flipped
}

if (typeof addEventListener !== 'undefined') {
  /* global addEventListener, postMessage */
  addEventListener('message', function (message) {
    var method = message.data[0]
    if (method in GeoJSONPolyline) {
      var geojson = message.data[1]
      var precision = message.data[2]
      var converted = GeoJSONPolyline[method](geojson, precision)
      postMessage(converted)
    }
  })
}
