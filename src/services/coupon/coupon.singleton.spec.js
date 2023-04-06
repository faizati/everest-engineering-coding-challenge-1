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

  test("check coupon discount eligibility", () => {
    const discountPrice = CouponSingleton.checkCouponDiscountPrice(
      "OFR001",
      100,
      100
    );
    expect(discountPrice).toEqual(10);
  });

  test("check coupon no discount eligibility", () => {
    const discountPrice = CouponSingleton.checkCouponDiscountPrice(
      "OFR001",
      1000,
      100
    );
    expect(discountPrice).toEqual(0);
  });

  test("add offer codes", () => {
    CouponSingleton.addCoupon("OFR004", {
      discount: 7,
      distanceRange: { min: 50, max: 150 },
      weightRange: { min: 100, max: 250 },
    });
    const coupons = CouponSingleton.getAllCoupons();
    expect(Object.keys(coupons)).toHaveLength(4);
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
      OFR004: {
        discount: 7,
        distanceRange: { min: 50, max: 150 },
        weightRange: { min: 100, max: 250 },
      },
    });
  });
});
