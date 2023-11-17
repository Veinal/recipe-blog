import Box from '@mui/material/Box';
import * as React from 'react';
import Drawer from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import dashimg from '../dashimg.jpg'

const drawerWidth = 200;

export default function ClippedDrawer() {
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
        <Grid container spacing={3}>
          {/* First Card */}
          <Grid item xs={3}>
            <Card sx={{ minWidth: 200, backgroundColor: '#FFD700' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Card 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Number: 10
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Second Card */}
          <Grid item xs={3}>
            <Card sx={{ minWidth: 200, backgroundColor: '#FF6347' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Card 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Number: 20
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Third Card */}
          <Grid item xs={3}>
            <Card sx={{ minWidth: 200, backgroundColor: '#40E0D0' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Card 3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Number: 30
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Fourth Card */}
          <Grid item xs={3}>
            <Card sx={{ minWidth: 200, backgroundColor: '#98FB98' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Card 4
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Number: 40
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
