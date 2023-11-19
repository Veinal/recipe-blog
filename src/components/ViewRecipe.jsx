import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function ActionAreaCard() {
  const params=useParams()
  const [recipeState,setRecipeState]=useState([])
  const [otherRecipes,setOtherRecipes]=useState([])

  let recipeID=params.id;
  console.log(recipeID,123)

  useEffect(()=>{
    axios.get(`http://localhost:7000/api/recipes/singleview/${recipeID}`)
    .then((res)=>{
      console.log(res.data)
      setRecipeState(res.data)
    }).catch((err)=>{
      alert(err)
    })
  },[])
console.log(recipeState,100)

  useEffect(() => {
    axios.get('http://localhost:7000/api/recipes/view')
      .then((res) => {
        // Shuffle the array of recipes
        const shuffledRecipes = res.data.sort(() => 0.5 - Math.random());
        // Get the first 3 recipes for display
        const selectedRecipes = shuffledRecipes.slice(0, 4);
        setOtherRecipes(selectedRecipes);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  // const HandleSubmit=()=>{
  //   axios.post('http://localhost:7000/api/favorites/addfavorites',{recipeID:recipeState._id})
  //   .then((res)=>{
  //     console.log(res.data)
  //     alert("added to Favorites")
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }

  const HandleSubmit = () => {
    axios.post('http://localhost:7000/api/favorites/addfavorites', { recipeID: recipeState._id })
      .then((res) => {
        console.log(res.data);
        alert('Added to Favorites');
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message); // Display the error message to the user
        } else {
          console.log(err);
          alert('Error adding to Favorites');
        }
      });
  };
  

  return (
    <div>
      <Grid container spacing={2}>
        {/* Large Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ maxWidth: 900, maxHeight: '100%',marginLeft:'3%' }}>
            {/* <CardActionArea> */}
              <CardMedia
                component="img"
                height="500"
                image={`http://localhost:7000/uploads/recipe/${recipeState?.image}`}
                alt="green iguana"
                style={{objectFit:'cover',borderRadius:'2%'}}
              />
              <CardContent>
                <Typography style={{display:'flex',justifyContent:'space-between'}} gutterBottom variant="h5" component="div">
                  <h2>{recipeState?.recipeName}</h2>
                  <Button onClick={HandleSubmit} variant='contained' color='error'><FavoriteIcon/>Add to Favorites</Button>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <h5>Description:</h5>
                  {recipeState?.description}
                  <br /><br />
                  <h5>Category:</h5>
                  {recipeState.category_id?.name}
                  <br /><br />
                  <h5>Ingredients:</h5>
                  {recipeState?.ingredients}
                  <br /><br />
                  <h5>Instructions:</h5>
                  {recipeState?.instructions}
                  <br /><br />
                  <h5>Video Link:</h5>
                  {recipeState?.video}
                  <br /><br />

                </Typography>
              </CardContent>
            {/* </CardActionArea> */}
          </Card>
        </Grid>
  
        <Grid item xs={12} md={4}>
          <div style={{ marginLeft: '5%' }}>
            <h3><b>Other Recipes:</b></h3>
          </div>
          {/* Display only 3 random recipes */}
          {otherRecipes.map((recipe, index) => (
            <Card key={index} sx={{ maxWidth: 345,marginBottom:'1%' }}>
              {/* <CardActionArea> */}
                <CardMedia
                  component="img"
                  height="250"
                  image={`http://localhost:7000/uploads/recipe/${recipe.image}`}
                  alt={`Recipe ${index}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.recipeName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.description}
                  </Typography>
                </CardContent>
              {/* </CardActionArea> */}
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
