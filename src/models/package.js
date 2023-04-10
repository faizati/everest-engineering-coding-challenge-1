export class ModelPackage {
  constructor(packageId, weight, distance, couponCode) {
    this.packageId = packageId;
    this.weight = weight;
    this.distance = distance;
    this.couponCode = couponCode;
  }
}

export class ModelPackageWithPrice extends ModelPackage {
  constructor(packageId, weight, distance, couponCode, price, discount) {
    super(packageId, weight, distance, couponCode);
    this.price = price;
    this.discount = discount;
  }
}


export class ModelPackageWithPriceWithDeliveryTime extends ModelPackageWithPrice {
  constructor(
    packageId,
    weight,
    distance,
    couponCode,
    price,
    discount,
    deliveryTime
  ) {
    super(packageId, weight, distance, couponCode, price, discount);
    this.deliveryTime = deliveryTime;
  }
}