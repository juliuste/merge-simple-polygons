import intersection from 'lodash/intersection.js'
import uniq from 'lodash/uniq.js'
import range from 'lodash/range.js'
import equal from 'lodash/isEqual.js'

const throwIfNotSimplePolygon = (polygon) => {
	if (polygon.length < 3) throw new Error('input must be polygon: cannot have less than 3 vertices')
	if (uniq(polygon).length !== polygon.length) throw new Error('polygons must be simple: cannot contain the same vertex more than once')
}

// make  -2 mod 8 = 6
const mod = (x, d) => (x + (d * 2)) % d

// checks if all entries are adjacent in array
const areAdjacentEntries = (entries, array) => {
	for (let e = 0; e < entries.length; e++) {
		const orderedEntries = range(e, e + entries.length).map(n => mod(n, entries.length)).map(i => entries[i])
		for (let i = 0; i < array.length; i++) {
			if (array[i] === entries[e]) {
				const indicesAscending = range(i, i + entries.length).map(n => mod(n, array.length))
				if (equal(indicesAscending.map(index => array[index]), orderedEntries)) return { direction: 1, orderedEntries }

				const indicesDescending = range(i, i - entries.length, -1).map(n => mod(n, array.length))
				if (equal(indicesDescending.map(index => array[index]), orderedEntries)) return { direction: -1, orderedEntries }

				break
			}
		}
	}
	return false
}

export default (a, b) => {
	throwIfNotSimplePolygon(a)
	throwIfNotSimplePolygon(b)

	// swap order if shorter polygon comes first (important for shared point ordering, which is taken from A)
	if (a.length < b.length) {
		const c = b
		b = a
		a = c
	}

	// shared points in order of appearance in the first polygon
	const sharedPoints = intersection(a, b)
	if (sharedPoints.length === 0) return false
	if (sharedPoints.length === 1) return null
	if (sharedPoints.length === a.length && a.length === b.length) throw new Error('polygons must have non-shared vertices')

	const adjacentA = areAdjacentEntries(sharedPoints, a)
	if (!adjacentA) return null

	const directionA = adjacentA.direction
	const orderedPoints = adjacentA.orderedEntries

	const adjacentB = areAdjacentEntries(sharedPoints, b)
	if (!adjacentB) return null
	const directionB = adjacentB.direction

	const mergedPolygon = []

	for (let i = a.indexOf(orderedPoints[orderedPoints.length - 1]); i !== a.indexOf(orderedPoints[0]); i = mod(i + directionA, a.length)) mergedPolygon.push(a[i])
	for (let i = b.indexOf(orderedPoints[0]); i !== b.indexOf(orderedPoints[orderedPoints.length - 1]); i = mod(i - directionB, b.length)) mergedPolygon.push(b[i])

	return mergedPolygon
}
