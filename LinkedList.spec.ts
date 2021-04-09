import 'jest-matcher-one-of'
import { LinkedList, Node } from './LinkedList'

test('Linked List is a class', () => {
  expect(typeof LinkedList.prototype.constructor).toEqual('function')
})

test('Node is a class', () => {
  expect(typeof Node.prototype.constructor).toEqual('function')
})

describe('A Node properties work', () => {
  test('has properties "data" and "next"', () => {
    const node = new Node<number>(1)
    expect(node.data).toEqual(1)
    expect(node.next).toBeNull()
    expect(node.prev).toBeNull()
  })
})

describe(`A Node's next and prev properties can be set`, () => {
  test('has properties "data" and "next"', () => {
    const nodeOne = new Node<number>(1)
    const nodeTwo = new Node<number>(5)
    const node = new Node<number>(12, nodeOne, nodeTwo)

    expect(node.data).toEqual(12)
    expect(node.prev?.data).toEqual(1)
    expect(node.next?.data).toEqual(5)
  })
})

describe('Insert First', () => {
  test('appends a node to the start of the list', () => {
    const list = new LinkedList<number>()
    list.insertFirst(1)

    let head = list.getFirst()

    if (!head) {
      throw new Error('Head Node is undefined.')
    }

    expect(list.size()).toEqual(1)
    expect(head.data).toEqual(1)
    expect(head.next).toBeNull()
    expect(head.prev).toBeNull()

    list.insertFirst(2)

    head = list.getFirst()

    if (!head || !head.next) {
      throw new Error('Head Node is undefined.')
    }

    expect(list.size()).toEqual(2)
    expect(head.data).toEqual(2)
    expect(head.next.data).toEqual(1)
    expect(head.prev).toBeNull()
    expect(head.next.prev?.data).toEqual(2)
  })
})

