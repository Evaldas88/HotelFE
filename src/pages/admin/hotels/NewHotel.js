import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const NewHotel = () => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        photo: '',
        travel_duration: '',
        country_id: 0
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const handleFormChange = (e) => {
        if(e.target.name === 'photo')
            setForm({ ...form, [e.target.name]: e.target.files[0] })
        else
            setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setLoading(true)

        axios.get('http://127.0.0.1:8000/api/countries')
        .then(resp => {
            setLoading(false)
            setCountries(resp.data.message)
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
            //navigate('/login')
        })
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        let formData = new FormData()
        for(const key of Object.keys(form)) {
            formData.append(key, form[key])
        }

        axios.post('http://127.0.0.1:8000/api/hotels', formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'Viešbutis sėkmingai išssaugotas', status: 'success'})
                setTimeout(() => navigate('/admin/hotels'), 2000)
            }
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
        })
    }

    return (
        <>
            <Header />
            {loading && (<div className="loading">Loading...</div>)}
            <div className="pt-5 container">
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <h2>New hotel</h2>
                    </div>
                </div>
                <Message value={message} />
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label className="mt-2">Hotel Name:</label>
                        <input type="text" name="name" className="form-control m-1" onChange={handleFormChange} value={form.name} />
                    </div>
                    <div className="form-group">
                        <label className="mt-2">Price:</label>
                        <input type="number" name="price" className="form-control mt-1" onChange={handleFormChange} value={form.price} />
                    </div>
                    <div className="form-group">
                        <label className="mt-2">Photo:</label>
                        <input type="file" name="photo" className="form-control-file mt-1" onChange={handleFormChange} />
                    </div>
                    <div className="form-group">
                        <label className="mt-2">Trip Duration :</label>
                        <input type="text" name="travel_duration" className="form-control mt-1" onChange={handleFormChange} value={form.travel_duration} />
                    </div>
                    <div className="form-group">
                        <label className="mt-2">Country:</label>
                        <select name="country_id" className="form-control mt-3" onChange={handleFormChange}>
                            <option value="0">Choose country</option>
                            {countries.map(country => <option value={country.id}>{country.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Enter</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewHotel