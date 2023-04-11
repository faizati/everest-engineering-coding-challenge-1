export class AbstractPrice {
  constructor() {
    if (this.constructor == AbstractPrice) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  estimatePrice() {
    throw new Error("Method 'estimatePrice()' must be implemented.");
  }
}
