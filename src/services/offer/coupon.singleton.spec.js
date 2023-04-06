const { CouponSingleton } = require("./coupon.singleton");

describe("Coupon Singleton Unit Testing", () => {
  test("check default length of coupon", () => {
    const coupons = CouponSingleton.getAllCoupons();
    expect(Object.keys(coupons)).toHaveLength(3);
  });

  test("check list of coupon code", () => {
    const coupons = CouponSingleton.getAllCoupons();
    expect(coupons).toEqual({
      OFR001: {
        discount: 10,
        distanceRange: { min: 0, max: 200 },
        weightRange: { min: 70, max: 200 },
      },
      OFR002: {
        discount: 7,
        distanceRange: { min: 50, max: 150 },
        weightRange: { min: 100, max: 250 },
      },
      OFR003: {
        discount: 5,
        distanceRange: { min: 50, max: 250 },
        weightRange: { min: 10, max: 150 },
      },
    });
  });

  test("find coupon code", () => {
    const couponCode = CouponSingleton.getCouponByCouponCode("OFR001");
    expect(couponCode).toEqual({
      discount: 10,
      distanceRange: { min: 0, max: 200 },
      weightRange: { min: 70, max: 200 },
    });
  });
});
