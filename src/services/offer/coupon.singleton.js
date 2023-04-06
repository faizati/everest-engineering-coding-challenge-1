const coupons = require("../../data/coupon/coupons.json");
const { CouponUtils } = require("../utils/coupon.util");

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

  checkCouponDiscountPrice(couponCode, distance, weight) {
    const couponCodeDetail = this.getCouponByCouponCode(couponCode);
    const { discount, distanceRange, weightRange } = couponCodeDetail;
    let discountPrice = 0;
    if (couponCodeDetail) {
      let distanceStatus = this.checkCouponEligibility(
        distance,
        distanceRange.min,
        distanceRange.max
      );
      let weightStatus = this.checkCouponEligibility(
        weight,
        weightRange.min,
        weightRange.max
      );

      if (distanceStatus && weightStatus) {
        discountPrice = discount;
      }
    }

    return discountPrice;
  }
}

exports.CouponSingleton = new CouponSingleton();
