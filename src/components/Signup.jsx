import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import signimg from '../signimg.jpg'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

//main function

export default function SignUp() {

  const [signupState,setSignupState]=useState()
  const navigate=useNavigate()

  const HandleChange=(e)=>{
    setSignupState({...signupState,[e.target.name]:e.target.value})
  }
  console.log(signupState,'ss');

  const HandleImage=(e)=>{
    setSignupState({...signupState,[e.target.name]:e.target.files[0]})
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    const Data = new FormData();
    Data.append("userName",signupState.userName)
    Data.append("email",signupState.email)
    Data.append("password",signupState.password)
    Data.append("phone",signupState.phone)
    Data.append("picture",signupState.picture)

    Axios.post('http://localhost:7000/api/registration/register',Data)
    .then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })

    await navigate('/login')

  };

  return (
    <div style={{
      backgroundImage: `url(${signimg})`, // Replace 'path_to_your_image' with your image URL
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh', // Set minimum height to cover the entire viewport
    }}>
      <ThemeProvider theme={defaultTheme}>
        <Container  component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              // marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid black', // Adjust border style and color here
            borderRadius: '8px', // Add border radius for smoother edges
            padding: 5,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Add box shadow for depth
            backgroundColor:'white'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign up
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="given-name"
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    autoFocus
                    onChange={(e)=>HandleChange(e)}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e)=>HandleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e)=>HandleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="Phone number"
                    id="phone"
                    type='number'
                    autoComplete="phone"
                    onChange={(e)=>HandleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="picture"
                    label="picture"
                    id="picture"
                    type='file'
                    autoComplete="picture"
                    onChange={(e)=>HandleImage(e)}
                  />
                </Grid>
                
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to='/login' variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}