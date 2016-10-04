var types = module.exports = {}

types['Point'] = {
  'type': 'Point',
  'coordinates': [-81.63829, 41.48093]
}

types['MultiPoint'] = {
  'type': 'MultiPoint',
  'coordinates': [[-81.63829, 41.48093], [-83.92870, 45.96700]]
}

types['LineString'] = {
  'type': 'LineString',
  'coordinates': [[-81.63829, 41.48093], [-81.63628, 41.47993], [-81.63625, 41.47931], [-81.63829, 41.48033]]
}

types['MultiLineString'] = {
  'type': 'MultiLineString',
  'coordinates': [
    [[100, 0], [101, 1]],
    [[102, 2], [103, 3]]
  ]
}

types['Polygon'] = {
  'type': 'Polygon',
  'coordinates': [
    [[-81.63829, 41.48093], [-81.63628, 41.47993], [-81.63625, 41.47931], [-81.63829, 41.48033], [-81.63829, 41.48093]]
  ]
}

types['Polygon (no holes)'] = {
  'type': 'Polygon',
  'coordinates': [
    [[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]
  ]
}

types['Polygon (holes)'] = {
  'type': 'Polygon',
  'coordinates': [
    [[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]],
    [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]
  ]
}

types['MultiPolygon'] = {
  'type': 'MultiPolygon',
  'coordinates': [
    [
      [[102, 2], [103, 2], [103, 3], [102, 3], [102, 2]]
    ],
    [
      [[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]],
      [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]
    ]
  ]
}

types['Feature'] = {
  'type': 'Feature',
  'properties': {},
  'geometry': types['Polygon']
}

types['FeatureCollection'] = {
  'type': 'FeatureCollection',
  'features': [
    { 'type': 'Feature',
      'geometry': types['LineString'],
      'properties': {}
    },
    { 'type': 'Feature',
      'geometry': types['Polygon (holes)'],
      'properties': {}
    },
    { 'type': 'Feature',
      'geometry': types['MultiPolygon'],
      'properties': {}
    }
  ]
}

types['GeometryCollection'] = {
  'type': 'GeometryCollection',
  'geometries': [
    types['MultiPoint'],
    types['MultiLineString'],
    types['Polygon (no holes)']
  ]
}
