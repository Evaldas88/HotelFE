import Header from '../components/header/Header'
import HotelList from '../components/hotelList/HotelList'
import Message from '../components/message/Message'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [hotels, setHotels] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
     useEffect(() => {
         setLoading(true)
        axios.get('https://laravel-hotels.herokuapp.com/api/hotels')
        .then(resp => {
            setLoading(false)
            if(resp.data.success) {
                setHotels(resp.data.message)
                console.log()
            }
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Server dead', status: 'danger'})
        })
    }, [])

    return (
        <>
            <Header />
            {loading && ( <div className="loading">Loading...</div> )}
            <div className="container">
                <Message value={message} />
                {hotels ? <HotelList hotels={hotels} /> : (
                    <h2>No hotels</h2>
                )}
            </div>
        </>
    )
}

export default Home