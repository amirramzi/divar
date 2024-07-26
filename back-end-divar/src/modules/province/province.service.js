const autoBind = require("auto-bind");

const createHttpError = require("http-errors");
const ProvinceModel = require("./province.model");
const ProvinceMessage = require("./province.message");
const CitiesModel = require("./cities.model");

class ProvinceService {
  #model;
  #citiesModel;
  constructor() {
    autoBind(this);
    this.#model = ProvinceModel;
    this.#citiesModel = CitiesModel;
  }
  async find() {
    return await this.#model.find();
  }
  async findCities(id) {
    return await this.#citiesModel.find({ province_id: id });
  }
  async findByProvince(id) {
    const province = await this.checkExistById(id);
    return await this.#model.findOne(province, { _id: 0, province: 0 });
  }
  async checkExistById(id) {
    const province = await this.#model.findById(id);
    if (!province) throw new createHttpError.NotFound(ProvinceMessage.NotFound);
    return province;
  }
}

module.exports = new ProvinceService();
