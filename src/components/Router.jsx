import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom' 
import Home from './Home'
import AdminDashboard from './AdminDashboard'
import Categorylist from './Categorylist'
import Recipelist from './Recipelist'
import Requestlist from './Requestlist'
import Userslist from './Userslist'
import Drawer from './Drawer'
import Recipes from './Recipes'
import Aboutus from './Aboutus'
import Navbar from './Navbar'
import EditAdmin from './EditAdmin'
import ViewRecipe from './ViewRecipe'
import SignUp from './Signup'
import Login from './Login'
import AdminLogin from './AdminLogin'
import EditRecipelist from './EditRecipelist'
import EditCateglist from './EditCateglist'
import Favorites from './Favorites'
import MyRequests from './MyRequests'
import { useState } from 'react'
import Ratings from './Ratings'
import Ratingslist from './Ratingslist'
import EditUser from './EditUser'

export default function Router() {
  const [dep,setDep]=useState(false)
  // Create a higher-order component (HOC) for routes that need the Navbar
  const WithNavbar = ({ children }) => (
    <>
      <Navbar />
      {children}
    </>
  );

  return (
    <div>
        <BrowserRouter>
        {/* <Navbar/> */}
            <Routes>
                <Route exact path='/' element={<WithNavbar><Home/></WithNavbar>} />
                <Route exact path='/admindashboard' element={<AdminDashboard/>} />
                <Route exact path='/categorylist' element={<Categorylist/>} />
                <Route exact path='/recipelist' element={<Recipelist dep={dep}/>} />
                <Route exact path='/requestlist' element={<Requestlist/>} />
                <Route exact path='/userslist' element={<Userslist/>} />
                <Route exact path='/drawer' element={<Drawer/>} />
                <Route exact path='/editadmin' element={<EditAdmin/>}/>
                <Route exact path='/signup' element={<SignUp/>}/>
                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/adminlogin' element={<AdminLogin/>}/>
                <Route exact path='/editrecipelist/:id' element={<EditRecipelist dep={dep} setDep={setDep}/>}/>
                <Route exact path='/editcateglist/:id' element={<EditCateglist/>}/>
                <Route exact path='/ratingslist' element={<Ratingslist/>}/>

                <Route exact path='/favorites' element={<WithNavbar><Favorites/></WithNavbar>}/>
                <Route exact path='/myrequests' element={<WithNavbar><MyRequests/></WithNavbar>}/>
                <Route exact path='/ratings/:id' element={<WithNavbar><Ratings/></WithNavbar>}/>
                <Route exact path='/recipes' element={<WithNavbar><Recipes/></WithNavbar>} />
                <Route exact path='/aboutus' element={<WithNavbar><Aboutus/></WithNavbar>} />
                <Route exact path='/edituser' element={<WithNavbar><EditUser/></WithNavbar>} />
                <Route exact path='/viewrecipe/:id' element={<WithNavbar><ViewRecipe/></WithNavbar>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
