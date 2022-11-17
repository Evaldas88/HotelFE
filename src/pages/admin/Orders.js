import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Message from '../../components/message/Message'
import axios from 'axios'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/orders/all', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setLoading(false)
                setReload(false)
                setOrders(resp.data.message)
                console.log(resp.data.message)
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'server dead', status: 'danger' })
                //navigate('/login')
            })
    }, [reload])

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete('http://127.0.0.1:8000/api/orders/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setLoading(false)
                setReload(true)
                setMessage({ text: resp.data.message, status: 'success' })
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'server dead', status: 'danger' })
                //navigate('/login')
            })
    }

    const handleStatus = (id) => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/orders/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setReload(true)
                setLoading(false)
                setMessage({ text: resp.data.message, status: 'success' })
            })
            .catch(err => {
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'server dead', status: 'danger' })
                //navigate('/login')
            })
    }


    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container">
                <div className="  mb-5">
                    <div className=" ">
                        <h2>Orders</h2>
                    </div>
                </div>
                <Message value={message} />
                {orders.length > 0 ? (
                    <table className="table ">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Hotel</th>
                                <th>Price</th>
                                <th>Duration</th>
                                <th>Country</th>
                                <th>Status</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.user_id}</td>
                                    <td>{order.hotel_name}</td>
                                    <td>{order.price}</td>
                                    <td>{order.travel_duration}</td>
                                    <td>{order.country_name}</td>
                                    <td>{order.approved === 0 ? 'Waiting for confirmation' : 'Confirmed'}</td>
                                    <td>
                                        <button className="btn btn-danger me-2" onClick={() => handleDelete(order.id)}>Delete</button>
                                        <button className="btn btn-success" onClick={() => handleStatus(order.id)}>
                                            {order.approved === 0 ? 'Approve' : 'cancel'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">No orders yet</h5>}
            </div>
        </>
    )
}

export default Orders