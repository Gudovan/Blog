import React from 'react';
import {AppBar,  Toolbar, Typography} from '@mui/material';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { authActions } from '../store';



const Type = styled(Typography)`
color:white;
font-size:60px;
font-family:Century Gothic;
text-align:center;
padding-top:25vh;
width:100%;
height:50vh;
font-weight:800;
`;





export default function Header() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

    const Component = styled(AppBar)`
    background-image:url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom -150px;
    background-size: cover;
    margin-top:38px
    `; 
  return (
   <Component position='sticky'>
     <Toolbar>
      <Type variant="h1">BlogsApp<br></br><Typography variant='h5'>create your space</Typography></Type>
    </Toolbar>
   </Component>
  )
}
