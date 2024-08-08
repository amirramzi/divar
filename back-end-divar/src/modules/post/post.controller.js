const autoBind = require("auto-bind");

const HttpCodes = require("http-codes");
const PostService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const PostMessage = require("./post.message");

class PostController {
  #service;
  success_message;
  constructor() {
    autoBind(this);
    this.#service = PostService;
  }

  async createPostPage(req, res, next) {
    try {
      let { slug } = req.body;

      let match = { parent: null };
      let options, category;
      if (slug) {
        slug = slug.trim();
        category = await CategoryModel.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(PostMessage.NotFound);
        options = await this.#service.getCategoryOption(category._id);
        if (options.length == 0) options = null;
        match = { parent: category._id };
      }

      const categories = await CategoryModel.aggregate([{ $match: match }]);

      res.send({
        categories,
        options,
        category: category?._id.toString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user._id;
      const images = req?.files.map((image) => image?.path?.slice(7));

      const { title, content, address, lat, lng, category, options } = req.body;
      await this.#service.create({
        userId,
        title,
        content,
        coordinate: [lng, lat],
        category,
        images,
        options,
        address,
      });
      res.send({ status: 200, message: PostMessage.Created });
    } catch (error) {
      next(error);
    }
  }

  async findAllPost(req, res, next) {
    try {
      const { situation } = req?.params || "accepted";
      const posts = await this.#service.findAllPost(situation || "accepted");
      res.send({
        posts,
      });
    } catch (error) {
      next(error);
    }
  }

  async findMyPosts(req, res, next) {
    try {
      const userId = req.user._id;
      const posts = await this.#service.findMyPosts(userId);
      res.send({
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
  async findPostById(req, res, next) {
    try {
      const { id } = req.params;
      const post = await this.#service.findPostById(id);
      res.send({
        post,
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);

      this.success_message = PostMessage.Deleted;
      return res.redirect("/post/my");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
