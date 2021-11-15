import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router';
import useAuth from '../hooks/useAuth';

function BuyNow() {
    const id = useParams();
    const [cycle, setCycle] = useState({})
    const { user } = useAuth();

    const addressRef = useRef();
    const paymentMethodRef = useRef();

    const url = `http://localhost:5000/allcycles/${id.id}`;


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => { setCycle(data) });
    }, [])

    const handleAddOrder = (e) => {
        const cycleName = cycle.name;
        const cost = cycle.cost;
        const info = cycle.info;
        const img = cycle.img;
        const productId = id.id;

        const name = user.displayName;
        const email = user.email
        const address = addressRef.current.value;
        const paymentMethod = paymentMethodRef.current.value;
        const status = "pending";

        const order = { cycleName, productId, cost, info, img, name, email, address, paymentMethod, status };

        fetch('http://localhost:5000/orders', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)

        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('order added successfully');
                    e.target.reset();
                }
            })
        e.preventDefault();
    }

    return (
        <div>
            <h2>buy now</h2>
            <h2 className="center">Place Your Order for a cycle</h2>
            <div className="flex">
                <div className="card">
                    <h2>name:{cycle?.name}</h2>
                    <h3>cost:{cycle?.cost}</h3>
                    <p>info:{cycle?.info}</p>
                    <p>productId:{id.id}</p>
                    <img src={cycle?.img} alt="cycle" />
                </div>
                <div>
                    <h2>{user.displayName}</h2>
                    <h2>{user.email}</h2>

                    <form onSubmit={handleAddOrder}>
                        <input type="address" placeholder="write address" name="" id="" ref={addressRef} /><br />
                        <input type="radio" id="cash" name="paymentMethod" value="cash" ref={paymentMethodRef} />
                        <label htmlFor="cash">cash</label>
                        <input type="radio" id="bksah" name="paymentMethod" value="Bkash" ref={paymentMethodRef} />
                        <label htmlFor="bkash">bkash</label>
                        <input type="radio" id="bank" name="paymentMethod" value="bank" ref={paymentMethodRef} />
                        <label htmlFor="bank">bank</label><br />
                        <input type="submit" value="add order" />
                    </form>

                </div>
            </div>

        </div>
    );
}

export default BuyNow
