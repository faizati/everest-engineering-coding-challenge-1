import coupons from "../../data/coupon/coupons.json" assert { type: "json" };
import { CouponUtils } from "../utils/coupon.util.js";

class CouponSingleton {
  constructor() {
    if (!CouponSingleton.instance) {
      CouponSingleton.instance = this;
      this.coupons = coupons;
    }
    return CouponSingleton.instance;
  }

  getAllCoupons() {
    return this.coupons;
  }

  getCouponByCouponCode(couponCode) {
    return this.coupons[couponCode];
  }

  checkCouponEligibility(value, min, max) {
    return CouponUtils.checkCouponCriteria(value, min, max);
  }

  checkDistanceAndWeightStatus(distance, distanceRange, weight, weightRange) {
    const distanceStatus = this.checkCouponEligibility(
      distance,
      distanceRange.min,
      distanceRange.max
    );
    const weightStatus = this.checkCouponEligibility(
      weight,
      weightRange.min,
      weightRange.max
    );

    return distanceStatus && weightStatus;
  }

  checkCouponDiscountPrice(couponCode, distance, weight) {
    const couponCodeDetail = this.getCouponByCouponCode(couponCode);
    const { discount, distanceRange, weightRange } = couponCodeDetail;
    let discountPrice = 0;
    if (couponCodeDetail) {
      if (
        this.checkDistanceAndWeightStatus(
          distance,
          distanceRange,
          weight,
          weightRange
        )
      ) {
        discountPrice = discount;
      }
    }

    return discountPrice;
  }

  addCoupon(couponCode, couponDetail) {
    this.coupons[couponCode] = couponDetail;
  }
}

export default new CouponSingleton();