describe('Insert Before', () => {
  test('appends a node before the desired index', () => {
    const list = new LinkedList<number>()
    list.insertFirst(1)
    list.insertFirst(5)
    list.insertFirst(6)
    list.insertFirst(2)

    let first = list.getAt(0)
    let second = list.getAt(1)
    let third = list.getAt(2)
    let fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(2)
    expect(second.data).toEqual(6)
    expect(third.data).toEqual(5)
    expect(fourth.data).toEqual(1)

    list.insertBefore(14, 3)

    first = list.getAt(0)
    second = list.getAt(1)
    third = list.getAt(2)
    fourth = list.getAt(3)
    const fifth = list.getAt(4)

    if (!first || !second || !third || !fourth || !fifth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(2)
    expect(second.data).toEqual(6)
    expect(third.data).toEqual(14)
    expect(fourth.data).toEqual(5)
    expect(fifth.data).toEqual(1)
  })
})

describe('Insert After', () => {
  test('appends a node after the desired index', () => {
    const list = new LinkedList<number>()
    list.insertFirst(1)
    list.insertFirst(5)
    list.insertFirst(6)
    list.insertFirst(2)

    let first = list.getAt(0)
    let second = list.getAt(1)
    let third = list.getAt(2)
    let fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(2)
    expect(second.data).toEqual(6)
    expect(third.data).toEqual(5)
    expect(fourth.data).toEqual(1)

    list.insertAfter(14, 3)

    first = list.getAt(0)
    second = list.getAt(1)
    third = list.getAt(2)
    fourth = list.getAt(3)
    const fifth = list.getAt(4)

    if (!first || !second || !third || !fourth || !fifth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(2)
    expect(second.data).toEqual(6)
    expect(third.data).toEqual(5)
    expect(fourth.data).toEqual(1)
    expect(fifth.data).toEqual(14)
  })
})

describe('Insert Middle', () => {
  test('appends a node to the head of the list if the list is empty', () => {
    const list = new LinkedList<number>()

    expect(list.size()).toEqual(0)

    list.insertMiddle(4)

    expect(list.size()).toEqual(1)

    const first = list.getFirst()

    if (!first) {
      throw new Error('Head Node is undefined.')
    }

    expect(first.data).toEqual(4)
  })

  test('appends a node to the middle of a list', () => {
    const list = new LinkedList<number>()
    list.insertFirst(1)
    list.insertFirst(4)
    list.insertFirst(22)
    list.insertFirst(8)
    list.insertFirst(3)
    list.insertFirst(5)
    list.insertFirst(7)

    expect(list.size()).toEqual(7)

    let first = list.getAt(0)
    let second = list.getAt(1)
    let third = list.getAt(2)
    let fourth = list.getAt(3)
    let fifth = list.getAt(4)
    let sixth = list.getAt(5)
    let seventh = list.getAt(6)

    let midpoint = list.findMidpoint()

    if (!first || !second || !third || !fourth || !fifth || !sixth || !seventh || !midpoint) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(7)
    expect(second.data).toEqual(5)
    expect(third.data).toEqual(3)
    expect(fourth.data).toEqual(8)
    expect(fifth.data).toEqual(22)
    expect(sixth.data).toEqual(4)
    expect(seventh.data).toEqual(1)

    expect(midpoint.data).toEqual(8)

    list.insertMiddle(55)

    first = list.getAt(0)
    second = list.getAt(1)
    third = list.getAt(2)
    fourth = list.getAt(3)
    fifth = list.getAt(4)
    sixth = list.getAt(5)
    seventh = list.getAt(6)
    const eighth = list.getAt(7)

    midpoint = list.findMidpoint()

    if (!first || !second || !third || !fourth || !fifth || !sixth || !seventh || !midpoint || !eighth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(7)
    expect(second.data).toEqual(5)
    expect(third.data).toEqual(3)
    expect(fourth.data).toEqual(55)
    expect(fifth.data).toEqual(8)
    expect(sixth.data).toEqual(22)
    expect(seventh.data).toEqual(4)
    expect(eighth.data).toEqual(1)

    expect(midpoint.data).toEqual(55)
  })
})

describe('Insert Many At Start', () => {
  test('appends many nodes at start of list', () => {
    const list = new LinkedList<number>()
    list.insertManyAtStart(1, 5, 6, 2)

    let first = list.getAt(0)
    let second = list.getAt(1)
    let third = list.getAt(2)
    let fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(2)
    expect(second.data).toEqual(6)
    expect(third.data).toEqual(5)
    expect(fourth.data).toEqual(1)

    list.insertManyAtStart(4, 2, 5, 7)

    first = list.getAt(0)
    second = list.getAt(1)
    third = list.getAt(2)
    fourth = list.getAt(3)
    const fifth = list.getAt(4)
    const sixth = list.getAt(5)
    const seventh = list.getAt(6)
    const eighth = list.getAt(7)

    if (!first || !second || !third || !fourth || !fifth || !sixth || !seventh || !eighth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(7)
    expect(second.data).toEqual(5)
    expect(third.data).toEqual(2)
    expect(fourth.data).toEqual(4)
    expect(fifth.data).toEqual(2)
    expect(sixth.data).toEqual(6)
    expect(seventh.data).toEqual(5)
    expect(eighth.data).toEqual(1)
  })
})

describe('Insert Many At End', () => {
  test('appends many nodes at end of list', () => {
    const list = new LinkedList<number>()
    list.insertManyAtEnd(1, 5, 6, 2)

    let first = list.getAt(0)
    let second = list.getAt(1)
    let third = list.getAt(2)
    let fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(1)
    expect(second.data).toEqual(5)
    expect(third.data).toEqual(6)
    expect(fourth.data).toEqual(2)

    list.insertManyAtEnd(4, 2, 5, 7)

    first = list.getAt(0)
    second = list.getAt(1)
    third = list.getAt(2)
    fourth = list.getAt(3)
    const fifth = list.getAt(4)
    const sixth = list.getAt(5)
    const seventh = list.getAt(6)
    const eighth = list.getAt(7)

    if (!first || !second || !third || !fourth || !fifth || !sixth || !seventh || !eighth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(1)
    expect(second.data).toEqual(5)
    expect(third.data).toEqual(6)
    expect(fourth.data).toEqual(2)
    expect(fifth.data).toEqual(4)
    expect(sixth.data).toEqual(2)
    expect(seventh.data).toEqual(5)
    expect(eighth.data).toEqual(7)
  })
})

describe('Insert Many Randomly', () => {
  test('appends many nodes at random places in the list', () => {
    const list = new LinkedList<number>()
    list.insertManyRandomly(1, 5, 6, 2)

    const first = list.contains(1)
    const second = list.contains(5)
    const third = list.contains(6)
    const fourth = list.contains(2)

    const falseCheck = list.contains(14)

    expect(list.size()).toEqual(4)
    expect(first).toBeTruthy()
    expect(second).toBeTruthy()
    expect(third).toBeTruthy()
    expect(fourth).toBeTruthy()
    expect(falseCheck).toBeFalsy()

    list.insertManyRandomly(14, 18)

    const fifth = list.contains(14)
    const sixth = list.contains(18)

    expect(fifth).toBeTruthy()
    expect(sixth).toBeTruthy()
  })
})

describe('Insert At Random Index', () => {
  test('appends one node at a random index in the list', () => {
    const list = new LinkedList<number>()
    list.insertAtRandomIndex(5)
    list.insertAtRandomIndex(12)

    const first = list.contains(5)
    const second = list.contains(12)

    const falseCheck = list.contains(14)

    expect(list.size()).toEqual(2)
    expect(first).toBeTruthy()
    expect(second).toBeTruthy()
    expect(falseCheck).toBeFalsy()

    list.insertAtRandomIndex(14)
    list.insertAtRandomIndex(22)

    const fourth = list.contains(14)
    const fifth = list.contains(22)

    expect(fourth).toBeTruthy()
    expect(fifth).toBeTruthy()
  })
})

describe('Get the length of the list', () => {
  test('returns the number of items in the linked list', () => {
    const list = new LinkedList<number>()

    expect(list.size()).toEqual(0)

    list.insertFirst(1)
    list.insertFirst(1)
    list.insertFirst(1)
    list.insertFirst(1)

    expect(list.size()).toEqual(4)

    list.insertLast(4)
    list.insertAt(2, 5)
    list.insertAtRandomIndex(12)

    expect(list.size()).toEqual(7)

    list.insertManyAtEnd(1, 2)
    list.insertManyAtStart(1, 2, 3)

    expect(list.size()).toEqual(12)
  })
})

describe('Get First Node', () => {
  test('returns the first element', () => {
    const list = new LinkedList<number>()
    list.insertFirst(1)

    let first = list.getFirst()

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(1)

    list.insertLast(2)

    first = list.getFirst()

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(1)

    list.insertFirst(6)

    first = list.getFirst()

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(6)
  })
})

describe('Get Last Node', () => {
  test('returns the last element', () => {
    const list = new LinkedList<number>()

    list.insertFirst(2)
    list.insertFirst(4)

    let last = list.getLast()

    if (!last) {
      throw new Error('Last Node is undefined.')
    }

    expect(last.data).toEqual(2)

    list.insertLast(1)

    last = list.getLast()

    if (!last) {
      throw new Error('Last Node is undefined.')
    }

    expect(last.data).toEqual(1)
  })
})

describe('Clear', () => {
  test('empties out the list', () => {
    const list = new LinkedList<number>()
    expect(list.size()).toEqual(0)

    list.insertFirst(1)
    list.insertFirst(1)
    list.insertFirst(1)
    list.insertFirst(1)

    expect(list.size()).toEqual(4)

    list.clear()

    expect(list.size()).toEqual(0)
  })
})

describe('Remove First', () => {
  test('removes the first node when the list has a size of one', () => {
    const list = new LinkedList<number>()

    list.insertFirst(1)

    expect(list.size()).toEqual(1)

    let first = list.getFirst()

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(1)

    list.removeFirst()

    first = list.getFirst()

    expect(first).toBeUndefined()

    list.insertFirst(4)
    list.insertFirst(3)
    list.insertLast(8)

    expect(list.size()).toEqual(3)

    first = list.getFirst()

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(3)

    list.removeFirst()

    first = list.getFirst()

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(4)
  })

  test('removes the first node when the list has a size of three', () => {
    const list = new LinkedList<number>()

    list.insertFirst(2)
    list.insertFirst(4)
    list.insertFirst(3)
    list.removeFirst()

    expect(list.size()).toEqual(2)

    let first = list.getFirst()

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(4)

    list.removeFirst()

    expect(list.size()).toEqual(1)

    first = list.getFirst()

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(2)
  })
})

describe('Remove Last', () => {
  test('Remove Last does not throw an error when list is empty', () => {
    const list = new LinkedList<number>()
    expect(() => {
      list.removeLast()
    }).not.toThrow()
  })

  test('Remove Last removes the last node when list is length 1', () => {
    const list = new LinkedList<number>()
    list.insertFirst(8)
    list.removeLast()

    const first = list.getFirst()

    expect(first).toBeUndefined()
  })

  test('Remove Last removes the last node when list is length 2', () => {
    const list = new LinkedList<number>()
    list.insertFirst(4)
    list.insertFirst(9)

    list.removeLast()

    expect(list.size()).toEqual(1)

    const last = list.getLast()

    if (!last) {
      throw new Error('Last Node is undefined.')
    }

    expect(last.data).toEqual(9)
  })

  test('Remove Last removes the last node when list is length 3', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(4)
    list.insertFirst(8)
    list.removeLast()

    expect(list.size()).toEqual(2)

    const last = list.getLast()

    if (!last) {
      throw new Error('First Node is undefined.')
    }

    expect(last.data).toEqual(4)
  })
})

describe('Remove Middle', () => {
  test('returns undefined when the list is empty', () => {
    const list = new LinkedList<number>()

    const removeMiddle = list.removeMiddle()

    expect(removeMiddle).toBeUndefined()
  })

  test('removes the middle node from the list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(1)
    list.insertFirst(4)
    list.insertFirst(8)
    list.insertFirst(2)

    let midpoint = list.findMidpoint()

    if (!midpoint) {
      throw new Error('Midpoint is undefined')
    }

    expect(midpoint.data).toEqual(8)

    list.removeMiddle()

    midpoint = list.findMidpoint()

    if (!midpoint) {
      throw new Error('Midpoint is undefined')
    }

    expect(midpoint.data).toEqual(4)
  })
})

describe('Remove Random Index', () => {
  test('removes a random node from the list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(1)
    list.insertFirst(4)
    list.insertFirst(3)
    list.insertFirst(7)

    expect(list.size()).toEqual(4)

    list.removeRandomIndex()

    expect(list.size()).toEqual(3)

    list.removeRandomIndex()
    list.removeRandomIndex()

    expect(list.size()).toEqual(1)

    list.removeRandomIndex()
    expect(list.empty()).toBeTruthy()
  })
})

describe('Remove Node with Value', () => {
  test('removes a single node from the list whose data matches the passed in data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(1)
    list.insertFirst(4)
    list.insertFirst(3)
    list.insertFirst(7)

    expect(list.size()).toEqual(4)

    let first = list.contains(1)
    let second = list.contains(4)
    let third = list.contains(3)
    let fourth = list.contains(7)

    expect(first).toBeTruthy()
    expect(second).toBeTruthy()
    expect(third).toBeTruthy()
    expect(fourth).toBeTruthy()

    list.removeNodeWithValue(7)

    expect(list.size()).toEqual(3)

    first = list.contains(1)
    second = list.contains(4)
    third = list.contains(3)
    fourth = list.contains(7)

    expect(first).toBeTruthy()
    expect(second).toBeTruthy()
    expect(third).toBeTruthy()
    expect(fourth).toBeFalsy()

    list.insertFirst(4)
    expect(list.size()).toEqual(4)

    list.removeNodeWithValue(4)

    first = list.contains(4)

    expect(first).toBeTruthy()
  })
})

describe('Remove Nodes with Value', () => {
  test('removes all nodes from the list whose data matches the passed in data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(1)
    list.insertFirst(4)
    list.insertFirst(3)
    list.insertFirst(7)

    expect(list.size()).toEqual(4)

    let first = list.contains(1)
    let second = list.contains(4)
    let third = list.contains(3)
    let fourth = list.contains(7)

    expect(first).toBeTruthy()
    expect(second).toBeTruthy()
    expect(third).toBeTruthy()
    expect(fourth).toBeTruthy()

    const numRemovedOne = list.removeNodesWithValue(7)

    expect(list.size()).toEqual(3)
    expect(numRemovedOne).toEqual(1)

    first = list.contains(1)
    second = list.contains(4)
    third = list.contains(3)
    fourth = list.contains(7)

    expect(first).toBeTruthy()
    expect(second).toBeTruthy()
    expect(third).toBeTruthy()
    expect(fourth).toBeFalsy()

    list.insertFirst(4)
    expect(list.size()).toEqual(4)

    const numRemovedTwo = list.removeNodesWithValue(4)

    first = list.contains(4)

    expect(first).toBeFalsy()
    expect(numRemovedTwo).toEqual(2)
  })
})

