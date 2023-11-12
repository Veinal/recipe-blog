import * as React from 'react';
import Drawer from './Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { AccountCircle, Email, Lock, PhotoCamera } from '@mui/icons-material';
import editadmin from '../EDIT ADMIN PROFILE.svg'

export default function EditAdmin() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling form submission here
  };

  const handleFileInputChange = (e) => {
    // Handle file input change logic here
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Edit Admin Profile:
        </Typography>

        {/* <div>
          <img src={editadmin} alt="" style={{width:700}}/>
        </div> */}

        {/* Edit Admin Form */}
        <form onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
          <TextField
            fullWidth
            label="Admin Name"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          {/* File Input for Profile Picture */}
          <input
            accept="image/*"
            id="profile-pic-input"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
          <label htmlFor="profile-pic-input" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              fullWidth
              disabled
              value="Selected file name" // Display the selected file name or customize as needed
              sx={{ mr: 1 }}
            />
            <Button
              variant="outlined"
              component="span"
              startIcon={<PhotoCamera />}
              onClick={() => document.getElementById('profile-pic-input').click()}
              sx={{
                textTransform: 'none',
                borderColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: '#fff',
                },
              }}
            >
              upload file image
            </Button>
          </label>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Box>
  );
}
