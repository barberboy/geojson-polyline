#! /usr/bin/env node
const fs = require('fs')
const geo2poly = require('../geojson-polyline')

const command = process.argv[2]

if (!(command in geo2poly)) {
  console.log(`
Usage:
  geojson-polyline <command> (read from stdin)
  geojson-polyline <command> -f <file> [<file2>[, ...]]
  geojson-polyline <command> <input>

Convert the coordinates of a GeoJSON object to and from encoded polylines. 

In all cases, input should be a valid JSON object.

Command is one of:\n  ${Object.keys(geo2poly).join('\n  ')}
`)
} else {
  run()
}

function run () {
  switch (process.argv[3]) {
    // Read from stdin if no arguments
    case undefined:
      processStream(process.stdin)
      break
    // `geojson-polyline -f <filename>`
    case '-f':
      process.argv.slice(4).forEach(file => {
        processStream(fs.createReadStream(file))
      })
      break
    // `geojson-polyline decode '{"type":"Polygon","coordinates":["yvd|Fh~gqNfEqKzBEkEvKwB?"]}'
    default:
      exec(command, JSON.parse(process.argv[3]))
  }
}
function exec (command, geojson) {
  console.log(JSON.stringify(geo2poly[command](geojson)))
}

function processStream (stream) {
  let text = ''

  // Read the stream when it's ready
  stream.on('readable', () => {
    const chunk = stream.read()
    if (chunk !== null) {
      text += chunk
    }
  })

  stream.on('end', () => {
    exec(command, JSON.parse(text))
  })
}
