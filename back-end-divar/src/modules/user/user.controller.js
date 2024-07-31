const UserMessage = require("./user.message");
const userService = require("./user.service");
const autoBind = require("auto-bind");

class UserController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = userService;
  }

  async whoami(req, res, next) {
    try {
      const user = req.user;
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async findUsers(req, res, next) {
    try {
      // const { page, limit } = req.query; // Default values for pagination
      const users = await this.#service.findUsers(); //findUsers({ page, limit });
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { mobile, isAdmin } = req.body;
      await this.#service.updateUser({ id, mobile, isAdmin });
      return res.json({
        message: UserMessage.UpdateSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.deleteUser(id);
      return res.json({
        message: UserMessage.DeleteSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
