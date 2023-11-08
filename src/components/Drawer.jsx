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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';

import CategoryIcon from '@mui/icons-material/Category';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {Link} from 'react-router-dom'

const drawerWidth = 200;

export default function ClippedDrawer() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ADMIN DASHBOARD
          </Typography>
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
              admin dashboard button
                <Link to='/userslist'><Button variant="text" color='inherit' disableElevation><GroupsIcon style={{ color: 'grey',marginRight:15 }} fontSize='large'/> Users list</Button></Link>
                <Link to='/categorylist'><Button variant="text" color='inherit' disableElevation><CategoryIcon style={{ color: 'grey',marginRight:15 }} fontSize='large'/> Category list</Button></Link>
                <Link to='/recipelist'><Button variant="text" color='inherit' disableElevation><MenuBookIcon style={{ color: 'grey',marginRight:15 }} fontSize='large'/>Recipe list</Button></Link>
                <Link to='/requestlist'><Button variant="text" color='inherit' disableElevation><EditNoteIcon style={{ color: 'grey',marginRight:15 }} fontSize='large'/>Request list</Button></Link>
            </div>

          {/* <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */} 
          
          <Divider />
        <br />
          <Button variant="text" color='inherit' disableElevation><GroupsIcon style={{ color: 'grey',marginRight:15 }} fontSize='large'/> Admin profile</Button>

          {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Box>
      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
            body
        </Typography>
        
      </Box> */}
    </Box>
  );
}