const { Router } = require("express");
const categoryController = require("./category.controller");
const AdminAuthorization = require("../../common/guard/admin.authorization.guard");

const router = Router();
router.post("/", AdminAuthorization, categoryController.create);
router.get("/", categoryController.find);
router.get("/step-by-step", categoryController.findStepByStep);
router.get("/last-category", categoryController.findLastCategory);
router.delete("/:id", AdminAuthorization, categoryController.remove);
router.put("/:id", AdminAuthorization, categoryController.update);
module.exports = { CategoryRouter: router };
