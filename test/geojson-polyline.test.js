/* eslint-env mocha */
const assert = require('assert')
const geoPolylines = require('./fixtures/geoPolylines')
const geoJSON = require('./fixtures/geoJSON')
const GeoJSONPolyline = require('../geojson-polyline')

describe('geojson-polyline', () => {
  describe('#fromGeoJSON', () => {
    it('should be a function', () => {
      assert.equal(typeof GeoJSONPolyline.fromGeoJSON, 'function')
    })

    // Test each supported GeoJSON type
    Object.keys(geoJSON).forEach(type => {
      it(`supports type="${type}"`, () => {
        assert.deepEqual(GeoJSONPolyline.fromGeoJSON(geoJSON[type]), geoPolylines[type])
      })
    })

    it('returns the original GeoJSON object for unsupported types', () => {
      const unsupportedType = {
        type: 'Vector',
        coordinates: [[-81.63829, 41.48093], [-81.63628, 41.47993]]
      }
      assert.equal(GeoJSONPolyline.fromGeoJSON(unsupportedType), unsupportedType)
    })
  })

  describe('#toGeoJSON', () => {
    it('should be a function', () => {
      assert.equal(typeof GeoJSONPolyline.toGeoJSON, 'function')
    })

    // Test each supported GeoJSON type
    Object.keys(geoJSON).forEach(type => {
      it(`supports type="${type}"`, () => {
        assert.deepEqual(GeoJSONPolyline.toGeoJSON(geoPolylines[type]), geoJSON[type])
      })
    })
    it('returns the original GeoJSON object for unsupported types', () => {
      const unsupportedType = {
        type: 'Vector',
        coordinates: [[-81.63829, 41.48093], [-81.63628, 41.47993]]
      }
      assert.equal(GeoJSONPolyline.fromGeoJSON(unsupportedType), unsupportedType)
    })
  })
})
