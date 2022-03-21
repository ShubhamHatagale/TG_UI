import React, { useState, useEffect } from 'react';
import Editor from "../../components/SunEditor"
import Modal from "react-bootstrap/Modal";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useHistory } from "react-router-dom";

export default function Form(props) {
    const history = useHistory();
    let id = localStorage.getItem("tr_id");

    let [commonPointer, setcommonPointer] = useState('');
    let [selfTalk, setselfTalk] = useState('');
    let [siteExample, setsiteExample] = useState('');
    let [peciTalk, setpeciTalk] = useState('');
    let [ReflectionData, setReflectionData] = useState('');
    const [showData, setShowData] = useState(false);
    const [smShow, setSmShow] = useState(false);
    const [viewModal, setviewModal] = useState(false);

    const [ShowPdf, setShowPdf] = useState(false);
    const pdfExportComponent = React.useRef(null);
    const [belConceptDataa, setbelConceptDataa] = useState();
    const [Upid, setUpid] = useState("");


    useEffect(() => {
        var s_id = localStorage.getItem('tr_id')
        if (!id) {
            history.push("Not_support");
        }

        GetallRecords();
    }, [])

    const exportPDFWithMethod = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };
    const handleClose = () => {
        // setShowData(false);
        setviewModal(false);
    };

    const ViewModel = () => {
        setviewModal(true);
    };

    const handleChangeEditorCommon = (newContent) => {
        console.log(newContent)
        setcommonPointer(newContent)
        // setContent(newContent);
    };
    const handleChangeEditorSelf = (newContent) => {
        console.log(newContent)
        setselfTalk(newContent)
        // setContent(newContent);
    };
    const handleChangeEditorSite = (newContent) => {
        console.log(newContent)
        setsiteExample(newContent)
        // setContent(newContent);
    };
    const handleChangeEditorPreci = (newContent) => {
        console.log(newContent)
        setpeciTalk(newContent)
        // setContent(newContent);
    };




    const HandleSubmitClick = () => {
        if (ReflectionData.length === 0) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                common_pointers: commonPointer,
                self_talk: selfTalk,
                cite_examples: siteExample,
                precise_talk: peciTalk,
                email_id: `${id}`,
                created_by: `${id}`
            })
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`https://parivartan.transganization.com/nodejs/masters/discovery`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        setSmShow(true);
                        setTimeout(() => {
                            setSmShow(false);
                            props.OnValidateSecond(true)
                        }, 1000)
                    }
                })
                .catch((error) => console.log("error", error));
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                common_pointers: commonPointer,
                self_talk: selfTalk,
                cite_examples: siteExample,
                precise_talk: peciTalk,
                email_id: `${id}`,
                created_by: `${id}`
            })
            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`https://parivartan.transganization.com/nodejs/masters/discovery/${Upid}`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        setSmShow(true);
                        setTimeout(() => {
                            setSmShow(false);
                            props.OnValidateSecond(true)
                        }, 1000)
                        console.log("sdsdf");
                    }
                })
                .catch((error) => console.log("error", error));
        }

    }

    const GetallRecords = () => {
        var myGetHeaders = new Headers();
        myGetHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "GET",
            headers: myGetHeaders,
            redirect: "follow",
        };
        fetch(`https://parivartan.transganization.com/nodejs/masters/discovery/user/${id}`, requestOptions)
            .then((response) => response.json())
            .then((resData) => {
                if (resData.data.length > 0) {
                    let MyValues = resData.data;
                    MyValues.map((item, key) => {
                        setcommonPointer(item.common_pointers)
                        setpeciTalk(item.precise_talk);
                        setselfTalk(item.self_talk)
                        setsiteExample(item.cite_examples);
                    })
                    setReflectionData(resData.data);
                    setUpid(resData.data[0].id);

                }
                setShowData(true);

            })
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

            <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card p-4 mt-2">
                            {showData ? (
                                <div className="body p-5">
                                    <div className="row clearfix">
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-12">
                                            <h2 className="card-inside-title"><strong>Common Pointers from All Three Stories which you have written in Stage 1</strong></h2>
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                    </div>
                                    <div className="row clearfix">
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-12">
                                            <Editor contents={commonPointer} getValue={handleChangeEditorCommon} />
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
                                            <h2 className="card-inside-title"><strong>Self Talk / Self Brainstorming</strong></h2>
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                    </div >
                                    <div className="row clearfix">
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-12">
                                            <Editor contents={selfTalk} getValue={handleChangeEditorSelf} />
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
                                            <h2 className="card-inside-title"><strong>Cite Examples Connecting to Story/Common Pointers</strong></h2>
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                    </div >
                                    <div className="row clearfix">
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-12">
                                            <Editor contents={siteExample} getValue={handleChangeEditorSite} />
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
                                            <h2 className="card-inside-title"><strong>Precise Talk</strong></h2>
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                    </div >
                                    <div className="row clearfix">
                                        <div className="col-md-1">
                                        </div>
                                        <div className="col-md-12">
                                            <Editor contents={peciTalk} getValue={handleChangeEditorPreci} />
                                        </div>
                                        <div className="col-md-1">
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 30 }}>
                                    </div>
                                    <button type="submit" class="btn savebtn waves-effect" onClick={HandleSubmitClick}>SAVE    <i className="ml-1 zmdi zmdi-save " /> </button>
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



            {/* For Pdf -----------------------> */}


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
                                                        Discovery
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
                                                        1) Common Pointers from All Three Stories which you have written in Stage 1

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
                                                        {commonPointer.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                                                        2) Self Talk / Self Brainstorming


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
                                                        {selfTalk.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                                                        3) Cite Examples Connecting to Story/Common Pointers


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
                                                        {siteExample.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                                                        4) Precise Talk



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
                                                        {peciTalk.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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

