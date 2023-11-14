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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate,useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


export default function EditRecipelist() {
    const params=useParams()
    const navigate=useNavigate()

    let categID=params.id

    const [viewCategory,setViewCategory]=useState([])

    useEffect(()=>{
        axios.get(`http://localhost:7000/api/categories/singleview/${categID}`)
        .then((res)=>{
            console.log('res',res.data);
            setViewCategory(res.data)
        })
        .catch((err)=>{
            alert(err);
        });
    },[])
    console.log(viewCategory,'viewcateg')
    console.log(viewCategory?.status,'viewcategstatus')

    const HandleChange=(e)=>{
        setViewCategory({...viewCategory,[e.target.name]:e.target.value})
    }

    const HandleSubmit=async(e)=>{
        axios.put(`http://localhost:7000/api/categories/update/${categID}`,viewCategory)
        .then((res)=>{
            console.log('res',res.data);
          })
          .catch((err)=>{
            console.log(err);
          })
          await navigate('/categorylist')
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
                <label>Category Name:</label>
                <TextField
                    name='name'
                    value={viewCategory?.name}
                    onChange={(e)=>HandleChange(e)}
                    label="Enter Recipe Name"
                    variant="outlined"
                    margin="normal"
                />
                {/* <label>Status:</label> */}
                <InputLabel id="demo-simple-select-label" style={{color:'black'}}>Status:</InputLabel>
                    <Select
                        name='status'
                        value={viewCategory?.status}
                        onChange={(e) => HandleChange(e)}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                    >
                        <MenuItem value="available">available</MenuItem>
                        <MenuItem value="not available">not available</MenuItem>
                    </Select>      
                <br />
                <span style={{display:'flex',justifyContent:'center'}}>
                    <Button onClick={HandleSubmit} variant='contained' style={{width:'20%'}}>SUBMIT</Button>
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
