var types = module.exports = {}

types['Point'] = {
  type: 'Point',
  coordinates: 'yvd|Fh~gqN'
}

types['MultiPoint'] = {
  type: 'MultiPoint',
  coordinates: 'yvd|Fh~gqN}dkZ`j~L'
}

types['LineString'] = {
  type: 'LineString',
  coordinates: 'yvd|Fh~gqNfEqKzBEkEvK'
}

types['MultiLineString'] = {
  type: 'MultiLineString',
  coordinates: [
    '?_gjaR_ibE_ibE',
    '_seK_{pmR_ibE_ibE'
  ]
}

types['Polygon'] = {
  type: 'Polygon',
  coordinates: [ 'yvd|Fh~gqNfEqKzBEkEvKwB?' ]
}

types['Polygon (no holes)'] = {
  type: 'Polygon',
  coordinates: [ '?_gjaR?_ibE_ibE??~hbE~hbE?' ]
}

types['Polygon (holes)'] = {
  type: 'Polygon',
  coordinates: [
    '?_gjaR?_ibE_ibE??~hbE~hbE?',
    '_af@_iqbR?_etB_etB??~dtB~dtB?'
  ]
}

types['MultiPolygon'] = {
  type: 'MultiPolygon',
  coordinates: [
    [
      '_seK_{pmR?_ibE_ibE??~hbE~hbE?'
    ],
    [
      '?_gjaR?_ibE_ibE??~hbE~hbE?',
      '_af@_iqbR?_etB_etB??~dtB~dtB?'
    ]
  ]
}

types['Feature'] = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [ 'yvd|Fh~gqNfEqKzBEkEvKwB?' ]
  }
}

types['FeatureCollection'] = {
  'type': 'FeatureCollection',
  'features': [{
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'LineString',
      'coordinates': 'yvd|Fh~gqNfEqKzBEkEvK'
    }
  }, {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        '?_gjaR?_ibE_ibE??~hbE~hbE?',
        '_af@_iqbR?_etB_etB??~dtB~dtB?'
      ]
    }
  }, {
    'type': 'Feature',
    'properties': {},
    'geometry': {
      'type': 'MultiPolygon',
      'coordinates': [
        [
          '_seK_{pmR?_ibE_ibE??~hbE~hbE?'
        ],
        [
          '?_gjaR?_ibE_ibE??~hbE~hbE?',
          '_af@_iqbR?_etB_etB??~dtB~dtB?'
        ]
      ]
    }
  }
  ]
}

types['GeometryCollection'] = {
  'type': 'GeometryCollection',
  'geometries': [
    {'type': 'MultiPoint',
      'coordinates': 'yvd|Fh~gqN}dkZ`j~L'
    },
    {'type': 'MultiLineString',
      'coordinates': ['?_gjaR_ibE_ibE', '_seK_{pmR_ibE_ibE']
    },
    {'type': 'Polygon',
      'coordinates': ['?_gjaR?_ibE_ibE??~hbE~hbE?']
    }
  ]
}
