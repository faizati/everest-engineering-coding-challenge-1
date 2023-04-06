const { ModelPackage } = require("../../models/package");
const { DeliverySingleton } = require("./delivery.singleton");

describe("Delivery Singleton Unit Testing", () => {
  test("check default delivery structure", () => {
    expect(DeliverySingleton).toEqual({
      baseDeliveryCost: 0,
      noOfPackage: 0,
      pckg: [],
    });
  });

  test("set base delivery costs", () => {
    DeliverySingleton.setDeliveryCost(10);
    expect(DeliverySingleton.baseDeliveryCost).toBe(10);
  });

  test("set base delivery costs", () => {
    DeliverySingleton.setDeliveryCost(10);
    expect(DeliverySingleton.baseDeliveryCost).toBe(10);
  });

  test("add package", () => {
    DeliverySingleton.setNoOfPackage(1);
    const tempPackage = new ModelPackage({
      id: "PKG001",
      weight: 10,
      distance: 100,
    });

    const tempPackage2 = new ModelPackage({
      id: "PKG002",
      weight: 10,
      distance: 100,
    });

    const result = DeliverySingleton.addPackage(tempPackage);
    expect(result).toBe("Package added successfully");
    const result2 = DeliverySingleton.addPackage(tempPackage2);
    expect(result2).toBe("Package limit exceeded");
    expect(DeliverySingleton.pckg).toHaveLength(1);
    expect(DeliverySingleton.pckg[0]).toEqual(tempPackage);
  });
});
