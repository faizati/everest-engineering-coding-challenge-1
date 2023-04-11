import Table from "cli-table3";
import couponSingleton from "../coupon/coupon.singleton.js";
import AbstractQuestion from "./question.abstract.js";

export class GetAllCoupons extends AbstractQuestion {
  constructor() {
    super();
  }

  setOption(option) {
    this.option = option;
  }

  async execute() {
    const coupons = couponSingleton.getAllCoupons();
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
