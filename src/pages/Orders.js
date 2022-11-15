import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import Header from '../components/header/Header'
import Message from '../components/message/Message'
import axios from 'axios'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)
     const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/orders/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setOrders(resp.data.message)
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Server dead', status: 'danger'})
            //navigate('/login')
        })
    }, [])

    return (
        <> 
            <Header />
            {loading && ( <div className="loading">Loading...</div> )}
            <div className="pt-5 container">
                <div className=" mb-5">
                    <div className=" ">
                        <h2>Orders</h2> 
                    </div>
                </div>  
                <Message value={message} />
                {orders.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Hotel</th>
                                <th>Price</th>
                                <th>Duration</th>
                                <th>Country</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.hotel_name}</td>
                                <td>{order.price}</td>
                                <td>{order.travel_duration}</td>
                                <td>{order.country_name}</td>
                                <td> {order.approved === 0 ? 'Waiting for confirmation' :   'Confirmed' } </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">No orders yet</h5> }
            </div>
        </>
    )
}

export default Orders