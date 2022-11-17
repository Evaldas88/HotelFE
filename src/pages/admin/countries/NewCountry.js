import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const NewCountry = () => {
    const [form, setForm] = useState({
        name: '',
        season: ''
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
     const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        axios.post('http://127.0.0.1:8000/api/countries', form, {
            headers: { 
                Authorization: `Bearer ${token}`
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'Country saved', status: 'success'})
                setTimeout(() => navigate('/admin/countries'), 2000)
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Server dead', status: 'danger'})
        })
    }

    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container">
                     <div className="col-md-12 d-flex">
                        <h2>New country</h2>
                    </div>
                 <Message value={message} />
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label  className=" mt-2">Country name:</label>
                        <input type="text" name="name" className="form-control mt-2" onChange={handleFormChange}   />
                    </div>
                    <div className="form-group">
                        <label  className="  mt-2">Season:</label>
                        <input type="text" name="season" className="form-control mt-2" onChange={handleFormChange}  />
                    </div>
                    <div className="form-group mt-2">
                        <button type="submit" className="btn btn-dark">Enter</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewCountry