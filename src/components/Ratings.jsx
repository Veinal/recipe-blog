import React from 'react';
import { Card, Typography, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import img from '../RATINGS & REVIEWS.png'

const cardStyles = {
  width:'50%',
  margin: '16px auto', // Centers the cards horizontally
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

const Ratings = () => {
  const params=useParams()
  let getID=params.id;

  const [getRatings,setGetRatings]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/ratings/viewall')
    .then((res)=>{
      console.log(res.data)
      const filteredRatings = res.data.filter(item => item.recipe_id?._id === getID);
      // setGetRatings(res.data)
      setGetRatings(filteredRatings)
    }).catch((err)=>{
      alert(err)
    })
  },[])
console.log(getRatings,'getr')

  return (
    <div>
      <div style={{display:'flex',justifyContent:'center'}}>
        <img src={img} alt="" sizes='small' style={{width:'60%'}} />
      </div>
      
    {getRatings.length==0 && 
      <span style={{display:'flex',justifyContent:'center',marginTop:'3%'}}><h5>No ratings and reviews..</h5></span>
    }

      <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
        {getRatings.map((item, index) => (
          <Card key={index} sx={cardStyles}>
            <Avatar alt={item.user} src={`http://localhost:7000/uploads/users/${item.user_id?.picture}`} sx={avatarStyles} />
            <div>
              <h4>Recipe: {item.recipe_id?.recipeName}</h4>
              <h5>User: {item.user_id?.userName}</h5>
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
    </div>
  );
};

export default Ratings;