describe('Insert Last', () => {
  test('adds to the end of the list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(2)
    list.insertLast(6)

    expect(list.size()).toEqual(2)

    const last = list.getLast()

    if (!last) {
      throw new Error('First Node is undefined.')
    }

    expect(last.data).toEqual(6)
  })
})

describe('Get At', () => {
  test('returns the node at given index', () => {
    const list = new LinkedList<number>()

    list.insertLast(1)
    list.insertLast(2)
    list.insertLast(3)
    list.insertLast(4)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(1)
    expect(second.data).toEqual(2)
    expect(third.data).toEqual(3)
    expect(fourth.data).toEqual(4)
  })

  test('returns the first node if index is less than zero', () => {
    const list = new LinkedList<number>()

    list.insertLast(1)
    list.insertLast(2)
    list.insertLast(3)
    list.insertLast(4)

    const first = list.getAt(-1)
    const second = list.getAt(-22)
    const third = list.getAt(-55)
    const fourth = list.getAt(-242)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(1)
    expect(second.data).toEqual(1)
    expect(third.data).toEqual(1)
    expect(fourth.data).toEqual(1)
  })

  test('returns the last node if index is greater than the N - 1', () => {
    const list = new LinkedList<number>()

    list.insertLast(1)
    list.insertLast(2)
    list.insertLast(3)
    list.insertLast(4)

    const first = list.getAt(222)
    const second = list.getAt(44)
    const third = list.getAt(244)
    const fourth = list.getAt(341)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(4)
    expect(second.data).toEqual(4)
    expect(third.data).toEqual(4)
    expect(fourth.data).toEqual(4)
  })
})

