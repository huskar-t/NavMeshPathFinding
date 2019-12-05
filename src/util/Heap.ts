export class HeapIterator implements Iterator<null> {
    _values: Array<any>;
    _length: number;
    _cursor: number;

    constructor(heap: Heap) {
        this._values = heap.toArray();
        this._length = this._values.length;
        this._cursor = 0;
    }

    get data(): any {
        return this._values[this._cursor];
    }

    set data(obj: any) {
        this._values[this._cursor] = obj;
    }

    start() {
        this._cursor = 0;
    }

    hasNext(): Boolean {
        return this._cursor < this._length;
    }

    next(): any {
        return this._values[this._cursor++];
    }
}


export class Heap {
    _heap: Array<any>;

    _size: number;
    _count: number;
    _compare: Function;

    /**
     * Initializes a new heap.
     *
     * @param size The heap's maximum capacity.
     * @param compare A comparison function for sorting the heap's data.
     *                If no function is passed, the heap uses a function for
     *                comparing numbers.
     */
    constructor(size: number, compare: Function = null) {
        this._heap = new Array(this._size = size + 1);
        this._count = 0;

        if (compare == null)
            this._compare = function (a: number, b: number): number {
                return a - b;
            };
        else
            this._compare = compare;
    }

    /**
     * The heap's front item.
     */
    peek(): any {
        return this._heap[1];
    }

    /**
     * The heap's maximum capacity.
     */
    maxSize(): number {
        return this._size;
    }

    /**
     * add some data.
     *
     * @param obj The data to enqueue.
     * @return False if the queue is full, otherwise true.
     */
    put(obj: any): Boolean {
        if (this._count + 1 < this._size) {
            this._heap[++this._count] = obj;

            let i: number = this._count;
            let parent: number = i >> 1;	// = i / 2
            let tmp: any = this._heap[i];
            let v: any;

            if (this._compare != null) {
                while (parent > 0) {
                    v = this._heap[parent];
                    if (this._compare(tmp, v) > 0) {
                        this._heap[i] = v;
                        i = parent;
                        parent >>= 1;
                    } else break;
                }
            } else {
                while (parent > 0) {
                    v = this._heap[parent];
                    if (tmp - v > 0) {
                        this._heap[i] = v;
                        i = parent;
                        parent >>= 1;
                    } else break;
                }
            }

            this._heap[i] = tmp;
            return true;
        }
        return false;
    }

    /**
     * Dequeues and returns the front item.
     *
     * @return The heap's front item or null if it is empty.
     */
    pop(): any {
        if (this._count >= 1) {
            let o: any = this._heap[1];

            this._heap[1] = this._heap[this._count];
            delete this._heap[this._count];

            let i: number = 1;
            let child: number = i << 1;
            let tmp: any = this._heap[i];
            let v: any;

            if (this._compare != null) {
                while (child < this._count) {
                    if (child < this._count - 1) {
                        if (this._compare(this._heap[child], this._heap[child + 1]) < 0)
                            child++;
                    }
                    v = this._heap[child];
                    if (this._compare(tmp, v) < 0) {
                        this._heap[i] = v;
                        i = child;
                        child <<= 1;
                    } else break;
                }
            } else {
                while (child < this._count) {
                    if (child < this._count - 1) {
                        if (this._heap[child] - this._heap[child + 1] < 0)
                            child++;
                    }
                    v = this._heap[child];
                    if (tmp - v < 0) {
                        this._heap[i] = v;
                        i = child;
                        child <<= 1;
                    } else break;
                }
            }
            this._heap[i] = tmp;

            this._count--;
            return o;
        }
        return null;
    }

    /**
     * Checks if a given item exists.
     *
     * @return True if the item is found, otherwise false.
     */
    contains(obj: any): Boolean {
        for (let i: number = 1; i <= this._count; i++) {
            if (this._heap[i] === obj)
                return true;
        }
        return false;
    }

    /**
     * @inheritDoc
     */
    clear() {
        this._heap = new Array(this._size);
        this._count = 0;
    }

    /**
     * @inheritDoc
     */
    getIterator(): Iterator<null> {
        return new HeapIterator(this);
    }

    /**
     * @inheritDoc
     */
    get size(): number {
        return this._count;
    }

    /**
     * @inheritDoc
     */
    isEmpty(): Boolean {
        return false;
    }

    /**
     * @inheritDoc
     */

    toArray(): Array<any> {
        return this._heap.slice(1, this._count + 1);
    }

    /**
     * Prints out a string representing the current object.
     *
     * @return A string representing the current object.
     */
    toString(): String {
        return "[Heap, size=" + this._size + "]";
    }

    /**
     * Prints out all elements (for debug/demo purposes).
     *
     * @return A human-readable representation of the structure.
     */

    dump(): String {
        let s: String = "Heap\n{\n";
        let k: number = this._count + 1;
        for (let i: number = 1; i < k; i++)
            s += "\t" + this._heap[i] + "\n";
        s += "\n}";
        return s;
    }
}