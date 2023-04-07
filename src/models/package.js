class ModelPackage {
  constructor(packageId, weight, distance, couponCode) {
    this.packageId = packageId;
    this.weight = weight;
    this.distance = distance;
    this.couponCode = couponCode;
  }
}

class ModelPackageWithPrice extends ModelPackage {
  constructor(packageId, weight, distance, couponCode, price) {
    super(packageId, weight, distance, couponCode);
    this.price = price;
  }
}

exports.ModelPackage = ModelPackage;
exports.ModelPackageWithPrice = ModelPackageWithPrice;
