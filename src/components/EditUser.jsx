import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, Avatar, Tooltip } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import axios from 'axios';

export default function EditUser() {
  const [getUserDetails, setGetUserDetails] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [state, setState] = useState('');
  
  const userLocal = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    axios.get(`http://localhost:7000/api/registration/singleview/${userLocal?._id}`)
      .then((res) => {
        console.log(res.data);
        setGetUserDetails(res.data);
      }).catch((err) => {
        alert(err);
      });
  }, []);

  const HandleChange = (e) => {
    setState({...state,[e.target.name]:e.target.value})
  };
  console.log(state)
  
  const HandleFileChange = (e) => {
    setState({...state,[e.target.name]:e.target.files[0]});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const Data=new FormData()
    Data.append("userName",state.userName)
    Data.append("phone",state.phone)
    Data.append("password",state.password)
    Data.append("picture",state.picture)

    axios.put(`http://localhost:7000/api/registration/update/${userLocal?._id}`,Data)
    .then((res)=>{
      console.log(res.data)
      setState(res.data)
      // window.location.reload()
    }).catch((err)=>{
      console.log(err)
    })
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h3" style={{ display: 'flex', justifyContent: 'center' }} gutterBottom>
        EDIT USER DETAILS
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Tooltip title="profile picture" placement="bottom">
          <Button component="label" htmlFor="icon-button-file" color="primary">
            <Avatar
              sx={{ width: 120, height: 120 }}
              alt="User Image"
              src={`http://localhost:7000/uploads/users/${getUserDetails?.picture}`}
            >
              {!getUserDetails?.picture && <AddPhotoAlternateOutlinedIcon />}
            </Avatar>
            {getUserDetails?.picture && <AddPhotoAlternateOutlinedIcon style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'white', borderRadius: '50%' }} />}
            <input
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              accept="image/*"
              onChange={(e)=>HandleFileChange(e)}
            />
          </Button>
        </Tooltip>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name='userName'
            value={getUserDetails?.userName}
            onChange={(e)=>HandleChange(e)}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            name='phone'
            value={getUserDetails?.phone}
            onChange={(e)=>HandleChange(e)}
          />
          <TextField
            label="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name='password'
            // type='password'
            value={getUserDetails?.password}
            onChange={(e)=>HandleChange(e)}
          />
        </Box>
        {/* Add more fields as needed */}
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}
