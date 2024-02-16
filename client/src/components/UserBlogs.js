import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Box } from '@mui/material';
import Blog from './Blog';

export default function UserBlogs() {
  const [user, setUser] = useState()
  const id = localStorage.getItem("userId");
  const sendRequest = async ()=>{
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
    .catch((err)=>console.log(err))
    const data = await res.data
    return data
  }
  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user))
   },[])
   console.log(user)
  return (
    <div style={{
      // background: '  url("https://images.freecreatives.com/wp-content/uploads/2015/03/vintage-backgrounds-2-1.jpg")',
      backgroundSize:'cover',width:'100%',minHeight:'100vh',backgroundRepeat:'no-repeat',
     }}>
       <Box display={'flex'} flexWrap={'wrap'} marginLeft={'8rem'}>
      
      {
        user && user.blogs && 
        user.blogs.map((blog,index)=>(
          <Blog 
          id={blog._id}
          isUser={true}
          key={index}
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
