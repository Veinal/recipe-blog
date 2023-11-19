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
import Axios from 'axios';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import CommentIcon from '@mui/icons-material/Comment';


export default function ImgMediaCard() {

  const [getRecipes,setGetRecipes]=useState([])
  const [requestState,setRequestState]=useState()
  const navigate=useNavigate()

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

  const handleChange=(e)=>{
    setRequestState({...requestState,[e.target.name]:e.target.value})
  }
  console.log(requestState,'req')

  const handleReqSubmit=(e)=>{
    e.preventDefault();

    axios.post('http://localhost:7000/api/request/insert',requestState)
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
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
            style={{marginRight:'5px'}}
          >
            <i class="fas fa-filter fa-2x"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>

        <div class="input-group" style={{ maxWidth: '300px' }}>
          <div class="form-outline" style={{ flex: 1 }}>
            <input type="search" id="form1" class="form-control" style={{ padding: '0.375rem',border:'1px solid black',backgroundColor:'white' }} />
            <label class="form-label" for="form1">Search</label>
          </div>
          <button type="button" class="btn btn-primary">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

      <br />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
        {getRecipes?.map((rec)=>{
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
                      // value={value}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                    />
                    <CommentIcon/>
                  </div>
                  <Link to={`/viewrecipe/${rec._id}`}><Button variant='contained'>View</Button></Link>
                  {/* <Button size="small">Learn More</Button> */}
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