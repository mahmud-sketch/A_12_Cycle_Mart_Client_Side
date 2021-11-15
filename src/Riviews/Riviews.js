import React, { useState, useEffect } from 'react'

function Riviews() {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => { setReviews(data); console.log(data); });
    }, [])
    return (
        <div>
            <h2>riviews</h2>
            <table>
                {/* <tr><th>Ride Name</th><th>Cost</th><th>Name</th><th>Email</th><th>Address</th><th>Payment Method</th><th>Status</th><th>Delete</th></tr> */}
                {
                    reviews.map(review => <tr key={review._id}><td>{review.cycleName}</td><td>{review.cost}</td><td><img style={{ height: "21px", width: "32px" }} src={review.img} /></td><td>{review.name}</td><td>{review.email}</td><td>{review.review}</td><td>{review.rating}</td></tr>)
                }
            </table>
        </div>
    )
}

export default Riviews

