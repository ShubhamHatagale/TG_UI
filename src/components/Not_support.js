import React, { useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useParams, useHistory } from "react-router-dom";

function Not_support() {
    var s_id = localStorage.getItem('tr_id')

    const history = useHistory();
    useEffect(() => {
        if (s_id) {
            history.push("/");
        }
    }, []);

    return (

        <div className="align-center w-50" style={{ marginLeft: "25%", marginTop: "10%" }}>

            <Alert variant="success">
                <img style={{ marginLeft: "5rem" }} className="login_img" src="../../assets/images/transaganization.png" width="135" alt="Transganization" /><span className="m-l-10"></span>

                <Alert.Heading>SORRY,YOU ARE NOT AUTHORIZED USER!</Alert.Heading>
                <p>
                    PLEASE CONTACT support@transganization.com
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    {/* <Button onClick={() => setShow(false)} variant="outline-success">
                        Close me y'all!
                    </Button> */}
                </div>
            </Alert>
        </div>
    )
}

export default Not_support
