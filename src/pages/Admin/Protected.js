import React from 'react'
import { Redirect, Route } from 'react-router-dom'
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
// import Preloader from '../components/Preloader';
// import Sidebar from '../components/Sidebar';
// import { Routes } from '../routes';

const Protected = ({ component: Cmp, ...rest }) => (
    

    <Route {...rest} render={props => (
        <>
            {/* <Preloader /> */}
            {/* <Sidebar /> */}

            <main className="content">
                {/* <Navbar /> */}
                <Cmp {...props} />
                {/* <Footer /> */}
            </main>
        </>
    )}
    />,

<Route
    {...rest}
    render={(props) =>
        localStorage.getItem('transganizaion_id') ? (
            <Cmp {...props} />
        ) :
            <Redirect to="/Admin/admin-login"
            />
    }
/>


);

export default Protected;
