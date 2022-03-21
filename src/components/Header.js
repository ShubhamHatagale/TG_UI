import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useParams, useHistory, Link } from "react-router-dom";

function Header() {
    const [beliverName, setbeliverName] = useState("");
    var s_id = localStorage.getItem('tr_id')
    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem("tr_id");
        window.location.replace("https://transganization.com/login/");
        // history.push("Not_support")
    }


    const GetallRecords = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptionsget = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(
            `https://parivartan.transganization.com/nodejs/masters/parivartan_user/user/${s_id}`,
            requestOptionsget
        )
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData.data);
                if (s_id) {
                    setbeliverName(resData.data.beliver_name);
                }

            });

    }

    useEffect(() => {
        GetallRecords();
    })
    return (
        <section className="content navbar-brand bg-bg-white" style={{ backgroundColor: "white" }}>
            <div className="container-fluid bg-bg-white" >
                <div className="row bg-bg-white justify-content-center" >

                    <div class="col-8">
                        <b>Welcome To Parivartan Dashboard</b>

                    </div>
                    <div class="col-3  align-center p-2">
                        <img src="../../assets/images/authorplaceholder.jpg" width="40" alt="Transganization" />
                        <b className="m-2">{beliverName} </b>

                    </div>

                    <div class="col-1 align-center" style={{ borderLeft: "1px solid #C9C9C8", height: "60px" }} >
                        <i style={{ cursor: "pointer", fontSize: "24px" }} onClick={logOut} class="zmdi zmdi-power p-3"></i>
                    </div>


                </div>

            </div >
        </section >

    )
}

export default Header
