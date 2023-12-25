
import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

//get all blogs
const getAllBlogController = async(req,res) => {
   try{
    const blogs = await Blog.find({}).populate('user');

   //validation
    if (!blogs) {
       return res.status(200)
       .send({
          success:false,
          message: "No blogs found"
       })
    }

  return res.status(200)
  .send({
      success:true,
      BlogCount:blogs.length,
      message: "All blogs lists",
      blogs
  })

   } catch (error) {
     console.log("Error:",error);
     throw new Error("Error while getting blogs:",error)
   }
}

//create blogs
const createBlogController = async(req,res) => {
   try{

   const { title, description, image, user }  = req.body;

   //validation
   if (!title || !description || !image || !user) {
   	console.log("All fields are required")
     throw new Error("Please provide all fields!!")
   }

  const existingUser = await User.findById(user);
  if (!existingUser) {
      return res
      .status(200)
      .send({
           success:false,
           message:"unable to find user"
      })
  }



   const newBlog = new Blog({ //create a new blog
         title,
         description,
         image,
         user
   })

  const session = await mongoose.startSession();

  session.startTransaction()
  await newBlog.save({session})

  existingUser.blogs.push(newBlog)
  await existingUser.save({session})
  await session.commitTransaction();

  await newBlog.save();

   return res.status(201)
   .send({
        success:true,
        message: "Blog is crated",
        newBlog
   })

   } catch (error) {
      console.log("Error:",error);
     throw new Error("Error while crating blogs:",error)
   }
}

const updateBlogController = async(req,res) => {
 try{

  const { id } = req.params;
  const { title, description, image } = req.body;

  const blog = await Blog.findByIdAndUpdate(id,{...req.body},{ new: true })
  return res.status(200)
  .send({
    success:true,
    message: "Blog updated successfully",
    blog
  })

 } catch (error) {
 	console.log("Error:",error)
      throw new Error("Error while updating blog")
 }
}

const singleBlogController = async(req,res) => {

  try {

 const { id } = req.params;

 const blog = await Blog.findById(id);

 if (!blog) {
   return res
   .status(200)
   .send({
       success:false,
       message:"Blog not found!!"
   })
}

return res
.status(200)
.send({
  success:true,
 message: "fetched single blog",
 blog
})

 }
 catch (error) {
 	console.log("Error in getting sinle blog:",error)
  throw new Error("Error while getting single blog!!",error)
 }

}

const deleteBlogController = async(req,res) => {
 try {

 const { id } = req.params;


 const blog = await Blog.findByIdAndDelete(id).populate('user')//deleting blog form DB
 await blog.user.blogs.pull(blog)
 await blog.user.save();
 return res
 .status(200)
 .send({
    success:true,
    message:"Blog deleted successfully"
 })

 }

  catch (error) {
 	console.log("Error in deleting:",error)
  throw new Error("Error while deleting blog!!",error)
 }
}

 const userBlogController = async(req,res) => {
   try {

       const userBlog = await User.findById(req.params.id).populate("blogs")
       if (!userBlog) {
             return res
             .status(200)
             .send({
               success:false,
               message:"Blogs not found with this ID"
             })
       }

       return res.status(200).send({
                  success:true,
                  message: "User blogs",
                  userBlog
       });

   } catch (error) {
    console.log("Error:",error);
    throw new Error("Error in user blog:",error)
   }
 }

export{
  getAllBlogController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  singleBlogController,
userBlogController
}