import AbstractQuestion from "./question.abstract.js";
import CLIServiceSingleton from "../cli/cli.singleton.js";
import Table from "cli-table3";
import CouponSingleton from "../coupon/coupon.singleton.js";

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
