const jsonStream = require('JSONStream')
var es = require('event-stream')
var g2p = require('./geojson-polyline')

module.exports = Object
  .keys(g2p)
  .reduce(function (api, command) {
    api[command] = function geoJSONPolylineStream (options) {
      return es.pipeline(
        jsonStream.parse(),
        es.mapSync(function (data) {
          return JSON.stringify(g2p[command](data, options)) + '\n'
        })
      )
    }
    return api
  }, {})
