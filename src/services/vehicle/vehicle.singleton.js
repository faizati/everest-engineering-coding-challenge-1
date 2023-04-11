import {
  ModelPackageWithPrice,
  ModelPackageWithPriceWithDeliveryTime,
} from "../../models/package.js";

Number.prototype.toFixedNoRound = function(precision = 1) {
  const factor = Math.pow(10, precision);
  return Math.floor(this * factor) / factor;
}

class VehicleSingleton {
  constructor() {
    if (!VehicleSingleton.instance) {
      VehicleSingleton.instance = this;
      this.vehicles = [];
    }
    return VehicleSingleton.instance;
  }

  createVehicle(numOfVehicle, vehicleMaxSpeed, vehicleMaxCarryWeight) {
    this.vehicles = Array.from({ length: numOfVehicle }, (_, index) => ({
      id: `Vehicle ${(index < 10 ? "0" : "") + (index + 1)}`,
      maxSpeed: vehicleMaxSpeed,
      maxCarryWeight: vehicleMaxCarryWeight,
      packages: [],
      currentTime: 0,
    }));
  }

  getVehicleMaxCarryWeight() {
    return this.vehicles[0]?.maxCarryWeight || 0;
  }

  getVehicleMaxSpeed() {
    return this.vehicles[0]?.maxSpeed || 0;
  }

  getEarlistVehicleAvailability() {
    return this.vehicles.reduce((acc, curr) => {
      if (acc.currentTime < curr.currentTime) {
        return acc;
      }
      return curr;
    });
  }

  estimateDeliveryTime(shipments) {
    const vehicleMaxSpeed = this.getVehicleMaxSpeed();
    let tempShipments = [...shipments];
    let newPackages = [];
    while (tempShipments.length > 0) {
      const shipment = tempShipments.shift();

      const { pairs, weight } = shipment;
      const vehicle = this.getEarlistVehicleAvailability();
      let totalTime = vehicle.currentTime;
      pairs.forEach((pair) => {
        const deliveryTime = Number(
          Number(pair.distance / vehicleMaxSpeed) + Number(vehicle.currentTime)
        ).toFixedNoRound(2);
        if (Number(deliveryTime) > totalTime) {
          totalTime = Number(deliveryTime);
        }
        const { packageId, weight, distance, couponCode, price, discount } =
          pair;
        const tempPackage = new ModelPackageWithPriceWithDeliveryTime(
          packageId,
          weight,
          distance,
          couponCode,
          price,
          discount,
          deliveryTime
        );
        newPackages.push(tempPackage);
      });
      vehicle.currentTime = totalTime * 2;
    }

    newPackages.sort((a, b) => a.packageId - b.packageId);

    return newPackages;
  }
}

export default new VehicleSingleton();
