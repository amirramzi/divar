const { Router } = require("express");
const postController = require("./post.controller");
const { upload } = require("../../common/utils/multer");
const Authorization = require("../../common/guard/authorization.guard");

const router = Router();

router.get("/new", Authorization, postController.createPostPage);
router.post("/new", Authorization, postController.createPostPage);

router.post(
  "/create",
  Authorization,
  upload.array("images", 10),
  postController.create
);

router.get("/all/:situation?", postController.findAllPost);

router.get("/my", Authorization, postController.findMyPosts);

router.delete("/delete/:id", Authorization, postController.remove);

module.exports = {
  PostRouter: router,
};
