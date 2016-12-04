/**
 * https://en.wikipedia.org/wiki/Heap_(data_structure)
 *
 * In computer science, a heap is a specialized tree-based data structure that
 * satisfies the heap property: If A is a parent node of B then the key (the value)
 * of node A is ordered with respect to the key of node B with the same ordering
 * applying across the heap. A heap can be classified further as either a "max heap"
 * or a "min heap". In a max heap, the keys of parent nodes are always greater
 * than or equal to those of the children and the highest key is in the root node.
 * In a min heap, the keys of parent nodes are less than or equal to those of the
 * children and the lowest key is in the root node.
 *
 * @example
 * let heap = new Heap()
 *
 * heap.push(1)
 * heap.push(9)
 * heap.push(6)
 *
 * heap.pop() // 9
 * heap.pop() // 6
 * heap.pop() // 1
 *
 * @example
 * let heap = new Heap()
 * heap.comparer = (a,b) => b - a
 *
 * heap.push(1)
 * heap.push(9)
 * heap.push(6)
 *
 * heap.pop() // 1
 * heap.pop() // 6
 * heap.pop() // 9
 */
export default
class Heap {

  /**
   *
   */
  constructor () {
    // zero index not used!
    this._arr = [null]

    // default comparer
    this._comparer = (a, b) => a - b
  }

//                    888    888                                    d88P                 888    888
//                    888    888                                   d88P                  888    888
//                    888    888                                  d88P                   888    888
//   .d88b.   .d88b.  888888 888888 .d88b.  888d888 .d8888b      d88P  .d8888b   .d88b.  888888 888888 .d88b.  888d888 .d8888b
//  d88P"88b d8P  Y8b 888    888   d8P  Y8b 888P"   88K         d88P   88K      d8P  Y8b 888    888   d8P  Y8b 888P"   88K
//  888  888 88888888 888    888   88888888 888     "Y8888b.   d88P    "Y8888b. 88888888 888    888   88888888 888     "Y8888b.
//  Y88b 888 Y8b.     Y88b.  Y88b. Y8b.     888          X88  d88P          X88 Y8b.     Y88b.  Y88b. Y8b.     888          X88
//   "Y88888  "Y8888   "Y888  "Y888 "Y8888  888      88888P' d88P       88888P'  "Y8888   "Y888  "Y888 "Y8888  888      88888P'
//       888
//  Y8b d88P
//   "Y88P"

  /**
   * Heap size
   *
   * @return {number}
   */
  get size () {
    // index 0 is not used!
    return this._arr.length - 1
  }

  /**
   * Set comparer/score function
   *
   * @param c
   */
  set comparer (c) {
    if (typeof c !== 'function') throw new TypeError('invalid comparer function')
    this._comparer = c
  }

//                   d8b                   888
//                   Y8P                   888
//                                         888
//  88888b.  888d888 888 888  888  8888b.  888888 .d88b.
//  888 "88b 888P"   888 888  888     "88b 888   d8P  Y8b
//  888  888 888     888 Y88  88P .d888888 888   88888888
//  888 d88P 888     888  Y8bd8P  888  888 Y88b. Y8b.
//  88888P"  888     888   Y88P   "Y888888  "Y888 "Y8888
//  888
//  888
//  888

  /**
   *
   * @param i
   * @param j
   * @return {boolean}
   * @private
   */
  _less (i, j) {
    let el1 = this._arr[i]
    let el2 = this._arr[j]

    if (el1 == null || el2 == null) {
      throw new TypeError(`_less: invalid array index. (i,j,n = ${i},${j},${this._arr.length})`)
    }

    return this._comparer(el1, el2) < 0
  }

  /**
   *
   * @param i
   * @param j
   * @private
   */
  _swap (i, j) {
    let tmp = this._arr[i]
    this._arr[i] = this._arr[j]
    this._arr[j] = tmp
  }

  /**
   * Get an index of the parent element for a given child index
   *
   * @param index
   */
  _getParentIndex (index) {
    return index >> 1 // same as Math.floor(index/2)
  }

  /**
   * Move node to higher level in the heap in order to fix heap invariant violation
   * (node has higher score than its' parent)

   * @param k
   * @private
   */
  _swim (k) {
    let parentIndex

    while (k > 1 && this._less((parentIndex = this._getParentIndex(k)), k)) {
      this._swap(parentIndex, k)
      k = parentIndex
    }
  }

  /**
   * Move node to lower level in the heap in order to fix heap invariant violation
   * (node has smaller score than one or both of its' children)
   *
   * @param k
   * @private
   */
  _sink (k) {
    const N = this.size

    while (2 * k <= N) {
      let j = 2 * k
      if (j < N && this._less(j, j + 1)) j++
      if (!this._less(k, j)) break
      this._swap(k, j)
      k = j
    }
  }

//         d8888 8888888b. 8888888
//        d88888 888   Y88b  888
//       d88P888 888    888  888
//      d88P 888 888   d88P  888
//     d88P  888 8888888P"   888
//    d88P   888 888         888
//   d8888888888 888         888
//  d88P     888 888       8888888
//
//
//

  push (elem) {
    this._arr.push(elem)
    this._swim(this.size)
  }

  pop () {
    let N = this.size
    if (N === 0) return

    let max = this._arr[1]
    this._swap(1, N)
    this._arr[N] = null
    this._arr.length = N
    this._sink(1)

    return max
  }

}
