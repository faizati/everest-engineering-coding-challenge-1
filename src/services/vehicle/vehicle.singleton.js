export class VehicleSingleton {
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
    }));
  }

  getVehicleMaxCarryWeight() {
    return this.vehicles[0]?.maxCarryWeight || 0;
  }

  getVehicleMaxSpeed() {
    return this.vehicles[0]?.maxSpeed || 0;
  }
}
