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
import { Link, useNavigate, useParams } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const cardStyles = {
  width:'70%',
  // margin: '16px auto', // Centers the cards horizontally
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  borderRadius: '8px',
  border: '2px solid #e0e0e0', // Border design
};

const avatarStyles = {
  marginRight: '16px',
};

const ratingStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
};

const starIconStyles = {
  color: '#FFD700',
  marginRight: '4px',
};

export default function ActionAreaCard() {
  const params=useParams()
  const [recipeState,setRecipeState]=useState([])
  const [otherRecipes,setOtherRecipes]=useState([])
  const [user,setUser]=useState("")
  const [count,setCount]=useState(0)
  const [count2,setCount2]=useState(0)
  const navigate=useNavigate()

  useEffect(()=>{
    if(localStorage.getItem("UserToken")===null){
      navigate('/login')
    }else{
      setUser(JSON.parse(localStorage.getItem("UserToken")))
    }
  },[])

  let recipeID=params.id;
  // console.log(recipeID,123)

  useEffect(()=>{
    axios.get(`http://localhost:7000/api/recipes/singleview/${recipeID}`)
    .then((res)=>{
      console.log(res.data)
      setRecipeState(res.data)
    }).catch((err)=>{
      alert(err)
    })
  },[recipeID])
// console.log(recipeState,100)

  useEffect(() => {
    axios.get('http://localhost:7000/api/recipes/view')
      .then((res) => {
        // Get the category ID of the viewed recipe
        const categoryID = recipeState?.category_id?._id;

        // Filter other recipes based on the category ID of the viewed recipe
        const filteredRecipes = res.data.filter(recipe => recipe.category_id?._id === categoryID && recipe._id !== recipeID);

        // Set otherRecipes to the filtered list based on the category ID
        setOtherRecipes(filteredRecipes);
      })
      .catch((err) => {
        alert(err);
      });
  }, [recipeState, recipeID]);

  const [userRating,setUserRating]=useState(0)
  const [userReview,setUserReview]=useState('')

  const HandleRatingChange=(e,newValue)=>{
    setUserRating(newValue)
  }
  // console.log(userRating,222)

  const HandleReviewChange=(e)=>{
    setUserReview(e.target.value)
  }
  // console.log(userReview,333)

  const [getRates,setGetRates]=useState([])

  //to view all the ratings of recipes for star and comment numbers
  useEffect(()=>{
    axios.get('http://localhost:7000/api/ratings/viewall')
    .then((res)=>{
      console.log(res.data)
      const filteredRatings = res.data.filter(item => item.recipe_id?._id === recipeID);
      // setGetRatings(res.data)
      setGetRates(filteredRatings)
    }).catch((err)=>{
      alert(err)
    })
  },[count,recipeID])
  // console.log(getRates,'getRates')

  const [getUserRatings,setGetUserRatings]=useState([])

  //to view ratings of particular user
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("UserToken"))
    axios.get('http://localhost:7000/api/ratings/view',{headers:{"UserToken":user}})
    .then((res)=>{
      console.log(res.data)
      const filteredRatings = res.data.filter(item => item.recipe_id?._id === recipeID);
      setGetUserRatings(filteredRatings)
    }).catch((err)=>{
      alert(err)
    })
  },[])

  //to check whether the favorites exist or not for the buttons
  const [getFav,setGetFav]=useState([])

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("UserToken"))
    console.log(user,343)
    axios.get('http://localhost:7000/api/favorites/view',{headers:{"UserToken":user}})
    .then((res)=>{
        console.log(res.data)
        setGetFav(res.data)
    })
    .catch((err)=>{
        alert(err)
    })
  },[count2])

  //snackbar code
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  //recipeID is received as parameter from the button where recipeState._id is sent as parameter
  const RatingSubmit=()=>{
    const data={
      recID:recipeState._id,
      ratings:userRating,
      reviews:userReview,
    }

    axios.post('http://localhost:7000/api/ratings/insert',data,{headers:{"UserToken":user}})
    .then((res)=>{
      console.log(res.data)
      window.location.reload();
      alert("ratings and reviews posted")
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  //here the recipeID and recipeState._id are the same
  //handlesubmit to add to favorites
  const HandleSubmit = () => {
    axios.post('http://localhost:7000/api/favorites/addfavorites', { recipeID: recipeState._id },{headers:{"UserToken":user}})
      .then((res) => {
        console.log(res.data);
        // alert('Added to Favorites');
        setSnackbarMessage('Added to Favorites successfully');
        setSnackbarOpen(true);
        setCount2((prev)=>!prev)
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

  const HandleDelete=(id)=>{
    axios.delete(`http://localhost:7000/api/ratings/delete/${id}`)
    .then((res)=>{
      console.log(res.data)
      const updatedUserRatings = getUserRatings.filter((rating) => rating._id !== id);
      setGetUserRatings(updatedUserRatings)
      setCount((prev)=>!prev)
      alert('Rating deleted successfully')
    })
    .catch((err)=>{
      console.log(err)
      alert("error deleting rating")
    })
  }
  

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
                  <Button onClick={HandleSubmit} variant='contained' color='error' disabled={getFav.some(fav => fav.recipe_id?._id === recipeState?._id)}>
                    {/* <FavoriteIcon/>Add to Favorites */}
                    {getFav.some(fav => fav.recipe_id?._id === recipeState?._id) ? 
                      (<>
                        <FavoriteIcon />
                        Already Favorited
                      </>) : 
                      (<>
                        <FavoriteBorderIcon />
                        Add to Favorites
                      </>)
                    }
                  </Button>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Rating
                    name="read-only"
                    value={getRates.reduce((acc, rate) => acc + rate.ratings, 0) / getRates.length}
                    precision={0.5}
                    readOnly
                  />
                  <Link to={`/ratings/${recipeID}`}>
                    <Button style={{marginBottom:'1%',color:'black'}} variant='text' color='inherit'>
                    <CommentIcon />{getRates.filter(rate => rate.reviews).length}
                    {/* <CommentIcon />{getRates.length} */}
                    </Button>
                  </Link>
                  <br />
                  <h5>Description:</h5>
                  {recipeState?.description}
                  <br /><br />
                  <h5>Category:</h5>
                  {recipeState.category_id?.name}
                  <br /><br />
                  {/* <h5>Ingredients:</h5>
                  {recipeState?.ingredients}
                  <br /><br /> */}
                  <h5>Ingredients:</h5>
                  {recipeState?.ingredients && recipeState.ingredients.split('\n').map((ingredient, index) => (
                    <p key={index}>{ingredient}</p>
                  ))}
                  {/* <h5>Instructions:</h5>
                  {recipeState?.instructions}
                  <br /><br /> */}
                  <h5>Instructions:</h5>
                  {recipeState?.instructions && recipeState.instructions.split('\n').map((instruction, index) => (
                    <p key={index}>{instruction}</p>
                  ))}
                  <h5>Video Link:</h5>
                  {recipeState?.video && (
                    <div style={{ marginTop: '1rem' }}>
                      <a
                        href={recipeState.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'blue' }}
                      >
                        {recipeState?.video}
                      </a>
                    </div>
                  )}
                  <br />

                </Typography>
              </CardContent>
            {/* </CardActionArea> */}
          </Card>

          <br />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Card sx={{ minWidth: 350, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} elevation={4}>
            <CardContent>
              <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '20px' }}>
                RATINGS & REVIEWS
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '5px', color: '#333' }}>Rating:</label>
                <Box sx={{ marginLeft: '5%', display: 'flex', alignItems: 'center' }}>
                  <Rating
                      name="simple-controlled"
                      value={userRating}
                      max={5}
                      onChange={(event, newValue) => {
                        // If the same star is clicked again, set the rating to 0 (reset)
                        const newValueForState = userRating === newValue ? 0 : newValue;
                        setUserRating(newValueForState);
                      }}
                    />
                </Box>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ marginBottom: '5px', color: '#333' }}>Reviews:</label>
                  <TextField
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Write your review..."
                    value={userReview}
                    onChange={(e)=>HandleReviewChange(e)}
                  />
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'center',marginTop:'3%'}}><Button variant='contained' onClick={RatingSubmit}>Submit</Button></div>
            </CardContent>
          </Card>
        </div>
        {getUserRatings.length > 0 && 
        <h3>My Reviews:</h3>

        }
        <div style={{display:'flex',flexDirection:'column',marginLeft:'5%',gap:5}}>
          {getUserRatings.map((item, index) => (
            <Card key={index} sx={cardStyles}>
              <div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <h4>Recipe: {item.recipe_id?.recipeName}</h4>
                  <Button onClick={()=>HandleDelete(item._id)} color='error'><DeleteIcon/></Button>
                </div>
                <div style={ratingStyles}>
                  <StarIcon sx={starIconStyles} />
                  <Typography variant="body1">{item.ratings}</Typography>
                </div>
                <Typography variant="body1">{item.reviews}</Typography>
                {/* You can add more information if needed */}
              </div>
            </Card>
          ))}
        </div>
        </Grid>
  
        <Grid item xs={12} md={4}>
          <div style={{ marginLeft: '5%' }}>
            <h3><b>Related Recipes:</b></h3>
          </div>
          {/* Display only 3 random recipes */}
          {otherRecipes.map((recipe, index) => (
            <Card key={index} sx={{ maxWidth: 345, marginBottom: '1%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardMedia
              component="img"
              height="250"
              image={`http://localhost:7000/uploads/recipe/${recipe.image}`}
              alt={`Recipe ${index}`}
              style={{ objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Link to={`/viewrecipe/${recipe._id}`} style={{ color: 'black', textDecoration: 'none' }}>{recipe.recipeName}</Link>
              </Typography>
              <Typography variant="body3" color="text.primary">
                <span style={{ fontWeight: 'bold' }}>Category:</span> {recipe?.category_id?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {recipe.description}
              </Typography>
            </CardContent>
            {/* <CardActions style={{ borderTop: '1px solid #eee', padding: '8px', marginTop: 'auto' }}>
            </CardActions> */}
          </Card>
          
          ))}
        </Grid>
      </Grid>

      <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      </div>
    </div>
  );
}
