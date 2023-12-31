import React,{ useState, useEffect } from "react"
import axios from "axios";
import BlogCard from "../components/BlogCard"
import toast from 'react-hot-toast';
import { baseURI } from "../constants/url.js"

const Blog = () => {
	const [blogs, setBlogs ] = useState([]) // eslint-disable-next-line

  //get blogs
  const getAllBlogs = async() => {
   try {

     const { data } = await axios.get(`${baseURI}/api/v1/blogs/all-blogs`)

   if (data?.success === false) {
     const errorMessage = data.message;
      toast.error(`Error: ${errorMessage}`);
     }

     if (data && data.success) {
     	    setBlogs(data?.blogs)
     }

   } catch (error) {
         console.log("Error:",error)
   }
  }

 useEffect(() => {
    getAllBlogs();
 },[])

 return(
  <div>
      {blogs && blogs.map(blog => (
         <BlogCard
         id={blog._id}
         isUser={localStorage.getItem('userId') === blog.user._id}
         title={blog.title}
         description={blog.description}
         image={blog.image}
         username={blog.user.username}
         time={blog.createdAt}
         />)
      )}
  </div>
 )
}

export default Blog