describe('Get Random', () => {
  test('returns a random node from the list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(2)

    expect(list.size()).toEqual(1)

    let node = list.getRandom()

    if (!node) {
      throw new Error('First Node is undefined.')
    }

    expect(node.data).toEqual(2)

    list.insertFirst(4)
    list.insertFirst(3)
    list.insertFirst(18)
    list.insertFirst(7)

    expect(list.size()).toEqual(5)

    node = list.getRandom()

    if (!node) {
      throw new Error('First Node is undefined.')
    }

    expect(node.data).toBeOneOf([2, 3, 4, 7, 18])
  })
})

describe('Remove At', () => {
  test('removeAt doesnt crash on an empty list', () => {
    const list = new LinkedList<number>()

    expect(() => {
      list.removeAt(0)
      list.removeAt(1)
      list.removeAt(2)
    }).not.toThrow()
  })

  test('remove At doesnt crash on an index out of bounds', () => {
    const list = new LinkedList<number>()

    expect(() => {
      list.insertFirst(4)
      list.removeAt(1)
    }).not.toThrow()
  })

  test('remove At deletes the first node', () => {
    const list = new LinkedList<number>()

    list.insertLast(1)
    list.insertLast(2)
    list.insertLast(3)
    list.insertLast(4)

    let first = list.getAt(0)

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(1)

    list.removeAt(0)

    first = list.getAt(0)

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(2)
  })

  test('remove At deletes the node at the given index', () => {
    const list = new LinkedList()

    list.insertLast(1)
    list.insertLast(2)
    list.insertLast(3)
    list.insertLast(4)

    let node = list.getAt(1)

    if (!node) {
      throw new Error('Node is undefined.')
    }

    expect(node.data).toEqual(2)

    list.removeAt(1)

    node = list.getAt(1)

    if (!node) {
      throw new Error('Node is undefined.')
    }

    expect(node.data).toEqual(3)
  })

  test('Remove At works on the last node', () => {
    const list = new LinkedList()

    list.insertLast(1)
    list.insertLast(2)
    list.insertLast(3)
    list.insertLast(4)

    let node = list.getAt(3)

    if (!node) {
      throw new Error('Node is undefined.')
    }

    expect(node.data).toEqual(4)

    list.removeAt(3)

    node = list.getLast()

    if (!node) {
      throw new Error('Node is undefined.')
    }

    expect(node.data).toEqual(3)
  })
})

