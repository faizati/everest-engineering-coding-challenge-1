import DeliverySingleton from "../delivery/delivery.singleton.js";
import AbstractQuestion from "./question.abstract.js";
import CLIServiceSingleton from "../cli/cli.singleton.js";
import { ModelPackage } from "../../models/package.js";
import { PackagePriceDiscountFacade } from "../price/price.js";
import VehicleSingleton from "../vehicle/vehicle.singleton.js";
import { ShipmentsService } from "../shipment/shipment.service.js";
import CouponSingleton from "../coupon/coupon.singleton.js";
import Table from "cli-table3";

export class GetPackageDetail extends AbstractQuestion {
  constructor() {
    super();
  }

  setOption(option) {
    this.option = option;
  }

  async execute() {
    const noOfPackage = DeliverySingleton.getNoOfPackage();
    for (let i = 0; i < noOfPackage; i++) {
      const { pckgId, weight, distance, couponCode } =
        await CLIServiceSingleton.prompt([
          {
            name: "pckgId",
            type: "input",
            message: "Enter Package Id",
            validate: function (value) {
              if (value.length) {
                return true;
              } else {
                return "Please enter the Package ID";
              }
            },
          },
          {
            name: "weight",
            type: "input",
            message: "Enter Package Weight in KG",
            validate: function (value) {
              if (value.length && typeof parseInt(value) == "number") {
                return true;
              } else {
                return "Please enter the valid Package Weight";
              }
            },
          },
          {
            name: "distance",
            type: "input",
            message: "Enter Package Distance in KM",
            validate: function (value) {
              if (value.length && typeof parseInt(value) == "number") {
                return true;
              } else {
                return "Please enter the valid Package Distance";
              }
            },
          },
          {
            name: "couponCode",
            type: "input",
            message: "Enter Coupon Code",
          },
        ]);
      const newPackage = new ModelPackage(
        pckgId,
        Number(weight),
        Number(distance),
        couponCode
      );

      DeliverySingleton.addPackage(newPackage);
    }

    const packagePriceDiscountFacade = new PackagePriceDiscountFacade(
      CouponSingleton,
      DeliverySingleton
    );

    const packagesWithPrice = packagePriceDiscountFacade.estimatePrice();

    const { calculateDeliveryTime } = await CLIServiceSingleton.prompt([
      {
        type: "input",
        name: "calculateDeliveryTime",
        message: "Calculate delivery time? (Y/N)",
        validate: function (value) {
          if (
            value.length &&
            (value.toLowerCase() == "y" || value.toLowerCase() == "n")
          ) {
            return true;
          } else {
            return "Please enter either Y or N";
          }
        },
      },
    ]);

    if (calculateDeliveryTime.toLowerCase() == "n") {
      const table = new Table({
        head: ["Package Id", "Package Discount", "Package Price"],
        colWidths: [15, 18, 18],
        wordWrap: true,
      });
      packagesWithPrice.forEach((pckg) => {
        table.push([pckg.packageId, pckg.discount, pckg.price]);
      });
      console.log(table.toString());
    } else {
      const { noOfVehicles, vehicleMaxSpeed, vehicleMaxCarryWeight } =
        await CLIServiceSingleton.prompt([
          {
            type: "input",
            name: "noOfVehicles",
            message: "Number of vehicles?",
            validate: function (value) {
              if (value.length && typeof parseInt(value) == "number") {
                return true;
              } else {
                return "Please enter the number of vehicles";
              }
            },
          },
          {
            type: "input",
            name: "vehicleMaxSpeed",
            message: "Vehicle max speed?",
            validate: function (value) {
              if (value.length && typeof parseInt(value) == "number") {
                return true;
              } else {
                return "Please enter the vehicle max speed";
              }
            },
          },
          {
            type: "input",
            name: "vehicleMaxCarryWeight",
            message: "Vehicle max carry weight?",
            validate: function (value) {
              if (value.length && typeof parseInt(value) == "number") {
                return true;
              } else {
                return "Please enter the vehicle max carry weight";
              }
            },
          },
        ]);

      VehicleSingleton.createVehicle(
        noOfVehicles,
        vehicleMaxSpeed,
        vehicleMaxCarryWeight
      );
      const shipmentLists = ShipmentsService.getShipmentList(
        packagesWithPrice,
        vehicleMaxCarryWeight
      );

      const packagesWithDeliveryTime =
        VehicleSingleton.estimateDeliveryTime(shipmentLists);
      const table = new Table({
        head: [
          "Package Id",
          "Package Discount",
          "Package Price",
          "Delivery Time",
        ],
        colWidths: [15, 18, 18, 18],
        wordWrap: true,
      });

      packagesWithDeliveryTime.sort((a, b) => a.packageId - b.packageId);

      packagesWithDeliveryTime.forEach((pckg) => {
        table.push([
          pckg.packageId,
          pckg.discount,
          pckg.price,
          pckg.deliveryTime,
        ]);
      });
      console.log(table.toString());
    }

    return "Default";
  }
}
