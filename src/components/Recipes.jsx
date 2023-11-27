import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import backimg1 from '../backimg1.jpg'
// import blackbg from '../blackbg.jpg'
import black from '../black.jpg'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import CommentIcon from '@mui/icons-material/Comment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';


export default function ImgMediaCard() {

  const [getRecipes,setGetRecipes]=useState([])
  const [requestState,setRequestState]=useState()
  const navigate=useNavigate()
  const [user,setUser]=useState('')

  useEffect(()=>{
    if(localStorage.getItem("UserToken")===null){
      navigate('/login')
    }else{
      setUser(JSON.parse(localStorage.getItem("UserToken")))
    }
  },[])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/recipes/view')
    .then((res)=>{
      console.log(res.data,'res');
      setGetRecipes(res.data)
    })
    .catch((err)=>{
      alert(err)
    })
  },[])

  const handleChange=(e)=>{
    setRequestState({...requestState,[e.target.name]:e.target.value})
  }
  console.log(requestState,'req')
  
  const [getCategories,setGetCategories]=useState([])
  
  useEffect(()=>{
    axios.get('http://localhost:7000/api/categories/view')
    .then((res)=>{
      console.log(res.data)
      setGetCategories(res.data)
    }).catch((err)=>{
      alert(err)
    })
  },[])

  const [searchState,setSearchState]=useState('')
  const [filterState,setFilterState]=useState('')

  const HandleSearch=(e)=>{
    setSearchState(e.target.value)
  }
  
  const HandleFilter=(filter)=>{
    setFilterState(filter)
  }
  
  const filteredRecipes = getRecipes.filter((recipe) => {
    return (
      recipe.recipeName.toLowerCase().includes(searchState.toLowerCase()) &&
      (filterState === '' || recipe.category_id?.name === filterState)
    );
  });  

  const [getRates,setGetRates]=useState([])

  //to view all the ratings of recipes 
  useEffect(()=>{
    axios.get('http://localhost:7000/api/ratings/viewall')
    .then((res)=>{
      console.log(res.data)
      const ratingsForRecipes = filteredRecipes.map(recipe =>
        res.data.filter(item => item.recipe_id?._id === recipe._id)
      );
      setGetRates(ratingsForRecipes);
    }).catch((err)=>{
      alert(err)
    })
  },[getRecipes])

  const handleReqSubmit=(e)=>{
    e.preventDefault();

    axios.post('http://localhost:7000/api/request/insert',requestState,{headers:{"UserToken":user}})
    .then((res)=>{
      console.log(res.data)
      // setRequestState(res.data)
      window.location.reload();
    }).catch((err)=>{
      console.log(err)
    })
    navigate('/recipes')
  }

  return (
    <div style={{backgroundImage:`url(${black})`,backgroundSize:'cover',backgroundPosition:'center'}}>
      <br />

      {/* filter button and search bar*/}
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
          <span style={{display:'flex'}}>
            <h5 style={{color:'white',margin:'auto'}}>Category:</h5>
            <FormControl sx={{ m: 1, minWidth: 80,backgroundColor:'white' }}>
              {/* <InputLabel id="demo-simple-select-autowidth-label">Category:</InputLabel> */}
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                // value={age}
                onChange={(e) => HandleFilter(e.target.value)}
                autoWidth
                // label="Age"
                size='small'
              >
                <MenuItem value="">All</MenuItem>
                {getCategories.map((categ)=>(
                  <MenuItem value={categ.name}>{categ.name}</MenuItem>               
                ))}
              </Select>
            </FormControl>
          </span>
        </div>

        <div style={{display:'flex',gap:'1%',width:'30%'}}>
          <TextField value={searchState} onChange={(e)=>HandleSearch(e)} id="filled-basic" label='Search' variant="outlined" size='small' style={{backgroundColor:'white',borderRadius:'3%',width:'140%'}}/>
          <Button variant='filled' color='primary' style={{border:'1px solid white'}}><SearchIcon style={{color:'white'}}/></Button>
        </div>
      </div>

      <br />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
        {filteredRecipes?.map((rec,index)=>{
          // const ratingsForRecipe = getRates.filter((rate) => rate.recipe_id?._id === rec._id);
          const ratingsForRecipe = getRates[index] || [];
          return(
            <>
              <Card className='animate__animated animate__flipInY' sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="275"
                  image={`http://localhost:7000/uploads/recipe/${rec?.image}`}
                  style={{objectFit:'cover'}}
                />
                <CardContent>
                  <Typography style={{display:'flex',flexDirection:'column'}}>
                    <h6><b>Recipe name: </b>{rec.recipeName} </h6>
                    <h6><b>Category: </b>{rec.category_id?.name}</h6>
                  </Typography>
                </CardContent>
                <CardActions style={{display:'flex',justifyContent:'space-between'}}>
                  <div style={{display:'flex',justifyContent:'space-between',gap:'5%'}}> 
                    <Rating
                      name="simple-controlled"
                      value={ratingsForRecipe.reduce((acc, rate) => acc + rate.ratings, 0) / ratingsForRecipe.length}
                      precision={0.5}
                      readOnly
                    />
                    <CommentIcon /> {ratingsForRecipe.filter(rate => rate.reviews).length}
                  </div>
                  {rec.status==='available' ?
                    <Link to={`/viewrecipe/${rec._id}`}><Button variant='contained'>View</Button></Link>
                    :
                    <Button variant='contained' disabled>Disabled</Button>
                  }
                </CardActions>
              </Card>
            </>
          )
        })}
      </div>

      <hr />

      <div >

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
      <Card variant='outlined' sx={{ minWidth: 275, border: '2px solid black', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '0', color: '#4CAF50' }}><b>REQUEST FOR RECIPE</b></h3>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: '5%' }}>
            <Typography>
              Request: <TextField name='request' onChange={(e)=>handleChange(e)} size='small' label='Recipe Name' variant='outlined' />
            </Typography>
            <Typography>
              Remarks: <TextField name='remarks' onChange={(e)=>handleChange(e)} size='small' label='Remarks' variant='outlined' />
            </Typography>
          </div>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Link to='/myrequests'>
            <Button variant='contained' color='primary' style={{ color: 'white' }}>
              My Requests
            </Button>
          </Link>
          <Button onClick={handleReqSubmit} variant='contained' style={{ backgroundColor: '#4CAF50', color: 'white' }}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
        
      </div>

    </div>
  );
}