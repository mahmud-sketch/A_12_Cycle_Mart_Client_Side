import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function WriteReview() {
    const [orders, setOrders] = useState([])
    const { user } = useAuth();

    useEffect(() => {
        fetch(`https://immense-bayou-54885.herokuapp.com/orders?email=${user.email}`)
            .then(res => res.json())
            .then(data => { setOrders(data) });
    }, [])

    return (
        <div>
            <h1 className="center">Submit Review</h1>
            <table>
                <tr><th>Bike Name</th><th>Cost</th><th>Name</th><th>Email</th></tr>
                {
                    orders.map(order => <tr key={order._id}><td>{order.cycleName}</td><td>{order.cost}</td><td>{order.name}</td><td>{order.email}</td><td><button><Link to={`/submitreview/${order.productId}
                        `}>Submit Review</Link></button></td>
                    </tr>)
                }
            </table>
        </div>
    );
};

export default WriteReview
