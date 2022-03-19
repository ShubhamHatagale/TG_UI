import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import ModalSubmit from "../../components/ModalSubmit";
import { useHistory } from "react-router-dom";

export default function Vilakshan(props) {
    const history = useHistory();

    let rows = [];
    const [beliver_name, setbeliver_name] = useState("");
    const [beliver_company, setbeliver_company] = useState("");
    const [beliver_email, setbeliver_email] = useState("");
    const [beliver_mobile, setbeliver_mobile] = useState("");
    const [tranz_name, settranz_name] = useState("");
    const [tranz_email, settranz_email] = useState("");
    const [tranz_mobile, settranz_mobile] = useState("");
    const [bypass_email, setbypass_email] = useState("");
    const [bypass_mobile, setbypass_mobile] = useState("");

    const [editId, seteditId] = useState("");
    const [delId, setdelId] = useState("");

    const [beliver_nameEdit, setbeliver_nameEdit] = useState("");
    const [beliver_companyEdit, setbeliver_companyEdit] = useState("");
    const [beliver_emailEdit, setbeliver_emailEdit] = useState("");
    const [beliver_mobileEdit, setbeliver_mobileEdit] = useState("");
    const [tranz_nameEdit, settranz_nameEdit] = useState("");
    const [tranz_emailEdit, settranz_emailEdit] = useState("");
    const [tranz_mobileEdit, settranz_mobileEdit] = useState("");
    const [bypass_emailEdit, setbypass_emailEdit] =
        useState("");
    const [bypass_mobileEdit, setbypass_mobileEdit] = useState("");
    const [smShow, setSmShow] = useState(false);
    const [Mupdate, setMupdate] = useState(false);
    const [Mdelete, setMdelete] = useState(false);

    const [vilakshanData, setVilakshanData] = useState("");
    const [show, setShow] = useState(false);
    const [editModal, seteditModal] = useState(false);


    const [viewModal, setviewModal] = useState(false);
    const [ShowPdf, setShowPdf] = useState(false);
    const pdfExportComponent = React.useRef(null);
    const [belConceptDataa, setbelConceptDataa] = useState();

    const [checksVal, setchecksVal] = useState(false);
    const [chks, setchks] = useState();
    const [chks2, setchks2] = useState(false);


    const [BeliverOTP, setBeliverOTP] = useState('');
    const [transOTP, setTransOTP] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [secondsfortrans, setsecondsfortrans] = useState(0);
    const [ShowResetOTP, setShowResetOTP] = useState(true);
    const [ShowResetOTPTrans, setShowResetOTPTrans] = useState(true);
    const [showConfirmBox, setshowConfirmBox] = useState(false);

    const [showHide, setshowHide] = useState(false);
    const [ErrorText, setErrorText] = useState("");


    const ViewModel = () => {
        setviewModal(true);
    };

    const yesFn = (checkVal, uid) => {
        // alert(uid);
        if (checkVal == "false") {
            var checkVal = "true";
            // alert(checkVal);
        } else if (checkVal == "true") {
            var checkVal = "false";
            // alert(checkVal);
        } else {
            var checkVal = "true";
            // alert(checkVal);
        }


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            checkVal: checkVal,
            email_id: "1",
            created_by: "1",
        });
        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        fetch(`http://localhost:9002/masters/parivartan_user/checked/${uid}`, requestOptions)
            .then((response) => response.json())
            .then((resData) => {
                // console.log(resData);
                if (resData.status == 200) {
                    console.log("updated");
                    // setMupdate(true);
                    // setTimeout(() => {
                    //   setMupdate(false);
                    // }, 1000)
                    // GetallRecored();
                }
            })
            .catch((error) => console.log("error", error));
        setShow(false);
        seteditModal(false);
        GetallRecored();



    };

    const noFn = () => {
        // alert(checksVal);

        // setchks2("1");
        // setchks(false);
        // setchks2(true);

        // setchks("")
    };

    const handleClose = () => {
        setShow(false);
        seteditModal(false);
        setviewModal(false);

    };


    const deleteConfirm = () => {
        // alert(delId);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptionsget = {
            method: "delete",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(`http://localhost:9002/masters/parivartan_user/${delId}`, requestOptionsget)
            .then((response) => response.json())
            .then((resData) => {
                // seteditId(resData.data[0].id);
                console.log("deleted");
                setMdelete(true);
                // setMdelete(false);
                setTimeout(() => {
                    setMdelete(false);
                }, 1000)

                setShow(false);
                GetallRecored();
            })
            .catch((error) => console.log("error", error));
    };
    // const handleShow = () => setShow(true);

    const OnSubmitUpdate = (edId) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            beliver_name: beliver_nameEdit,
            beliver_company: beliver_companyEdit,
            beliver_email: beliver_emailEdit,
            beliver_mobile: beliver_mobileEdit,
            tranz_name: tranz_nameEdit,
            tranz_email: tranz_emailEdit,
            tranz_mobile: tranz_mobileEdit,
            bypass_email: bypass_emailEdit,
            bypass_mobile: bypass_mobileEdit,

            email_id: "0",
            created_by: "0",
        });
        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        fetch(`http://localhost:9002/masters/parivartan_user/${edId}`, requestOptions)
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData);
                if (resData.status == 200) {
                    console.log("updated");
                    // alert("ds")
                    setMupdate(true);
                    // setMupdate(false);
                    setTimeout(() => {
                        setMupdate(false);
                    }, 1000)
                    GetallRecored();
                }
            })
            .catch((error) => console.log("error", error));

        setShow(false);
        seteditModal(false);
    };
    const editfn = (edit_id) => {
        seteditModal(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptionsget = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(
            `http://localhost:9002/masters/parivartan_user/${edit_id}`,
            requestOptionsget
        )
            .then((response) => response.json())
            .then((resData) => {
                seteditId(resData.data[0].id);
                setbeliver_nameEdit(resData.data[0].beliver_name);
                setbeliver_companyEdit(resData.data[0].beliver_company);
                setbeliver_emailEdit(resData.data[0].beliver_email);
                setbeliver_mobileEdit(resData.data[0].beliver_mobile);
                settranz_nameEdit(resData.data[0].tranz_name);
                settranz_emailEdit(resData.data[0].tranz_email);
                settranz_mobileEdit(resData.data[0].tranz_mobile);
                setbypass_emailEdit(resData.data[0].bypass_email);
                setbypass_mobileEdit(resData.data[0].bypass_mobile);
            })
            .catch((error) => console.log("error", error));
    };
    const deletefn = (edit_id) => {
        setdelId(edit_id);
        setShow(true);
    };

    useEffect(() => {
        // var s_id = localStorage.getItem('tr_id')
        // if (!id) {
        //     history.push("Not_support");
        // }
        GetallRecored();
    }, []);

    const exportPDFWithMethod = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    const GetallRecored = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptionsget = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(`http://localhost:9002/masters/parivartan_user`, requestOptionsget)
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData.data);
                setVilakshanData(resData.data);
            })
            .catch((error) => console.log("error", error));
    };
    const initialValues = {
        beliver_name: "",
        beliver_company: 0,
        beliver_email: 0,
        beliver_mobile: 0,
        tranz_name: 0,
        tranz_email: 0,
        tranz_mobile: 0,
        bypass_email: "",
        bypass_mobile: "",
    };
    const validate = Yup.object({
        beliver_name: Yup.string().required("Required"),
        bypass_email: Yup.string().required("Required"),
        bypass_mobile: Yup.string().required("Required"),
    });
    const OnSubmitForm = () => {
        for (var i = 0; i < vilakshanData.length; i++) {
            // alert(vilakshanData[i].beliver_email, beliver_email);
            if (vilakshanData[i].beliver_email == beliver_email) {
                setErrorText("Beliver Email Is Already Exist");
                return false;
            } else if (vilakshanData[i].beliver_mobile == beliver_mobile) {
                setErrorText("Beliver Mobile Is Already Exist");
                return false;
            } else if (vilakshanData[i].beliver_company == beliver_company) {
                setErrorText("Beliver Company Is Already Exist");
                return false;
            } else {
                setErrorText("Data Saved Successfull");
            }
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var rawrich = JSON.stringify({
            beliver_name: beliver_name,
            beliver_company: beliver_company,
            beliver_email: beliver_email,
            beliver_mobile: beliver_mobile,
            tranz_name: tranz_name,
            tranz_email: tranz_email,
            tranz_mobile: tranz_mobile,
            bypass_email: bypass_email,
            bypass_mobile: bypass_mobile,
            email_id: "1",
            created_by: "2",
        });
        var requestOptionsrichtext = {
            method: "POST",
            headers: myHeaders,
            body: rawrich,
            redirect: "follow",
        };
        fetch(`http://localhost:9002/masters/parivartan_user`, requestOptionsrichtext)
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData);
                if (resData.status == 200) {
                    // console.log("Data Added succesfully");
                    setSmShow(true);
                    setTimeout(() => {
                        setSmShow(false);
                    }, 1000)

                    setbeliver_name("")
                    setbeliver_company("")
                    setbeliver_email("")
                    setbeliver_mobile("")
                    settranz_name("")
                    settranz_email("")
                    settranz_mobile("")
                    setbypass_email("")
                    setbypass_mobile("")
                }
                GetallRecored();
                // seteditModal(false);
            })
            .catch((error) => console.log("error", error));
    };


    const getRandomNum = (length) => {
        var randomNum =
            (Math.pow(10, length).toString().slice(length - 1) +
                Math.floor((Math.random() * Math.pow(10, length)) + 1).toString()).slice(-length);
        return randomNum;
    }
    const OnVerifyHandle = () => {
        setShowResetOTPTrans(true)
        setSeconds(0)
        setsecondsfortrans(60)
    }
    const ResendBeliverDataTrans = () => {
        setShowResetOTPTrans(true)
        setSeconds(0)
        setsecondsfortrans(60)
    }
    const HandleInputChange = (event) => {
        let enterinput = event.target.value;
    }
    const HandleSubmit = () => {
        const key = "5afd5b5bcab935161bee432f1bc21d1f043787455f6bb135"
        const sid = "transganization2"
        const token = "0c390c278d2f9805143307a9befedf54f66343499ed0786c"
        const from = "9850674452"
        const to = "8767984910"
        const body = "Good Evening"
        var formdata = new FormData();
        formdata.append('From', from)
        formdata.append('To', to)
        formdata.append('Body', body)
        const url = "https://" + key + ":" + token + "@api.exotel.in/v1/Accounts/" + sid + "/Sms/send.json"
        axios.post(url,
            {
                withCredentials: true,
                headers: {
                    "Accept": "application/x-www-form-urlencoded",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: formdata
            },
        )
            .then((res) => {
                console.log(`statusCode: ${res.statusCode}`)
                console.log(res)
            })
            .catch((error) => {
                console.error(error)
            })

        setshowHide(true);
        setTimeout(() => {
            setshowHide(false);
        }, 1000)

        setShowResetOTP(true);
        const Believers = getRandomNum(6);
        setBeliverOTP(Believers)
        const trans = getRandomNum(6);
        setTransOTP(trans)
        setSeconds(60)
    }
    const ResendBeliverData = () => {
        setShowResetOTP(true);
        const Believers = getRandomNum(6);
        setBeliverOTP(Believers)
        const trans = getRandomNum(6);
        setTransOTP(trans)
        setSeconds(60)
    }
    const OnVerifyHandleConfirm = () => {
        setShowResetOTPTrans(false)
        setshowConfirmBox(true);
    }
    const HandleConfirmation = () => {
        setShowPdf(1)
    }
    const logOut = () => {
        localStorage.removeItem("transganizaion_id")
        history.push("admin-login")
    }


    return (
        <>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Body >Form Saved Successful</Modal.Body>
            </Modal>

            <Modal
                size="sm"
                show={Mdelete}
                onHide={() => setMdelete(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Body >Form Row Deleted Successfully</Modal.Body>
            </Modal>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure You Want To Delete!</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>Are You Sure You Want To Delete!</Modal.Body> */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cance
                    </Button>
                    <Button variant="primary" onClick={deleteConfirm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* For Edit */}

            <Modal
                size="lg"
                show={editModal}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid" style={{ backgroundColor: "F3F6F9" }}>
                        <div className="row clearfix">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div style={{ marginLeft: "40%" }}>
                                    <span ><b>{ErrorText}</b></span>

                                </div>
                                <div className="card p-4 mt-2">
                                    <div className="body p-5">

                                        <div className="row clearfix">
                                            <div className="col-md-6">
                                                <h2 >
                                                    <strong>Believers Group</strong>
                                                </h2>
                                            </div>
                                        </div>


                                        <div className="row clearfix">
                                            <div className="col-md-12">
                                                <h2 className="card-inside-title">
                                                    <strong>Believers Name</strong>
                                                </h2>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Believers Name"
                                                        name="beliver_name"
                                                        onChange={(event) => {
                                                            setbeliver_nameEdit(event.target.value);
                                                        }}
                                                        value={beliver_nameEdit}
                                                    />
                                                    {/* {formik.errors.beliver_name ? <div className='error'>{formik.errors.beliver_name}</div> : null} */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row clearfix">
                                            <div className="col-md-12">
                                                <h2 className="card-inside-title">
                                                    <strong>Believers Companey</strong>
                                                </h2>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control show-tick"
                                                        as="select"
                                                        name="beliver_company"
                                                        onChange={(event) => {
                                                            setbeliver_companyEdit(event.target.value);
                                                        }}
                                                        value={beliver_companyEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row clearfix">
                                            <div className="col-md-12">
                                                <h2 className="card-inside-title">
                                                    <strong>Believers Email</strong>
                                                </h2>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control show-tick"
                                                        as="select"
                                                        name="beliver_email"
                                                        onChange={(event) => {
                                                            setbeliver_emailEdit(event.target.value);
                                                        }}
                                                        value={beliver_emailEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row clearfix">
                                            <div className="col-md-12">
                                                <h2 className="card-inside-title">
                                                    <strong>Believers Mobile</strong>
                                                </h2>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control show-tick"
                                                        as="select"
                                                        name="beliver_mobile"
                                                        onChange={(event) => {
                                                            setbeliver_mobileEdit(event.target.value);
                                                        }}
                                                        value={beliver_mobileEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row clearfix mt-5">
                                            <div className="col-md-6">
                                                <h2 >
                                                    <strong>Transganization Group</strong>
                                                </h2>
                                            </div>

                                        </div>

                                        <div className="row clearfix">
                                            <div className="col-md-12">
                                                <h2 className="card-inside-title">
                                                    <strong>Transganization Name</strong>
                                                </h2>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control show-tick"
                                                        as="select"
                                                        name="tranz_name"
                                                        onChange={(event) => {
                                                            settranz_nameEdit(event.target.value);
                                                        }}
                                                        value={tranz_nameEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row clearfix">
                                            <div className="col-md-12">
                                                <h2 className="card-inside-title">
                                                    <strong>Transganization Email</strong>
                                                </h2>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control show-tick"
                                                        as="select"
                                                        name="tranz_email"
                                                        onChange={(event) => {
                                                            settranz_emailEdit(event.target.value);
                                                        }}
                                                        value={tranz_emailEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row clearfix">
                                            <div className="col-md-12">
                                                <h2 className="card-inside-title">
                                                    <strong>Transganization Mobile</strong>
                                                </h2>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control show-tick"
                                                        as="select"
                                                        name="tranz_mobile"
                                                        onChange={(event) => {
                                                            settranz_mobileEdit(event.target.value);
                                                        }}
                                                        value={tranz_mobileEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row clearfix">
                                            <div className="col-md-12">
                                                <h2 className="card-inside-title">
                                                    <strong>Bypass Email</strong>
                                                </h2>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="OPERATIONAL EXCELLENCE"
                                                        name="bypass_email"
                                                        onChange={(event) => {
                                                            setbypass_emailEdit(event.target.value);
                                                        }}
                                                        value={bypass_emailEdit}
                                                    />
                                                    {/* {formik.errors.bypass_email ? <div className='error'>{formik.errors.bypass_email}</div> : null} */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row clearfix">
                                            <div className="col-md-12">
                                                <h2 className="card-inside-title">
                                                    <strong>Bypass Mobile</strong>
                                                </h2>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="CUSTOMER INTIMACY"
                                                        name="bypass_mobile"
                                                        onChange={(event) => {
                                                            setbypass_mobileEdit(event.target.value);
                                                        }}
                                                        value={bypass_mobileEdit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn savebtn waves-effect"
                                            onClick={() => OnSubmitUpdate(editId)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>









            <div className="container-fluid" style={{ backgroundColor: "white" }} >

                <div class="body_scroll">
                    <div className="content navbar-brand bg-bg-white p-2" style={{ backgroundColor: "white" }}>
                        <div className="container-fluid bg-bg-white" >
                            <div className="row bg-bg-white justify-content-center p-2" >
                                <div class="col-1 "  >
                                    <i title="back" style={{ cursor: "pointer", fontSize: "24px", borderRight: "1px solid #C9C9C8", height: "60px" }} onClick={() => history.push("/Admin/admin-dashboard")} class="zmdi zmdi-mail-reply p-3"></i>
                                    {/* style={{ borderLeft: "1px solid #C9C9C8", height: "60px" }} */}
                                </div>
                                <div class="col-8 p-2">

                                    <b>Welcome To Parivartan Admin Dashboard</b>

                                </div>
                                <div class="col-2 align-center p-2">
                                    <img src="../../assets/images/authorplaceholder.jpg" width="40" alt="Transganization" />
                                    <b className="ml-4">Admin </b>

                                </div>

                                <div class="col-1 align-center" style={{ borderLeft: "1px solid #C9C9C8", height: "60px" }} >
                                    <i style={{ cursor: "pointer", fontSize: "24px" }} onClick={logOut} class="zmdi zmdi-power p-3"></i>
                                </div>


                            </div>

                        </div >
                    </div >

                    <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
                        <div className="row clearfix">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="card p-3">
                                    <div className="body p-5" >
                                        <div className="row " style={{ marginLeft: "12%" }} >

                                            <div className="col-6">
                                                <div className="row clearfix">
                                                    <div className="col-md-6">
                                                        <h2 >
                                                            <strong>Believers Group</strong>
                                                        </h2>
                                                    </div>

                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <h2 className="card-inside-title">
                                                            <strong>Believers Name</strong>
                                                        </h2>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Believers Name"
                                                                name="beliver_name"
                                                                onChange={(event) => {
                                                                    setbeliver_name(event.target.value);
                                                                }}
                                                                value={beliver_name}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <h2 className="card-inside-title">
                                                            <strong>Believers Company</strong>
                                                        </h2>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="beliver_company"
                                                                placeholder="Believers Company"
                                                                onChange={(event) => {
                                                                    setbeliver_company(event.target.value);
                                                                }}
                                                                value={beliver_company}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <h2 className="card-inside-title">
                                                            <strong>Believers Email</strong>
                                                        </h2>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="beliver_email"
                                                                placeholder="Believers Email"
                                                                onChange={(event) => {
                                                                    setbeliver_email(event.target.value);
                                                                }}
                                                                value={beliver_email}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <h2 className="card-inside-title">
                                                            <strong>Believers Mobile</strong>
                                                        </h2>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="beliver_mobile"
                                                                placeholder="Believers Mobile"
                                                                onChange={(event) => {
                                                                    setbeliver_mobile(event.target.value);
                                                                }}
                                                                value={beliver_mobile}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="button" className="btn savebtn waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={OnSubmitForm}>SUBMIT</button>

                                            </div>


                                            <div className="col-6">
                                                <div className="row clearfix">
                                                    <div className="col-md-6 ">
                                                        <h2 >
                                                            <strong>Transganization Group</strong>
                                                        </h2>
                                                    </div>

                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <h2 className="card-inside-title">
                                                            <strong>Transganization Name</strong>
                                                        </h2>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="tranz_name"
                                                                placeholder="Transganization Name"
                                                                onChange={(event) => {
                                                                    settranz_name(event.target.value);
                                                                }}
                                                                value={tranz_name}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <h2 className="card-inside-title">
                                                            <strong>Transganization Email</strong>
                                                        </h2>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="tranz_email"
                                                                placeholder="Transganization Email"
                                                                onChange={(event) => {
                                                                    settranz_email(event.target.value);
                                                                }}
                                                                value={tranz_email}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <h2 className="card-inside-title">
                                                            <strong>Transganization Mobile</strong>
                                                        </h2>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="tranz_mobile"
                                                                placeholder="Transganization Mobile"
                                                                onChange={(event) => {
                                                                    settranz_mobile(event.target.value);
                                                                }}
                                                                value={tranz_mobile}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <h2 className="card-inside-title">
                                                            <strong>Bypass Email</strong>
                                                        </h2>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Bypass Email"
                                                                name="bypass_email"
                                                                onChange={(event) => {
                                                                    setbypass_email(event.target.value);
                                                                }}
                                                                value={bypass_email}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <h2 className="card-inside-title">
                                                            <strong>Bypass Mobile</strong>
                                                        </h2>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="bypass_mobile"
                                                                name="Bypass Mobile"
                                                                onChange={(event) => {
                                                                    setbypass_mobile(event.target.value);
                                                                }}
                                                                value={bypass_mobile}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>





                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Modal-----------------------> */}
            < Modal
                size="lg"
                show={viewModal}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {vilakshanData.length > 0 ? (
                        <div>
                            <div id="divToPrint" className="mt4">
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <img
                                            src="../../assets/images/transaganization.png"
                                            width="135"
                                            alt="Transganization"
                                        />
                                        <h1
                                            style={{
                                                alignSelf: "center",
                                                alignContent: "center",
                                                textAlign: "center",
                                                marginTop: "20px",
                                            }}
                                        >
                                            Financial Model
                                        </h1>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <div
                                            style={{
                                                alignSelf: "center",
                                                alignContent: "center",
                                                textAlign: "center",
                                                fontWeight: "bold",
                                                backgroundColor: "lightgrey",
                                                width: "150",
                                                border: "1px solid black",
                                                marginLeft: "0",
                                                padding: "10px",
                                                margin: "10px",
                                                marginTop: "30px",
                                            }}
                                        >
                                            Vilakshan
                                        </div>
                                        <div className="table-responsive" id="Table">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>List of beliver_name</th>
                                                        <th>Non Financial</th>
                                                        <th>beliver_email</th>
                                                        <th>beliver_mobile</th>
                                                        <th>Volume Growth</th>
                                                        <th>Value Growth</th>
                                                        <th>Near/Far to PCB</th>
                                                        <th>OPERATIONAL EXCELLENCE</th>
                                                        <th>CUSTOMER INTIMACY</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {vilakshanData.map((itm, key) => (
                                                        <tr>
                                                            <td>{itm.beliver_name}</td>
                                                            <td>{itm.beliver_company}</td>
                                                            <td>{itm.beliver_email}</td>
                                                            <td>{itm.beliver_mobile}</td>
                                                            <td>{itm.tranz_name}</td>
                                                            <td>{itm.tranz_email}</td>
                                                            <td>{itm.tranz_mobile}</td>
                                                            <td>{itm.bypass_email}</td>
                                                            <td>{itm.bypass_mobile}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ) : null}

                </Modal.Body>
            </Modal>


        </>
    );
}
