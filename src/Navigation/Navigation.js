import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function Navigation() {
    const { user, logout } = useAuth();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button><Link to='/cycles'>Explore Cycles</Link></Button>
                    </Typography>
                    <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                        CYCLE-MART
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {
                            user.email ? <span>welcome {user.displayName} </span> : <span >username</span>

                        }
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {
                            user.email ? <Button color="inherit"><Link to='/dashboard' >Dashboard</Link></Button> : <span></span>

                        }
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {
                            user.email ? <Button color="inherit" onClick={logout}>LogOut</Button> : <Button color="inherit"><Link to='/login' >Login</Link></Button>

                        }
                    </Typography>
                    <img src={user?.photoURL} alt="" />
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default Navigation
