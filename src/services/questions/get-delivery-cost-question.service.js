import AbstractQuestion from "./question.abstract.js";
import CLIServiceSingleton from "../cli/cli.singleton.js";
import DeliverySingleton from "../delivery/delivery.singleton.js";

export class GetDeliveryCosts extends AbstractQuestion {
  constructor() {
    super();
  }

  setOption(option) {
    this.option = option;
  }

  async execute() {
    DeliverySingleton.resetPackage();
    const { basePrice, noOfPackages } = await CLIServiceSingleton.prompt([
      {
        type: "input",
        name: "basePrice",
        message: "Please Enter the base delivery cost",
        validate: function (value) {
          if (value.length && typeof parseInt(value) == "number") {
            return true;
          } else {
            return "Please enter the base delivery cost";
          }
        },
      },
      {
        type: "input",
        name: "noOfPackages",
        message: "Please Enter the no of packages",
        validate: function (value) {
          if (value.length && typeof parseInt(value) == "number") {
            return true;
          } else {
            return "Please enter the no of packages";
          }
        },
      },
    ]);

    DeliverySingleton.setDeliveryCost(Number(basePrice));
    DeliverySingleton.setNoOfPackage(Number(noOfPackages));
    return "Get Package Detail";
  }
}
