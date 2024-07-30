const { Router } = require("express");
const userController = require("./user.controller");
const Authorization = require("../../common/guard/authorization.guard");
const AdminAuthorization = require("../../common/guard/admin.authorization.guard");
const router = Router();

router.get("/whoami", Authorization, userController.whoami);
router.get("/users", AdminAuthorization, userController.findUsers);
router.put("/users/:id", AdminAuthorization, userController.updateUser);
router.delete("/users/:id", AdminAuthorization, userController.findUsers);

module.exports = {
  UserRouter: router,
};
