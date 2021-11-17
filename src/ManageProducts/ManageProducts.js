import React, { useState, useEffect } from 'react';


function ManageProducts() {
    const [cycles, setCycles] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allcycles')
            .then(res => res.json())
            .then(data => { setCycles(data); console.log(data); });
    }, [])

    const deleteProduct = (id) => {
        const proceed = window.confirm('do you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/allcycles/${id}`
            fetch(url, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully!');
                        fetch(`http://localhost:5000/allcycles`)
                            .then(res => res.json())
                            .then(data => { setCycles(data) });
                        // const remaingOrders = 
                    } else {
                        alert('delete operation not successfull. Delete once again!')
                    }
                });
        }

    }
    return (
        <div>
            <h2>manage products</h2>
            <div className="grid">
                <table>
                    <tr><th>Bike Name</th><th>Cost</th><th>info</th><th>image</th><th>Delete</th></tr>
                    {
                        cycles.map(cycle => <tr key={cycle._id}><td>{cycle.name}</td><td>{cycle.cost}</td><td>{cycle.name}</td><td><img style={{ height: "21px", width: "32px" }} src={cycle.img} /></td><td><button onClick={() => deleteProduct(cycle._id)} >X</button></td>
                        </tr>)
                    }
                </table>
            </div>
        </div>
    )
}

export default ManageProducts



















