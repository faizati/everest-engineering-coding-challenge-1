import { ModelPackage } from "../../models/package.js";
import CLIServiceSingleton from "../cli/cli.singleton.js";
import CouponSingleton from "../coupon/coupon.singleton.js";
import DeliverySingleton from "../delivery/delivery.singleton.js";
import { PackagePriceDiscountFacade } from "../price/price.js";
import { ShipmentsService } from "../shipment/shipment.service.js";
import VehicleSingleton from "../vehicle/vehicle.singleton.js";
import AbstractQuestion from "./question.abstract.js";
import Table from "cli-table3";

export class QuestionCommander {
  constructor() {
    this.questions = {};
  }

  addQuestion(monitorQuestion, question) {
    this.questions[monitorQuestion] = question;
  }

  async runCLIQuestion(option) {
    let question = this.questions[option];
    if (question) {
      question.setOption(option);
      const answer = await question.execute();
      this.runCLIQuestion(answer);
    } else {
      this.runCLIQuestion("default");
    }
  }
}
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

export class GetDeliveryCosts extends AbstractQuestion {
  constructor() {
    super();
  }

  setOption(option) {
    this.option = option;
  }

  async execute() {
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

export class GetPackageDetail extends AbstractQuestion {
  constructor() {
    super();
  }

  setOption(option) {
    this.option = option;
  }

  async execute() {
    const noOfPackage = DeliverySingleton.getNoOfPackage();
    for (let i = 0; i < noOfPackage; i++) {
      const { pckgId, weight, distance, couponCode } =
        await CLIServiceSingleton.prompt([
          {
            name: "pckgId",
            type: "input",
            message: "Enter Package Id",
            validate: function (value) {
              if (value.length) {
                return true;
              } else {
                return "Please enter the Package ID";
              }
            },
          },
          {
            name: "weight",
            type: "input",
            message: "Enter Package Weight in KG",
            validate: function (value) {
              if (value.length && typeof parseInt(value) == "number") {
                return true;
              } else {
                return "Please enter the valid Package Weight";
              }
            },
          },
          {
            name: "distance",
            type: "input",
            message: "Enter Package Distance in KM",
            validate: function (value) {
              if (value.length && typeof parseInt(value) == "number") {
                return true;
              } else {
                return "Please enter the valid Package Distance";
              }
            },
          },
          {
            name: "couponCode",
            type: "input",
            message: "Enter Coupon Code",
          },
        ]);
      const newPackage = new ModelPackage(
        pckgId,
        Number(weight),
        Number(distance),
        couponCode
      );

      DeliverySingleton.addPackage(newPackage);
    }

    const packagePriceDiscountFacade = new PackagePriceDiscountFacade(
      CouponSingleton,
      DeliverySingleton
    );

    const packagesWithPrice = packagePriceDiscountFacade.estimatePrice();

    const { calculateDeliveryTime } = await CLIServiceSingleton.prompt([
      {
        type: "input",
        name: "calculateDeliveryTime",
        message: "Calculate delivery time? (Y/N)",
        validate: function (value) {
          if (
            value.length &&
            (value.toLowerCase() == "y" || value.toLowerCase() == "n")
          ) {
            return true;
          } else {
            return "Please enter either Y or N";
          }
        },
      },
    ]);

    if (calculateDeliveryTime.toLowerCase() == "n") {
      const table = new Table({
        head: ["Package Id", "Package Discount", "Package Price"],
        colWidths: [15, 18, 18],
        wordWrap: true,
      });
      packagesWithPrice.forEach((pckg) => {
        table.push([pckg.packageId, pckg.discount, pckg.price]);
      });
      console.log(table.toString());
    } else {
      const { noOfVehicles, vehicleMaxSpeed, vehicleMaxCarryWeight } =
        await CLIServiceSingleton.prompt([
          {
            type: "input",
            name: "noOfVehicles",
            message: "Number of vehicles?",
            validate: function (value) {
              if (value.length && typeof parseInt(value) == "number") {
                return true;
              } else {
                return "Please enter the number of vehicles";
              }
            },
          },
          {
            type: "input",
            name: "vehicleMaxSpeed",
            message: "Vehicle max speed?",
            validate: function (value) {
              if (value.length && typeof parseInt(value) == "number") {
                return true;
              } else {
                return "Please enter the vehicle max speed";
              }
            },
          },
          {
            type: "input",
            name: "vehicleMaxCarryWeight",
            message: "Vehicle max carry weight?",
            validate: function (value) {
              if (value.length && typeof parseInt(value) == "number") {
                return true;
              } else {
                return "Please enter the vehicle max carry weight";
              }
            },
          },
        ]);

      VehicleSingleton.createVehicle(
        noOfVehicles,
        vehicleMaxSpeed,
        vehicleMaxCarryWeight
      );
      const shipmentLists = ShipmentsService.getShipmentList(
        packagesWithPrice,
        vehicleMaxCarryWeight
      );

      const packagesWithDeliveryTime =
        VehicleSingleton.estimateDeliveryTime(shipmentLists);
      const table = new Table({
        head: [
          "Package Id",
          "Package Discount",
          "Package Price",
          "Delivery Time",
        ],
        colWidths: [15, 18, 18, 18],
        wordWrap: true,
      });

      packagesWithDeliveryTime.sort((a, b) => a.packageId - b.packageId);

      packagesWithDeliveryTime.forEach((pckg) => {
        table.push([
          pckg.packageId,
          pckg.discount,
          pckg.price,
          pckg.deliveryTime,
        ]);
      });
      console.log(table.toString());
    }

    return "Default";
  }
}

export class GetAllCoupons extends AbstractQuestion {
  constructor() {
    super();
  }

  setOption(option) {
    this.option = option;
  }

  async execute() {
    const coupons = CouponSingleton.getAllCoupons();
    const table = new Table({
      head: ["Coupon Code", "Discount", "Weight", "Distance"],
      colWidths: [15, 18, 18],
      wordWrap: true,
    });
    Object.keys(coupons).forEach((key) => {
      table.push([
        key,
        coupons[key].discount,
        `${coupons[key].weightRange.min} - ${coupons[key].weightRange.max}`,
        `${coupons[key].distanceRange.min} - ${coupons[key].distanceRange.max}`,
      ]);
    });

    console.log(table.toString());
    return "default";
  }
}

export class AddCoupon extends AbstractQuestion {
  constructor() {
    super();
  }

  setOption(option) {
    this.option = option;
  }

  async execute() {
    const {
      couponId,
      discount,
      minDistanceRange,
      maxDistanceRange,
      minWeightRange,
      maxWeightRange,
    } = await CLIServiceSingleton.prompt([
      {
        type: "input",
        name: "couponId",
        message: "Please Enter the coupon id",
        validate: function (value) {
          if (value.length > 0) {
            return true;
          } else {
            return "Please enter the coupon id";
          }
        },
      },
      {
        type: "input",
        name: "discount",
        message: "Please enter discount percentage",
        validate: function (value) {
          if (value.length && typeof parseInt(value) == "number") {
            return true;
          } else {
            return "Please enter the discount percentage";
          }
        },
      },
      {
        type: "input",
        name: "minDistanceRange",
        message: "Please enter minimum distance range",
        validate: function (value) {
          if (value.length && typeof parseInt(value) == "number") {
            return true;
          } else {
            return "Please enter the min distance range";
          }
        },
      },
      {
        type: "input",
        name: "maxDistanceRange",
        message: "Please enter maximum distance range",
        validate: function (value) {
          if (value.length && typeof parseInt(value) == "number") {
            return true;
          } else {
            return "Please enter the maximum distance range";
          }
        },
      },
      {
        type: "input",
        name: "minWeightRange",
        message: "Please enter minimum weight range",
        validate: function (value) {
          if (value.length && typeof parseInt(value) == "number") {
            return true;
          } else {
            return "Please enter the min weight range";
          }
        },
      },
      {
        type: "input",
        name: "maxWeightRange",
        message: "Please enter maximum weight range",
        validate: function (value) {
          if (value.length && typeof parseInt(value) == "number") {
            return true;
          } else {
            return "Please enter the maximum weight range";
          }
        },
      },
    ]);
    CouponSingleton.addCoupon(couponId, {
      discount,
      distanceRange: { min: minDistanceRange, max: maxDistanceRange },
      weightRange: { min: minWeightRange, max: maxWeightRange },
    });

    const coupons = CouponSingleton.getAllCoupons();
    const table = new Table({
      head: ["Coupon Code", "Discount", "Weight", "Distance"],
      colWidths: [15, 18, 18],
      wordWrap: true,
    });
    Object.keys(coupons).forEach((key) => {
      table.push([
        key,
        coupons[key].discount,
        `${coupons[key].weightRange.min} - ${coupons[key].weightRange.max}`,
        `${coupons[key].distanceRange.min} - ${coupons[key].distanceRange.max}`,
      ]);
    });

    console.log(table.toString());
    return "default";
  }
}
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
