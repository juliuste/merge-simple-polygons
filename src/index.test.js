import test from 'ava'
import merge from './index.js'

test('merge-simple-polygons', async t => {
	const first = ['a', 'b', 'c', 'd', 'e', 'f']

	const second = ['b', 'g', 'z', 'd', 'c']
	t.deepEqual(merge(first, second), ['d', 'e', 'f', 'a', 'b', 'g', 'z'])
	t.is(merge(first, second).length, merge(second, first).length)

	const third = ['c', 'd', 'g', 'h', 'b']
	t.deepEqual(merge(third, first), ['d', 'e', 'f', 'a', 'b', 'h', 'g'])
	t.is(merge(third, first).length, merge(first, third).length)

	const fourth = ['a', 'b', 'c']

	const fifth = ['a', 'c', 'd', 'e']
	t.deepEqual(merge(fourth, fifth), ['c', 'd', 'e', 'a', 'b'])
	t.is(merge(fourth, fifth).length, merge(fifth, fourth).length)

	const sixth = ['a', 'c', 'f']
	t.deepEqual(merge(fourth, sixth), ['c', 'b', 'a', 'f'])
	t.is(merge(fourth, sixth).length, merge(sixth, fourth).length)

	const seventh = ['a', 'f', 'h']
	t.is(merge(fourth, seventh), null)

	const eigth = ['x', 'y', 'z']
	t.is(merge(eigth, fourth), false)

	const ninth = ['a', 'b', 'g', 'd', 'e', 'h', 'i']
	t.is(merge(first, ninth), null)

	const tenth = ['a', 'b', 'c', 'd', 'e']
	const eleventh = ['e', 'a', 'g', 'h', 'i', 'd']
	t.deepEqual(merge(tenth, eleventh), ['a', 'g', 'h', 'i', 'd', 'c', 'b'])
	t.is(merge(tenth, eleventh).length, merge(eleventh, tenth).length)

	const twelveth = ['a', 'b', 'c']
	const thirteenth = ['d', 'e', 'f']
	t.is(merge(twelveth, thirteenth), false)

	const fourteenth = ['a', 'b', 'c', 'd', 'e']
	const fifteenth = ['a', 'b', 'f', 'e', 'd', 'g']
	t.is(merge(fourteenth, fifteenth), null)

	const sixteenth = [1, 2, 3, 4, 5, 6]
	const seventeenth = [3, 1, 2]
	t.deepEqual(merge(sixteenth, seventeenth), [3, 4, 5, 6, 1])
	t.deepEqual(merge(sixteenth, seventeenth), merge(seventeenth, sixteenth))
})
