# merge-simple-polygons

Merge two (adjacent) simple polygons into another simple polygon.

[![npm version](https://img.shields.io/npm/v/merge-simple-polygons.svg)](https://www.npmjs.com/package/merge-simple-polygons)
[![License](https://img.shields.io/github/license/juliuste/merge-simple-polygons.svg?style=flat)](license)
[![Contact me](https://img.shields.io/badge/contact-email-turquoise)](mailto:mail@juliustens.eu)

## Installation

```shell
npm install merge-simple-polygons
```

## Usage

**This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).**

The module's default export is a function that takes two arrays of vertex names, each spanning a planar polygon and returns:

- `false` if the given polygons share no vertices
- `null` if there would be more than one resulting simple polygon (if the two given polygons share either exactly one vertex, which would result in two polygons *or* multiple egdes that are not connected, which would result in a polygon with a "hole")
- a list of vertex IDs forming the merged polygon

```js
import mergePolygons from 'merge-simple-polygons'

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

If you found a bug or want to propose a feature, feel free to visit [the issues page](https://github.com/juliuste/merge-simple-polygons/issues).
