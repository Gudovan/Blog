import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect ,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const labelStyles ={mb:1,mt:2,fontSize:'24px',fontWeight:'bold',color:'#ff1a7'}
export default function BlogDetail() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);

  const [inputs, setInputs] = useState({ });
  const handleChange = (e) => {
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }

  const fetchDetails = async ()=>{
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`)
    .catch(err => console.log(err))
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    fetchDetails().then((data)=>{
      setBlog(data.blog)
      setInputs({
        title:data.blog.title,
        description:data.blog.description,
        // imageURL:data.blog.image
      });
    })
   },[id]);
   console.log(blog);

  const sendRequest = async ()=> {
    const res = await axios
    .put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch(err => console.log(err))

    const data = await res.data
    return data
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(inputs);
    sendRequest()
    .then(data =>console.log(data))
    .then(navigate("/myBlogs/"))
  };
  return (
    <div style={{
      // background: 'url("http://www.pixelstalk.net/wp-content/uploads/2016/09/Vintage-Wallpaper-Widescreen-Download.jpg")',
      // backgroundSize:'cover',width:'100%',minHeight:'100vh',backgroundRepeat:'no-repeat',
     }}>
      
           { inputs && <form onSubmit={handleSubmit}>
        <Box border={3}
        borderColor="#2bc5b4" 
        borderRadius={10} 
        boxShadow={"10px 10px 30px #ccc"}
        padding={3} 
        marginTop={3}
        margin={3} 
        display={'flex'} 
        flexDirection={'column'} 
        width='70%'     
        marginLeft={'auto'} 
        marginRight={'auto'}>
          <Typography 
          fontFamily={'Rockwell'} 
          fontWeight={'bold'} 
          fontSize={40} 
          color={'#ff1a7'} 
          textAlign={'center'}>Update Your Blog</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title} margin='normal' variant="filled"/>
          <InputLabel sx={labelStyles}  >Description</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='normal' required variant="filled"/>
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          {/* <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL} margin='normal' required variant="filled"/>
          <Button sx={{mt:2,borderRadius:4,fontFamily:'Cascadia Code SemiBold',fontSize:25 }}variant="contained" color="success" type='submit'>Update</Button> */}
        </Box>
      </form>}
    </div>
  )
}
