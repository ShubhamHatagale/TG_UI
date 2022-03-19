import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import SideBar from "./pages/SideBar";
import BeliverConcept from "./pages/Parivartan02/BeliverConcept";
import AuthUrl from "./pages/Admin/AuthUrl";
import Header from "./components/Header";
import Parivartan01 from "./pages/Parivartan01/Session01";
import Rebirth from "./pages/Parivartan01/Rebirth";
import Customer from "./pages/Parivartan03/Cutomer";
import BusinessPage from "./pages/BuisnessModel/MainPage";
import BusinessModel from "./pages/Parivartan04/MainPage";
import Parivartan5Tabs from "./pages/Parivartan05/parivartan5";
import Dashboard from "./pages/Parivartan05/Dashboard";
import Dash from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";
import ProtectedRoute from "./components/Protected";
import StepProcessTable from "./pages/Parivartan09/StepProcessTable";

import Prayaan from "./pages/Parivartan06/Prayaan";
import NaisthyaPrayaan from "./pages/Parivartan06/Naisthya&Prayaan";
import DrishtiCal from "./pages/Parivartan07/DrishtiCal";
import ShulkLak from "./pages/Parivartan08/ShulkLak";
import VilakshanMap from "./pages/Parivartan09/VilakshanMap";
import GoalDriller from "./pages/Parivartan10/GoalDriller";
import Home from "./pages/Home";

import Excel from "./pages/Parivartan02/excel"
import { useLocation } from "react-router-dom";
import Protected from "./pages/Admin/Protected";
import Protected_Ui from "./pages/Protected_Ui";
import Not_support from "./components/Not_support";
import AddUser from "./pages/Admin/AddUser";

import RightSidebar from "./pages/RightSideBar";

const MasterAdminRouting = () => {
    // const history = useHistory();
    // const location = useLocation();
    // const [loggedIn, setloggedIn] = useState(true);
    // useEffect(() => {  var s_id = localStorage.getItem('tr_id')
    // if (!id) {
    //   history.push("Not_support");
    // }
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     if (user && loggedIn) {
    //         history.push("/");
    //         setloggedIn(false)
    //     }
    //     if (location.pathname) {
    //         history.push(location.pathname)
    //     }
    //     else {
    //         history.push("/")
    //     }
    // }, []);

    return (
        <Switch>
            <Route exact path="/checkemail/:fname">
                <SideBar data={<AuthUrl />} data1={<Header />} />
            </Route>
            <Route path='/Admin/admin-login' component={Login}>
                {/* <Dash /> */}
                {/* <SideBar data={<Dash />} data1={<Header />} /> */}
            </Route>
            <Route path='/Not_support' component={Not_support} />
            <Protected exact path='/Admin/admin-AddUser' component={AddUser} />

            <Protected exact path='/Admin/admin-dashboard' component={Dash} />
            {/* <Protected exact path="/Admin/admin-dashboard" data1={<Header />} >
            </Protected> */}

            <Route exact path="/beliver-concept">
                <SideBar data={<BeliverConcept />} data1={<Header />} />
            </Route>

            <Route exact path="/">
                <SideBar data={<Home />} data1={<Header />} />
            </Route>
            <Route exact path="/home">
                <SideBar data={<Home />} data1={<Header />} />
            </Route>
            <Route exact path="/excel">
                <SideBar data={<Excel />} data1={<Header />} />
            </Route>
            <Route exact path="/Soch-Spiritual">
                <SideBar data={<Parivartan01 />} data1={<Header />} />
            </Route>
            <Route exact path="/rebirth">
                <SideBar data={<Rebirth />} data1={<Header />} />
            </Route>
            <Route exact path="/customer">
                <SideBar data={<Customer />} data1={<Header />} />
            </Route>
            <Route exact path="/value">
                <SideBar data={<BusinessPage />} data1={<Header />} />
            </Route>
            <Route exact path="/playground">
                <SideBar data={<BusinessModel />} data1={<Header />} />
            </Route>
            <Route exact path="/vilakshan">
                <SideBar data={<Parivartan5Tabs />} data1={<Header />} />
            </Route>
            <Route exact path="/naisthya">
                <SideBar data={<NaisthyaPrayaan />} data1={<Header />} />
            </Route>
            <Route exact path="/drishti">
                <SideBar data={<DrishtiCal />} data1={<Header />} />
            </Route>
            <Route exact path="/shulk-lakshya">
                <SideBar data={<ShulkLak />} data1={<Header />} />
            </Route>
            <Route exact path="/prayaan">
                <SideBar data={<Prayaan />} data1={<Header />} />
            </Route>
            <Route exact path="/processes">
                <SideBar data={<VilakshanMap />} data1={<Header />} />
            </Route>
            <Route exact path="/dashboard">
                <SideBar data={<Dashboard />} data1={<Header />} />
            </Route>
            <Route exact path="/goal-driller">
                <SideBar data={<GoalDriller />} data1={<Header />} />
            </Route>
            <Route exact path="/StepProcessTable">
                <SideBar data={<StepProcessTable />} data1={<Header />} />
            </Route>



            {/* For Admin */}
            {/* <Route path='/Admin/admin-dashboard' component={Dash}>
            </Route> */}


        </Switch>
    );
};
export default MasterAdminRouting