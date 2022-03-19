import React from 'react'
import { Redirect, Route } from 'react-router-dom'
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
// import Preloader from '../components/Preloader';
// import Sidebar from '../components/Sidebar';
// import { Routes } from '../routes';
import SideBar from "./SideBar";

const Protected_Ui = ({ component: Cmp, ...rest }) => (

    <Route {...rest} render={props => (
        <>
            {/* <Preloader /> */}
            <SideBar />

            <main className="content">
                <SideBar />
                <Cmp {...props} />
                {/* <Footer /> */}
            </main>
        </>
    )}
    />,

<Route
    {...rest}
    render={(props) =>
        localStorage.getItem('tr_id') ? (
            <Cmp {...props} />
        ) :
            <Redirect to="/Admin/admin-login"
            />
    }
/>


);

export default Protected_Ui;
