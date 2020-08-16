import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import MyNavButton from '../../util/MyNavButton';
import EmployeeForm from '../Employee/EmployeeForm';

const Navbar = (props) => {
    return (
        <AppBar>
            <Toolbar className="nav-container">
                <EmployeeForm dialogTitle="Add Employee" editDialog={false} />
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