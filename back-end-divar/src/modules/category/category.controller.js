const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const CategoryMessage = require("./category.message");
const HttpCodes = require("http-codes");
const CategoryModel = require("./category.model");
class CategoryController {
  #service;
  #model;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
    this.#model = CategoryModel;
  }

  async create(req, res, next) {
    try {
      const { name, icon, slug, parent } = req.body;
      await this.#service.create({ name, icon, slug, parent });
      return res.status(HttpCodes.CREATED).json({
        message: CategoryMessage.Created,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const categories = await this.#service.find();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }
  async findStepByStep(req, res, next) {
    try {
      let { slug } = req.query;
      let match = { parent: null };
      let category;

      if (slug) {
        slug = slug.trim();
        category = await this.#model.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(PostMessage.NotFound);
        match = { parent: category._id };
      }
      const categories = await this.#service.findStepByStep();
      res.send({ categories, category: category?._id.toString });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      return res.json({
        message: CategoryMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, slug, icon, parent } = req.body;
      await this.#service.update(id, {
        name,
        slug,
        icon,
        parent,
      });
      return res.json({
        message: CategoryMessage.Updated,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
