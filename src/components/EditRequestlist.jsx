import React from 'react'
import Drawer from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function EditRecipelist() {
  return (
    <div>
        <Box sx={{ display: 'flex' }}>

        <Drawer/>

        {/* part that displays table */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        <div>
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <h1 style={{display:'flex',justifyContent:'center'}}><u><b>EDIT RECIPE:</b></u></h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Recipe Name:</label>
                <TextField
                    label="Enter Recipe Name"
                    variant="outlined"
                    margin="normal"
                />
                <label>Category:</label>
                <TextField
                    label="Enter "
                    variant="outlined"
                    margin="normal"
                />
                <label>Description:</label>
                <TextField          
                    label="Enter Recipe Name"
                    variant="outlined"
                    margin="normal"
                />

                <label>Ingredients:</label>
                <TextField
                    label="Enter Ingredients"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={2}
                />
                <label>Instructions:</label>
                <TextField
                    label="Enter Ingredients"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                />
                <label>Video:</label>
                <TextField
                    label="Enter Recipe Name"
                    variant="outlined"
                    margin="normal"
                />
                <label>Image:</label>
                <img
                    src="path_to_your_image.jpg"
                    alt="Recipe Image"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
                <input type="file" name="" id="" />

                <span style={{display:'flex',justifyContent:'center'}}><Button variant='contained' style={{width:'20%'}}>SUBMIT</Button></span>
            </div>
        </CardContent>
    
        </Card>
        </div>

        </Box>
        </Box>
    </div>
  )
}
