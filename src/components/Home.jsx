import React, { useEffect,useState } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Gordon from '../gordon.png'
import Ferran from '../ferran.jpeg'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import image1 from '../image1.jpg'
import image2 from '../image2.jpg'
import image3 from '../image3.jpg'
import image4 from '../image4.jpg'
import recipesvg from '../recipeSvg.svg'
import '../button.css'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Axios from 'axios';
import Rating from '@mui/material/Rating';
import CommentIcon from '@mui/icons-material/Comment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function shuffleArray(array) {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function Home() {
    const [loggedUser,setLoggedUser]=useState()

    useEffect(()=>{
      const user= JSON.parse(localStorage.getItem("User"))
      setLoggedUser(user)
    },[])

    useEffect(() => {
        // Get the carousel element by its ID
        const carousel = document.getElementById('carouselExampleIndicators');
    
        // Set the interval for auto-sliding in milliseconds (e.g., 3 seconds)
        const interval = 3000;
    
        // Function to trigger the next slide
        const nextSlide = () => {
          const activeIndex = parseInt(carousel.querySelector('.active').getAttribute('data-mdb-slide-to'));
          const totalSlides = carousel.querySelectorAll('.carousel-indicators button').length;
          const nextIndex = (activeIndex + 1) % totalSlides;
          carousel.querySelector(`[data-mdb-slide-to="${nextIndex}"]`).click();
        };
    
        // Start auto-sliding
        const autoSlide = setInterval(nextSlide, interval);
    
        // Clear the interval when the component unmounts
        return () => {
          clearInterval(autoSlide);
        };
      }, []);


      const [getRecipes,setGetRecipes]=useState([])

      useEffect(()=>{
        Axios.get('http://localhost:7000/api/recipes/view')
        .then((res)=>{
          console.log(res.data,'res');
          setGetRecipes(res.data)
        })
        .catch((err)=>{
          alert(err)
        })
      },[])

      // Shuffle the array of recipes
      const shuffledRecipes = shuffleArray(getRecipes);

      // Display only the first three recipes
      const displayedRecipes = shuffledRecipes.slice(0, 4);

      const [snackbarOpen, setSnackbarOpen] = useState(false);
      const [snackbarMessage, setSnackbarMessage] = useState('');

      const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };

      const Alert=()=>{
        setSnackbarMessage('Login Required');
        setSnackbarOpen(true);
      }

  return (
    <div>
      {/* <Navbar/> */}

      <Link to='/admindashboard'><Button variant='contained'>admin dashboard</Button></Link>      
      <Link to='/signup'><Button variant='contained'>signup</Button></Link>      
      <Link to='/login'><Button variant='contained'>login</Button></Link>      
      <Link to='/adminlogin'><Button variant='contained'>admin login</Button></Link>      

      <div id="carouselExampleIndicators" className="carousel slide" data-mdb-ride="carousel" >
        <div className="carousel-indicators">
            <button
            type="button"
            data-mdb-target="#carouselExampleIndicators"
            data-mdb-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
            ></button>
            <button
            type="button"
            data-mdb-target="#carouselExampleIndicators"
            data-mdb-slide-to="1"
            aria-label="Slide 2"
            ></button>
            <button
            type="button"
            data-mdb-target="#carouselExampleIndicators"
            data-mdb-slide-to="2"
            aria-label="Slide 3"
            ></button>
            <button
            type="button"
            data-mdb-target="#carouselExampleIndicators"
            data-mdb-slide-to="3"
            aria-label="Slide 4"
            ></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={image1} className="d-block w-100" alt="Wild Landscape" style={{ maxHeight: '600px', objectFit: 'cover' }}/>
            </div>
            <div className="carousel-item">
              <img src={image2} className="d-block w-100" alt="Camera" style={{ maxHeight: '600px', objectFit: 'cover' }}/>
            </div>
            <div className="carousel-item">
              <img src={image3} className="d-block w-100" alt="Exotic Fruits" style={{ maxHeight: '600px', objectFit: 'cover' }}/>
            </div>
            <div className="carousel-item">
              <img src={image4} className="d-block w-100" alt="Exotic Fruits" style={{ maxHeight: '600px', objectFit: 'cover' }}/>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-mdb-target="#carouselExampleIndicators" data-mdb-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
      </div>

      <br /><br />
      <br />
      
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent:'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 400,
              height: "100",
            },
          }}
        >
          <Paper elevation={12}> 
            <img  src={Gordon} style={{width:"100%",height:"100%"}} alt="gordon ramsey" />
          </Paper>
          <h4 style={{marginTop:"8%",width:500}}>“Cooking is not about being the best or most perfect cook, but rather it is about sharing the table with family and friends.”</h4>
        </Box>
      </div> <br /><br /><br />

      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent:'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 400,
              height: "100",
            },
          }}
        >
          <h4 style={{marginTop:"8%",width:500}}>“It's very hard to be an innovator at the highest level in any discipline. For some chef's it's merely about combining ingredients, but that's something you can do with your eyes closed.”</h4>
          <Paper elevation={12} > 
            <img src={Ferran} style={{width:"100%",height:"100%"}} alt="ferran" />
          </Paper>
        </Box>
      </div> <br /><br />

      <hr /> 

      {/* Recipes: */}

      <div>

        <div style={{display:'flex',justifyContent:'center'}}><img src={recipesvg} alt="" /></div>
        <br />
        <div style={{display:'flex',justifyContent:'end'}}>
          {loggedUser ? (
            <Link to='/recipes'><button class="shadow__btn">More Recipes</button></Link>
          ):(
            <button onClick={Alert} class="shadow__btn" >More Recipes</button>     
          )}
        </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
        {displayedRecipes.map((rec) => (
          <React.Fragment key={rec.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" alt="green iguana" height="250" image={`http://localhost:7000/uploads/recipe/${rec?.image}`} />
              <CardContent>
                <Typography style={{ display: 'flex', flexDirection: 'column' }}>
                  <h5>
                    <b>Recipe: </b>
                    {rec.recipeName}{' '}
                  </h5>
                  {/* <h6>
                    <b>Description: </b>
                    {rec.description}
                  </h6> */}
                </Typography>
              </CardContent>
              <CardActions style={{display:'flex',justifyContent:'space-between'}}>
              {/* <Rating
                name="simple-controlled"
                value="3"
                readOnly
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
                <CommentIcon/> */}
              </CardActions>
            </Card>
          </React.Fragment>
        ))}
      </div>

      </div> <br /><br />

      <Footer/>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}
