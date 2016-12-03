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

  t.end()
})

test('Heap: comparer setter', (t) => {
  let heap = new Heap()

  t.end();
});

// EOF
