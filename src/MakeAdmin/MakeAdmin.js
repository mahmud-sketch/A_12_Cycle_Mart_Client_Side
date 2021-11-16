import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'

function MakeAdmin() {
    const [email, setEmail] = useState('');
    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        e.preventDefault();
    }
    return (
        <div>
            <h2>make admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField label="email" variant="standard" type="email" onBlur={handleOnBlur} /><br />
                <Button sx={{ m: 3 }} variant="contained" type="submit">Make Admin</Button>

            </form>
        </div>
    )
}

export default MakeAdmin
