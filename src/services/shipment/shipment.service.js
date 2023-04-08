export class ShipmentsService {
  static getShipmentList(packages, maxCarryWeight = 200) {
    const subsets = [];

    // Generate all possible subsets of packages
    for (let i = 0; i < 1 << packages.length; i++) {
      const subset = [];
      let weight = 0;

      for (let j = 0; j < packages.length; j++) {
        if (i & (1 << j)) {
          subset.push(packages[j]);
          weight += packages[j].weight;
        }
      }

      // Only consider subsets whose weight is less than or equal to 200
      if (weight <= maxCarryWeight && weight > 0) {
        subsets.push({ pairs: subset.map((p) => p), weight });
      }
    }

    // Sort subsets by weight in descending order
    subsets.sort((a, b) => b.weight - a.weight);

    // Remove packages that appear in higher-weighted subsets
    const uniquePackages = new Set();
    const result = [];

    for (const subset of subsets) {
      const { pairs } = subset;
      let shouldAdd = true;

      for (const pkg of pairs) {
        if (uniquePackages.has(pkg)) {
          shouldAdd = false;
          break;
        }
      }

      if (shouldAdd) {
        for (const pkg of pairs) {
          uniquePackages.add(pkg);
        }

        result.push(subset);
      }
    }

    return result;
  }
}

console.log(
  ShipmentsService.getShipmentList([
    {
      id: "PKG1",
      weight: 50,
      distance: 30,
      discountValue: 0,
      totalCost: 175,
      estimateTimeDelivery: 0,
    },
    {
      id: "PKG2",
      weight: 75,
      distance: 125,
      discountValue: 0,
      totalCost: 275,
      estimateTimeDelivery: 0,
    },
    {
      id: "PKG3",
      weight: 175,
      distance: 100,
      discountValue: 35,
      totalCost: 665,
      estimateTimeDelivery: 0,
    },
    {
      id: "PKG4",
      weight: 110,
      distance: 60,
      discountValue: 0,
      totalCost: 275,
      estimateTimeDelivery: 0,
    },
    {
      id: "PKG5",
      weight: 155,
      distance: 95,
      discountValue: 35,
      totalCost: 665,
      estimateTimeDelivery: 0,
    },
  ])
);
