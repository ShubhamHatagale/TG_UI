import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { Switch, Route, useHistory, } from "react-router-dom";
// import logo from "";

export default function Login() {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        console.warn(email, password)
        event.preventDefault();
        if (email == "support@transganization.com" && password == "Parivartan@123") {
            localStorage.setItem("transganizaion_id", true);
            history.push("/Admin/admin-dashboard");
        }


        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // var rawrich = JSON.stringify({
        //     email_id: email,
        //     password: password
        // });
        // var requestOptionsrichtext = {
        //     method: "POST",
        //     headers: myHeaders,
        //     body: rawrich,
        //     redirect: "follow",
        // };
        // fetch(`https://parivartan.transganization.com/nodejs/masters/Admin/admin-login`, requestOptionsrichtext)
        //     .then((response) => response.json())
        //     .then((resData) => {
        //         if (resData.message == "Result Fetched") {
        //             console.log(resData.data.id);

        //             localStorage.setItem("transganizaion_id", resData.data.id);
        //             history.push("/Admin/admin-dashboard")

        //             console.log("Data Added succesfully");
        //             // setSmShow(true);
        //             // setTimeout(() => {
        //             //     localStorage.clear("transganizaion_id")

        //             //     // setSmShow(false);
        //             // }, 2000)
        //         }
        //         // GetallRecored();
        //         // seteditModal(false);
        //     })
        //     .catch((error) => console.log("error", error));

    }

    return (
        <div class="body_scroll" style={{ backgroundColor: "lightgray", height: "52rem" }} >
            <div className="block-header">
                {/* <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                        <button
                            className="btn btn-primary btn-icon mobile_menu"
                            type="button"
                        >
                            <i className="zmdi zmdi-sort-amount-desc"></i>
                        </button>
                    </div>

                </div> */}
            </div>
            <div className="container-fluid" >
                <div className="row clearfix mt-5" >
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card p-3 " >
                            <div className="header  w-25" style={{ marginLeft: "38%" }}>
                                <img style={{ marginLeft: "8rem" }} className="login_img" src="../../assets/images/transaganization.png" width="135" alt="Transganization" /><span className="m-l-10"></span>
                            </div>

                            <div className="body p-5 w-25" style={{ marginLeft: "38%", height: "23rem" }}>
                                {/* <img style={{ marginLeft: "5rem" }} className="login_img" src="../../assets/images/transaganization.png" width="135" alt="Transganization" /><span className="m-l-10"></span> */}
                                <h3 class="text-center pad25B font-gray text-transform-upr font-size-23">Admin Login</h3>

                                <div className="Login">
                                    {/* <img style={{ marginLeft: "5rem" }} className="login_img" src="../../assets/images/transaganization.png" width="135" alt="Transganization" /><span className="m-l-10"></span> */}

                                    <Form >
                                        <div class="input-group mb-4 p-2">
                                            <input type="text" class="form-control" placeholder="Username"
                                                autoFocus
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    <span class="zmdi zmdi-email"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-group mb-4 p-2">
                                            <input type="text" class="form-control" placeholder="Password" 
                                             type="password"
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div class="input-group-append">
                                                <div class="input-group-text">
                                                    <span class="zmdi zmdi-lock"></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="input-group mb-4 p-2">
                                            <Button className="loginbtn" size="lg" type="submit" onClick={handleSubmit}
                                            >
                                                Login
                                            </Button>

                                        </div>

                                        {/* <Form.Group size="lg" controlId="email">
                                            <Form.Label><b>Email</b></Form.Label>
                                            <Form.Control
                                                autoFocus
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                style={{ borderRadius: "10px" }}
                                            />
                                        </Form.Group>
                                        <Form.Group size="lg" controlId="password">
                                            <Form.Label><b>Password</b></Form.Label>
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                style={{ borderRadius: "10px" }}
                                            />
                                        </Form.Group> */}
                                        {/* <Button className="loginbtn" size="lg" type="submit" onClick={handleSubmit}
                                        >
                                            Login
                                        </Button> */}
                                    </Form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}