describe('Insert At', () => {
  test('inserts a new node with data at the 0 index when the list is empty', () => {
    const list = new LinkedList<number>()
    list.insertAt(5, 0)

    const first = list.getFirst()

    if (!first) {
      throw new Error('First Node is undefined.')
    }

    expect(first.data).toEqual(5)
  })

  test('inserts a new node with data at the 0 index when the list has elements', () => {
    const list = new LinkedList<number>()

    list.insertLast(2)
    list.insertLast(4)
    list.insertLast(7)
    list.insertAt(5, 0)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(5)
    expect(second.data).toEqual(2)
    expect(third.data).toEqual(4)
    expect(fourth.data).toEqual(7)
  })

  test('inserts a new node with data at a middle index', () => {
    const list = new LinkedList<number>()

    list.insertLast(2)
    list.insertLast(7)
    list.insertLast(3)
    list.insertLast(4)
    list.insertAt(9, 2)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)
    const fifth = list.getAt(4)

    if (!first || !second || !third || !fourth || !fifth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(2)
    expect(second.data).toEqual(7)
    expect(third.data).toEqual(9)
    expect(fourth.data).toEqual(3)
    expect(fifth.data).toEqual(4)
  })

  test('inserts a new node with data at a last index', () => {
    const list = new LinkedList<number>()

    list.insertLast(2)
    list.insertLast(7)
    list.insertAt(3, 2)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)

    if (!first || !second || !third) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(2)
    expect(second.data).toEqual(7)
    expect(third.data).toEqual(3)
  })

  test('insert a new node when index is out of bounds', () => {
    const list = new LinkedList<number>()

    list.insertLast(5)
    list.insertLast(4)
    list.insertAt(11, 30)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)

    if (!first || !second || !third) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(5)
    expect(second.data).toEqual(4)
    expect(third.data).toEqual(11)
  })
})

describe('For Each', () => {
  test('applies a transform to each node', () => {
    const list = new LinkedList<number>()

    list.insertLast(1)
    list.insertLast(2)
    list.insertLast(3)
    list.insertLast(4)

    list.forEach((data: number, index: number) => {
      return data + 10
    })

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(11)
    expect(second.data).toEqual(12)
    expect(third.data).toEqual(13)
    expect(fourth.data).toEqual(14)
  })
})

describe('for...of loops', () => {
  test('works with the linked list', () => {
    const list = new LinkedList<number>()

    list.insertLast(1)
    list.insertLast(2)
    list.insertLast(3)
    list.insertLast(4)

    for (const node of list) {
      node.data += 10
    }

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(11)
    expect(second.data).toEqual(12)
    expect(third.data).toEqual(13)
    expect(fourth.data).toEqual(14)
  })

  test('for...of works on an empty list', () => {
    const list = new LinkedList<number>()

    expect(() => {
      for (const node of list) {
        //
      }
    }).not.toThrow()
  })
})

describe('Reverse', () => {
  test('should reverse the linked list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)

    let first = list.getAt(0)
    let second = list.getAt(1)
    let third = list.getAt(2)
    let fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(11)
    expect(second.data).toEqual(9)
    expect(third.data).toEqual(7)
    expect(fourth.data).toEqual(3)

    list.reverse()

    first = list.getAt(0)
    second = list.getAt(1)
    third = list.getAt(2)
    fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(3)
    expect(second.data).toEqual(7)
    expect(third.data).toEqual(9)
    expect(fourth.data).toEqual(11)
  })
})

describe('toString', () => {
  test('should reverse the linked list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(11)
    expect(second.data).toEqual(9)
    expect(third.data).toEqual(7)
    expect(fourth.data).toEqual(3)

    expect(list.toString()).toEqual('11 -> 9 -> 7 -> 3 -> null')
  })
})

describe('Find', () => {
  test('finds element in the list with matching data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(11)
    expect(second.data).toEqual(9)
    expect(third.data).toEqual(7)
    expect(fourth.data).toEqual(3)

    const foundOne = list.find(3)
    const foundTwo = list.find(11)
    const foundThree = list.find(44)

    if (!foundOne || !foundTwo) {
      throw new Error('Node is undefined.')
    }

    expect(foundOne.data).toEqual(3)
    expect(foundTwo.data).toEqual(11)
    expect(foundThree).toBeUndefined()
  })
})

describe('Find Index', () => {
  test('finds element in the list with matching data and returns index', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(11)
    expect(second.data).toEqual(9)
    expect(third.data).toEqual(7)
    expect(fourth.data).toEqual(3)

    const foundNodeAtIndexOne = list.findIndex(11)
    const foundNodeAtIndexTwo = list.findIndex(3)

    expect(foundNodeAtIndexOne).toEqual(0)
    expect(foundNodeAtIndexTwo).toEqual(3)
  })
})

describe('Find Midpoint', () => {
  test('returns undefined on an empty list', () => {
    const list = new LinkedList<number>()

    const midpoint = list.findMidpoint()

    expect(midpoint).toBeUndefined()
  })

  test('finds the node at the middle of the list with a even amount of elements', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(45)
    list.insertFirst(2)

    const midpoint = list.findMidpoint()

    if (!midpoint) {
      throw new Error('Error finding Midpoint.')
    }

    expect(midpoint.data).toEqual(11)
  })

  test('finds the node at the middle of the list with a odd amount of elements', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(2)

    const midpoint = list.findMidpoint()

    if (!midpoint) {
      throw new Error('Error finding Midpoint.')
    }

    expect(midpoint.data).toEqual(9)
  })
})

describe('Get Middle', () => {
  test('works as an alias for findMidpoint', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(45)
    list.insertFirst(2)

    const midpoint = list.getMiddle()

    if (!midpoint) {
      throw new Error('Error finding Midpoint.')
    }

    expect(midpoint.data).toEqual(11)
  })
})

describe('Find Midpoint Index', () => {
  test('returns undefined on an empty list', () => {
    const list = new LinkedList<number>()

    const midpointIndex = list.findMidpointIndex()

    expect(midpointIndex).toBeUndefined()
  })

  test('finds the index of thenode at the middle of the list with a even amount of elements', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(45)
    list.insertFirst(2)

    const midpointIndex = list.findMidpointIndex()

    expect(midpointIndex).toEqual(2)
  })

  test('finds the node at the middle of the list with a odd amount of elements', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(2)

    const midpointIndex = list.findMidpointIndex()

    expect(midpointIndex).toEqual(2)
  })
})

