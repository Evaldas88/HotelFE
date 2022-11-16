import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const Hotels = () => {
    const [hotels, setHotels] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        axios.get('https://laravel-hotels.herokuapp.com/api/hotels', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(resp => {
                setLoading(false)
                setReload(false)
                setHotels(resp.data.message)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                if (err.response.data)
                    setMessage({ text: err.response.data.message, status: 'danger' })
                else
                    setMessage({ text: 'server dead', status: 'danger' })
                //navigate('/login')
            })
    }, [reload])

    const handleDelete = (id) => {
        console.log(id)
        setLoading(true)
        axios.delete('https://laravel-hotels.herokuapp.com/api/hotels/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((resp) => {
                setLoading(false)
                setReload(true)
                setMessage({ text: resp.data.message, status: 'success' })
                setTimeout(() => setMessage({ text: '', status: '' }), 5000)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
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
            <div className="pt-5 container " >
                <div className="row mb-5">
                    <div  >
                        <h2>Hotels</h2>
                        <div>
                            <Link to="/admin/hotels/new" className="btn btn-dark ml-auto">New hotel</Link>
                        </div>
                    </div>
                </div>
                <Message value={message} />
                {hotels.length > 0 ? (
                    <table className="table bg-light table-bordered " >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Photo</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Duration</th>
                                <th>Country</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map(hotel => (
                                <tr key={hotel.id} className="text-center">
                                    <td className="text-center">{hotel.id}</td>
                                    <td  ><img src={hotel.photo} alt={hotel.name} style={{ width: "6rem" }} /></td>
                                    <td>{hotel.name}</td>
                                    <td>{hotel.price}</td>
                                    <td>{hotel.travel_duration}</td>
                                    <td>{hotel.country}</td>
                                    <td className="text-alling-center">
                                        <button className="btn btn-danger text-center me-2" onClick={() => handleDelete(hotel.id)}><i className="bi bi-trash3 me-1"></i>Delete</button>
                                        <Link to={'/admin/hotels/edit/' + hotel.id} className="btn btn-primary"> <i className="bi bi-pen me-1"></i>Edit</Link>
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

export default Hotels