/** @fileoverview HeapTest.js */

import test from 'tape'
import Heap from '../src/Heap.js'

test('Heap: basics', (t) => {
  t.doesNotThrow(() => new Heap(), 'Heap is class/constructor')

  let heap = new Heap()
  t.deepEqual(heap._arr, [null], 'internal array initialized')
  t.equal(heap.size, 0, 'initial size is 0')

  const comparer = () => {}
  heap.comparer = comparer
  t.equal(heap._comparer, comparer, 'new comparer set')

  t.throws(() => { heap.comparer = 'non-function' }, 'comparer setter throws if function is not given')
  t.throws(() => { heap._less(-2, 7) }, '_less throws with invalid indexes (just to fix coverage)')

  t.end()
})

test('Heap: push() - default comparer', (t) => {
  let heap = new Heap()
  heap.push(1)
  t.equal(heap.size, 1, 'size set to 1')
  t.deepEqual(heap._arr, [null, 1], '_arr updated [x, 1]')

  heap.push(2)
  t.equal(heap.size, 2, 'size set to 2')
  t.deepEqual(heap._arr, [null, 2, 1], '_arr updated [x, 2, 1]')

  heap.push(3)
  t.equal(heap.size, 3, 'size set to 3')
  t.deepEqual(heap._arr, [null, 3, 1, 2], '_arr updated [x, 3, 1, 2]')

  heap.push(2)
  t.equal(heap.size, 4, 'size set to 4')
  t.deepEqual(heap._arr, [null, 3, 2, 2, 1], '_arr updated [x, 3, 2, 2, 1]')

  heap.push(-2)
  t.equal(heap.size, 5, 'size set to 5')
  t.deepEqual(heap._arr, [null, 3, 2, 2, 1, -2], '_arr updated [x, 3, 2, 2, 1, -2]')

  heap.push(2.5)
  t.equal(heap.size, 6, 'size set to 6')
  t.deepEqual(heap._arr, [null, 3, 2, 2.5, 1, -2, 2], '_arr updated [x, 3, 2, 2.5, 1, -2, 2]')

  heap.push(4)
  t.equal(heap.size, 7, 'size set to 7')
  t.deepEqual(heap._arr, [null, 4, 2, 3, 1, -2, 2, 2.5], '_arr updated [x, 4, 2, 3, 1, -2, 2, 2.5]')

  t.end()
})

test('Heap: pop() - default comparer', (t) => {
  let heap = new Heap()
  heap.push(1)
  heap.push(2)
  heap.push(3)
  heap.push(2)
  heap.push(-2)
  heap.push(2.5)
  heap.push(4)

  t.equal(heap.pop(), 4, 'popped max (4)')
  t.equal(heap.size, 6, 'size reduced to 6')
  t.equal(heap.pop(), 3, 'popped max (3)')
  t.equal(heap.size, 5, 'size reduced to 5')
  t.equal(heap.pop(), 2.5, 'popped max (2.5)')
  t.equal(heap.size, 4, 'size reduced to 4')
  t.equal(heap.pop(), 2, 'popped max (2)')
  t.equal(heap.size, 3, 'size reduced to 3')
  t.equal(heap.pop(), 2, 'popped max (2)')
  t.equal(heap.size, 2, 'size reduced to 2')
  t.equal(heap.pop(), 1, 'popped max (1)')
  t.equal(heap.size, 1, 'size reduced to 1')
  t.equal(heap.pop(), -2, 'popped max (-2)')
  t.equal(heap.size, 0, 'size reduced to 0')

  t.equal(heap.pop(), undefined, 'popped from empty queue - should return undefined')
  t.equal(heap.size, 0, 'size remained 0')

  t.end()
})

test('Heap: custom comparer', (t) => {
  class Product {
    constructor (price) {
      this.name = 'product name'
      this.id = 1000 * Math.random()
      this.price = price
    }
  }

  let heap = new Heap()
  heap.comparer = (a, b) => b.price - a.price

  let p1 = new Product(5)
  let p2 = new Product(3)
  let p3 = new Product(4)
  let p4 = new Product(2)

  heap.push(p1)
  heap.push(p2)
  heap.push(p3)
  heap.push(p4)

  t.equal(heap.size, 4, 'size is 4')

  t.deepEqual(heap.pop(), p4, 'popped min (p4)')
  t.equal(heap.size, 3, 'size reduced to 3')

  t.deepEqual(heap.pop(), p2, 'popped min (p2)')
  t.equal(heap.size, 2, 'size reduced to 2')

  t.deepEqual(heap.pop(), p3, 'popped min (p3)')
  t.equal(heap.size, 1, 'size reduced to 1')

  t.deepEqual(heap.pop(), p1, 'popped min (p1)')
  t.equal(heap.size, 0, 'size reduced to 0')

  t.equal(heap.pop(), undefined, 'popped from empty queue - should return undefined')
  t.equal(heap.size, 0, 'size remained 0')

  t.end()
})

// EOF
