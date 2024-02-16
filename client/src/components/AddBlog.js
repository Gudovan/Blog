import { Box, InputLabel, TextField, Typography ,Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const labelStyles ={mb:1,mt:2,fontSize:'24px',fontWeight:'bold',color:'#ff1a7' }
export default function AddBlog() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title:"",
    description:"",
    imageURL:""
  });
  const handleChange = (e) => {
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }
  const sendRequest = async()=>{
    const res = await axios.post("http://localhost:5000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem('userId')
    }).catch(err=> console.log(err));
    const data = await res.data;
    return data
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest()
    .then(data=>console.log(data))
    .then(navigate("/blogs"))
  }

  return (
    <div style={{
      // background: 'url("http://www.pixelstalk.net/wp-content/uploads/2016/09/Vintage-Wallpaper-Widescreen-Download.jpg")',
      // backgroundSize:'cover',width:'100%',minHeight:'100vh',backgroundRepeat:'no-repeat',
     }}>
      <form onSubmit={handleSubmit}>
        <Box border={3}
        borderColor="#2bc5b4" 
        borderRadius={10} 
        boxShadow={"10px 10px 30px #ccc"}
        padding={3} 
        margin={3} 
        display={'flex'} 
        flexDirection={'column'} 
        width='70%'     
        marginLeft={'auto'} 
        marginRight={'auto'}>
          <Typography 
          fontFamily={'Lucida Bright'} 
          fontWeight={'bold'} 
          fontSize={40} 
          color={'#ff1a7'} 
          textAlign={'center'}>POST YOUR BLOG</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title} margin='normal' variant="filled"/>
          <InputLabel sx={labelStyles}  >Description</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='normal' required variant="filled"/>
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL} margin='normal' required variant="filled"/>
          <Button sx={{mt:2,borderRadius:4,fontFamily:'Cascadia Code SemiBold',fontSize:25 }}variant="contained" color="success" type='submit'>SAVE</Button>
        </Box>
      </form>
    </div>
  )
}
