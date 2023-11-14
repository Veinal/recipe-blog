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
import { useNavigate,useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


export default function EditRecipelist() {
    const params=useParams()
    const navigate=useNavigate()

    let recipeID=params.id;

    const [viewRecipes,setViewRecipes]=useState([])

    useEffect(()=>{
        axios.get(`http://localhost:7000/api/recipes/singleview/${recipeID}`)
        .then((res)=>{
            console.log(res.data);
            setViewRecipes(res.data)
        }).catch((err)=>{
            alert(err)
        })
    },[])
    console.log(viewRecipes,'viewrecipes')

    const handleChange=(e)=>{
        setViewRecipes({...viewRecipes,[e.target.name]:e.target.value})
    }

    const handleFileChange=(e)=>{

    }

    const handleSubmit=async(e)=>{
        axios.put(`http://localhost:7000/api/recipes/update/${recipeID}`,viewRecipes)
        .then((res)=>{
            console.log('res',res.data);
          })
          .catch((err)=>{
            console.log(err);
          })
          await navigate('/recipelist')
    }

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
                    name='recipeName'
                    value={viewRecipes?.recipeName}
                    onChange={(e)=>handleChange(e)}
                    label="Enter Recipe Name"
                    variant="outlined"
                    margin="normal"
                />
                <label>Category:</label>
                <TextField
                    name='category'
                    value={viewRecipes?.category}
                    onChange={(e)=>handleChange(e)}
                    label="Enter "
                    variant="outlined"
                    margin="normal"
                />
                <label>Description:</label>
                <TextField 
                    name='description'
                    value={viewRecipes?.description}  
                    onChange={(e)=>handleChange(e)}       
                    label="Enter Recipe Name"
                    variant="outlined"
                    margin="normal"
                />

                <label>Ingredients:</label>
                <TextField
                    name='ingredients'
                    value={viewRecipes?.ingredients}
                    onChange={(e)=>handleChange(e)}
                    label="Enter Ingredients"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={2}
                />
                <label>Instructions:</label>
                <TextField
                    name='instructions'
                    value={viewRecipes?.instructions}
                    onChange={(e)=>handleChange(e)}
                    label="Enter Ingredients"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                />
                <label>Video:</label>
                <TextField
                    name='video'
                    value={viewRecipes?.video}
                    onChange={(e)=>handleChange(e)}
                    label="Enter Recipe Name"
                    variant="outlined"
                    margin="normal"
                />
                <label>Image:</label>
                <img
                    // name=''
                    src={viewRecipes?.image}
                    alt="Recipe Image"
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
                <input type="file" name="image" id="" onChange={(e)=>handleFileChange(e)}/>
                <br />
                
                <span style={{display:'flex',justifyContent:'center'}}>
                    <Button onClick={handleSubmit} variant='contained' style={{width:'20%'}}>SUBMIT</Button>
                </span>
            </div>
        </CardContent>
    
        </Card>
        </div>

        </Box>
        </Box>
    </div>
  )
}
