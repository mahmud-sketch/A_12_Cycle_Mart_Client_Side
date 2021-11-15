import React, { useState, useEffect } from 'react';
import Cycle from './Cycle';

function Cycles() {
    const [cycles, setCycles] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allcycles')
            .then(res => res.json())
            .then(data => { setCycles(data); console.log(data); });
    }, [])
    return (
        <div>
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

export default Cycles
