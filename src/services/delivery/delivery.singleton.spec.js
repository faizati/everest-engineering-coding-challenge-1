import { ModelPackage } from "../../models/package.js";
import DeliverySingleton from "./delivery.singleton.js";

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
    const tempPackage = new ModelPackage("PKG001", 10, 100, "OFR001");

    const tempPackage2 = new ModelPackage("PKG002", 10, 100, "OFR002");

    const result = DeliverySingleton.addPackage(tempPackage);
    expect(result).toBe("Package added successfully");
    const result2 = DeliverySingleton.addPackage(tempPackage2);
    expect(result2).toBe("Package limit exceeded");
    expect(DeliverySingleton.pckg).toHaveLength(1);
    expect(DeliverySingleton.pckg[0]).toEqual(tempPackage);
  });
});
