import React, { useState, useEffect, useRef } from 'react';
import Editor from "../../components/SunEditor"
import Modal from "react-bootstrap/Modal";
import "../Parivartan.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import RightSidebar from '../RightSideBar';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

export default function Form(props) {
    const history = useHistory();
    var s_id = localStorage.getItem("tr_id");
    const [convertedText, setConvertedText] = useState("Some default content");

    let [childhood, setchildhood] = useState('');
    let [postMarriage, setpostMarriage] = useState('');
    let [postEducation, setpostEducation] = useState('');
    let [ReflectionData, setReflectionData] = useState('');
    const [showData, setShowData] = useState(false);
    const [smShow, setSmShow] = useState(false);

    const [YourTribe, setYourTribe] = useState("");
    const [PrimaryCustomer, setPrimaryCustomer] = useState("");
    const [FaceBeliver, setFaceBeliver] = useState("");
    const [ShowPdf, setShowPdf] = useState(false);
    const pdfExportComponent = React.useRef(null);
    const [show, setShow] = useState(false);
    const [viewModal, setviewModal] = useState(false);
    const [belConceptDataa, setbelConceptDataa] = useState();
    const [Upid, setUpid] = useState("");

    let MyValues;
    useEffect(() => {
        if (!s_id) {
            history.push("Not_support");
        }

        GetallRecords();
    }, [])

    const exportPDFWithMethod = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    const ViewModel = () => {
        // var regex = /(<([^>]+)>)/ig;
        // childhood.replace(regex, '');
        // const result = chil;
        setviewModal(true);
    };

    const handleClose = () => {
        setShow(false);
        setviewModal(false);
        var aat = "<p>Hello, <b>World</b></p>";
        var cleanText = aat.replace(/<\/?[^>]+(>|$)/g, "");
        // alert(cleanText);

    };

    const handleChangeEditorChild = (newContent) => {
        console.log("new content", newContent)
        setchildhood(newContent)
        // setContent(newContent);
    };
    const handleChangeEditorMarraige = (newContent1) => {
        // console.log(newContent);
        setpostMarriage(newContent1)
        // setContent(newContent);
    };
    const handleChangeEditorEducation = (newContent2) => {
        // console.log(newContent);
        setpostEducation(newContent2)
        // setContent(newContent);
    };
    const GetallRecords = () => {
        var myGetHeaders = new Headers();
        myGetHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "GET",
            headers: myGetHeaders,
            redirect: "follow",
        };
        fetch(`https://parivartan.transganization.com/nodejs/masters/reflection/user/${s_id}`, requestOptions)
            .then((response) => response.json())
            .then((resData) => {
                if (resData.data.length > 0) {
                    let MyValues = resData.data;
                    console.log(MyValues)
                    MyValues.map((item, key) => {
                        setchildhood(item.child_hood);
                        setpostEducation(item.post_education);
                        setpostMarriage(item.post_marriage)
                    })
                    setReflectionData(resData.data);
                    setUpid(resData.data[0].id);

                    console.log("yyyyyy", resData.data)

                }

                setShowData(true);

            })
    }
    const HandleSubmit = () => {
        if (ReflectionData.length === 0) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                child_hood: childhood,
                post_marriage: postMarriage,
                post_education: postEducation,
                email_id: s_id,
                created_by: s_id,
            })
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`https://parivartan.transganization.com/nodejs/masters/reflection/`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        setSmShow(true);
                        setTimeout(() => {
                            setSmShow(false);
                            props.OnValidateFirst(true);
                        }, 1000)
                    }
                    GetallRecords();
                })
                .catch((error) => console.log("error", error));
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                child_hood: childhood,
                post_marriage: postMarriage,
                post_education: postEducation,
                email_id: s_id,
                created_by: s_id,
            })
            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`https://parivartan.transganization.com/nodejs/masters/reflection/${Upid}`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        setSmShow(true);
                        setTimeout(() => {
                            setSmShow(false);
                            props.OnValidateFirst(true);
                        }, 1000)

                        setShowPdf(true);

                    }
                    GetallRecords();
                })
                .catch((error) => console.log("error", error));
        }
    }
    return (
        <>
            <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
                <Modal
                    size="sm"
                    show={smShow}
                    onHide={() => setSmShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Body >Form Saved Successful</Modal.Body>
                </Modal>
                <div className="row clearfix " >
                    <div className="col-lg-12 col-md-12 col-sm-12 ">
                        <div className="card p-4 mt-2" >
                            {showData ? (
                                <div className="body p-5">
                                    <div className="row clearfix">
                                        <div className="col-md-12">
                                            <h2 className="card-inside-title"><strong>Childhood Life</strong></h2>
                                        </div>
                                    </div>
                                    <div className="row clearfix">
                                        <div className="col-md-12 ">
                                            <Editor contents={childhood} getValue={handleChangeEditorChild} />
                                            {/* <ReactQuill
                                                theme='snow'
                                                value={childhood}
                                                onChange={handleChangeEditorChild}
                                            /> */}

                                        </div>
                                    </div>
                                    <div style={{ marginTop: 30 }}>
                                    </div>
                                    <div className="row clearfix">
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-12">
                                            <h2 className="card-inside-title"><strong>Post Education ,Pre Marriage,Joined Company/Founded Company</strong></h2>
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                    </div >
                                    <div className="row clearfix">
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-12">
                                            <Editor contents={postEducation} getValue={handleChangeEditorEducation} />
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 30 }}>
                                    </div>
                                    <div className="row clearfix">
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-12">
                                            <h2 className="card-inside-title"><strong>Post Marriage</strong></h2>
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                    </div >
                                    <div className="row clearfix">
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-12">
                                            <Editor contents={postMarriage} getValue={handleChangeEditorMarraige} />
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 30 }}>
                                    </div>
                                    <button type="submit" class="btn savebtn waves-effect" onClick={HandleSubmit}>SAVE    <i className="ml-1 zmdi zmdi-save " /> </button>
                                    {/* {ShowPdf ? ( */}
                                    {/* <div>
                                        <button
                                            type="button"
                                            class="btn btn-primary  waves-effect"
                                            onClick={exportPDFWithMethod}
                                        >
                                            Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-primary  waves-effect"
                                            onClick={ViewModel}
                                        >
                                            View  <i className="ml-1 zmdi zmdi-eye " />                                        </button>
                                    </div> */}
                                    {/* ) : null} */}
                                </div>
                            ) : (null)}
                        </div>
                    </div>
                </div>
            </div>



            {/* View Modal-----------------------> */}
            <Modal
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
                    <div className="container-fluid">
                        <div className="row clearfix">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="card">
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
                                                        Purpose Discovery
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
                                                        Reflection
                                                    </div>
                                                    <div
                                                        style={{
                                                            alignSelf: "left",
                                                            alignContent: "left",
                                                            textAlign: "left",
                                                            fontWeight: "bold",
                                                            padding: "10px",
                                                            margin: "10px",
                                                            marginTop: "20px",
                                                            marginLeft: "0",
                                                        }}
                                                    >
                                                        1) Childhood Life
                                                    </div>
                                                    <div
                                                        style={{
                                                            alignSelf: "center",
                                                            alignContent: "center",
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                            backgroundColor: "lightgrey",
                                                            width: "150",
                                                            border: "2px solid black",
                                                            marginLeft: "0",
                                                            padding: "50px",
                                                            margin: "10px",
                                                            marginTop: "10px",
                                                        }}
                                                    >
                                                        {childhood.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row clearfix">
                                                <div className="col-md-12">
                                                    <div
                                                        style={{
                                                            alignSelf: "left",
                                                            alignContent: "left",
                                                            textAlign: "left",
                                                            fontWeight: "bold",
                                                            padding: "10px",
                                                            margin: "10px",
                                                            marginTop: "20px",
                                                            marginLeft: "0",
                                                        }}
                                                    >
                                                        2) Post Education ,Pre Marriage,Joined Company/Founded Company

                                                    </div>
                                                    <div
                                                        style={{
                                                            alignSelf: "center",
                                                            alignContent: "center",
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                            backgroundColor: "lightgrey",
                                                            width: "150",
                                                            border: "2px solid black",
                                                            marginLeft: "0",
                                                            padding: "50px",
                                                            margin: "10px",
                                                            marginTop: "10px",
                                                        }}
                                                    >
                                                        {postEducation.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row clearfix">
                                                <div className="col-md-12">
                                                    <div
                                                        style={{
                                                            alignSelf: "left",
                                                            alignContent: "left",
                                                            textAlign: "left",
                                                            fontWeight: "bold",
                                                            padding: "10px",
                                                            margin: "10px",
                                                            marginTop: "20px",
                                                            marginLeft: "0",
                                                        }}
                                                    >
                                                        3) Post Marriage

                                                    </div>
                                                    <div
                                                        style={{
                                                            alignSelf: "center",
                                                            alignContent: "center",
                                                            textAlign: "center",
                                                            fontWeight: "bold",
                                                            backgroundColor: "lightgrey",
                                                            width: "150",
                                                            marginLeft: "0",
                                                            border: "2px solid black",
                                                            padding: "50px",
                                                            margin: "10px",
                                                            marginTop: "10px",
                                                        }}
                                                    >
                                                        {postMarriage.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="row clearfix">
                                                <div className="col-md-12">
                                                    <div className="table-responsive">
                                                        <Grid
                                                            style={{
                                                                maxHeight: "400px",
                                                            }}
                                                        // data={inputList.slice(0, 2)}
                                                        >
                                                            <Column
                                                                field="beliverse_group"
                                                                title="List of Believers Group"
                                                                width="420px"
                                                            />
                                                        </Grid>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row clearfix">
                                                <div className="col-md-12">
                                                    <div className="table-responsive">
                                                        <Grid
                                                            style={{
                                                                maxHeight: "400px",
                                                            }}
                                                        // data={inputList2.slice(0, 2)}
                                                        >
                                                            <Column
                                                                field="face_of_tribe"
                                                                title="Key Words To Define Face of Your Believer"
                                                                width="420px"
                                                            />
                                                        </Grid>
                                                    </div>
                                                </div>
                                            </div>
                                         */}
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 30 }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

