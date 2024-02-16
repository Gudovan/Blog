import React from 'react'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box, IconButton } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import axios from 'axios';



export default function Blog({title,description,imageURL,userName,isUser,id}) {
  console.log(title,isUser)
  const navigate = useNavigate()
  const handleEdit= (e)=>{
    navigate(`add/myBlogs/${id}`)
    console.log('function called')
    console.log("Edited Blog")
    console.log(id)
  }

  const deleteRequest = async ()=>{
    const res = await axios
    .delete(`http://localhost:5000/api/blog/delete/${id}`)
    .catch(err => console.log(err))
    const data = await res.data;
    return data;
  }
  const handleDelete = () =>{
    deleteRequest().then(()=>navigate("/"))
    .then(()=>navigate("/blogs"));
  }
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  return (
    <div> 
      
        {/* <Card >
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div"> 
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
         
        </Card> */}
         <Card sx={{ width:300 ,margin:2,mt:2,padding:1,boxShadow:"10px 10px 20px #ccc",
         ":hover":{
          boxShadow:"15px 15px 30px RGB(210 186 153)",
          cursor:"pointer",
          transform:"scale(1.1)"
          }}}>
            {isUser && (
              <Box display="flex">
                <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><ModeEditOutlineIcon color='warning'/></IconButton>
                <IconButton onClick={handleDelete}><DeleteIcon color='error'/></IconButton>
              </Box>
            )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName}

          </Avatar>
        }
      
        title={title}
        subheader={userName}
        
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="No Image is provided"
      />
     
      <CardContent>
      <hr/>
      <br/>
        <Typography variant="body2" color="text.secondary">
          <b>{userName}</b>{":"} {description}
        </Typography>
      </CardContent>
     
    </Card>
    
    </div>
  )
}



