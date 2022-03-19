import React, { useEffect ,useState} from "react";
import { Switch, Route, useHistory, } from "react-router-dom";
import MasterHeader from "./components/MasterAdminComponents/MasterHeader";
import MasterSidebar from "./components/MasterAdminComponents/MasterSidebar";
import Login from "./pages/Auth/Login";
import MasterDashboard from "./pages/Master_Admin/Dashboard";
import CompanySetting from "./pages/Master_Admin/CompanySetting";
import PasswordSetting from "./pages/Master_Admin/PasswordSetting";
import { useLocation } from "react-router-dom";

const MasterAdminRouting = () => {
    const history = useHistory();
    const location = useLocation();
   
    const[loggedIn,setloggedIn]=useState(true);

    useEffect(() => {      var s_id = localStorage.getItem('tr_id')
    if (!s_id) {
      history.push("Not_support");
    }

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            history.push("/masteradmin/home");
        }
        else {
            history.push("/masteradmin/")
        }
        // const user = JSON.parse(localStorage.getItem("user"));
        // if (user && loggedIn) {
        //      history.push("/masteradmin/home");
        //      setloggedIn(false)
        // }
        // if(location.pathname)
        // {
        //     history.push(location.pathname)
        // }
        // else {
        //     history.push("/masteradmin/")
        // }
    }, []);
    
    return (
        <Switch>
            <Route exact path="/masteradmin/">
                <Login />
            </Route>
            <Route exact path="/masteradmin/home">
                <MasterSidebar data={<MasterDashboard />}
                    data1={<MasterHeader />}
                />
            </Route>
            <Route exact path="/masteradmin/companysetting">
                <MasterSidebar data={<CompanySetting />}
                    data1={<MasterHeader />}
                />
            </Route>
            <Route exact path="/masteradmin/passwordsetting">
                <MasterSidebar data={<PasswordSetting />}
                    data1={<MasterHeader />}
                />
            </Route>

        </Switch>
    );
};
export default MasterAdminRouting