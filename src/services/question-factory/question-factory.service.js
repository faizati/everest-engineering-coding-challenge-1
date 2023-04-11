import { AddCoupon } from "../questions/add-coupon-question.service.js";
import { Exit } from "../questions/exit-question.service.js";
import { GetAllCoupons } from "../questions/get-all-coupons.service.js";
import { GetDeliveryCosts } from "../questions/get-delivery-cost-question.service.js";
import { GetPackageDetail } from "../questions/get-package-detail-question.service.js";
import { MenuQuestion } from "../questions/menu-question.service.js";

export class QuestionFactory {
  static createQuestion(questionType) {
    switch (questionType) {
      case "getDeliveryCost":
        return new GetDeliveryCosts();
      case "getPackageDetail":
        return new GetPackageDetail();
      case "addCoupon":
        return new AddCoupon();
      case "getCoupons":
        return new GetAllCoupons();
      case "exit":
        return new Exit();
      default:
        return new MenuQuestion();
    }
  }
}
