export class CircularBuffer<T> {
    private buffer: Array<T | null>;
    private head: number;
    private tail: number;
    private capacity: number;

    constructor(size: number, initialArray?: T[]) {
        this.capacity = size;
        this.buffer = new Array<T | null>(size).fill(null);
        this.head = 0;
        this.tail = 0;

        if (initialArray) {
            for (let item of initialArray) {
                this.append(item);
            }
        }
    }

    append(item: T): void {
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        if (this.tail === this.head) {
            this.head = (this.head + 1) % this.capacity;
        }
    }

    get(index: number): T | null {
        if (index >= this.capacity) {
            throw new Error("Index out of bounds");
        }
        const realIndex = (this.head + index) % this.capacity;
        return this.buffer[realIndex];
    }

    indexOf(item: T): number {
        for (let i = 0; i < this.capacity; i++) {
            if (this.buffer[(this.head + i) % this.capacity] === item) {
                return i;
            }
        }
        return -1; // Return -1 if the item is not found
    }

    rotate(steps: number): CircularBuffer<T> {
        const newBuffer = new CircularBuffer<T>(this.capacity);
        newBuffer.buffer = [...this.buffer];
        newBuffer.head = (this.head + steps + this.capacity) % this.capacity;
        newBuffer.tail = this.tail; // Keep the tail the same since we're just rotating

        return newBuffer;
    }

    toArray(): Array<T | null> {
        return Array.from({ length: this.capacity }, (_, i) => this.get(i));
    }
}