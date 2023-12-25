import React from "react"
import {Box, Typography, TextField, Button} from "@mui/material"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/store"
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()

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

   const { data } = await axios.post("/api/v1/user/login",{
   	username: inputs.name,
   	 email:inputs.email,
   	 password:inputs.password
   	 });

   if (data?.success === false) {
     const errorMessage = data.message;
      toast.error(`Error: ${errorMessage}`);
  }

   if (data.success) {
   	localStorage.setItem("userId",data?.user._id);
   	  dispatch(authActions.login());

        toast.success("User logged successfully");
        navigate("/")
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
        Login
        </Typography>
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
        onClick={() => navigate("/register")}
       >Not registered? please Registered</Button>
    </Box>
  </form>
  </>
 )
}

export default Login