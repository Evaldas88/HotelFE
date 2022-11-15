import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('user_role')

        if (token && role) {
            setUser({
                loggedIn: true,
                token,
                role
            })
        }
    }, [])

    return (
        <header className="navbar-dark bg-dark">
          <div className="container d-flex justify-content-between">
                <div className="logo"><h1>Logo</h1></div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {!user.loggedIn && (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )}
                        {user.loggedIn && (
                            <>
                                <li><Link to="/orders">Your orders  </Link></li>
                                <li><Link to="/logout">Logout</Link></li>
                            </>
                        )}
                        {user.loggedIn && user.role === '0' && (
                            <>
                                <li>
                                    <Link to="/admin/orders">Admin</Link>
                                    <ul>
                                        <li><Link to="/admin/orders">Orders</Link></li>
                                        <li><Link to="/admin/hotels">Hotels</Link></li>
                                        <li><Link to="/admin/countries">Countries</Link></li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header