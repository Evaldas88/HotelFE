

const HotelCard = (props) => {
    const { data, handleOrder } = props

    return (


        <div className="container text-center mt-5">
            <div className="col-lg-6 mx-auto">
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <div className="d-flex gap-5 flex-wrap">

                        {data.photo && (
                            <div className=" card" style={{ width: "18rem" }}>
                                <img src={data.photo} alt={data.name} className="card-img-top" />
                                <div className="card-body">
                                    <h5>{data.name}</h5>
                                    <h4 className="card-title text-center"><strong>€ {data.price}</strong></h4>
                                    <h5 className="card-title">Trip duration: {data.travel_duration} days  </h5>
                                    <p className="card-text">Country: {data.country}</p>
                                    <button className="btn btn-dark" onClick={() => handleOrder(data.id)}>Order</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelCard