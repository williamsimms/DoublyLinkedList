// Linked List Construction

type ForEachFunction<T> = (data: T, index: number) => T
type NodePointers<T> = Node<T> | null
type SortingTypes = 'asc' | 'desc'

export class Node<T> {
  data: T
  prev: NodePointers<T>
  next: NodePointers<T>

  constructor(data: T, prev: NodePointers<T> = null, next: NodePointers<T> = null) {
    this.data = data
    this.prev = prev
    this.next = next
  }
}

export class LinkedList<T> {
  private head: NodePointers<T>
  private tail: NodePointers<T>
  private length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  size(): number {
    if (!this.head && !this.tail) {
      return 0
    }

    return this.length
  }

  contains(data: T): boolean {
    if (!this.head && !this.tail) {
      return false
    }

    let current = this.head
    while (current) {
      if (current.data === data) {
        return true
      }

      current = current.next
    }

    return false
  }

  insertFirst(data: T): void {
    if (!this.head && !this.tail) {
      const newNode = new Node<T>(data)
      this.head = newNode
      this.tail = newNode
      this.length++
      return
    }

    const newNode = new Node<T>(data)
    newNode.next = this.head

    if (this.head) {
      this.head.prev = newNode
    }

    this.head = newNode
    this.length++
  }

  insertLast(data: T): void {
    if (!this.head && !this.tail) {
      const newNode = new Node<T>(data)
      this.head = newNode
      this.tail = newNode
      this.length++
      return
    }

    const newNode = new Node<T>(data)
    newNode.prev = this.tail

    if (this.tail) {
      this.tail.next = newNode
    }

    this.tail = newNode
    this.length++
  }

  insertAt(data: T, index: number): void {
    if (!this.head && !this.tail) {
      this.insertFirst(data)
      return
    }

    if (index <= 0) {
      this.insertFirst(data)
      return
    }

    const nodeAtPreviousIndex = this.getAt(index - 1)

    if (!nodeAtPreviousIndex) {
      this.insertFirst(data)
      return
    }

    if (nodeAtPreviousIndex && !nodeAtPreviousIndex.next) {
      this.insertLast(data)
      return
    }

    const newNode = new Node(data)
    const nodeAtIndex = nodeAtPreviousIndex.next

    if (!nodeAtIndex) {
      return
    }

    newNode.next = nodeAtIndex
    newNode.prev = nodeAtPreviousIndex
    nodeAtPreviousIndex.next = newNode
    nodeAtIndex.prev = newNode
    this.length++
  }

  insertBefore(data: T, index: number): void {
    if (!this.head && !this.tail) {
      return
    }

    this.insertAt(data, index - 1)
  }

  insertAfter(data: T, index: number): void {
    if (!this.head && !this.tail) {
      return
    }

    this.insertAt(data, index + 1)
  }

  insertMiddle(data: T): void {
    if (!this.head && !this.tail) {
      this.insertFirst(data)
      return
    }

    const midpointIndex = this.findMidpointIndex()

    if (!midpointIndex) {
      return
    }

    this.insertAt(data, midpointIndex)
  }

  insertManyAtStart(...data: T[]): void {
    data.forEach((d: T) => {
      this.insertFirst(d)
    })
  }

  insertManyAtEnd(...data: T[]): void {
    data.forEach((d: T) => {
      this.insertLast(d)
    })
  }

  insertManyRandomly(...data: T[]): void {
    const currentLengthOfList = this.length

    if (currentLengthOfList === 0) {
      data.forEach((d: T) => {
        this.insertFirst(d)
      })
      return
    }

    data.forEach((d: T) => {
      const randomIndex = Math.floor(Math.random() * currentLengthOfList)
      this.insertAt(d, randomIndex)
    })
  }

  insertAtRandomIndex(data: T): void {
    const currentListLength = this.length
    const randomIndex = Math.floor(Math.random() * currentListLength)
    this.insertAt(data, randomIndex)
  }

  removeFirst(): void {
    if (!this.head || !this.tail) {
      return
    }

    if (!this.head.next) {
      this.head = null
      this.tail = null
      this.length--
      return
    }

    const newHead = this.head.next
    newHead.prev = null
    this.head = newHead
    this.length--
    return
  }

  removeLast(): void {
    if (!this.head || !this.tail) {
      return
    }

    if (!this.tail.prev) {
      this.head = null
      this.tail = null
      this.length--
      return
    }

    const nodeBeforeTail = this.tail.prev

    nodeBeforeTail.next = null
    this.tail = nodeBeforeTail
    this.length--
  }

