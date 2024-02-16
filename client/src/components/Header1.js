import React, { useState } from 'react'
import {AppBar, Box, Button,Tabs,Tab} from '@mui/material'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

const Component = styled(AppBar)`
    background-color:rgb(207,189,165);
    width:100%;
    align-items:center;
`
const But = styled(Button)`
    // background-color:black;
    color:black;
    align-items:center;
    // padding-left:60px
`

export default function Header1() {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  return (
    <div>
        <Component>
        <Box display="flex" marginLeft={"auto"} marginRight={"20px"}>
        {/* <span> */}
            { !isLoggedIn && <><But LinkComponent={Link} to="/auth" variant='text'>Login</But>
            <But LinkComponent={Link} to="/auth" variant='text'>Register</But> </>}
        {/* </span> */}
        
         {isLoggedIn && <Tabs textColor='secondary' value ={value} onChange={(e,val)=>setValue(val)}>
            <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
            <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"/>
          </Tabs> }
          {isLoggedIn && <But onClick={()=>dispatch(authActions.logout())} LinkComponent={Link} to="/auth" variant='text'>Logout</But>}
        </Box>
        </Component>
        
    </div>
  )
}
