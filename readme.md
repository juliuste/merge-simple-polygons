# merge-simple-polygons

Merge two (adjacent) simple polygons into another simple polygon.

[![npm version](https://img.shields.io/npm/v/merge-simple-polygons.svg)](https://www.npmjs.com/package/merge-simple-polygons)
[![Build Status](https://travis-ci.org/juliuste/merge-simple-polygons.svg?branch=master)](https://travis-ci.org/juliuste/merge-simple-polygons)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/merge-simple-polygons.svg)](https://greenkeeper.io/)
[![dependency status](https://img.shields.io/david/juliuste/merge-simple-polygons.svg)](https://david-dm.org/juliuste/merge-simple-polygons)
[![license](https://img.shields.io/github/license/juliuste/merge-simple-polygons.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install merge-simple-polygons
```

## Usage

Takes two arrays of vertex IDs, each spanning a planar polygon and returns:

- `false` if the given polygons share no vertices
- `null` if there would be more than one resulting simple polygon (if the two given polygons share either exactly one vertex, which would result in two polygons *or* multiple egdes that are not connected, which would result in a polygon with a "hole")
- a list of vertex IDs forming the merged polygon, otherwise

```js
const mergePolygons = require('merge-simple-polygons')

const polygonA = ['a', 'b', 'c', 'd', 'e']
const polygonB = ['e', 'a', 'g', 'h', 'i', 'd']
const polygonC = mergePolygons(polygonA, polygonB)
console.log(polygonC) // ['a', 'b', 'c', 'd', 'i', 'h', 'g']

const polygonD = ['a', 'b', 'c']
const polygonE = ['d', 'e', 'f']
console.log(mergePolygons(polygonD, polygonE)) // false

const polygonF = ['a', 'b', 'c', 'd', 'e']
const polygonG = ['a', 'b', 'f', 'e', 'd', 'g']
console.log(mergePolygons(polygonF, polygonG)) // null


```

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/merge-simple-polygons/issues).
