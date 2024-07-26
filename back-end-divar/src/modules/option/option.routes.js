const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router();
//create
router.post("/", optionController.create);
//find
router.get("/", optionController.find);
router.get("/:id", optionController.find);
router.get("/by-category/:categoryId", optionController.findByCategoryId);
router.get("/by-category-slug/:slug", optionController.findByCategorySlug);
//remove 
router.delete("/:id", optionController.removeById);
//update
router.put("/:id", optionController.update);
module.exports = {
  OptionRoutes: router,
};
