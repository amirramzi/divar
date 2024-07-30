const createHttpError = require("http-errors");
const UserModel = require("./user.model");
const autoBind = require("auto-bind");
const UserMessage = require("./user.message");

class UserService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }

  async findUsers() {
    //const skip = (page - 1) * limit;
    // const users = await this.#model.find().skip(skip).limit(limit);
    // const total = await this.#model.countDocuments();
    // return {
    //   users,
    //   total,
    //   page: Number(page),
    //   limit: Number(limit),
    //   totalPages: Math.ceil(total / limit),
    // };
    return await this.#model.find(
      {},
      {
        accessToken: 0,
        otp: 0,
        __v: 0,
        updatedAt: 0,
        verifiedMobile: 0,
      }
    );
  }
  async updateUser({ id, mobile, isAdmin }) {
    await this.checkExistUser(id);
    return await this.#model.updateOne(
      { _id: id },
      {
        $set: { mobile, isAdmin },
      }
    );
  }
  async checkExistUser(id) {
    const user = await this.#model.findById(id);
    if (!user) throw new createHttpError.NotFound(UserMessage.NotFound);
    return user;
  }
}

module.exports = new UserService();
