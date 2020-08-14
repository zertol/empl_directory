import React from 'react';
import Navbar from '../components/Layout/Navbar';

const Layout = (props) => {
    const { children } = props;
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout;