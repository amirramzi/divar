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
router.get("/one/:id", postController.findPostById);

router.delete("/:id", Authorization, postController.remove);
router.put("/:id", Authorization, postController.update);

module.exports = {
  PostRouter: router,
};