describe('Find All Indicies', () => {
  test('returns empty array with empty list', () => {
    const list = new LinkedList<number>()

    const indicies = list.findAllIndicies(5)

    expect(indicies).toEqual([])
  })

  test('returns empty array when no nodes have matching data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(3)
    list.insertFirst(11)
    list.insertFirst(3)

    const indicies = list.findAllIndicies(24)

    expect(indicies).toEqual([])
  })

  test('finds all elements in the list with matching data and returns an array of indicies', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(3)
    list.insertFirst(11)
    list.insertFirst(3)

    const indiciesThree = list.findAllIndicies(3)

    expect(indiciesThree).toEqual([0, 2, 5])

    const indiciesEleven = list.findAllIndicies(11)
    expect(indiciesEleven).toEqual([1])
  })
})

describe('Contains', () => {
  test('returns true or false whether or not element is in linked list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(11)
    expect(second.data).toEqual(9)
    expect(third.data).toEqual(7)
    expect(fourth.data).toEqual(3)

    const containsOne = list.contains(11)
    const containsTwo = list.contains(3)
    const containsThree = list.contains(434)
    const containsFour = list.contains(2)

    expect(containsOne).toBeTruthy()
    expect(containsTwo).toBeTruthy()
    expect(containsThree).toBeFalsy()
    expect(containsFour).toBeFalsy()
  })
})

describe('Sort', () => {
  test('sorts the linked list in ascending order', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)

    let first = list.getAt(0)
    let second = list.getAt(1)
    let third = list.getAt(2)
    let fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(11)
    expect(second.data).toEqual(9)
    expect(third.data).toEqual(7)
    expect(fourth.data).toEqual(3)

    list.sort('asc')

    first = list.getAt(0)
    second = list.getAt(1)
    third = list.getAt(2)
    fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(3)
    expect(second.data).toEqual(7)
    expect(third.data).toEqual(9)
    expect(fourth.data).toEqual(11)
  })

  test('sorts the linked list in descending order', () => {
    const list = new LinkedList<number>()

    list.insertFirst(11)
    list.insertFirst(7)
    list.insertFirst(3)
    list.insertFirst(9)

    let first = list.getAt(0)
    let second = list.getAt(1)
    let third = list.getAt(2)
    let fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(9)
    expect(second.data).toEqual(3)
    expect(third.data).toEqual(7)
    expect(fourth.data).toEqual(11)

    list.sort('desc')

    first = list.getAt(0)
    second = list.getAt(1)
    third = list.getAt(2)
    fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined.')
    }

    expect(first.data).toEqual(11)
    expect(second.data).toEqual(9)
    expect(third.data).toEqual(7)
    expect(fourth.data).toEqual(3)
  })
})

describe('Step Forward from Head', () => {
  test('returns undefined when attemping to use on an empty list', () => {
    const list = new LinkedList<number>()

    const zeroFromHead = list.stepForwardFromHead(0)
    const oneFromHead = list.stepForwardFromHead(1)
    const twoFromHead = list.stepForwardFromHead(2)

    expect(zeroFromHead).toBeUndefined()
    expect(oneFromHead).toBeUndefined()
    expect(twoFromHead).toBeUndefined()
  })

  test('returns undefined when attempting to step a negative amount away from the head', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(22)

    const negativeTwentyTwoFromHead = list.stepForwardFromHead(-22)
    const negativeFourtyFourFromHead = list.stepForwardFromHead(-44)

    expect(negativeTwentyTwoFromHead).toBeUndefined()
    expect(negativeFourtyFourFromHead).toBeUndefined()
  })

  test('returns undefined when attempting to step an amount larger than the list amount away from the head', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(22)

    const oneHundredFromHead = list.stepForwardFromHead(100)
    const fiftyFromHead = list.stepForwardFromHead(50)

    expect(oneHundredFromHead).toBeUndefined()
    expect(fiftyFromHead).toBeUndefined()
  })

  test('returns the node at the specified distance from the head node', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(22)

    const zeroFromHead = list.stepForwardFromHead(0)
    const oneFromHead = list.stepForwardFromHead(1)
    const twoFromHead = list.stepForwardFromHead(2)
    const threeFromHead = list.stepForwardFromHead(3)
    const FourFromHead = list.stepForwardFromHead(4)

    if (!zeroFromHead || !oneFromHead || !twoFromHead || !threeFromHead || !FourFromHead) {
      throw new Error('Node is undefined.')
    }

    expect(zeroFromHead.data).toEqual(22)
    expect(oneFromHead.data).toEqual(11)
    expect(twoFromHead.data).toEqual(9)
    expect(threeFromHead.data).toEqual(7)
    expect(FourFromHead.data).toEqual(3)
  })
})

