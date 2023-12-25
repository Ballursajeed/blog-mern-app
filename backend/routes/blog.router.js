import Router from "express"
import {  getAllBlogController,
  createBlogController,
  updateBlogController,
  singleBlogController,
  deleteBlogController,
  userBlogController } from "../controllers/blog.controller.js"
const router = Router();

 router.get("/all-blogs",getAllBlogController);
 router.post("/create-blog",createBlogController);
 router.put("/update-blog/:id",updateBlogController);
 router.get("/single-blog/:id",singleBlogController);
 router.delete("/delete-blog/:id",deleteBlogController);
 router.get("/user-blog/:id",userBlogController);
export default router