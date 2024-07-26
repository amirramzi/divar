const { Router } = require("express");
const categoryController = require("./category.controller");

const router = Router();
router.post("/", categoryController.create);
router.get("/", categoryController.find);
router.get("/step-by-step", categoryController.findStepByStep);
router.delete("/:id", categoryController.remove);
router.put("/:id", categoryController.update);
module.exports = { CategoryRouter: router };
