const autoBind = require("auto-bind");

const OptionModel = require("../option/option.model");

const PostModel = require("./post.model");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const PostMessage = require("./post.message");

class PostService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = OptionModel;
  }
  async create(dto) {
    return await this.#model.create(dto);
  }
  async findAllPost(situation) {
    return await this.#model.find({ confirm: situation });
  }

  async findMyPosts(userId) {
    if (userId && isValidObjectId(userId))
      return await this.#model.find({ userId });
    throw new createHttpError.BadRequest(PostMessage.RequestNotValid);
  }
  async remove(postId) {
    await this.checkExist(postId);
    await this.#model.deleteOne({ _id: postId });
  }
  async checkExist(postId) {
    if (!postId || !isValidObjectId(postId))
      throw new createHttpError.BadRequest(PostMessage.RequestNotValid);
    const post = await this.#model.findById(postId);
    if (!post) throw new createHttpError.NotFound(PostMessage.NotFound);
    return post;
  }
  async getCategoryOption(categoryId) {
    const options = await this.#optionModel.find({ category: categoryId });
    return options;
  }
}
module.exports = new PostService();
