import React from "react"
import {Box, Typography, TextField, Button} from "@mui/material"
import {useNavigate} from "react-router-dom";
import axios from "axios"
import toast from 'react-hot-toast';
import { baseURI } from "../constants/url.js"

const Register = () => {

 const navigate = useNavigate();

 //state
 const [ inputs, setInputs ] = React.useState({
   name:"",
   email:"",
   password:""
 })

//handle input change
 const handleChange = (e) => {
   setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value
   }))
 }

 //handle submit
 const handleSubmit = async(e) => {
   e.preventDefault()
  try {

   const { data } = await axios.post(`${baseURI}/api/v1/user/register`,{
   	username: inputs.name,
   	 email:inputs.email,
   	 password:inputs.password
   	 });

  if (data?.success === false) {
     const errorMessage = data.message;
      toast.error(`Error: ${errorMessage}`);
  }

   if (data?.success) {
        toast.success("User registered successfully");
        navigate("/login")
   }
  }catch (error) {
     console.log(error)
  }

 }

 return(
  <>
 <form onSubmit={handleSubmit}>
   <Box maxWidth={450} display="flex" flexDirection={"column"} alignItems="center"
    justifyContent={"center"} margin="auto" marginTop={5} boxShadow="10px 10px 20px #ccc"
    padding={3}
    borderRadius={5}>
       <Typography variant="h4"
        padding={3}
        sx={{textTransform: "uppercase"}}
        textAlign="center"
        >
        Register
        </Typography>
       <TextField
        placeholder="username"
        value={inputs.name}
        onChange={handleChange}
        name="name"
        margin="normal"
        type={"text"}
        required
       />
      <TextField
        placeholder="email"
        value={inputs.email}
        name="email"
        margin="normal"
        type={"email"}
        onChange={handleChange}
        required
       />
      <TextField
        placeholder="password"
        value={inputs.password}
        name="password"
        margin="normal"
        type={"password"}
        onChange={handleChange}
        required
      />
       <Button
        type="submit"
        sx={{ borderRadius:3, marginTop:3 }}
        variant="contained"
        color="primary"
        >Submit</Button>
       <Button
        sx={{ borderRadius:3, marginTop:3 }}
        onClick={() => navigate("/login")}
       >Already registered? please login</Button>
    </Box>
  </form>
  </>
 )
}

export default Register