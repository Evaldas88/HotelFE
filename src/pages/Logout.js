import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = (props) => {
    const { logoutUser } = props
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user_role')
                logoutUser()
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                logoutUser()
                navigate('/')
            })
        }
    }, [])
}

export default Logout;