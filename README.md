# GeoJSON PolyLine

Convert GeoJSON coordinates to and from encoded polylines. Supports [encoding](#encodegeojson-options) or [decoding](#decodepolygeo-options) geometries/coordinates for all 9 standard GeoJSON types. Use it in [Node.js](#install) (optionally as a [transform stream](#stream-api)), in the [browser](#browser-usage), as a [Web Worker](#web-worker), or from the [command line](#command-line-interface-cli). 


## Install

```sh
npm install geojson-polyline
```

## Usage


### encode(geoJSON[, options])

Convert a GeoJSON object's coordinates to encoded polylines.

- `geoJSON` : A GeoJSON object (required).
- `options` : An optional Object with the following possible properties:
  - `precision`: A Number specifying the number of digits to keep for lat/lon. Default is `5`.

_Aliases: `polyline`, `polyLine`, `toEncoded`, `fromGeoJSON`, `toPolyline`._ 

#### Example

```js
const encode = require('geojson-polyline').encode
const polygon = {
  type: 'Polygon',
  coordinates: [
    [[-81.63829, 41.48093], [-81.63628, 41.47993], [-81.63625, 41.47931], [-81.63829, 41.48033], [-81.63829, 41.48093]]
  ]
}
const encoded = encode(polygon)
// => { type: 'Polygon', coordinates: ['yvd|Fh~gqNfEqKzBEkEvKwB?'] }
``` 


### decode(polyGeo[, options])

Convert a polyline-encoded GeoJSON to standard GeoJSON coordinate arrays.

- `polyGeo` : A GeoJSON object whose coordinates are expressed as polylines (required).
- `options` : An optional Object with the following possible properties:
  - `precision`: A Number specifying the precision that the polyline was encoded with. Default is `5`.

_Aliases: `decode`, `geojson`, `geoJson`, `geoJSON`, `fromEncoded`, `toGeoJSON` `fromPolyline`._

#### Example

```js
const decode = require('geojson-polyline').decode
const polygon = {
  type: 'Polygon',
  coordinates: ['yvd|Fh~gqNfEqKzBEkEvKwB?']
}
const geoJSON = decode(polygon)
// => { type: 'Polygon', coordinates: [[[-81.63829, 41.48093], [-81.63628, 41.47993], [-81.63625, 41.47931], [-81.63829, 41.48033], [-81.63829, 41.48093]]]}
```


## Stream API

Use the streaming API if you have streams instead of objects. Outputs newline-separated JSON.

### Usage

```js
var encode = require('geojson-polyline/stream').encode
// var decode = require('geojson-polyline/stream').decode

fs.createReadStream('./tl_2016_33_place.geojson')
  .pipe(encode({precision: 4}))
  .pipe(process.stdout)
```


## Browser Usage

Standalone builds are available in [`/dist`](./dist) for in-browser usage, which are ES3 compatible.

```html
<script src="dist/geojson-polyline.min.js"></script>
<script>
  var decoded = encoded.map(GeoJSONPolyline.decode);
</script>
```


### Web Worker

If you want to decode polylines using [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), that is supported out of the box:

```js
var worker = new Worker('dist/geojson-polyline.min.js')
var decoded = []
encoded.forEach(function(encoded){
  worker.postMessage(['decode', encoded])
})
worker.onmessage = function(event) {
  decoded.push(event.data)
  if(decoded.length === encoded.length) {
    // Done!
  }
}
```

> Currently, decoding and encoding is faster in the browser without using Web Workers.


## Command Line Interface (CLI)

Convert GeoJSON objects, features, and feature collections from the command line. Works great for `.geojson` files from [ogr2ogr](http://www.gdal.org/ogr2ogr.html) or [shp2json](https://www.npmjs.com/package/shp2json).


### Install

```sh
npm install --global geojson-polyline
```


### Usage

```
Usage:
  geojson-polyline <command> (read from stdin)
  geojson-polyline <command> -f <file> [<file2>] [...]
  geojson-polyline <command> <input>

Convert the coordinates of a GeoJSON object to and from encoded polylines. 

In all cases, input should be a valid JSON object or newline-separated JSON. 

Command is one of:
  encode
  decode
  geojson
  geoJson
  geoJSON
  polyline
  polyLine
  toEncoded
  fromEncoded
  toGeoJSON
  fromGeoJSON
  toPolyline
  fromPolyline
```


### Example

```sh
geojson-polyline encode -f tabblock2010_56_pophu.geojson | mongoimport -c tabblock2010
 ``` 


## Additional Information

[Google's encoded polyline algorithm][Polyline Format] provides for very efficient encoding and storage of coordinate data. The [`@mapbox/polyline` library from MapBox][MapBox Polyline] provides an implementation to encode/decode polylines, but only supports GeoJSON "LineString" features, not "Polygons" or "MultiLineStrings".

[MapBox Polyline]: https://github.com/mapbox/polyline#readme
[Polyline Format]: https://developers.google.com/maps/documentation/utilities/polylinealgorithm

## License

ISC
