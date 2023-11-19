import React from 'react';
import '../Aboutus.css';
import logo from '../logo.png'
import backimg1 from '../backimg1.jpg'

const backgroundStyles = {
  backgroundImage:`url(${backimg1})` , 
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '92vh', 
};

export default function AboutUs() {
  return (
    <div style={backgroundStyles}>
    <br />
      <div className="about-us">
        <h1 className='animate__animated animate__bounceInDown'>About Us</h1>
        <p className="intro animate__animated animate__bounceInDown animate__delay-1s">
          Welcome to our Food Recipe Blog! We are passionate about sharing delicious recipes and culinary adventures with you.
        </p>
        <p className="description animate__animated animate__bounceInDown animate__delay-1s">
          Meet our dedicated team of gastronomic explorers, committed to curating and delivering the crème de la crème of recipes, insider cooking tricks, and limitless culinary inspiration right to your kitchen.
        </p>
        <div className="image-container">
          <img
            src={logo}
            alt="Team Photo"
            className="team-photo animate__animated animate__bounceInDown animate__delay-2s"
            style={{width:'40%'}}
          />
        </div>
      </div>
    </div>
  );
}
