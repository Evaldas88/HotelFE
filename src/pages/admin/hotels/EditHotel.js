import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const EditHotel = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '',
        price: '',
        photo: '',
        travel_duration: '',
        country_id: 0
    })
    const [image, setImage] = useState('')
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
                setMessage({text: 'Server dead', status: 'danger'})
            //navigate('/login')
        })

        axios.get('http://127.0.0.1:8000/api/hotels/' + id)
        .then(resp => {
            setLoading(false)
            setForm({
                name: resp.data.message[0].name,
                price: resp.data.message[0].price,
                photo: '',
                travel_duration: resp.data.message[0].travel_duration,
                country_id: resp.data.message[0].country_id || ''
            })
            if(resp.data.message[0].photo)
                setImage('http://localhost:8000' + resp.data.message[0].photo)
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

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        
        let formData = new FormData()
        for(const key of Object.keys(form)) {
            formData.append(key, form[key])
        }

        axios.post('https://laravel-hotels.herokuapp.com/api/hotels/' + id, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', 
            }
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'Hotel saved', status: 'success'})
                setTimeout(() => navigate('/admin/hotels'), 2000)
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
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <h2>Edit hotel</h2>
                    </div>
                </div>
                <Message value={message} />
                <form className="editHotelForm" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label className=" mt-3">Hotel name:</label>
                        <input type="text" name="name" className="form-control  mt-2" onChange={handleFormChange} value={form.name} />
                    </div>
                    <div className="form-group">
                        <label className=" mt-3">Price:</label>
                        <input type="number" name="price" className="form-control  mt-2" onChange={handleFormChange} value={form.price} />
                    </div>
                    <div className="form-group">
                        <label className=" mt-3">Photo:</label>
                        <input type="file" name="photo" className="form-control-file  mt-2" onChange={handleFormChange} />
                        {image && <img className="previewImage  mt-2" src={image} style={{ width: "6rem" }}/>}
                    </div>
                    <div className="form-group">
                        <label className=" mt-3">Trip duration:</label>
                        <input type="text" name="travel_duration  mt-2" className="form-control" onChange={handleFormChange} value={form.travel_duration} />
                    </div>
                    <div className="form-group">
                        <label className=" mt-3">Country:</label>
                        <select name="country_id" className="form-control mt-2" onChange={handleFormChange} value={form.country_id}>
                            <option value="0">Choose country</option>
                            {countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" className="btn btn-dark">Enter</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default EditHotel