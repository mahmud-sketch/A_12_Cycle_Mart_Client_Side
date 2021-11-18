import React, { useRef } from 'react'

function AddProducts() {
    const nameRef = useRef()
    const costRef = useRef()
    const infoRef = useRef()
    const imgRef = useRef()

    const addRide = e => {

        const name = nameRef.current.value;
        const cost = costRef.current.value;
        const info = infoRef.current.value;
        const img = imgRef.current.value;

        const ride = { name, cost, info, img };

        fetch('https://immense-bayou-54885.herokuapp.com/products', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ride)

        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('product added successfully');
                    e.target.reset();
                }
            })
        e.preventDefault();

    }
    return (
        <div>
            <h2> add Products</h2>
            <form onSubmit={addRide}>
                <input type="text" placeholder="product name" name="" id="" ref={nameRef} /><br />
                <input type="text" placeholder="product cost" name="" id="" ref={costRef} /><br />
                <input type="text" placeholder="product info(80 words)" name="" id="" ref={infoRef} /><br />
                <input type="text" placeholder="**image URL Only" name="" id="" ref={imgRef} /><br />
                <input type="submit" value="add product" />
            </form>
        </div>
    )
}

export default AddProducts





