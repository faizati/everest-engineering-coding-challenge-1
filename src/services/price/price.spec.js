import CouponSingleton from "../coupon/coupon.singleton.js";
import { PackagePriceDiscountFacade } from "./price.js";
import DeliverySingleton from "../delivery/delivery.singleton.js";
import { ModelPackage } from "../../models/package";

const packagePriceDiscountFacade = new PackagePriceDiscountFacade(
  CouponSingleton,
  DeliverySingleton
);

describe("PackagePriceDiscountFacade Operation Testing", () => {
  test("check default delivery structure", () => {
    expect(packagePriceDiscountFacade).toEqual({
      couponSingleton: expect.any(Object),
      deliverySingleton: expect.any(Object),
    });
  });

  test("calculate package price", () => {
    DeliverySingleton.setDeliveryCost(100);
    expect(DeliverySingleton.baseDeliveryCost).toBe(100);
    DeliverySingleton.setNoOfPackage(3);
    const tempPackage = new ModelPackage("PKG001", 5, 5, "OFR001");

    const tempPackage2 = new ModelPackage("PKG002", 15, 5, "OFR002");

    const tempPackage3 = new ModelPackage("PKG003", 10, 100, "OFR003");

    DeliverySingleton.addPackage(tempPackage);
    DeliverySingleton.addPackage(tempPackage2);
    DeliverySingleton.addPackage(tempPackage3);

    const packageWithDeliveryCost = packagePriceDiscountFacade.estimatePrice();
    expect(packageWithDeliveryCost).toEqual([
      {
        packageId: "PKG001",
        weight: 5,
        distance: 5,
        couponCode: "OFR001",
        price: 175,
        discount: 0,
      },
      {
        packageId: "PKG002",
        weight: 15,
        distance: 5,
        couponCode: "OFR002",
        price: 275,
        discount: 0,
      },
      {
        packageId: "PKG003",
        weight: 10,
        distance: 100,
        couponCode: "OFR003",
        price: 665,
        discount: 35,
      },
    ]);
  });
});
