import AbstractQuestion from "./question.abstract.js";

export class Exit extends AbstractQuestion {
  constructor() {
    super();
  }

  setOption(option) {
    this.option = option;
  }
  async execute() {
    process.exit(0);
  }
}
