const NodeEvn = require("../../common/constant/evn.enum");
const autoBind = require("auto-bind");
const provinceService = require("./province.service");
class ProvinceController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = provinceService;
  }

  async finds(req, res, next) {
    try {
      const province = await this.#service.finds();
      return res.json(province);
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const { city } = req.body;
      const province = await this.#service.find(city);
      return res.json(province);
    } catch (error) {
      next(error);
    }
  }
  async findByProvince(req, res, next) {
    try {
      const { id } = req.params;
      const city = await this.#service.findByProvince(id);
      return res.json(city);
    } catch (error) {
      next(error);
    }
  }
  async findCities(req, res, next) {
    try {
      const { id } = req?.params || 24;
      const cities = await this.#service.findCities(id || 24);
      return res.json(cities);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProvinceController();
