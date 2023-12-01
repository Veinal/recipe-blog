import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.png'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Navbar() {
    const [userState,setUserState]=useState([])
    const navigate=useNavigate()
    const isLoggedIn =userState.length>0;
    
    useEffect(()=>{
        const userData=JSON.parse(localStorage.getItem("User"))
        console.log(userData,'userData')
        // setUserState(userData)
        if (userData) {
        setUserState([userData]); // Wrapping userData in an array
        }
    },[])

    const [loggedUser,setLoggedUser]=useState()

    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem("User"))
        setLoggedUser(user)
    },[])
    
    const Logout=()=>{
        navigate('/')
        localStorage.removeItem("UserToken")
        localStorage.removeItem("User")
        setUserState([])
        window.location.reload()
    }
    

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
                <img
                src={logo}
                height="38"
                alt="MDB Logo"
                loading="lazy"
                style={{borderRadius:'50%'}}
                />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">   
                <li className="nav-item">
                <Link to='/'><a className="nav-link" href="#">Home</a></Link>
                </li>
                
                {/* displaying these only if the user is logged in */}
                {loggedUser && (
                <li className="nav-item">
                <Link to='/recipes'><a className="nav-link" href="#">Recipes</a></Link>
                </li>
                )}

                {loggedUser && (
                <li className="nav-item">
                <Link to='/favorites'><a className="nav-link" href="#">Favorites</a></Link>
                </li>
                )}

                <li className="nav-item">
                <Link to='/aboutus'><a className="nav-link" href="#">About Us</a></Link>
                </li>
                
            </ul>
            </div>

            <div className="d-flex align-items-center">
                {isLoggedIn ? (
                userState.map((u) => (
                    <div key={u._id} className="dropdown">
                        <a
                            className="dropdown-toggle d-flex align-items-center hidden-arrow"
                            href="#"
                            id="navbarDropdownMenuAvatar"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src={`http://localhost:7000/uploads/users/${u?.picture}`}
                                className="rounded-circle"
                                height="30"
                                alt="Profile"
                                loading="lazy"
                            />
                            <span style={{color:'black'}} className="ms-2">Hi, {u?.userName}</span> {/* Assuming name is available in userData */}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                            {/* Other dropdown items */}
                            <li>
                                <Link to='/edituser'>
                                    <a className="dropdown-item" href="#">
                                        My Profile
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <a onClick={Logout} className="dropdown-item" href="#">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                ))
                ):(
                <Link to='/login'><button type="button" class="btn btn-primary">Login</button></Link>
                )}
            </div>
        </div>
        </nav>
    </div>
  )
}
