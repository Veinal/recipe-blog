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

export default function Router() {
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
                <Route exact path='/recipelist' element={<Recipelist/>} />
                <Route exact path='/requestlist' element={<Requestlist/>} />
                <Route exact path='/userslist' element={<Userslist/>} />
                <Route exact path='/drawer' element={<Drawer/>} />

                <Route exact path='/recipes' element={<WithNavbar><Recipes/></WithNavbar>} />
                <Route exact path='/aboutus' element={<WithNavbar><Aboutus/></WithNavbar>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}
