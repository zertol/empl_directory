import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import MyNavButton from '../../util/MyNavButton';

const Navbar = (props) => {
    return (
        <AppBar>
            <Toolbar className="nav-container">
                <NavLink to="/">
                    <MyNavButton tip="Home">
                        <HomeIcon />
                    </MyNavButton>
                </NavLink>
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;        