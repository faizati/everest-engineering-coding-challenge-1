const coupons = require("../../data/coupon/coupons.json");

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
}

exports.CouponSingleton = new CouponSingleton();
