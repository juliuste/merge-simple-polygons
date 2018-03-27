'use strict'

const tape = require('tape')
const merge = require('./index')
const equal = require('lodash.isequal')

tape('merge-simple-polygons', (t) => {
	const first = ['a', 'b', 'c', 'd', 'e', 'f']

	const second = ['b', 'g', 'z', 'd', 'c']
	t.ok(equal(merge(first, second), ['d', 'e', 'f', 'a', 'b', 'g', 'z']), 'first x second')

	const third = ['c', 'd', 'g', 'h', 'b']
	t.ok(equal(merge(third, first), ['d', 'g', 'h', 'b', 'a', 'f', 'e']), 'third x first')

	const fourth = ['a', 'b', 'c']

	const fifth = ['a', 'c', 'd', 'e']
	t.ok(equal(merge(fourth, fifth), ['c', 'b', 'a', 'e', 'd']), 'fourth x fifth')

	const sixth = ['a', 'c', 'f']
	t.ok(equal(merge(fourth, sixth), ['c', 'b', 'a', 'f']), 'fourth x sixth')

	const seventh = ['a', 'f', 'h']
	t.ok(merge(fourth, seventh) === null, 'fourth x seventh')

	const eigth = ['x', 'y', 'z']
	t.ok(merge(eigth, fourth) === false, 'eigth x fourth')

	const ninth = ['a', 'b', 'g', 'd', 'e', 'h', 'i']
	t.ok(merge(first, ninth) === null, 'ninth x first')

	const tenth = ['a', 'b', 'c', 'd', 'e']
	const eleventh = ['e', 'a', 'g', 'h', 'i', 'd']
	t.ok(equal(merge(tenth, eleventh), ['a', 'b', 'c', 'd', 'i', 'h', 'g']), 'tenth x eleventh')

	const twelveth = ['a', 'b', 'c']
	const thirteenth = ['d', 'e', 'f']
	t.ok(merge(twelveth, thirteenth) === false, 'twelveth x thirteenth')

	const fourteenth = ['a', 'b', 'c', 'd', 'e']
	const fifteenth = ['a', 'b', 'f', 'e', 'd', 'g']
	t.ok(merge(fourteenth, fifteenth) === null, 'fourteenth x fifteenth')

	t.end()
})