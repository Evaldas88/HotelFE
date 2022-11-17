import { useState } from 'react'
import HotelCard from '../hotelCard/HotelCard'
import Message from '../message/Message'
import axios from 'axios'

import './HotelList.css'

const HotelsList = (props) => {
    const hotels = props.hotels
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })

    const handleOrder = (id) => {
        setLoading(true)

        axios.post('https://laravel-hotels.herokuapp.com/api/orders', {
            hotel_id: id
        }, 
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'Order success', status: 'success'})
            }
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Server deadt', status: 'danger'})
        })
    }

    return loading ? ( <div className="loading">loading...</div> ) : (
        <>
            <Message value={message} />
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {hotels.map(hotel => <HotelCard key={hotel.id} data={hotel} handleOrder={handleOrder} />)}
            </div>
        </>
    )
}

export default HotelsList