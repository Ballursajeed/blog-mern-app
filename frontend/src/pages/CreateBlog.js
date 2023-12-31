import React from "react";
import {Box, Typography, InputLabel, TextField,Button, useTheme} from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { baseURI } from "../constants/url.js"

const CreateBlog = () => {

 const Id = localStorage.getItem('userId')

 const navigate = useNavigate()
   const theme = useTheme();

 const [inputs,setInputs] = React.useState({
      title:'',
      description: "",
      image:"",
 })

const handleSubmit = async(e) => {
 e.preventDefault()
try {

 const { data } = await axios.post(`${baseURI}/api/v1/blogs/create-blog`,{
    title:inputs.title , description: inputs.description,
    image:inputs.image, user:Id
 })

  if (data?.success) {
      toast.success("Blog created")
      navigate("/my-blogs")
  }
} catch (error) {
   console.log("Error:",error)
}
}

 const handleChange = (e) => {
      setInputs(prevState => ({
           ...prevState,
           [e.target.name]: e.target.value
      }))
 }

 return(
  <>
   <form onSubmit={handleSubmit}>
     <Box width={'50%'}
      border={3}
      borderRadius={10}
      padding={3}
       margin="auto"
        boxShadow={'10px 10px 20px #ccc'}
     display="flex"
      flexDirection="column"
       marginTop="60px"
         sx={{[theme.breakpoints.down('sm')]: {
          width: '90%',  // Adjust the width for small screens (phones)
        }}}
       >
         <Typography variant="h2" textAlign={'center'} fontWeight="bold" padding={3} color="gray">
            Create A Post
         </Typography>
         <InputLabel
          sx={{ mb:1,mt:2,fontSize:'24px', fontWeight:"bold" }}
          >
          Title
          </InputLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined">

          </TextField>
         <InputLabel
          sx={{ mb:1,mt:2,fontSize:'24px', fontWeight:"bold" }}
          >
          Description
         </InputLabel>
          <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal"
           variant="outlined">

          </TextField>
         <InputLabel
          sx={{ mb:1,mt:2,fontSize:'24px', fontWeight:"bold" }}
          >
          Image URL
         </InputLabel>
          <TextField name="image" value={inputs.image} onChange={handleChange} margin="normal"
          variant="outlined">

          </TextField>
         <Button type="submit" color="primary" variant="contained">SUBMIT</Button>
     </Box>
   </form>
  </>
 )
}

export default CreateBlog