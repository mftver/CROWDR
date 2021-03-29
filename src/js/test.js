export default class Test {
  constructor() {
    this.counter = 0;
  }

  counter() {
    this.counter += 1;

    return this.counter;
  }

  anotherCounter() {
    this.count();
  }
}
