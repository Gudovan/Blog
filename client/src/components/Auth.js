import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:""
  });
  const [isSignup, setisSignup] = useState(false);
  const handleChange = (e) =>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }
  const sendRequest = async (type="login")=>{
      const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
      name:inputs.name,
      email:inputs.email,
      password:inputs.password
    }).catch(err => console.log(err));
    console.log(res)
    const data = await res.data;
    // return data1;
    console.log(res.data)
    alert(data.message)
    return data
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(inputs)
    if(isSignup){
      sendRequest("signup")
        .then((data)=> localStorage.setItem("userId", data.user._id))
        .then(()=>dispatch(authActions.login()))
        .then(()=>navigate("/blogs"))
        // .then(data=>console.log(data))
    }else{
      sendRequest()
        .then((data)=> localStorage.setItem("userId", data.user._id))
        .then(()=>dispatch(authActions.login()))
        .then(()=>navigate("/blogs"))
        // .then(data=>console.log(data))
    }
  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <Box display="flex"
        maxWidth={300} 
        flexDirection={'column'}
        alignItems='center'
        justifyContent={'center'}
        boxShadow="5px 2px 5px 2px rgb(0 0 0/0.6)"
        padding={3}
        margin='auto'
        marginTop={5}
        borderRadius={5}
        bgcolor={'rgb(197,189,165)'}
        >
          <Typography variant="h4" padding={3} textAlign={'center'}>
            {isSignup ? "Register":"Login"}
          </Typography>
         {isSignup && 
         <TextField 
         name='name' 
         placeholder='name' 
         onChange={handleChange} 
         value={inputs.name} 
         label="Name" 
         variant='standard' 
         margin="normal" >
        </TextField>}
          <TextField name='email' placeholder='email' onChange={handleChange} value={inputs.email} type={'email'} label="Email" variant='standard' margin="normal"></TextField>
          <TextField name='password' placeholder='password' onChange={handleChange} value={inputs.password} type={'password'} label="password" variant='standard' margin="normal"></TextField>
          <Button type='submit' sx={{marginTop:3}} variant="contained" >Submit</Button>
          <Typography  sx={{marginTop:2}} style={{textAlign:'center'}}>OR</Typography>
          <Button onClick={()=>setisSignup(!isSignup)} sx={{marginTop:2}} variant="text">
            {isSignup ? "I already have an account":"Create New Account"}
            </Button>
        </Box>
      </form>
    </div>
  )
}
