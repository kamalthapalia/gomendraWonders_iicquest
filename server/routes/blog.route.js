import { Router } from "express";
const router = new Router();

import blogController from '../controllers/blog.controller.js'
import fetchuser from "../middleware/fetchUser.js";

router.get('/', blogController.getAllBlogs);
router.get('/user', fetchuser, blogController.getUserBlogs);
router.get("/:id", blogController.getSingleBlog);
router.post("/", fetchuser, blogController.postBlog);
router.patch("/:id", fetchuser, blogController.updateBlog);
router.delete("/:id", fetchuser, blogController.deleteBlog);

export default router;