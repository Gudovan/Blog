import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog';
import { Box } from '@mui/material';

export default function Blogs() {
  const [blogs, setBlogs] = useState();
  const sendRequest = async()=>{
    const res = await axios.get("http://localhost:5000/api/blog")
    .catch((err) => console.log(err))
    //console.log(res)
    const data = await res.data
    return data;
  }
  useEffect(()=>{
    sendRequest().then((data)=> setBlogs(data.blogs));
  },[])
  console.log(blogs)
  return (
   <div style={{
    // background: '  url("https://images.freecreatives.com/wp-content/uploads/2015/03/vintage-backgrounds-2-1.jpg")',
    backgroundSize:'cover',width:'100%',minHeight:'100vh',backgroundRepeat:'no-repeat',
   }}>
    <Box display={'flex'} flexWrap={'wrap'}  alignItems={'center'} paddingLeft={'8rem'}  >
      {/* Blogs */}
      {
        blogs && blogs.map((blog,index)=>(
          <Blog 
          
          id = {blog._id}
          isUser = {localStorage.getItem("userId") === blog.user._id}
          title={blog.title} 
          description={blog.description} 
          imageURL={blog.image}
          userName={blog.user.name}/>
        ))
      }
      
      </Box>
   </div>
  )
}
