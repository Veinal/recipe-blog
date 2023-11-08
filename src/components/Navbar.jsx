import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../logo.png'

export default function Navbar() {
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
                <li className="nav-item">
                <Link to='/recipes'><a className="nav-link" href="#">Recipes</a></Link>
                </li>
                <li className="nav-item">
                <Link to='/aboutus'><a className="nav-link" href="#">About Us</a></Link>
                </li>
            </ul>
            </div>

            <div className="d-flex align-items-center">
            <a className="text-reset me-3" href="#">
                <i className="fas fa-shopping-cart"></i>
            </a>

            <div className="dropdown">
                <a
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                >
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">1</span>
                </a>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
                >
                <li>
                    <a className="dropdown-item" href="#">Some news</a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">Another news</a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">Something else here</a>
                </li>
                </ul>
            </div>
            <div className="dropdown">
                <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                >
                <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                />
                </a>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
                >
                <li>
                    <a className="dropdown-item" href="#">My profile</a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">Settings</a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">Logout</a>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </nav>
    </div>
  )
}
