import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`https://immense-bayou-54885.herokuapp.com/orders`)
            .then(res => res.json())
            .then(data => { setOrders(data) });
    }, [orders])

    const deleteOrder = (id) => {
        const proceed = window.confirm('do you want to delete?');
        if (proceed) {
            const url = `https://immense-bayou-54885.herokuapp.com/orders/${id}`
            fetch(url, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully!');
                        // fetch(`https://immense-bayou-54885.herokuapp.com/orders?email=${user.email}`)
                        fetch(`https://immense-bayou-54885.herokuapp.com/orders`)
                            .then(res => res.json())
                            .then(data => { setOrders(data) });
                        // const remaingOrders = 
                    } else {
                        alert('delete operation not successfull. Delete once again!')
                    }
                });
        }

    }

    const updateOrder = (id) => {

        const url = `https://immense-bayou-54885.herokuapp.com/update/${id}`
        console.log(url)
        const updateId = { id };
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateId)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('updated successfully');
                    fetch(`https://immense-bayou-54885.herokuapp.com/orders`)
                        .then(res => res.json())
                        .then(data => { setOrders(data) });
                    // setOrder({});
                }
            });


    }


    return (
        <div>
            <h1 className="center">Manage orders</h1>
            <table>
                <tr><th>Bike Name</th><th>Cost</th><th>Name</th><th>Email</th><th>Address</th><th>Payment Method</th><th>Status</th><th>Delete</th></tr>
                {
                    orders.map(order => <tr key={order._id}><td>{order.cycleName}</td><td>{order.cost}</td><td>{order.name}</td><td>{order.email}</td><td>{order.address}</td><td>{order.paymentMethod}</td><td>{order.status}-<button onClick={() => updateOrder(order._id)} > update status </button></td><td><button onClick={() => deleteOrder(order._id)} >X</button></td>
                    </tr>)
                }
            </table>

        </div>
    )
}

export default ManageOrders




// fetch(url)
//             .then(res => res.json())
//             .then(data => {
//                 setOrder(data);
//                 console.log(data);
//                 order.status = 'shipped';
//                 fetch(url, {
//                     method: 'put',
//                     headers: {
//                         'content-type': 'application/json'
//                     },
//                     body: JSON.stringify(order)
//                 })
//                     .then(res => res.json())
//                     .then(data => {
//                         console.log(data);
//                         if (data.modifiedCount > 0) {
//                             alert('updated successfully');
//                             // setOrder({});
//                         }
//                     });

//             });






