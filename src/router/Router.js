import { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
import Orders from '../pages/Orders'
import OrdersAdmin from '../pages/admin/Orders'
import Hotels from '../pages/admin/hotels/Hotels'
import NewHotel from '../pages/admin/hotels/NewHotel'
import EditHotel from '../pages/admin/hotels/EditHotel'
import Countries from '../pages/admin/countries/Countries'
import NewCountry from '../pages/admin/countries/NewCountry'
import EditCountry from '../pages/admin/countries/EditCountry'

const Router = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('user_role')

        if(token && role) {
            setUser({
                loggedIn: true,
                token,
                role
            })
        }
    }, [])

    const logoutUser = () => {
        setUser({
            loggedIn: false
        })
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {!user.loggedIn && <Route path="/login" element={<Login />} /> }
                {!user.loggedIn && <Route path="/register" element={<Register />} /> }
                {user.loggedIn && user.role === '0' && (
                    <>
                        <Route path="/admin/orders" element={<OrdersAdmin />} /> 
                        <Route path="/admin/hotels" element={<Hotels />} /> 
                        <Route path="/admin/hotels/new" element={<NewHotel />} /> 
                        <Route path="/admin/hotels/edit/:id" element={<EditHotel />} /> 
                        <Route path="/admin/countries" element={<Countries />} /> 
                        <Route path="/admin/countries/new" element={<NewCountry />} /> 
                        <Route path="/admin/countries/edit/:id" element={<EditCountry />} /> 
                    </>
                )}
                {user.loggedIn && (
                    <>
                        <Route path="/orders" element={<Orders />} /> 
                    </>
                )}
                <Route path="/logout" element={<Logout logoutUser={logoutUser} />} /> 
            </Routes>
        </BrowserRouter>
    )
}

export default Router