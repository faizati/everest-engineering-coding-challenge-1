import AbstractQuestion from "./question.abstract.js";
import CLIServiceSingleton from "../cli/cli.singleton.js";

export class MenuQuestion extends AbstractQuestion {
  constructor() {
    super();
  }

  setOption(option) {
    this.option = option;
  }

  async execute() {
    const { option } = await CLIServiceSingleton.prompt([
      {
        type: "list",
        name: "option",
        message: "Please select below option",
        choices: [
          "Calculate Delivery Cost",
          "Get Coupons",
          "Add New Coupon",
          "Exit",
        ],
      },
    ]);
    return option;
  }
}
