import { ModelPackageWithPrice } from "../../models/package.js";
import { AbstractPrice } from "./price.abstract.js";
export class PackagePriceDiscountFacade extends AbstractPrice {
  constructor(couponSingleton, deliverySingleton) {
    super();
    this.couponSingleton = couponSingleton;
    this.deliverySingleton = deliverySingleton;
  }

  calculateDeliveryCost(baseDeliveryCost, distance, weight) {
    return baseDeliveryCost + weight * 10 + distance * 5;
  }

  calculatePackagePrice(pckg, baseDeliveryCost) {
    const { distance, weight, couponCode } = pckg;
    const originalPrice = this.calculateDeliveryCost(
      baseDeliveryCost,
      distance,
      weight
    );
    const discountPercentage = this.couponSingleton.checkCouponDiscountPrice(
      couponCode,
      distance,
      weight
    );

    const discountPrice = originalPrice * (discountPercentage / 100);

    const price = originalPrice - discountPrice;
    return { price, discountPrice };
  }

  estimatePrice() {
    const listOfPackages = this.deliverySingleton.getAllPackages();
    const newPackagePrice = listOfPackages.map((pckg) => {
      const { price, discountPrice } = this.calculatePackagePrice(
        pckg,
        this.deliverySingleton.baseDeliveryCost
      );
      const packageWithPrice = new ModelPackageWithPrice(
        pckg.packageId,
        pckg.weight,
        pckg.distance,
        pckg.couponCode,
        price,
        discountPrice
      );

      return packageWithPrice;
    });
    return newPackagePrice;
  }
}


export class PackagePriceDiscountWithDeliveryTimeFacade extends PackagePriceDiscountFacade {
  constructor(couponSingleton, deliverySingleton) {
    super(couponSingleton, deliverySingleton);
  }

 
  estimatePrice() {
    const listOfPackages = super.estimatePrice();
  }
}