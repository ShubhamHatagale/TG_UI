import React, { useState, useEffect } from 'react';
import ProgressBar from '../../components/ProgressBar';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import ReactExport from "react-data-export";
import { getReflectionData } from "../apiServices/reflectionapi";
import { getDiscoveryData } from "../apiServices/discovery";
import { getRebirthData } from "../apiServices/rebirthapi";
import { getRebirthCommonData } from "../apiServices/rebirthCommon"
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Modal from "react-bootstrap/Modal";
import ModalSubmit from '../../components/ModalSubmit';
import { useHistory } from "react-router-dom";
import jsPDF from 'jspdf';

export default function Validate() {
    var s_id = localStorage.getItem('tr_id')

    const history = useHistory();
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const [smShow, setSmShow] = useState(false);
    const [showData, setShowData] = useState(false);
    const [ValidateData, setValidateData] = useState("");
    let [rebirthcommom, setrebirthcommom] = useState('')
    let [reflectiondata, setreflectiondata] = useState([]);
    let [discoverydata, setdiscoverydata] = useState([]);
    let [rebirthdata, setrebirthdata] = useState([]);
    let [childhood, setchildhood] = useState('');
    let [postEducation, setpostEducation] = useState('')
    let [postMarriage, setpostMarriage] = useState('')
    let [CommonPointer, setCommonPointer] = useState('')
    let [CiteExample, setCiteExample] = useState('')
    let [PreciseTalk, setPreciseTalk] = useState('')
    let [SelfTalk, setSelfTalk] = useState('')
    let [Mananf, setManan] = useState('')
    let [Sadhnaf, setSadhna] = useState('')
    let [Search, setSearch] = useState('')
    let [Spritualf, setSpritual] = useState('')
    let [ShowPdf, setShowPdf] = useState(0)

    const [BeliverOTP, setBeliverOTP] = useState('');
    const [transOTP, setTransOTP] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [secondsfortrans, setsecondsfortrans] = useState(0);
    const [ShowResetOTP, setShowResetOTP] = useState(true);
    const [ShowResetOTPTrans, setShowResetOTPTrans] = useState(true);
    const [showConfirmBox, setshowConfirmBox] = useState(false);
    const [showHide, setshowHide] = useState(false);
    const [viewModal, setviewModal] = useState(false);

    const [completed, setCompleted] = useState(0);
    const [Question1, setQuestion1] = useState('Not Sure');
    const [Question2, setQuestion2] = useState('Not Sure');
    const [Question3, setQuestion3] = useState('Not Sure');
    const [Question4, setQuestion4] = useState('Not Sure');
    const [Question5, setQuestion5] = useState('Not Sure');
    const [Question6, setQuestion6] = useState('Not Sure');
    const [Question7, setQuestion7] = useState('Not Sure');
    const [Question8, setQuestion8] = useState('Not Sure');
    const [Question9, setQuestion9] = useState('Not Sure');
    const [Question10, setQuestion10] = useState('Not Sure');
    const [Question11, setQuestion11] = useState('Not Sure');
    const [Question12, setQuestion12] = useState('Not Sure');
    const [Question13, setQuestion13] = useState('Not Sure');
    const [Question14, setQuestion14] = useState('Not Sure');
    const [Question15, setQuestion15] = useState('Not Sure');

    const [varifiedValue, setvarifiedValue] = useState("");
    const [Upid, setUpid] = useState("");
    const [varval, setvarval] = useState("");
    const [EnteredBeliverOTP, setEnteredBeliverOTP] = useState('');
    const [showWrongOtp, setshowWrongOtp] = useState(false);

    const [belEmail, setbelEmail] = useState("");
    const [transEmail, settransEmail] = useState("");
    const [bypassEmail, setbypassEmail] = useState("");
    const [beliverName, setbeliverName] = useState("");

    const [pdfShowDes, setpdfShowDes] = useState(0);

    useEffect(() => {
        if (!s_id) {
            history.push("Not_support");
        }
        GetallRecords();
        HandleReflectionDownload();
        HandleDiscoveryDownload();
        HandleRebirthDownload();    
        HandleRebirthCommonDownload();
    }, [])


    
    const getDataByUid = () => {
        var myGetHeaders = new Headers();
        myGetHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "GET",
            headers: myGetHeaders,
            redirect: "follow",
        };
        fetch(
            `http://localhost:9002/masters/parivartan_user/user/${s_id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((resData) => {
                if (resData.data.id > 0) {
                    setbelEmail(resData.data[0].beliver_email);
                    settransEmail(resData.data[0].tranz_email);
                    setbypassEmail(resData.data[0].bypass_email);
                    setbeliverName(resData.data[0].beliver_name);
                }
            });
    }
    const GetallRecords = () => {
        setCompleted(0);
        let Count = 0;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptionsrichtext = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(
            `http://localhost:9002/masters/parivartan_user/${s_id}`,
            requestOptionsrichtext
        )
            .then((response) => response.json())
            .then((resData) => {
                // if (resData.data.id > 0) {
                // console.log("ttt--->", resData.data[0].bypass_email);
                setbelEmail(resData.data[0].beliver_email);
                settransEmail(resData.data[0].tranz_email);
                setbypassEmail(resData.data[0].bypass_email);
                setbeliverName(resData.data[0].beliver_name);

                // }


            });
        fetch(`http://localhost:9002/masters/validate/user/${s_id}`, requestOptionsrichtext)
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData.data);
                setvarifiedValue(resData.data[0].verified);
                setUpid(resData.data[0].id);

                // alert(resData.data[0].verified)
                const validateData = resData.data;
                validateData.map((item, key) => {
                    setShowPdf(item.submit_flag);
                    setQuestion1(item.question1);
                    setQuestion2(item.question2);
                    setQuestion3(item.question3);
                    setQuestion4(item.question4);
                    setQuestion5(item.question5);
                    setQuestion6(item.question6);
                    setQuestion7(item.question7);
                    setQuestion8(item.question8);
                    setQuestion9(item.question9);
                    setQuestion10(item.question10);
                    setQuestion11(item.question11);
                    setQuestion12(item.question12);
                    setQuestion13(item.question13);
                    setQuestion14(item.question14);
                    setQuestion15(item.question15);
                    if (item.question1 == "Yes") { Count++; }
                    if (item.question2 == "Yes") { Count++; }
                    if (item.question3 == "Yes") { Count++; }
                    if (item.question4 == "Yes") { Count++; }
                    if (item.question5 == "Yes") { Count++; }
                    if (item.question6 == "Yes") { Count++; }
                    if (item.question7 == "Yes") { Count++; }
                    if (item.question8 == "Yes") { Count++; }
                    if (item.question9 == "Yes") { Count++; }
                    if (item.question10 == "Yes") { Count++; }
                    if (item.question11 == "Yes") { Count++; }
                    if (item.question12 == "Yes") { Count++; }
                    if (item.question13 == "Yes") { Count++; }
                    if (item.question14 == "Yes") { Count++; }
                    if (item.question15 == "Yes") { Count++; }
                })
                setCompleted(Count * 6.66666667);
                setValidateData(resData.data);
                console.log('====================================');
                console.log(Count * 6.66666667);
                console.log('====================================');
                setShowData(true);
            })
            .catch((error) => console.log("error", error))

    }


    const handleClose = () => {
        // setShowData(false);
        setviewModal(false);
    };


    const HandleReflectionDownload = async () => {
        const data = await getReflectionData();
        data.map((item, key) => {
            let childdata;
            let posteductaion;
            let postmarriage;
            childdata = item.child_hood;
            posteductaion = item.post_education;
            postmarriage = item.post_marriage;
            const regEx = /(<([^>]+)>)/ig;
            setchildhood(childdata.replace(regEx, ''));
            setpostEducation(posteductaion.replace(regEx, ''));
            setpostMarriage(postmarriage.replace(regEx, ''));
        })
        setreflectiondata(data);
    }
    const HandleDiscoveryDownload = async () => {
        const data1 = await getDiscoveryData();
        data1.map((item, key) => {
            let commonpointer;
            let selftalk;
            let citeexample;
            let precisetalk;
            commonpointer = item.common_pointers;
            selftalk = item.self_talk;
            citeexample = item.cite_examples;
            precisetalk = item.precise_talk;
            const regEx = /(<([^>]+)>)/ig;
            setSelfTalk(selftalk.replace(regEx, ''))
            setPreciseTalk(precisetalk.replace(regEx, ''))
            setCiteExample(citeexample.replace(regEx, ''))
            setCommonPointer(commonpointer.replace(regEx, ''))
        })
        setdiscoverydata(data1);
    }
    const HandleRebirthDownload = async () => {
        const data2 = await getRebirthData();
        data2.map((item, key) => {
            let manandata;
            let sadhnadata;
            let spritualdata;
            let SearchData;
            manandata = item.Manan;
            sadhnadata = item.Sadhana;
            spritualdata = item.Spiritual;
            SearchData = eval(item.Search);;
            const regEx = /(<([^>]+)>)/ig;
            setManan(manandata.replace(regEx, ''))
            setSpritual(spritualdata.replace(regEx, ''))
            setSadhna(sadhnadata.replace(regEx, ''))
            setSearch(SearchData)
        })
        setrebirthdata(data2);
    }
    const HandleRebirthCommonDownload = async () => {
        const commom = await getRebirthCommonData();
        setrebirthcommom(commom)
    }

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('1 ) Are you resonating with what you have written as your Manan Statement', Question1),
        createData('2 ) Is the Manan statement what you really believe in?', Question2),
        createData('3) Is your lifestory resonating with your Manan statement?', Question3),
        createData('4 ) Situation: If you do not have single penny in your bank account, will the same Manan motivate you forever?', Question4),
        createData('5 ) Situation: If you have everything what you always wanted/desried, will the Manan statement motivate you forever?', Question5),
        createData('6 ) Is the Manan motivating you now?', Question6),
        createData('7 ) Have you written all the possible examples to prove your manan?', Question7),
        createData('8 ) Do you think, Sadhana statement is the only way you can deliver your Manan?', Question8),
        createData('9 ) Is your Sadhana connecting to your Business?', Question9),
        createData('10 ) Do you really deliver every word written in SOCH ( Manan + Sadhana) with your Business?', Question10),
        createData('11 ) Are all the Spiritual Foundations that you have written are followed by you in every step of life? ', Question11),
        createData('12 ) Have you written all the Spriritual Foundations and their Explaination with Examples with complete geneunity?    ', Question12),
        createData('13 ) While making tough choices, were these Spiritual Foundations basis to your decision?', Question13),
        createData('14 ) Situation: Discuss with your closest family member/friends/employees to judge whether the foundations really reflect you or not?    ', Question14),
        createData('15 ) Are you content with what has come out - Manan, Sadhana and Spiritual Foundation', Question15),
    ];

    // const exportPDFWithMethod = () => {
    //     if (pdfExportComponent.current) {
    //         pdfExportComponent.current.save();
    //     }
    // };


    const exportPDFWithMethod = () => {
        setpdfShowDes(1);
        setTimeout(() => {
            // alert(pdfShowDes);
            if (pdfExportComponent.current) {
                pdfExportComponent.current.save();

                setTimeout(() => {
                    setpdfShowDes(0);
                }, 100)
            }
        }, 100)

    };

    const ViewModel = () => {
        setviewModal(true);
    };

    const getRandomNum = (length) => {
        var randomNum =
            (Math.pow(10, length).toString().slice(length - 1) +
                Math.floor((Math.random() * Math.pow(10, length)) + 1).toString()).slice(-length);
        return randomNum;
    }
    const OnVerifyHandle = () => {
        // alert(EnteredBeliverOTP);
        GetallRecords()

        if (BeliverOTP == EnteredBeliverOTP) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                verifiedVal: "1",
                email_id: s_id,
                created_by: s_id,
            });
            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(`http://localhost:9002/masters/validate/verify/${Upid}`, requestOptions)
                .then((response) => response.json())
                .then((resData) => {
                    // console.log(resData);
                    if (resData.status == 200) {
                        console.log("updated");
                        // setshowConfirmBox(true);
                        setshowConfirmBox(true);
                        setShowResetOTP(true);
                        setBeliverOTP(0)
                        setTransOTP(0)
                        setSeconds(0)
                        GetallRecords()
                    }
                })
                .catch((error) => console.log("error", error));
        } else if (BeliverOTP != EnteredBeliverOTP) {
            setshowWrongOtp(true);
            setShowResetOTP(true);
            setBeliverOTP(0)
            setTransOTP(0)
            setSeconds(0)
            GetallRecords()
        } else {
            // setshowConfirmBox(true);
            GetallRecords()
            return false;
        }

        // setShowResetOTPTrans(true)
        // setSeconds(0)
        // setsecondsfortrans(60)
    }
    const ResendBeliverDataTrans = () => {
        setShowResetOTPTrans(true)
        setSeconds(0)
        setsecondsfortrans(60)
    }
    const HandleInputChange = (event) => {
        setEnteredBeliverOTP(event.target.value);
    }
    const HandleSubmit = () => {
        // alert(varifiedValue)
        if (varifiedValue == 1) {
            setshowConfirmBox(true);
            setShowResetOTP(true);
            setBeliverOTP(0)
            setTransOTP(0)
            setSeconds(0)
        } else {
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
            const beliver = getRandomNum(6);
            setBeliverOTP(beliver)
            const trans = getRandomNum(6);
            setTransOTP(trans)
            setSeconds(60)


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                otp: beliver,
                belEmail: belEmail,
                transEmail: transEmail,
                bypassEmail: bypassEmail
            });
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(
                `http://localhost:9002/masters/beliverConceptsSend`,
                requestOptions
            )
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        console.log("Check");

                    }
                    // GetallRecords();
                })
                .catch((error) => console.log("error", error));
        }
    }
    const ResendBeliverData = () => {
        // alert(varifiedValue)
        if (varifiedValue == 1) {
            setshowConfirmBox(true);
            setShowResetOTP(true);
            setBeliverOTP(0)
            setTransOTP(0)
            setSeconds(0)
        } else {
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
            const beliver = getRandomNum(6);
            setBeliverOTP(beliver)
            const trans = getRandomNum(6);
            setTransOTP(trans)
            setSeconds(60)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                otp: beliver,
                belEmail: belEmail,
                transEmail: transEmail,
                bypassEmail: bypassEmail
            });
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            fetch(
                `http://localhost:9002/masters/beliverConceptsSend`,
                requestOptions
            )
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        console.log("Check");

                    }
                    // GetallRecords();
                })
                .catch((error) => console.log("error", error));
        }
    }
    const OnVerifyHandleConfirm = () => {
        setShowResetOTPTrans(false)
        setshowConfirmBox(true);
    }
    const HandleConfirmation = () => {
        // setShowPdf(1)
        setshowConfirmBox(false);
    }


    const HandleSave = () => {
        // alert(ValidateData.length)
        if (ValidateData.length === 0) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var rawrich = JSON.stringify({
                question1: Question1,
                question2: Question2,
                question3: Question3,
                question4: Question4,
                question5: Question5,
                question6: Question6,
                question7: Question7,
                question8: Question8,
                question9: Question9,
                question10: Question10,
                question11: Question11,
                question12: Question12,
                question13: Question13,
                question14: Question14,
                question15: Question15,
                email_id: s_id,
                created_by: s_id,
                updated_by: s_id,
                submit_flag: s_id
            });
            var requestOptionsrichtext = {
                method: "POST",
                headers: myHeaders,
                body: rawrich,
                redirect: "follow",
            };
            fetch(`http://localhost:9002/masters/validate/`, requestOptionsrichtext)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        console.log("Data Updated Successfully")
                        setSmShow(true);
                        setTimeout(() => {
                            setSmShow(false);
                        }, 1000)
                    }
                })
                .catch((error) => console.log("error", error))
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var rawrich = JSON.stringify({
                question1: Question1,
                question2: Question2,
                question3: Question3,
                question4: Question4,
                question5: Question5,
                question6: Question6,
                question7: Question7,
                question8: Question8,
                question9: Question9,
                question10: Question10,
                question11: Question11,
                question12: Question12,
                question13: Question13,
                question14: Question14,
                question15: Question15,
                email_id: s_id,
                created_by: s_id,
                updated_by: s_id,
                submit_flag: s_id
            });
            var requestOptionsrichtext = {
                method: "PUT",
                headers: myHeaders,
                body: rawrich,
                redirect: "follow",
            };
            fetch(`http://localhost:9002/masters/validate/${Upid}`, requestOptionsrichtext)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        console.log("Data Updated Successfully")
                        setSmShow(true);
                        setTimeout(() => {
                            setSmShow(false);
                        }, 1000)
                    }
                })
                .catch((error) => console.log("error", error))
        }

    }
    const pdfExportComponent = React.useRef(null);
    return (
        <>

            <ModalSubmit show={showHide} />
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Body >Form Saved Successful</Modal.Body>
            </Modal>

            <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
                <button type="submit" class=" ml-3 btn savebtn waves-effect" onClick={HandleSave}>SAVE    <i className="ml-1 zmdi zmdi-save " /></button>

                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="card p-4 mt-2">
                            <div class="modal fade" id="largeModal" tabindex="-1" role="dialog">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        </div>
                                        <div class="modal-body p-5">
                                            {seconds == 60 && ShowResetOTP ? (
                                                <div className="row clearfix">
                                                    <div className="col-md-6">
                                                        <h4 class="title" id="largeModalLabel">Verification For Believer</h4>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <CountdownCircleTimer
                                                            isPlaying
                                                            duration={60}
                                                            onComplete={() => {
                                                                setShowResetOTP(false)
                                                                setshowConfirmBox(false)
                                                            }}
                                                            size={90}
                                                            colors={[
                                                                ['#004777', 0.33],
                                                                ['#F7B801', 0.33],
                                                                ['#A30000', 0.33],
                                                            ]}
                                                        >
                                                            {({ remainingTime }) => remainingTime}
                                                        </CountdownCircleTimer>
                                                    </div>
                                                    <div style={{ marginTop: 30 }}>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Believer OTP" name="firstName" value={BeliverOTP} />


                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Enter Beliver OTP" name="EnteredBeliverOTP" onChange={HandleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="submit" class="btn savebtn  waves-effect" onClick={OnVerifyHandle} >Verify </button>
                                                        <button type="button" class="btn viewbtn waves-effect" data-dismiss="modal">CLOSE</button>
                                                    </div>
                                                </div>
                                            ) : (null)}
                                            {secondsfortrans == 60 && ShowResetOTPTrans ? (
                                                <div className="row clearfix">
                                                    <div className="col-md-6">
                                                        <h4 class="title" id="largeModalLabel">Verification For Transganizer</h4>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <CountdownCircleTimer
                                                            isPlaying
                                                            duration={60}
                                                            onComplete={() => {
                                                                setShowResetOTPTrans(0)
                                                            }}
                                                            size={90}
                                                            colors={[
                                                                ['#004777', 0.33],
                                                                ['#F7B801', 0.33],
                                                                ['#A30000', 0.33],
                                                            ]}
                                                        >
                                                            {({ remainingTime }) => remainingTime}
                                                        </CountdownCircleTimer>
                                                    </div>
                                                    <div style={{ marginTop: 30 }}>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Transganizer OTP" name="firstName" value={transOTP} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Enter Transganizer OTP" name="EnteredBeliverOTP" onChange={HandleInputChange} />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="submit" class="btn btn-success  waves-effect" onClick={OnVerifyHandleConfirm}>Verify </button>
                                                        <button type="button" class="btn viewbtn waves-effect" data-dismiss="modal">CLOSE</button>
                                                    </div>
                                                </div>) : (null)}
                                            {showConfirmBox ? (
                                                <div>
                                                    <h4 class="title" id="largeModalLabel">Confirmation </h4>
                                                    Are You Sure You Want To Submit!!
                                                    <div class="modal-footer">
                                                        <button type="submit" class="btn savebtn  waves-effect" data-dismiss="modal" onClick={HandleConfirmation}>Confirm </button>
                                                        <button type="button" class="btn viewbtn waves-effect" data-dismiss="modal">Cancel</button>
                                                    </div>
                                                </div>
                                            ) : (null)}

                                            {showWrongOtp ? (
                                                <div>
                                                    <h4 class="title" id="largeModalLabel">Wrong OTP </h4>
                                                    You Have Entered Wrong OTP!!
                                                    <div class="modal-footer">
                                                        {/* <button type="submit" class="btn savebtn  waves-effect" data-dismiss="modal" onClick={HandleConfirmation}>Confirm </button> */}
                                                        <button type="button" class="btn viewbtn waves-effect" data-dismiss="modal">Cancel</button>
                                                    </div>
                                                </div>
                                            ) : (null)}
                                            {!ShowResetOTP ? (
                                                <div>
                                                    <h4 class="title" id="largeModalLabel">Resend Verification Code
                                                    </h4>
                                                    <button type="submit" class="btn waves-effect" onClick={ResendBeliverData}>RESEND OTP For Beliver </button>
                                                </div>
                                            ) : (null)}
                                            {!ShowResetOTPTrans && !showConfirmBox ? (
                                                <div>
                                                    <h4 class="title" id="largeModalLabel">Resend Verification Code
                                                    </h4>
                                                    <button type="submit" class="btn btn-success  waves-effect" onClick={ResendBeliverDataTrans}>RESEND OTP For Transaganiser </button>
                                                </div>
                                            ) : (null)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="header">
                                <h2><strong>Ask yourself these Questions | Select your answers genuinely for better effectiveness of this activity</strong></h2>
                                {completed == 0 ? (null) : (
                                    <ProgressBar bgcolor={"#a3238e"} completed={Math.ceil(completed)} />
                                )}
                            </div>
                            {/* {rebirthcommom && reflectiondata && childhood && postEducation && postMarriage && discoverydata && CommonPointer && CiteExample && PreciseTalk && SelfTalk && Spritualf && Sadhnaf && Mananf && showData ? ( */}
                            <div className="body">
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong></strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>1 ) Are you resonating with what you have written as your Manan Statement?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" name="Question1" onChange={(event) => {
                                                setQuestion1(event.target.value);
                                                if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question1}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>2 ) Is the Manan statement what you really believe in?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion2(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question2} >
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>3) Is your lifestory resonating with your Manan statement?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion3(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question3}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>4 ) Situation: If you do not have single penny in your bank account, will the same Manan motivate you forever?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion4(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question4}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>5 ) Situation: If you have everything what you always wanted/desired, will the Manan statement motivate you forever?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion5(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question5}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>6 ) Is the Manan motivating you now?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion6(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question6}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>7 ) Have you written all the possible examples to prove your Manan?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion7(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question7}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>8 ) Do you think, Sadhana statement is the only way you can deliver your Manan?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion8(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question8}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>9 )  Is your Sadhana connecting to your Business?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion9(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question9}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>10 ) Do you really deliver every word written in SOCH ( Manan + Sadhana) with your Business?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion10(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question10}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>11 ) Are all the Spiritual Foundations that you have written are followed by you in every step of life?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion11(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question11}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>12 ) Have you written all the Spiritual Foundations and their Explaination with Examples with complete genuinely?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion12(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question12}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>13 ) While making tough choices, were these Spiritual Foundations basis to your decision?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion13(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question13}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>14 ) Situation: Discuss with your closest family member/friends/employees to judge whether the foundations really reflect you or not?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion14(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question14}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <h2 className="card-inside-title"><strong>15 ) Are you content with what has come out - Manan, Sadhana and Spiritual Foundation?</strong></h2>
                                    </div>
                                    <div className="col-md-1">
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-1">
                                    </div>
                                    <div className="col-md-12">
                                        <div class="mb-3">
                                            <select class="form-control show-tick" onChange={(event) => {
                                                setQuestion15(event.target.value); if (event.target.value == 'Yes') {
                                                    setCompleted(completed + 6.66666667)
                                                } else {
                                                    setCompleted(completed - 6.66666667)
                                                }
                                            }} value={Question15}>
                                                <option value='Not Sure'>Not Sure</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                </div>
                                <div style={{ marginTop: 30 }}>
                                </div>
                                {/* <div className="container-fluid"
                                    style={{
                                        position: "absolute",
                                        left: "-3000px",
                                        top: 0,
                                        backgroundColor:"green"
                                    }}>
                                    <PDFExport  style={{backgroundColor:"red"}} paperSize="A4" margin="1cm" ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`} forcePageBreak=".page-break">
                                        <div className="bg-blue" >
                                            'dklkjhskd
                                            <div id="divToPrint" className="mt4" >

                                                <div className="row clearfix navbar-brand navbar-brand bg-blue-grey" >
                                                    <div className="col-md-12 row" >
                                                        <div className="col-md-6">

                                                            <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                                                        </div>
                                                        <div className="col-md-6" style={{ alignSelf: 'right', alignContent: 'right', textAlign: 'right', marginTop: '16px', fontWeight: "bold" }}>

                                                            Purpose Discovery
                                                        </div>                                 </div>

                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <div className="pdfHeader">Reflection</div>
                                                        <div style={{ alignSelf: 'left', alignContent: 'left', textAlign: 'left', fontWeight: 'bold', padding: "10px", margin: '10px', marginTop: '10px', marginLeft: '0' }}>1. Childhood Life</div>
                                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', borderRadius: "6px", marginLeft: '0', padding: "50px", margin: '10px', marginTop: '6px' }}>{childhood.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <div className="headText">2. Post Education, Pre Marriage, Joined Company/Founded Company</div>
                                                        <div className="dynamicContent">{postEducation.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <div className="headText">3. Post Marriage</div>
                                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', marginLeft: '0', borderRadius: "6px", padding: "50px", margin: '10px', marginTop: '10px' }}>{postMarriage.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                                    </div>
                                                </div>




                                                <div className="row clearfix" className="page-break" >
                                                    <div className="col-md-12">
                                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', border: '1px solid black', marginLeft: '0', padding: "10px", margin: '10px', marginTop: '30px' }}>Discovery</div>
                                                        <div className="headText">1. Common Pointers from All Three Stories which you have written in Stage 1
                                                        </div>
                                                        <div className="dynamicContent">{CommonPointer.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <div className="headText">2. Self Talk / Self Brainstorming
                                                        </div>
                                                        <div className="dynamicContent">{SelfTalk.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <div className="headText">3. Cite Examples Connecting to Story/Common Pointers
                                                        </div>
                                                        <div className="dynamicContent">{CiteExample.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <div className="headText">4. Precise Talk
                                                        </div>
                                                        <div className="dynamicContent">{PreciseTalk.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix" className="page-break">
                                                    <div className="col-md-12">
                                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', border: '1px solid black', marginLeft: '0', padding: "10px", margin: '10px', marginTop: '30px' }}>Rebirth</div>
                                                        <Grid style={{
                                                            maxHeight: "400px"
                                                        }} data={Search.slice(0, 100)}>
                                                            <Column field="firstName" title="Search for Common Words that you can see in the story" width="420px" />
                                                        </Grid>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', padding: "10px", margin: '10px', marginTop: '20px', marginLeft: '0' }}>1. Frame a Manan Statement with Words that resonate the most with you (Summarise Bhavana of Story in One Line)
                                                        </div>
                                                        <div className="dynamicContent">{Mananf.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', padding: "10px", margin: '10px', marginTop: '20px', marginLeft: '0' }}>2)Frame a Sadhana Statement on how will you deliver your Manan to everyone
                                                        </div>
                                                        <div className="dynamicContent">{Sadhnaf.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', padding: "10px", margin: '10px', marginTop: '20px', marginLeft: '0' }}>3. List out Spiritual Foundations (Ref: Story, Examples which you have cited already)
                                                        </div>
                                                        <div className="dynamicContent">{Spritualf.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix" className="page-break">
                                                    <div className="col-md-12">
                                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', border: '1px solid black', marginLeft: '0', padding: "10px", margin: '10px', marginTop: '30px' }}>Validation
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row clearfix">
                                                    <div className="col-md-12">
                                                        <TableContainer component={Paper}>
                                                            <Table aria-label="simple table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell width={70}>Questions</TableCell>
                                                                        <TableCell align="right" width={30}>Answers</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {rows.map((row) => (
                                                                        <TableRow key={row.name}>
                                                                            <TableCell width={70} component="th" scope="row">
                                                                                {row.name}
                                                                            </TableCell>
                                                                            <TableCell width={30} align="right">{row.calories.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </PDFExport>
                                </div> */}

                                <div className="btnGroups">
                                    <button type="submit" class="btn savebtn waves-effect" onClick={HandleSave}>SAVE    <i className="ml-1 zmdi zmdi-save " /></button>
                                    {/* <button type="button" class="btn btn-success  waves-effect"  data-target="#largeModal">SUBMIT</button>  */}

                                    <button
                                        type="button"
                                        class="btn viewbtn waves-effect"
                                        onClick={ViewModel}
                                    >
                                        View  <i className="ml-1 zmdi zmdi-eye " /> </button>

                                    <button type="button" class="btn savebtn waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={HandleSubmit}>SUBMIT <i class="ml-1 zmdi zmdi-check"></i></button>

                                    {/* {ShowPdf ? ( */}
                                    {/* <div> */}
                                    <button
                                        type="button"
                                        class="btn downloadbtn waves-effect"
                                        onClick={exportPDFWithMethod}
                                    >
                                        Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
                                    </button>

                                </div>


                                {/* </div> */}
                                {/* ) : null} */}
                            </div>
                            {/* ) : (null)} */}
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
                <Modal.Header style={{ padding: "10px" }}>
                    <div className="col-md-12 row" >
                        <div className="col-md-6">
                            <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                        </div>
                        <div className="col-md-6 pageHeading" >
                            Purpose Discovery
                        </div>
                    </div>
                    <Modal.Title id="example-modal-sizes-title-lg">

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body  >

                    <div id="divToPrint" className="mt4" >

                        <div className="body pdfBody"  >

                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <div className="pdfHeader">Reflection</div>
                                    <div className="headText">1. Childhood Life</div>
                                    <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', borderRadius: "6px", marginLeft: '0', padding: "50px", margin: '10px', marginTop: '6px' }}>{childhood.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <div className="headText">2. Post Education, Pre Marriage, Joined Company/Founded Company</div>
                                    <div className="dynamicContent">{postEducation.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <div className="headText">3. Post Marriage</div>
                                    <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', marginLeft: '0', borderRadius: "6px", padding: "50px", margin: '10px', marginTop: '10px' }}>{postMarriage.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                            </div>
                        </div>

                        <div className="body pdfBody"  >

                            <div className="row clearfix" className="page-break" >
                                <div className="col-md-12">
                                    <div className="pdfHeader">Discovery</div>

                                    <div className="headText">1. Common Pointers from All Three Stories which you have written in Stage 1
                                    </div>
                                    <div className="dynamicContent">{CommonPointer.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <div className="headText">2. Self Talk / Self Brainstorming
                                    </div>
                                    <div className="dynamicContent">{SelfTalk.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <div className="headText">3. Cite Examples Connecting to Story/Common Pointers
                                    </div>
                                    <div className="dynamicContent">{CiteExample.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <div className="headText">4. Precise Talk
                                    </div>
                                    <div className="dynamicContent">{PreciseTalk.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                            </div>
                        </div>

                        <div className="body pdfBody"  >

                            <div className="row clearfix" className="page-break">
                                <div className="col-md-12">
                                    <div className="pdfHeader">Rebirth</div>

                                    {/* <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', border: '1px solid black', marginLeft: '0', padding: "10px", margin: '10px', marginTop: '30px' }}>Rebirth</div> */}
                                    <Grid style={{
                                        maxHeight: "400px"
                                    }} data={Search.slice(0, 100)}>
                                        <Column field="firstName" title="Search for Common Words that you can see in the story" width="420px" />
                                    </Grid>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', padding: "10px", margin: '10px', marginTop: '20px', marginLeft: '0' }}>1. Frame a Manan Statement with Words that resonate the most with you (Summarise Bhavana of Story in One Line)
                                    </div>
                                    <div className="dynamicContent">{Mananf.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', padding: "10px", margin: '10px', marginTop: '20px', marginLeft: '0' }}>2)Frame a Sadhana Statement on how will you deliver your Manan to everyone
                                    </div>
                                    <div className="dynamicContent">{Sadhnaf.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', padding: "10px", margin: '10px', marginTop: '20px', marginLeft: '0' }}>3. List out Spiritual Foundations (Ref: Story, Examples which you have cited already)
                                    </div>
                                    <div className="dynamicContent">{Spritualf.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                            </div>
                        </div>

                        <div className="body pdfBody"  >

                            <div className="row clearfix" className="page-break">
                                <div className="col-md-12">
                                    <div className="pdfHeader">Validation</div>

                                    {/* <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', border: '1px solid black', marginLeft: '0', padding: "10px", margin: '10px', marginTop: '30px' }}>Validation 
                                </div>*/}
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell width={70}>Questions</TableCell>
                                                    <TableCell align="right" width={30}>Answers</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow key={row.name}>
                                                        <TableCell width={70} component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell width={30} align="right">{row.calories}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>                        </div>

                    </div>
                </Modal.Body>
            </Modal>

            {/* PDF-----------------------> */}
            <div
                style={{
                    position: "absolute",
                    left: "-3000px",
                    top: 0,
                    color: "black",
                }}>
        {pdfShowDes > 0 ? (
                <PDFExport paperSize="A4" ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`} >
                    <Modal.Header style={{ padding: "10px" }}>
                        <div className="col-md-12 row" >
                            <div className="col-md-6">
                                <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                            </div>
                            <div className="col-md-6" style={{ padding: "5px", fontSize: "22px", alignSelf: 'right', alignContent: 'right', textAlign: 'right', marginTop: '16px', fontWeight: "bold" }}>

                                Purpose Discovery
                            </div>
                        </div>

                        <Modal.Title id="example-modal-sizes-title-lg">

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body  >

                        <div id="divToPrint" className="mt4" >

                            <div className="body pdfBody"  >

                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <div className="pdfHeader">Reflection</div>
                                        <div className="headText">1. Childhood Life</div>
                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', borderRadius: "6px", marginLeft: '0', padding: "50px", margin: '10px', marginTop: '6px' }}>{childhood.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <div className="headText">2. Post Education, Pre Marriage, Joined Company/Founded Company</div>
                                        <div className="dynamicContent">{postEducation.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <div className="headText">3. Post Marriage</div>
                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', marginLeft: '0', borderRadius: "6px", padding: "50px", margin: '10px', marginTop: '10px' }}>{postMarriage.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="body pdfBody"  >

                                <div className="row clearfix" className="page-break" >
                                    <div className="col-md-12">
                                        <div className="pdfHeader">Discovery</div>

                                        <div className="headText">1. Common Pointers from All Three Stories which you have written in Stage 1
                                        </div>
                                        <div className="dynamicContent">{CommonPointer.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <div className="headText">2. Self Talk / Self Brainstorming
                                        </div>
                                        <div className="dynamicContent">{SelfTalk.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <div className="headText">3. Cite Examples Connecting to Story/Common Pointers
                                        </div>
                                        <div className="dynamicContent">{CiteExample.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <div className="headText">4. Precise Talk
                                        </div>
                                        <div className="dynamicContent">{PreciseTalk.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="body pdfBody"  >

                                <div className="row clearfix" className="page-break">
                                    <div className="col-md-12">
                                        <div className="pdfHeader">Rebirth</div>

                                        {/* <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', border: '1px solid black', marginLeft: '0', padding: "10px", margin: '10px', marginTop: '30px' }}>Rebirth</div> */}
                                        <Grid style={{
                                            maxHeight: "400px"
                                        }} data={Search.slice(0, 100)}>
                                            <Column field="firstName" title="Search for Common Words that you can see in the story" width="420px" />
                                        </Grid>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', padding: "10px", margin: '10px', marginTop: '20px', marginLeft: '0' }}>1. Frame a Manan Statement with Words that resonate the most with you (Summarise Bhavana of Story in One Line)
                                        </div>
                                        <div className="dynamicContent">{Mananf.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', padding: "10px", margin: '10px', marginTop: '20px', marginLeft: '0' }}>2)Frame a Sadhana Statement on how will you deliver your Manan to everyone
                                        </div>
                                        <div className="dynamicContent">{Sadhnaf.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', padding: "10px", margin: '10px', marginTop: '20px', marginLeft: '0' }}>3. List out Spiritual Foundations (Ref: Story, Examples which you have cited already)
                                        </div>
                                        <div className="dynamicContent">{Spritualf.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="body pdfBody"  >

                                <div className="row clearfix" className="page-break">
                                    <div className="col-md-12">
                                        <div className="pdfHeader">Validation</div>

                                        {/* <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', border: '1px solid black', marginLeft: '0', padding: "10px", margin: '10px', marginTop: '30px' }}>Validation 
            </div>*/}
                                    </div>
                                </div>
                                <div className="row clearfix">
                                    <div className="col-md-12">
                                        <TableContainer component={Paper}>
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell width={70}>Questions</TableCell>
                                                        <TableCell align="right" width={30}>Answers</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((row) => (
                                                        <TableRow key={row.name}>
                                                            <TableCell width={70} component="th" scope="row">
                                                                {row.name}
                                                            </TableCell>
                                                            <TableCell width={30} align="right">{row.calories}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </div>                        </div>

                        </div>
                    </Modal.Body>

                </PDFExport>
        ):(null)}
            </div>

        </>
    )
}

