import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cycle from './Cycle';

function HomeCycle() {
    const [cycles, setCycles] = useState([])
    useEffect(() => {
        fetch('https://immense-bayou-54885.herokuapp.com/allcycles')
            .then(res => res.json())
            .then(data => { setCycles(data.slice(0, 6)); console.log(data); });
    }, [])
    return (
        <div>
            <Link to='/home'>Home</Link><br />
            <h2>cycles</h2>
            <div className="grid">
                {
                    cycles.map(cycle => <Cycle
                        key={cycle._id}
                        cycle={cycle}
                    ></Cycle>)
                }
            </div>
        </div>
    )
}

export default HomeCycle