describe('Step Back from Tail', () => {
  test('returns undefined when attemping to use on an empty list', () => {
    const list = new LinkedList<number>()

    const zeroFromTail = list.stepBackFromTail(0)
    const oneFromTail = list.stepBackFromTail(1)
    const twoFromTail = list.stepBackFromTail(2)

    expect(zeroFromTail).toBeUndefined()
    expect(oneFromTail).toBeUndefined()
    expect(twoFromTail).toBeUndefined()
  })

  test('returns undefined when attempting to step a negative amount away from the tail', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(22)

    const negativeTwentyTwoFromTail = list.stepBackFromTail(-22)
    const negativeFourtyFourFromTail = list.stepBackFromTail(-44)

    expect(negativeTwentyTwoFromTail).toBeUndefined()
    expect(negativeFourtyFourFromTail).toBeUndefined()
  })

  test('returns undefined when attempting to step back an amount larger than the list amount away from the tail', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(22)

    const oneHundredFromTail = list.stepBackFromTail(100)
    const fiftyFromTail = list.stepBackFromTail(50)

    expect(oneHundredFromTail).toBeUndefined()
    expect(fiftyFromTail).toBeUndefined()
  })

  test('returns the node at the specified distance from the tail node', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)
    list.insertFirst(22)

    const zeroFromTail = list.stepBackFromTail(0)
    const oneFromTail = list.stepBackFromTail(1)
    const twoFromTail = list.stepBackFromTail(2)
    const threeFromTail = list.stepBackFromTail(3)
    const FourFromTail = list.stepBackFromTail(4)

    if (!zeroFromTail || !oneFromTail || !twoFromTail || !threeFromTail || !FourFromTail) {
      throw new Error('Node is undefined.')
    }

    expect(zeroFromTail.data).toEqual(3)
    expect(oneFromTail.data).toEqual(7)
    expect(twoFromTail.data).toEqual(9)
    expect(threeFromTail.data).toEqual(11)
    expect(FourFromTail.data).toEqual(22)
  })
})

describe('Is Circular', () => {
  test('returns false on an empty list', () => {
    const list = new LinkedList<number>()

    const isCircular = list.isCircular()

    expect(isCircular).toBeFalsy()
  })

  test('returns false for a non circular list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)

    const isCircular = list.isCircular()

    expect(isCircular).toBeFalsy()
  })

  test('returns true for a circular list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(3)
    list.insertFirst(7)
    list.insertFirst(9)
    list.insertFirst(11)

    const lastNode = list.getLast()
    const node = list.getAt(2)

    if (!lastNode || !node) {
      throw new Error('Node is undefined.')
    }

    lastNode.next = node

    let isCircular = list.isCircular()

    expect(isCircular).toBeTruthy()

    lastNode.next = null

    isCircular = list.isCircular()

    expect(isCircular).toBeFalsy()
  })
})

describe('Empty', () => {
  test('returns true if the list is empty', () => {
    const list = new LinkedList<number>()

    expect(list.size()).toEqual(0)

    const isEmpty = list.empty()

    expect(isEmpty).toBeTruthy()
  })

  test('returns false if the list is empty', () => {
    const list = new LinkedList<number>()

    list.insertManyAtStart(1, 3, 5, 6, 7, 12)

    expect(list.size()).toEqual(6)

    const isEmpty = list.empty()

    expect(isEmpty).toBeFalsy()
  })
})

describe('Update Index', () => {
  test('returns false if the list is empty', () => {
    const list = new LinkedList<number>()

    const updateIdx = list.updateIndex(22, 5)

    expect(updateIdx).toBeFalsy()
  })

  test('returns false if the index is less than zero', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(11)

    const updateIdx = list.updateIndex(22, -1)

    expect(updateIdx).toBeFalsy()
  })

  test('returns false if the index is greater than N - 1', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(11)

    const updateIdx = list.updateIndex(22, 224)

    expect(updateIdx).toBeFalsy()
  })

  test('returns true and updates index with supplied data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(11)

    const updateIdxZero = list.updateIndex(22, 0)
    const updateIdxOne = list.updateIndex(5, 1)
    const updateIdxTwo = list.updateIndex(8, 2)
    const updateIdxThree = list.updateIndex(19, 3)

    expect(updateIdxZero).toBeTruthy()
    expect(updateIdxOne).toBeTruthy()
    expect(updateIdxTwo).toBeTruthy()
    expect(updateIdxThree).toBeTruthy()

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined')
    }

    expect(first.data).toEqual(22)
    expect(second.data).toEqual(5)
    expect(third.data).toEqual(8)
    expect(fourth.data).toEqual(19)
  })
})

describe('Update One', () => {
  test('returns false if the list is empty', () => {
    const list = new LinkedList<number>()

    const updateIdx = list.updateOne(22, 5)

    expect(updateIdx).toBeFalsy()
  })

  test('returns false if the supplied data is not in the list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(11)

    const updateOne = list.updateOne(22, 2442)

    expect(updateOne).toBeFalsy()
  })

  test('returns true and updates the first element with supplied old data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(11)

    const updateIdxZero = list.updateOne(22, 11)
    const updateIdxOne = list.updateOne(14, 6)
    const updateIdxTwo = list.updateOne(8, 3)
    const updateIdxThree = list.updateOne(19, 5)

    expect(updateIdxZero).toBeTruthy()
    expect(updateIdxOne).toBeTruthy()
    expect(updateIdxTwo).toBeTruthy()
    expect(updateIdxThree).toBeTruthy()

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)

    if (!first || !second || !third || !fourth) {
      throw new Error('Node is undefined')
    }

    expect(first.data).toEqual(22)
    expect(second.data).toEqual(14)
    expect(third.data).toEqual(8)
    expect(fourth.data).toEqual(19)
  })

  test('only updates first occurrence of old data and returns true', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(5)

    const updateOne = list.updateOne(22, 5)

    expect(updateOne).toBeTruthy()

    const first = list.getAt(0)
    const second = list.getAt(1)

    if (!first || !second) {
      throw new Error('Node is undefined')
    }

    expect(first.data).toEqual(22)
    expect(second.data).toEqual(5)
  })
})