  removeAt(index: number): void {
    if (!this.head && !this.tail) {
      return
    }

    if (index < 0 || index > this.length - 1) {
      return
    }

    if (index === 0) {
      return this.removeFirst()
    }

    const nodeAtIndex = this.getAt(index)

    if (!nodeAtIndex) {
      return
    }

    const nodeAtPreviousIndex = nodeAtIndex.prev
    const nodeAtNextIndex = nodeAtIndex.next

    if (!nodeAtPreviousIndex) {
      this.removeFirst()
      return
    }

    if (!nodeAtNextIndex) {
      this.removeLast()
      return
    }

    nodeAtPreviousIndex.next = nodeAtNextIndex
    nodeAtNextIndex.prev = nodeAtPreviousIndex
    this.length--
  }

  removeMiddle(): void {
    if (!this.head && !this.tail) {
      return
    }

    const midpointIndex = this.findMidpointIndex()

    if (!midpointIndex) {
      return
    }

    this.removeAt(midpointIndex)
  }

  removeRandomIndex(): void {
    if (!this.head && !this.tail) {
      return
    }

    const currentListLength = this.length
    const randomIndex = Math.floor(Math.random() * currentListLength)
    this.removeAt(randomIndex)
  }

  removeNodesWithValue(data: T): number {
    if (!this.head && !this.tail) {
      return 0
    }

    let counter = 0

    while (this.contains(data)) {
      this.removeNodeWithValue(data)
      counter++
    }

    return counter
  }

  removeNodeWithValue(data: T): void {
    if (!this.head && !this.tail) {
      return
    }

    let current = this.head
    let index = 0

    while (current) {
      if (current.data === data) {
        this.removeAt(index)
        break
      }

      current = current.next
      index++
    }
  }

  getFirst(): Node<T> | void {
    if (!this.head || !this.tail) {
      return
    }

    return this.head
  }

  getLast(): Node<T> | void {
    if (!this.head || !this.tail) {
      return
    }

    return this.tail
  }

  getAt(index: number): Node<T> | void {
    if (!this.head || !this.tail) {
      return
    }

    if (index <= 0) {
      return this.getFirst()
    }

    let current = this.head
    let counter = 0

    while (current.next) {
      if (counter === index) {
        return current
      }

      current = current.next
      counter++
    }

    return current
  }

  getRandom(): Node<T> | void {
    if (!this.head || !this.tail) {
      return
    }

    const currentListLength = this.length
    const randomIndex = Math.floor(Math.random() * currentListLength)
    return this.getAt(randomIndex)
  }

  getMiddle(): Node<T> | void {
    return this.findMidpoint()
  }

  forEach(fn: ForEachFunction<T>): void {
    if (!this.head && !this.tail) {
      return
    }

    let current = this.head
    let index = 0

    while (current) {
      current.data = fn(current.data, index)
      current = current.next
      index++
    }
  }

  find(data: T): Node<T> | void {
    if (!this.head && !this.tail) {
      return
    }

    let current = this.head

    while (current) {
      if (current.data === data) {
        return current
      }

      current = current.next
    }
  }

  findIndex(data: T): number {
    if (!this.head && !this.tail) {
      return -1
    }

    let current = this.head
    let index = 0

    while (current) {
      if (current.data === data) {
        return index
      }

      current = current.next
      index++
    }

    return -1
  }

  findAllIndicies(data: T): number[] {
    if (!this.head && !this.tail) {
      return []
    }

    let current = this.head
    let index = 0
    const indicies = []

    while (current) {
      if (current.data === data) {
        indicies.push(index)
      }

      current = current.next
      index++
    }

    return indicies
  }

  findMidpoint(): Node<T> | void {
    if (!this.head || !this.tail) {
      return
    }

    let current = this.head
    let fast = this.head

    while (current && current.next && fast && fast.next && fast.next.next) {
      current = current.next
      fast = fast.next.next
    }

    return current
  }

  findMidpointIndex(): number | void {
    if (!this.head || !this.tail) {
      return
    }

    const currentLengthOfIndicies = this.length - 1
    const midpoint = Math.floor(currentLengthOfIndicies / 2)
    return midpoint
  }

  stepBackFromTail(amountToStepBackward: number): Node<T> | void {
    if (!this.head || !this.tail) {
      return
    }

    let current = this.tail

    while (current.prev && amountToStepBackward > 0) {
      current = current.prev
      amountToStepBackward--
    }

    if (amountToStepBackward === 0) {
      return current
    }
  }

