import React, { Component, useEffect, useState } from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom'
import Header from '../components/Header';


export const Home = (props) => {
    var s_id = localStorage.getItem('tr_id')

    const history = useHistory();
    let [Modules, setModules] = useState(0)
    const [classState, setclassState] = useState("")
    useEffect(() => {
        if (!s_id) {
            history.push("Not_support");
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        fetch(`https://parivartan.transganization.com/nodejs/masters/validate/` + `${s_id}`, requestOptions)
            .then((response) => response.json())
            .then((resData) => {
                let MyValues = resData.data;
                MyValues.map((item) => {
                    setModules(item.submit_flag)
                })
            })
            .catch((error) => console.log("error", error))
    }, [])

    const p_disc = () => {
        setclassState("menu-toggle actvl waves-effect waves-block toggled")

        // alert(e.target.name)
        // var cls = e.target.className;
        // if (e.target.name != "pdisc") {
        //     cls = "menu-toggle";
        //     setclassState(cls)
        //     alert(classState)
        // } else {
        //     alert(e.target.name)

        //     setclassState("menu-toggle waves-effect waves-block toggled text-primary")
        //     alert(classState)

        // }
    }
    return (
        <div>
            <Header />

            <aside id="leftsidebar" className="sidebar">
                <div className="navbar-brand">
                    <button className="btn-menu ls-toggle-btn" type="button"><i className="zmdi zmdi-menu"></i></button>
                    <a href="/"><img src="../../assets/images/transaganization.png" width="135" alt="Transganization" /><span className="m-l-10"></span></a>
                </div>
                <div className="menu">
                    <ul className="list">
                        <li className=" open" ><a className=" actvl " href onClick={() => { history.push("/") }}><span>Dashboard</span></a></li>
                        <li ><a className="menu-toggle actvl " name="pdisc" ><span>Purpose Discovery</span></a>
                            <ul className="ml-menu">
                                {/* <li><a href onClick={() => { history.push("/Soch-Spiritual") }}  >Soch - Spiritual Foundations </a></li> */}
                                <li >
                                    <NavLink exact to="/Soch-Spiritual" activeClassName="text-primary font-weight-bold"
                                    >
                                        Soch - Spiritual Foundations
                                    </NavLink>                                </li>

                            </ul>
                        </li>
                        {/* <li ><a className="menu-toggle actvl " ><span>Customer</span></a> */}
                        <li ><a className="menu-toggle actvl" onClick={p_disc} ><span>Customer</span></a>

                            <ul className="ml-menu">
                                <li >
                                    <NavLink exact to="/beliver-concept" activeClassName="text-primary font-weight-bold">
                                        Believers
                                    </NavLink>
                                </li>
                                <li >
                                    <NavLink exact to="/customer" activeClassName="text-primary font-weight-bold">
                                        CMM
                                    </NavLink>
                                </li>
                                {/* <li><a href onClick={() => { history.push("/beliver-concept") }}  >Believers</a></li>
                                <li><a href onClick={() => { history.push("/customer") }}  >CMM</a></li> */}
                            </ul>
                        </li>
                        <li ><a className="menu-toggle actvl " activeClassName="menu-toggle "><span>Business Model</span></a>

                            {/* <li><a className="menu-toggle"><span>Business Model</span></a> */}
                            <ul className="ml-menu">
                                <li >
                                    <NavLink exact to="/value" activeClassName="text-primary font-weight-bold">
                                        Value Proposition
                                    </NavLink>
                                </li>
                                <li >
                                    <NavLink exact to="/playground" activeClassName="text-primary font-weight-bold">
                                        Playground
                                    </NavLink>
                                </li>
                                {/* <li><a href onClick={() => { history.push("/value") }}  >Value Proposition</a></li>
                                <li><a href onClick={() => { history.push("/playground") }}  >Playground</a></li> */}
                            </ul>
                        </li>
                        <li><a className="menu-toggle actvl " ><span>Financial Model</span></a>
                            <ul className="ml-menu">
                                <li><NavLink exact to="/vilakshan" activeClassName="text-primary font-weight-bold" >Vilakshan</NavLink></li>
                                <li><NavLink exact to="/naisthya" activeClassName="text-primary font-weight-bold" >Naisthya</NavLink></li>
                                <li><NavLink exact to="/drishti" activeClassName="text-primary font-weight-bold" >Drishti Calculator</NavLink></li>
                                <li><NavLink exact to="/prayaan" activeClassName="text-primary font-weight-bold" >Building Block</NavLink></li>
                                <li><NavLink exact to="/shulk-lakshya" activeClassName="text-primary font-weight-bold" >Shulk Lakshya</NavLink></li>
                            </ul>
                        </li>
                        <li className="open "><a className="actvl " href onClick={() => { history.push("/dashboard") }}><span>Dashboard</span></a></li>
                        <li><a className="menu-toggle actvl " ><span>System & Process</span></a>
                            <ul className="ml-menu">
                                <li><NavLink exact to="/processes" activeClassName="text-primary font-weight-bold" >Vilakshan Map & Processes</NavLink></li>
                            </ul>
                        </li>
                        <li className=" open"><a className=" actvl " href onClick={() => { history.push("/") }}><span>Talent Factory</span></a></li>
                        <li className=" open"><a className=" actvl " href onClick={() => { history.push("/") }}><span>Neural Network</span></a></li>
                        {/* <li className=" open"><a href onClick={() => { history.push("/dsh") }}></a></li> */}

                    </ul>
                </div>
            </aside>

            {props.data}
        </div >
    )
}
export default Home;











