import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react'

function MakeAdmin() {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        const user = { email };
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => { if (data.modifiedCount) { setSuccess(true); console.log(data); } });
        e.preventDefault();
    }
    return (
        <div>
            <h2>make admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField label="email" variant="standard" type="email" onBlur={handleOnBlur} /><br />
                <Button sx={{ m: 3 }} variant="contained" type="submit">Make Admin</Button>

            </form>
            {success && <Alert>made admin successfully</Alert>}
        </div>
    )
}

export default MakeAdmin
