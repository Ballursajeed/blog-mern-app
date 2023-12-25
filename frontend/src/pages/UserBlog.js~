import React, {useState,useEffect} from "react";
import axios from "axios"
import BlogCard from "../components/BlogCard"

const UserBlog = () => {
	const [blogs, setBlogs] = useState([])

 const getUserBlogs = async() => {

   try {

    const id = localStorage.getItem('userId')
    const { data } = await axios.get(`/api/v1/blogs/user-blog/${id}`)

    if (data?.success) {
          setBlogs(data?.userBlog.blogs)
    }

   } catch (error) {
         console.log("Error:",error)
   }

 }

  useEffect(() => {
     getUserBlogs()
  },[])

   return(
      <>
             {blogs && blogs.map(blog => (
         <BlogCard
          id={blog._id}
          isUser={true}
         title={blog.title}
         description={blog.description}
         image={blog.image}
         username={blog.user.username}
         time={blog.createdAt}
         />)
      )}
      </>
   )
}

export default UserBlog