import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
{
  title:{
     type: String,
     required: [true,"title is required"]
  },
  description:{
      type: String,
      required:[true,"Description is required"]
  },
  image:{
        type:String,
        required:[true,"image is required"]
  },
  user:{
   type:mongoose.Types.ObjectId,
   ref:'User',
   required:[true,"user id is requied"]
  }
},
{
 timestamps:true
})

export const Blog = mongoose.model("Blog",blogSchema);