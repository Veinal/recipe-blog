import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, Avatar, Tooltip } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function EditUser() {
  const [getUserDetails, setGetUserDetails] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [state, setState] = useState({ picture: '' });
  const [data, setData] = useState();
  const [count,setCount]=useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const userLocal = JSON.parse(localStorage.getItem("User"));

  console.log(userLocal, 'userLocal');

  useEffect(() => {
    axios.get(`http://localhost:7000/api/registration/singleview/${userLocal?._id}`)
      .then((res) => {
        console.log(res.data);
        setGetUserDetails(res.data);
      }).catch((err) => {
        alert(err);
      });
  }, [count]);

  const HandleChange = (e) => {
    setGetUserDetails({ ...getUserDetails, [e.target.name]: e.target.value })
  };
  console.log(getUserDetails, 'getUserDetails')

  const HandleFileChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.files[0] });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const Data = new FormData()
    Data.append("userName", getUserDetails.userName)
    Data.append("phone", getUserDetails.phone)
    // Data.append("password", getUserDetails.password)
    Data.append("picture", state.picture)


    console.log(Data, 90);
    // setData(Data)

    axios.put(`http://localhost:7000/api/registration/update/${userLocal?._id}`, Data)
      .then((res) => {
        console.log(res.data,900)
        // setState(res.data)
        // window.location.reload()
        setCount((prev)=>!prev)
        setSnackbarMessage('User details edited successfully');
        setSnackbarOpen(true);
      }).catch((err) => {
        console.log(err)
      })
  };

  return (
    <div>
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
                  name='picture'
                  accept="image/*"
                  onChange={(e) => HandleFileChange(e)}
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
              onChange={(e) => HandleChange(e)}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              name='phone'
              value={getUserDetails?.phone}
              onChange={(e) => HandleChange(e)}
            />
            {/* <TextField
              label="password"
              variant="outlined"
              fullWidth
              margin="normal"
              name='password'
              // type='password'
              value={getUserDetails?.password}
              onChange={(e) => HandleChange(e)}
            /> */}
          </Box>
          {/* Add more fields as needed */}
          {/* <Link to='/'> */}
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          {/* </Link> */}
        </Box>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
