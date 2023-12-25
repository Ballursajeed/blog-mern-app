import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    username:{
          type:String,
          required:[true, "Username is required"]
    },
    email:{
      type:String,
      required:[true,"Email is required"]
    },
    password:{
          type:String,
      required:[true,"password is required"]
    },
    blogs:[
     {
       type:mongoose.Types.ObjectId,
       ref:"Blog"
     }
    ]
},
{
 timestamps: true
});


export const User = mongoose.model("User",userSchema);

