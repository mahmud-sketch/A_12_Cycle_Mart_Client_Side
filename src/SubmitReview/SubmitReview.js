import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router';
import useAuth from '../hooks/useAuth';

function SubmitReview() {
    const id = useParams();
    const { user } = useAuth();
    const [cycle, setCycle] = useState({})

    const reviewRef = useRef();

    const url = `http://localhost:5000/allcycles/${id.id}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => { setCycle(data); console.log(data); });
    }, [])



    const handleAddReview = (e) => {
        const cycleName = cycle.name;
        const cost = cycle.cost;

        const img = cycle.img;
        const productId = cycle._id;

        const name = user.displayName;
        const email = user.email
        const review = reviewRef.current.value;

        const rating = "5";

        const saveReview = { cycleName, productId, cost, img, name, email, review, rating };

        fetch('http://localhost:5000/reviews', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(saveReview)

        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('review added successfully');
                    e.target.reset();
                }
            })
        e.preventDefault();
    }
    return (
        <div>
            <h2>{cycle.id}</h2>
            <h2>{cycle.name}</h2>
            <h2>{cycle.cost}</h2>
            <img src={cycle?.img} alt="cycle" />
            <h2>{user.displayName}</h2>
            <h2>{user.email}</h2>
            <form onSubmit={handleAddReview}>
                <input type="text" placeholder="write review" name="" id="" ref={reviewRef} /><br />
                <input type="submit" value="add review" />
            </form>
        </div>
    )
}

export default SubmitReview
