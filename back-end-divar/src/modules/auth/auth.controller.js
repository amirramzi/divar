const CookieName = require("../../common/constant/cookie.enum");
const NodeEvn = require("../../common/constant/evn.enum");
const AuthMessage = require("./auth.message");
const authService = require("./auth.service");
const autoBind = require("auto-bind");
class AuthController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.json({
        message: AuthMessage.SendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const token = await this.#service.checkOTP(mobile, code);
      return res
        .cookie(CookieName.AccessCookie, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV == NodeEvn.Production,
        })
        .status(200)
        .json({
          message: AuthMessage.LoginSuccessfully,
        });
    } catch (error) {
      next(error);
    }
  }
  async checkAuth(req, res, next) {
    try {
      const token = req.cookies.name;
      if (token) {
        return res.status(200).json({ isAuth: true });
      }
      return res.status(404).json({ message: "not found user" });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      return res.clearCookie(CookieName.AccessCookie).status(200).json({
        message: AuthMessage.LogoutSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
