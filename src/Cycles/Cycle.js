import React from 'react'
import { Link } from 'react-router-dom';
import './Cycle.css';

function Policy(props) {
    const { _id, name, cost, info, img } = props.cycle;
    return (
        <div className="card">
            <h3>Name:{name}</h3>
            <h4>Cost:{cost}</h4>
            <p><h5>Info:{info}</h5></p>
            <img src={img} alt="cycle" />
            <Link to={`/buynow/${_id}`}><button>Buy Now</button></Link>

        </div>
    )
}

export default Policy
