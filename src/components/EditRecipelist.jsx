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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EditRecipelist() {
    const params=useParams()
    const navigate=useNavigate()

    let recipeID=params.id;

    const [viewRecipes,setViewRecipes]=useState([])
    const [getCategory,setGetCategory]=useState([])
    const [selectedCategory,setSelectedCategory]=useState()

    useEffect(()=>{
        axios.get(`http://localhost:7000/api/recipes/singleview/${recipeID}`)
        .then((res)=>{
            console.log(res.data);
            setViewRecipes(res.data)
        }).catch((err)=>{
            alert(err)
        })
    },[])

    // useEffect(()=>{
    //     axios.get('http://localhost:7000/api/categories/view')
    //     .then((res)=>{
    //         console.log(res.data);
    //         setGetCategory(res.data)
    //     }).catch((err)=>{
    //         alert(err)
    //     })
    // },[])

    const handleChange=(e)=>{
        setViewRecipes({...viewRecipes,[e.target.name]:e.target.value})
    }

    const handleFileChange=(e)=>{
        setViewRecipes({...viewRecipes,[e.target.name]:e.target.files[0]})
    }

    const handleCategory=(e)=>{
        // alert(e.target.value)
        setViewRecipes(e.target.value)
    }
    console.log(viewRecipes,'viewrecipes')


    const handleSubmit=async(e)=>{
        e.preventDefault()

        const Data=new FormData()
        Data.append("recipeName",viewRecipes.recipeName)
        Data.append("image",viewRecipes.image)
        Data.append("ingredients",viewRecipes.ingredients)
        Data.append("category_id",selectedCategory)
        Data.append("description",viewRecipes.description)
        Data.append("instructions",viewRecipes.instructions)
        Data.append("video",viewRecipes.video)

        axios.put(`http://localhost:7000/api/recipes/update/${recipeID}`,Data)
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
                    value={viewRecipes?.recipeName|| ''}
                    onChange={(e)=>handleChange(e)}
                    label="Enter Recipe Name"
                    variant="outlined"
                    margin="normal"
                />
                <label>Category:</label>
                {/* <TextField
                    name='category'
                    value={viewRecipes?.category}
                    onChange={(e)=>handleChange(e)}
                    label="Enter "
                    variant="outlined"
                    margin="normal"
                /> */}
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category:</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={getCategory?.category_id}
                    name="category_id"
                    label=""
                    onChange={(e)=>handleCategory(e)}
                    >
                    {getCategory?.map((item)=>{
                        return(<MenuItem value={item._id}>{item.name}</MenuItem>)
                    })}                       
                    </Select>
                </FormControl>
                <label>Description:</label>
                <TextField 
                    name='description'
                    value={viewRecipes?.description}  
                    onChange={(e)=>handleChange(e)}       
                    label="Enter Description"
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
                    label="Enter Instructions"
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
                    label="Enter Video"
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
