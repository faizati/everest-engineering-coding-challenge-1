class CouponUtils {
  static checkCouponCriteria(value, min, max) {
    return value >= min && value <= max;
  }
}

exports.CouponUtils = CouponUtils;
