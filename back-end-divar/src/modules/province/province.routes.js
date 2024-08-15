const { Router } = require("express");
const provinceController = require("./province.controller");

const router = Router();

router.get("/", provinceController.finds);
router.post("/cities", provinceController.find);
router.get("/cities/:id?", provinceController.findCities);
router.get("/:id", provinceController.findByProvince);

module.exports = {
  ProvinceRoutes: router,
};