  stepForwardFromHead(amountToStepForward: number): Node<T> | void {
    if (!this.head || !this.tail) {
      return
    }

    let current = this.head

    while (current.next && amountToStepForward > 0) {
      current = current.next
      amountToStepForward--
    }

    if (amountToStepForward === 0) {
      return current
    }
  }

  isCircular(): boolean {
    if (!this.head || !this.tail) {
      return false
    }

    let current = this.head
    let fast = current.next

    while (current.next && fast && fast.next && fast.next.next) {
      current = current.next
      fast = fast.next.next

      if (current === fast) {
        return true
      }
    }

    return false
  }

  reverse(): void {
    if (!this.head && !this.tail) {
      return
    }

    let current = this.head
    let prev = null
    let next = null

    while (current) {
      prev = current.next
      next = current.prev
      current.prev = prev
      current.next = next
      current = current.prev
    }

    if (this.head) {
      const temp = this.tail
      this.tail = this.head
      this.head = temp
    }
  }

  sort(type: SortingTypes): void {
    if (!this.head && !this.tail) {
      return
    }

    let current = this.head
    let nextNode

    while (current) {
      nextNode = current.next

      while (nextNode) {
        if (type === 'asc') {
          if (nextNode.data < current.data) {
            const temp = nextNode.data
            nextNode.data = current.data
            current.data = temp
          }
        }

        if (type === 'desc') {
          if (nextNode.data > current.data) {
            const temp = nextNode.data
            nextNode.data = current.data
            current.data = temp
          }
        }

        nextNode = nextNode.next
      }

      current = current.next
    }
  }

  clear(): void {
    if (!this.head && !this.tail) {
      return
    }

    this.head = null
    this.tail = null
    this.length = 0
  }

  empty(): boolean {
    if (!this.head && !this.tail) {
      return true
    }

    return false
  }

  toString(): string {
    if (!this.head && !this.tail) {
      return ''
    }

    let listString = ''
    let current = this.head

    while (current) {
      listString += String(current.data)
      listString += ' -> '
      current = current.next
    }

    listString += 'null'
    return listString
  }

  print(): void {
    if (!this.head && !this.tail) {
      return
    }

    const listString = this.toString()
    console.log(listString)
  }

  updateIndex(data: T, index: number): boolean {
    if (!this.head && !this.tail) {
      return false
    }

    if (index < 0 || index > this.length - 1) {
      return false
    }

    const nodeAtIndex = this.getAt(index)

    if (nodeAtIndex) {
      nodeAtIndex.data = data
    }

    return true
  }

  updateOne(data: T, oldData: T): boolean {
    if (!this.head && !this.tail) {
      return false
    }

    let current = this.head

    while (current) {
      if (current.data === oldData) {
        current.data = data
        return true
      }

      current = current.next
    }

    return false
  }

  updateMany(data: T, oldData: T): number {
    if (!this.head && !this.tail) {
      return 0
    }

    let current = this.head
    let counter = 0

    while (current) {
      if (current.data === oldData) {
        current.data = data
        counter++
      }

      current = current.next
    }

    return counter
  }

  updateFirst(data: T): boolean {
    if (!this.head || !this.tail) {
      return false
    }

    this.head.data = data
    return true
  }

  updateLast(data: T): boolean {
    if (!this.head || !this.tail) {
      return false
    }

    this.tail.data = data
    return true
  }

  updateMiddle(data: T): boolean {
    if (!this.head && !this.tail) {
      return false
    }

    const middleNode = this.findMidpoint()

    if (!middleNode) {
      return false
    }

    middleNode.data = data
    return true
  }

  count(data: T): number {
    if (!this.head && !this.tail) {
      return 0
    }

    let current = this.head
    let counter = 0

    while (current) {
      if (current.data === data) {
        counter++
      }

      current = current.next
    }

    return counter
  }

  unique(): number {
    if (!this.head && !this.tail) {
      return 0
    }

    let current = this.head
    let index = 0
    let counter = 0

    while (current) {
      while (this.count(current.data) > 1) {
        this.removeAt(index)
        counter++
      }

      current = current.next
      index++
    }

    return counter
  }

  removeDuplicates(): number {
    return this.unique()
  }

  getData(): T[] | void {
    if (!this.head && !this.tail) {
      return
    }

    let current = this.head
    const data = []

    while (current) {
      data.push(current.data)
      current = current.next
    }

    return data
  }

  *[Symbol.iterator](): Generator<Node<T>> {
    let current = this.head

    while (current) {
      yield current
      current = current.next
    }
  }
}
