import { Grid, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


export default function Favorites() {
    const [getFav,setGetFav]=useState([])
    const [selectedFav,setSelectedFav]=useState('')
    const [count,setCount]=useState(0)

    useEffect(()=>{
    axios.get('http://localhost:7000/api/favorites/view')
    .then((res)=>{
        console.log(res.data)
        setGetFav(res.data)
    })
    .catch((err)=>{
        alert(err)
    })
    },[count])
    console.log(getFav,101)

    const HandleDelete=(i)=>{
        setSelectedFav(i)
        axios.delete(`http://localhost:7000/api/favorites/RemoveFavorites/${i._id}`)
        .then((res)=>{
            console.log(res.data)
            alert('removed from favorites')
            setCount((prev)=>!prev)
        })
        .catch((err)=>{
            alert(err)
        })
    }

  return (
    <div>
        <span style={{display:'flex',justifyContent:'center'}}><h1><b>YOUR FAVORITES:</b></h1></span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
        {getFav.map((item)=>{
            return(
                <>
                    <Card className='animate__animated animate__flipInY' sx={{ minWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="275"
                        image={`http://localhost:7000/uploads/recipe/${item.recipe_id?.image}`}
                        style={{objectFit:'cover'}}
                        />
                    <CardContent>
                    <Typography style={{display:'flex',flexDirection:'column'}}>
                        <h6><b>Recipe name: </b>{item.recipe_id?.recipeName} </h6>
                        {/* <h6><b>Category: </b>{item.recipe_id?.category_id}</h6> */}
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={()=>HandleDelete(item)} variant='contained' color='error'><HighlightOffIcon/>Remove from favorites</Button>
                    </CardActions>
                    </Card>
                </>
            )
        })}
        </div>
    </div>
  )
}
