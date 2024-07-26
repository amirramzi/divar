const { Router } = require("express");
const provinceController = require("./province.controller");

const router = Router();

router.get("/", provinceController.find);
router.get("/cities/:id?", provinceController.findCities);
router.get("/:id", provinceController.findByProvince);

module.exports = {
  ProvinceRoutes: router,
};
