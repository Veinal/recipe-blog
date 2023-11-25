import Box from '@mui/material/Box';
import * as React from 'react';
import Drawer from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import dashimg from '../dashimg.jpg'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const drawerWidth = 200;

export default function ClippedDrawer() {
  const [getUsers,setGetUsers]=useState([])
  const [getCategories,setGetCategories]=useState([])
  const [getRecipes,setGetRecipes]=useState([])
  const [getRequest,setGetRequest]=useState([])
  const [getRatings,setGetRatings]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/registration/view')
    .then((res)=>{
      console.log(res.data)
      setGetUsers(res.data.length)
    }).catch((err)=>{
      alert(err)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/categories/view')
    .then((res)=>{
      console.log(res.data)
      setGetCategories(res.data.length)
    }).catch((err)=>{
      alert(err)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/recipes/view')
    .then((res)=>{
      console.log(res.data)
      setGetRecipes(res.data.length)
    }).catch((err)=>{
      alert(err)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/request/viewbyadmin')
    .then((res)=>{
      console.log(res.data)
      setGetRequest(res.data.length)
    }).catch((err)=>{
      alert(err)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/ratings/viewall')
    .then((res)=>{
      console.log(res.data)
      setGetRatings(res.data.length)
    }).catch((err)=>{
      alert(err)
    })
  },[])

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer/>

      {/* part that displays table */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Open Sans', color: '#333' }}>
          <b>DASHBOARD</b>
        </Typography>

        {/* Grid container for the four cards */}
        <Grid container spacing={23}>
          {/* First Card */}
          <Grid item xs={2}>
            <Card sx={{ minWidth: 175, backgroundColor: '#FFD700' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                   Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total users: {getUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Second Card */}
          <Grid item xs={2}>
            <Card sx={{ minWidth: 175, backgroundColor: '#FF6347' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Categories
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total categories: {getCategories}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Third Card */}
          <Grid item xs={2}>
            <Card sx={{ minWidth: 175, backgroundColor: '#40E0D0' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Recipes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total recipes: {getRecipes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Fourth Card */}
          <Grid item xs={2}>
            <Card sx={{ minWidth: 175, backgroundColor: '#98FB98' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Requests
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total requests: {getRequest}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* fifth card */}
          <Grid item xs={2}>
            <Card sx={{ minWidth: 175, backgroundColor: '#FFA07A' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Ratings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total ratings: {getRatings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <hr />
        {/* <img src={dashimg} style={{objectFit:'cover'}} alt="" /> */}

        <img
          src={dashimg}
          alt=""
          style={{
            width: '100%',  // Make the image take 100% of the container width
            height: 'auto', // Maintain the aspect ratio
            objectFit: 'cover', // Cover the entire container, maintaining aspect ratio
            borderRadius: '8px', // Add rounded corners for a polished look
          }}
        />

      </Box>
    </Box>
  );
}
