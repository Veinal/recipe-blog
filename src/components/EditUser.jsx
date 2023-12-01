import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, Avatar } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import axios from 'axios';

export default function EditUser() {
  const [user, setUser] = useState({});
  const [getUserDetails, setGetUserDetails] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  
  const userLocal = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    axios.get(`http://localhost:7000/api/registration/singleview/${userLocal?._id}`)
      .then((res) => {
        console.log(res.data);
        setGetUserDetails(res.data);
      }).catch((err) => {
        alert(err);
      });
  }, [userLocal]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Perform any file handling logic here
    setImageFile(file);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setEditedPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update user details using editedName, editedPhone, imageFile, etc.
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h3" style={{ display: 'flex', justifyContent: 'center' }} gutterBottom>
        EDIT USER DETAILS
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <label htmlFor="icon-button-file">
            <input
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <Avatar
                sx={{ width: 120, height: 120 }}
                alt="User Image"
                src={imageFile ? URL.createObjectURL(imageFile) : 'svds'}
              >
                <AddPhotoAlternateOutlinedIcon />
              </Avatar>
            </IconButton>
          </label>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedName || getUserDetails?.userName}
            onChange={handleNameChange}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedPhone || getUserDetails?.phone}
            onChange={handlePhoneChange}
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
