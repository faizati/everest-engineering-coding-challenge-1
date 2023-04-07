export default class AbstractQuestion {
  constructor() {
    if (this.constructor == AbstractQuestion) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  setOption(option) {
    throw new Error("Method 'setOption()' must be implemented.");
  }
  async execute() {
    throw new Error("Method 'execute()' must be implemented.");
  }
}
