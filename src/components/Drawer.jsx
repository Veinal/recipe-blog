import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png'

const drawerWidth = 200;

const customTheme = createTheme({
  palette: {
    mode: 'dark', // Use 'dark' mode to enable dark theme
  },
});

// const buttonTextColor ={
//   color:'white'
// }

export default function ClippedDrawer() {
  const navigate=useNavigate()

  const HandleLogout=()=>{
    localStorage.removeItem("Admin")
    localStorage.removeItem("AdminToken")
    navigate('/')
  }

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ThemeProvider theme={customTheme}>

        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <img
              src={logo}
              height="38"
              alt="MDB Logo"
              loading="lazy"
              style={{borderRadius:'50%',marginLeft:'-1%',marginRight:'1%'}}
            />
            <Typography variant="h6" noWrap component="div">
              ADMIN DASHBOARD
            </Typography>
            <div style={{marginLeft: 'auto'}}> 
              <Button onClick={HandleLogout} variant='contained' color='inherit'>LOGOUT</Button>
            </div>
          </Toolbar>
        </AppBar>
        
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <br />
            <div>
              <Link to="/admindashboard">
                <Button variant="text" color="inherit" sx={{ color: 'white' }} disableElevation>
                  <DashboardIcon style={{ color: 'grey', marginRight: 15 }} fontSize="large" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/userslist">
                <Button variant="text" color="inherit" sx={{ color: 'white' }} disableElevation>
                  <GroupsIcon style={{ color: 'grey', marginRight: 15 }} fontSize="large" />
                  Users list
                </Button>
              </Link>
              <Link to="/categorylist">
                <Button variant="text" color="inherit" sx={{ color: 'white' }} disableElevation>
                  <CategoryIcon style={{ color: 'grey', marginRight: 15 }} fontSize="large" />
                  Category list
                </Button>
              </Link>
              <Link to="/recipelist">
                <Button variant="text" color="inherit" sx={{ color: 'white' }} disableElevation>
                  <MenuBookIcon style={{ color: 'grey', marginRight: 15 }} fontSize="large" />
                  Recipe list
                </Button>
              </Link>
              <Link to="/requestlist">
                <Button variant="text" color="inherit" sx={{ color: 'white' }} disableElevation>
                  <EditNoteIcon style={{ color: 'grey', marginRight: 15 }} fontSize="large" />
                  Request list
                </Button>
              </Link>
            </div>
            <Divider />
            <br />
            <Link to='/editadmin'>
              <Button variant="text" color="inherit" sx={{ color: 'white' }} disableElevation>
                <AdminPanelSettingsIcon style={{ color: 'grey', marginRight: 15 }} fontSize="large" />
                Admin profile
              </Button>
            </Link>
          </Box>
        </Drawer>
        </ThemeProvider>

        
      </Box>
    
  );
}
