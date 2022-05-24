import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Editor from "../../components/SunEditor";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import ModalSubmit from "../../components/ModalSubmit";
import { useParams, useHistory } from "react-router-dom";

export default function Form() {
    const history = useHistory();
    const { fname } = useParams();
    const [inputList, setInputList] = useState([{ beliverse_group: "" }]);
    const [inputList2, setinputList2] = useState([{ face_of_tribe: "" }]);
    const [allFaceList, setallFaceList] = useState("");
    const [CustomerBeliver, setCustomerBeliver] = useState("");
    const [YourTribe, setYourTribe] = useState("");
    const [PrimaryCustomer, setPrimaryCustomer] = useState("");
    const [FaceBeliver, setFaceBeliver] = useState("");
    const [ShowPdf, setShowPdf] = useState(false);
    const pdfExportComponent = React.useRef(null);
    const [show, setShow] = useState(false);
    const [showData, setShowData] = useState(false);
    const [viewModal, setviewModal] = useState(false);
    const [belConceptDataa, setbelConceptDataa] = useState();
    const [smShow, setSmShow] = useState(false);

    const [BeliverOTP, setBeliverOTP] = useState('');
    const [transOTP, setTransOTP] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [secondsfortrans, setsecondsfortrans] = useState(0);
    const [ShowResetOTP, setShowResetOTP] = useState(true);
    const [ShowResetOTPTrans, setShowResetOTPTrans] = useState(true);
    const [showConfirmBox, setshowConfirmBox] = useState(false);

    const [showHide, setshowHide] = useState(false);

    useEffect(() => {
        urlCheck();
        // GetallRecords();
    }, []);

    const urlCheck = () => {
        var myGetHeaders = new Headers();
        myGetHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "GET",
            headers: myGetHeaders,
            redirect: "follow",
        };
        // for server--->
        // `https://parivartan.transganization.com/nodejs/masters/parivartan_user/checkemail/email=${fname}`,
        fetch(`https://parivartan.transganization.com/nodejs/masters/parivartan_user/checkemail/email=${fname}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((resData) => {
                console.log("In Beliver Get all Reccords Function", resData.auth);
                console.log(resData);
                if (resData.id) {
                    console.log("checking", resData);
                    localStorage.setItem("tr_id", resData.id);
                    localStorage.setItem("tr_token", resData.token);
                    localStorage.setItem("tr_auth", resData.auth);
                    localStorage.setItem("tr", JSON.stringify(resData));
                    // localStorage.setItem("tr_jwt", resData.token);
                    history.push("/home");
                    window.location.reload();
                } else {
                    // alert("hello")
                    localStorage.clear("tr_id");
                    history.push("/Not_support");

                }
                setbelConceptDataa(resData.data);
                setShowData(true);
            });
    };



    return (
        <>
            {/* <h1>sdasdsa</h1> */}
        </>
    );
}
