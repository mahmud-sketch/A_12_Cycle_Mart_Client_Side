import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

function MyOrders() {
    const [orders, setOrders] = useState([])
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/orders/user?email=${user.email}`)
            .then(res => res.json())
            .then(data => { setOrders(data); console.log(data); });
    }, [])

    const deleteOrder = (id) => {
        const proceed = window.confirm('do you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/orders/user/${id}`
            fetch(url, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully!');
                        fetch(`http://localhost:5000/orders/user?email=${user.email}`)
                            .then(res => res.json())
                            .then(data => { setOrders(data) });
                        // const remaingOrders = 
                    } else {
                        alert('delete operation not successfull. Delete once again!')
                    }
                });
        }

    }
    return (
        <div>
            <h1 className="center">My orders</h1>
            <table>
                <tr><th>Bike Name</th><th>Cost</th><th>Name</th><th>Email</th><th>Address</th><th>Payment Method</th><th>Status</th><th>Delete</th></tr>
                {
                    orders.map(order => <tr key={order._id}><td>{order.cycleName}</td><td>{order.cost}</td><td>{order.name}</td><td>{order.email}</td><td>{order.address}</td><td>{order.paymentMethod}</td><td>{order.status}</td><td><button onClick={() => deleteOrder(order._id)} >X</button></td>
                    </tr>)
                }
            </table>

        </div>
    )
}

export default MyOrders






