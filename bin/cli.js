#! /usr/bin/env node
const fs = require('fs')
const fromString = require('from2-string')

const geo2poly = require('../stream')

const command = process.argv[2]

if (!(command in geo2poly)) {
  console.log(`
Usage:
  geojson-polyline <command> (read from stdin)
  geojson-polyline <command> -f <file> [<file2>] [...]
  geojson-polyline <command> <input>

Convert the coordinates of a GeoJSON object to and from encoded polylines. 

In all cases, input should be a valid JSON object or newline-separated JSON. 

Command is one of:\n  ${Object.keys(geo2poly).join('\n  ')}
`)
} else {
  run()
}

function run () {
  switch (process.argv[3]) {
    case undefined: {
      return processStream(process.stdin)
    }
    case '-f': {
      return process.argv.slice(4).forEach(file => {
        processStream(fs.createReadStream(file))
      })
    }
    default: {
      return processStream(fromString(process.argv[3]))
    }
  }
}

function processStream (stream) {
  stream
    .pipe(geo2poly[command]())
    .pipe(process.stdout)
}
