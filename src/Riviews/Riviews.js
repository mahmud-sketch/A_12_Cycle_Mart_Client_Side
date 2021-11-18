import React, { useState, useEffect } from 'react'

function Riviews() {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('https://immense-bayou-54885.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => { setReviews(data); console.log(data); });
    }, [])
    return (
        <div style={{ backgroundColor: "  #e6e6ff", border: "2px solid #000099", margin: "20px 0 20px", padding: "20px" }}>
            <h2>Reviews</h2>
            <table>
                <tr><th>Ride Name</th><th>Cost</th><th>img</th><th>name</th><th>email</th><th>review</th><th>rating</th></tr>
                {
                    reviews.map(review => <tr key={review._id}><td>{review.cycleName}</td><td>{review.cost}</td><td><img style={{ height: "21px", width: "32px" }} src={review.img} /></td><td>{review.name}</td><td>{review.email}</td><td>{review.review}</td><td>{review.rating}</td></tr>)
                }
            </table>
        </div>
    )
}

export default Riviews

