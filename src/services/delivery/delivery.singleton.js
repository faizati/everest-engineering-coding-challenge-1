class DeliverySingleton {
  constructor() {
    if (!DeliverySingleton.instance) {
      DeliverySingleton.instance = this;
      this.baseDeliveryCost = 0;
      this.noOfPackage = 0;
      this.pckg = [];
    }
    return DeliverySingleton.instance;
  }

  setDeliveryCost(baseDeliveryCost) {
    this.baseDeliveryCost = baseDeliveryCost;
  }

  setNoOfPackage(noOfPackage) {
    this.noOfPackage = noOfPackage;
  }

  addPackage(pckg) {
    if (this.pckg.length < this.noOfPackage) {
      this.pckg.push(pckg);
      return "Package added successfully";
    } else return "Package limit exceeded";
  }

  getAllPackages() {
    return this.pckg;
  }

  getNoOfPackage() {
    return this.noOfPackage;
  }
}

export default new DeliverySingleton();
