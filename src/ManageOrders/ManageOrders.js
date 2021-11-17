import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

function ManageOrders() {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/orders`)
            .then(res => res.json())
            .then(data => { setOrders(data) });
    }, [orders])

    const deleteOrder = (id) => {
        const proceed = window.confirm('do you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/orders/${id}`
            fetch(url, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully!');
                        fetch(`http://localhost:5000/orders?email=${user.email}`)
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

        const url = `http://localhost:5000/update/${id}`


        fetch(url)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                console.log(data);
                order.status = 'shipped';
                fetch(url, {
                    method: 'put',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(order)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount > 0) {
                            alert('updated successfully');
                            // setOrder({});
                        }
                    });


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




// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router'
// import './updateorder.css'

// function UpdateOrder() {
//     const { id } = useParams();
//     const [order, setOrder] = useState([])

//     const url = `https://grisly-beast-74781.herokuapp.com/update/${id}`

//     useEffect(() => {
//         fetch(url)
//             .then(res => res.json())
//             .then(data => { setOrder(data) });
//     }, [])

//     const handleUpdateOrder = e => {
//         fetch(url, {
//             method: 'put',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(order)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);
//                 if (data.modifiedCount > 0) {
//                     alert('updated successfully');
//                     setOrder({});
//                 }
//             });


//         e.preventDefault();
//     }

//     const handleNameChange = (e) => {
//         const updatedName = e.target.value;
//         const updatedOrder = { ...order };
//         updatedOrder.name = updatedName;
//         setOrder(updatedOrder);
//     }
//     const handleEmailChange = (e) => {
//         const updatedEmail = e.target.value;
//         const updatedOrder = { ...order };
//         updatedOrder.email = updatedEmail;
//         setOrder(updatedOrder);
//     }
//     const handleRideNameChange = (e) => {
//         const updatedRideName = e.target.value;
//         const updatedOrder = { ...order };
//         updatedOrder.rideName = updatedRideName;
//         setOrder(updatedOrder);
//     }
//     const handleCostChange = (e) => {
//         const updatedCost = e.target.value;
//         const updatedOrder = { ...order };
//         updatedOrder.cost = updatedCost;
//         setOrder(updatedOrder);
//     }
//     const handleStatusChange = (e) => {
//         const updatedStatus = e.target.value;
//         const updatedOrder = { ...order };
//         updatedOrder.status = updatedStatus;
//         setOrder(updatedOrder);
//     }
//     return (
//         <div>
//             <h2 className="center">Update an  order</h2>
//             <h3>write in fields and click update button to update</h3>
//             <form onSubmit={handleUpdateOrder}>
//                 <input type="text" onChange={handleNameChange} value={order.name || ''} /><br />
//                 <input type="text" onChange={handleEmailChange} value={order.email || ''} /><br />
//                 <input type="text" onChange={handleRideNameChange} value={order.rideName || ''} /><br />
//                 <input type="text" onChange={handleCostChange} value={order.cost || ''} /><br />
//                 <input type="text" onChange={handleStatusChange} value={order.status || ''} /><br />
//                 <input type="submit" value="Update Order" />
//             </form>
//         </div>
//     )
// }

// export default UpdateOrder