describe('Update Many', () => {
  test('returns zero if the list is empty', () => {
    const list = new LinkedList<number>()

    const updateMany = list.updateMany(22, 5)

    expect(updateMany).toEqual(0)
  })

  test('returns zero if the supplied data is not in the list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(11)

    const updateMany = list.updateMany(22, 2442)

    expect(updateMany).toEqual(0)
  })

  test('returns the number of updated nodes and updates the all nodes which match the supplied old data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(6)
    list.insertFirst(6)
    list.insertFirst(3)
    list.insertFirst(11)

    const updateManyOne = list.updateMany(22, 3)
    const updateManyTwo = list.updateMany(34, 11)
    const updateManyThree = list.updateMany(12, 6)

    expect(updateManyOne).toEqual(2)
    expect(updateManyTwo).toEqual(1)
    expect(updateManyThree).toEqual(3)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)
    const fourth = list.getAt(3)
    const fifth = list.getAt(4)
    const sixth = list.getAt(5)
    const seventh = list.getAt(6)

    if (!first || !second || !third || !fourth || !fifth || !sixth || !seventh) {
      throw new Error('Node is undefined')
    }

    expect(first.data).toEqual(34)
    expect(second.data).toEqual(22)
    expect(third.data).toEqual(12)
    expect(fourth.data).toEqual(12)
    expect(fifth.data).toEqual(12)
    expect(sixth.data).toEqual(22)
    expect(seventh.data).toEqual(5)
  })

  test('only all occurrences of old data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(5)
    list.insertFirst(5)

    const updateMany = list.updateMany(22, 5)

    expect(updateMany).toEqual(3)

    const first = list.getAt(0)
    const second = list.getAt(1)
    const third = list.getAt(2)

    if (!first || !second || !third) {
      throw new Error('Node is undefined')
    }

    expect(first.data).toEqual(22)
    expect(second.data).toEqual(22)
    expect(third.data).toEqual(22)
  })
})

describe('Update First', () => {
  test('returns false if the list is empty', () => {
    const list = new LinkedList<number>()

    const updateIdx = list.updateFirst(15)

    expect(updateIdx).toBeFalsy()
  })

  test('returns true and updates the head node with the supplied data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(11)

    let first = list.getFirst()

    if (!first) {
      throw new Error('Node is undefined')
    }

    expect(first.data).toEqual(11)

    const updateFirst = list.updateFirst(32)

    expect(updateFirst).toBeTruthy()

    first = list.getFirst()

    if (!first) {
      throw new Error('Node is undefined')
    }

    expect(first.data).toEqual(32)
  })
})

describe('Update Last', () => {
  test('returns false if the list is empty', () => {
    const list = new LinkedList<number>()

    const updateIdx = list.updateLast(15)

    expect(updateIdx).toBeFalsy()
  })

  test('returns true and updates the tail node with the supplied data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(11)

    let last = list.getLast()

    if (!last) {
      throw new Error('Node is undefined')
    }

    expect(last.data).toEqual(5)

    const updateLast = list.updateLast(32)

    expect(updateLast).toBeTruthy()

    last = list.getLast()

    if (!last) {
      throw new Error('Node is undefined')
    }

    expect(last.data).toEqual(32)
  })
})

describe('Update Middle', () => {
  test('returns false if the list is empty', () => {
    const list = new LinkedList<number>()

    const updateMiddle = list.updateMiddle(15)

    expect(updateMiddle).toBeFalsy()
  })

  test('returns true and updates the node at the middle of the list with the supplied data', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(11)

    let middle = list.findMidpoint()

    if (!middle) {
      throw new Error('Node is undefined')
    }

    expect(middle.data).toEqual(6)

    const updateMiddle = list.updateMiddle(32)

    expect(updateMiddle).toBeTruthy()

    middle = list.findMidpoint()

    if (!middle) {
      throw new Error('Node is undefined')
    }

    expect(middle.data).toEqual(32)
  })
})

describe('Count', () => {
  test('returns zero if the list is empty', () => {
    const list = new LinkedList<number>()

    const count = list.count(34)

    expect(count).toEqual(0)
  })

  test('returns the number of times the specified data appears in the list', () => {
    const list = new LinkedList<number>()

    list.insertFirst(5)
    list.insertFirst(5)
    list.insertFirst(5)
    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(6)
    list.insertFirst(6)
    list.insertFirst(6)
    list.insertFirst(11)
    list.insertFirst(11)
    list.insertFirst(22)

    let countFive = list.count(5)
    let countThree = list.count(3)
    let countSix = list.count(6)
    let countEleven = list.count(11)
    let countTwentyTwo = list.count(22)

    expect(countFive).toEqual(4)
    expect(countThree).toEqual(1)
    expect(countSix).toEqual(3)
    expect(countEleven).toEqual(2)
    expect(countTwentyTwo).toEqual(1)

    list.insertFirst(5)
    list.insertFirst(3)
    list.insertFirst(11)
    list.insertFirst(22)
    list.insertFirst(6)
    list.insertFirst(6)

    countFive = list.count(5)
    countThree = list.count(3)
    countSix = list.count(6)
    countEleven = list.count(11)
    countTwentyTwo = list.count(22)

    expect(countFive).toEqual(5)
    expect(countThree).toEqual(2)
    expect(countSix).toEqual(5)
    expect(countEleven).toEqual(3)
    expect(countTwentyTwo).toEqual(2)
  })
})
