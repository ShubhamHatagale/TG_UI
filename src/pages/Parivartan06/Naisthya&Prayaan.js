import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import Editor from "../../components/SunEditor"
import 'suneditor/dist/css/suneditor.min.css';  //Import Sun Editor's CSS File
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactExport from "react-data-export";
import ModalSubmit from '../../components/ModalSubmit';
import { useHistory } from "react-router-dom";

export default function NaisthyaPrayaan() {
  var s_id = localStorage.getItem('tr_id')

  const history = useHistory();

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const pdfExportComponent = React.useRef(null);
  const [showData, setShowData] = useState(false);
  const [naishtyaStatement, setNaishtyaStatement] = useState("Naishtya Statement");
  const [timePeriod, setTimePeriod] = useState("Time Period and No of Vilakshan Units");
  const [believerGroup, setBelieverGroup] = useState("Believer Group");
  const [impactPoint, setImpactPoint] = useState("Impact Point");
  const [prayaanStatement, setPrayaanStatement] = useState("Prayaan Statement");
  const [dateofLaunch, setDateofLaunch] = useState("Date of Launch of Prayaan");
  const [listofactivities, setListofactivities] = useState("List of activities which we will never do");
  let [naisthyaData, setNaisthyaData] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [MAdd, setMAdd] = useState(false);
  const [pdfShowDes, setpdfShowDes] = useState(0);


  const [viewModal, setviewModal] = useState(false);
  const [ShowPdf, setShowPdf] = useState(false);
  const [belConceptDataa, setbelConceptDataa] = useState();


  const [BeliverOTP, setBeliverOTP] = useState('');
  const [transOTP, setTransOTP] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [secondsfortrans, setsecondsfortrans] = useState(0);
  const [ShowResetOTP, setShowResetOTP] = useState(true);
  const [ShowResetOTPTrans, setShowResetOTPTrans] = useState(true);
  const [showConfirmBox, setshowConfirmBox] = useState(false);
  const [showHide, setshowHide] = useState(false);

  const [belEmail, setbelEmail] = useState("");
  const [transEmail, settransEmail] = useState("");
  const [bypassEmail, setbypassEmail] = useState("");
  const [beliverName, setbeliverName] = useState("");

  const [varifiedValue, setvarifiedValue] = useState("");
  const [Upid, setUpid] = useState("");
  const [varval, setvarval] = useState("");
  const [EnteredBeliverOTP, setEnteredBeliverOTP] = useState('');
  const [showWrongOtp, setshowWrongOtp] = useState(false);

  // const exportPDFWithMethod = () => {
  //   if (pdfExportComponent.current) {
  //     pdfExportComponent.current.save();
  //   }
  // };

  const exportPDFWithMethod = () => {
    setpdfShowDes(1);
    setTimeout(() => {
      // alert(pdfShowDes);
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
        setTimeout(() => {
          setpdfShowDes(0);
        }, 1000)
      }
    }, 1000)

  };

  const handleClose = () => {
    // setShowData(false);
    setviewModal(false);
  };

  const ViewModel = () => {
    setviewModal(true);
  };

  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    GetallRecords();
  }, []);

  const OnSubmitForm = () => {
    // alert(Upid)
    if (naisthyaData.length === 0) {
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        naisthya_statement: naishtyaStatement,
        time_period: timePeriod,
        believer_group: believerGroup,
        impact_point: impactPoint,
        prayaan_statement: prayaanStatement,
        date_of_lunch: dateofLaunch,
        list_of_activities: listofactivities,
        email_id: s_id,
        created_by: s_id
      });
      var requestOptionsrichtext = {
        method: "POST",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(`https://parivartan.transganization.com/nodejs/masters/naisthya`, requestOptionsrichtext)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Data Added succesfully");
            setMAdd(true);
            // setMAdd(false);
            setTimeout(() => {
              setMAdd(false);
            }, 1000)

            GetallRecords();
          }
        })
        .catch((error) => console.log("error", error));
    }
    else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        naisthya_statement: naishtyaStatement,
        time_period: timePeriod,
        believer_group: believerGroup,
        impact_point: impactPoint,
        prayaan_statement: prayaanStatement,
        date_of_lunch: dateofLaunch,
        list_of_activities: listofactivities,
        email_id: s_id,
        updated_by: s_id
      });
      var requestOptionsrichtext = {
        method: "PUT",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(`https://parivartan.transganization.com/nodejs/masters/naisthya/` + `${Upid}`, requestOptionsrichtext)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Data Added succesfully");
            // alert("hhtt")

            setSmShow(true);
            // setSmShow(false);
            setTimeout(() => {
              setSmShow(false);
            }, 1000)
            GetallRecords();
          }
        })
        .catch((error) => console.log("error", error));
    }
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
        if (resData.data.id > 0) {
          setbelEmail(resData.data.beliver_email);
          settransEmail(resData.data.tranz_email);
          setbypassEmail(resData.data.bypass_email);
          setbeliverName(resData.data.beliver_name);

        }
      });

    fetch(`https://parivartan.transganization.com/nodejs/masters/naisthya/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {

        if (resData.data.length > 0) {
          let get_list = resData.data;
          get_list.map((item, key) => {
            console.log(item.naisthya_statement, item.time_period)
            setNaishtyaStatement(item.naisthya_statement);
            setTimePeriod(item.time_period);
            setBelieverGroup(item.believer_group);
            setImpactPoint(item.impact_point);
            setPrayaanStatement(item.prayaan_statement);
            setDateofLaunch(item.date_of_lunch);
            setListofactivities(item.list_of_activities);
          });
          setNaisthyaData(resData.data);
          setvarifiedValue(resData.data[0].verified);
          setUpid(resData.data[0].id);
        }

        setShowData(true);
      })
      .catch((error) => console.log("error", error));

  }

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
      fetch(`https://parivartan.transganization.com/nodejs/masters/naisthya/verify/${s_id}`, requestOptions)
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
        `https://parivartan.transganization.com/nodejs/masters/beliverConceptsSend`,
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
        `https://parivartan.transganization.com/nodejs/masters/beliverConceptsSend`,
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
  return (
    <>
      <ModalSubmit show={showHide} />
      <div class="modal fade" id="largeModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
            </div>
            <div class="modal-body">
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
            </div>
          </div>
        </div>
      </div>



      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Update Successful</Modal.Body>
      </Modal>

      <Modal
        size="sm"
        show={MAdd}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Saved Successful</Modal.Body>
      </Modal>

      <section class="content" style={{ backgroundColor: "white" }}>
        {/* {showData ? (
        <Noti />
      ): (null)} */}
        <div class="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Naisthya </h2>
                <button className="btn btn-primary btn-icon mobile_menu" type="button"><i className="zmdi zmdi-sort-amount-desc"></i></button>
              </div>
              {/* <div className="col-lg-5 col-md-6 col-sm-12">
                <button className="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i className="zmdi zmdi-arrow-right"></i></button>
              </div> */}
            </div>
          </div>
          {showData ? (
            <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="card p-4 mt-2">
                    <div className="body">

                      {/* {naisthyaData.length > 0 ? (
                        <> */}
                      <div className="row clearfix" >
                        <div className="col-md-12">
                          <h2 className="card-inside-title"><strong>Naishtya Statement</strong></h2>
                          <div>
                            <Editor contents={naishtyaStatement} getValue={(newContent) => { setNaishtyaStatement(newContent) }} />
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-12">
                          <h2 className="card-inside-title"><strong>Time Period and No of Vilakshan Units</strong></h2>
                          <div>
                            <Editor contents={timePeriod} getValue={(newContent) => { setTimePeriod(newContent) }} />
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-12">
                          <h2 className="card-inside-title"><strong>Believer Group</strong></h2>
                          <div>
                            <Editor contents={believerGroup} getValue={(newContent) => { setBelieverGroup(newContent) }} />
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-12">
                          <h2 className="card-inside-title"><strong>Impact Point</strong></h2>
                          <div>
                            <Editor contents={impactPoint} getValue={(newContent) => { setImpactPoint(newContent) }} />
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-12">
                          <h2 className="card-inside-title"><strong>Prayaan Statement</strong></h2>
                          <div>
                            <Editor contents={prayaanStatement} getValue={(newContent) => { setPrayaanStatement(newContent) }} />
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-12">
                          <h2 className="card-inside-title"><strong>Date of Launch of Prayaan</strong></h2>
                          <div>
                            <Editor contents={dateofLaunch} getValue={(newContent) => { setDateofLaunch(newContent) }} />
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-12">
                          <h2 className="card-inside-title"><strong>List of activities which we will never do</strong></h2>
                          <div>
                            <Editor contents={listofactivities} getValue={(newContent) => { setListofactivities(newContent) }} />
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: 20 }}></div>
                      <button type="submit" class="btn savebtn  waves-effect" onClick={OnSubmitForm}>SAVE    <i className="ml-1 zmdi zmdi-save " /> </button>

                      {naisthyaData.length > 0 ? (
                        <>
                          <button
                            type="button"
                            class="btn viewbtn  waves-effect"
                            onClick={ViewModel}
                          >
                            View   <i className="ml-1 zmdi zmdi-eye " />
                          </button>
                          <button type="button" class="btn savebtn  waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={HandleSubmit}>SUBMIT<i class="ml-1 zmdi zmdi-check"></i></button>
                          {/* <div> */}
                          <button type="button" class="btn downloadbtn waves-effect" onClick={exportPDFWithMethod}>Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
                          </button>
                        </>
                      ) : null}
                      <Modal
                        size="lg"
                        show={viewModal}
                        onHide={handleClose}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton style={{ padding: "10px" }}>
                          <Modal.Title id="example-modal-sizes-title-lg">

                          </Modal.Title>

                          <div className="col-md-12 row" >
                            <div className="col-md-6">
                              <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                            </div>
                            <div className="col-md-6 pageHeading" >
                              Financial Model
                            </div>
                          </div>

                        </Modal.Header>

                        <Modal.Body>
                          <div >
                            <div id="divToPrint" className="mt4 pdfBody" >

                              <div className="row clearfix">
                                <div className="col-md-12">
                                  <div className="pdfHeader">Naisthya </div>
                                  <div className="headText">1. Naishtya Statement</div>
                                  <div className="dynamicContent">{naishtyaStatement.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ').replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                              </div>
                              <div className="row clearfix">
                                <div className="col-md-12">
                                  <div className="headText">2. Time Period and No of Vilakshan Units</div>
                                  <div className="dynamicContent">{timePeriod.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                              </div>
                              <div className="row clearfix">
                                <div className="col-md-12">
                                  <div className="headText">3. Believer Group</div>
                                  <div className="dynamicContent">{believerGroup.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                              </div>
                              <div className="row clearfix">
                                <div className="col-md-12">
                                  <div className="headText">4. Impact Point</div>
                                  <div className="dynamicContent">{impactPoint.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                              </div>
                              <div className="row clearfix">
                                <div className="col-md-12">
                                  <div className="headText">5. Prayaan Statement</div>
                                  <div className="dynamicContent">{prayaanStatement.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                              </div>
                              <div className="row clearfix">
                                <div className="col-md-12">
                                  <div className="headText">6. Date of Launch of Prayaan</div>
                                  <div className="dynamicContent">{dateofLaunch.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                              </div>
                              <div className="row clearfix">
                                <div className="col-md-12">
                                  <div className="headText">7. List of activities which we will never do</div>
                                  <div className="dynamicContent">{listofactivities.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                      {/* </div> */}
                      {/* </>
                      ) : (null)} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (null)}
        </div>




        <div
          style={{
            position: "absolute",
            left: "-3000px",
            top: 0,
          }}
        >


          {pdfShowDes > 0 ? (

            <PDFExport
              paperSize="A4"
              margin="1cm"
              ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`}
              forcePageBreak=".page-break"
            >
              <Modal.Header closeButton style={{ padding: "10px" }}>
                <Modal.Title id="example-modal-sizes-title-lg">

                </Modal.Title>

                <div className="col-md-12 row" >
                  <div className="col-md-6">
                    <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                  </div>
                  <div className="col-md-6 pageHeading" >
                    Financial Model
                  </div>
                </div>

              </Modal.Header>

              <Modal.Body>
                <div >
                  <div id="divToPrint" className="mt4 pdfBody" >

                    <div className="row clearfix card">
                      <div className="col-md-12">
                        <div className="pdfHeader">Naisthya </div>
                        <div className="headText">1. Naishtya Statement</div>
                        <div className="dynamicContent">{naishtyaStatement.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ').replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                      </div>
                    </div>

                    <div className="row clearfix card">
                      <div className="col-md-12">
                        <div className="headText">2. Time Period and No of Vilakshan Units</div>
                        <div className="dynamicContent">{timePeriod.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                      </div>
                    </div>

                    <div className="row clearfix card">
                      <div className="col-md-12">
                        <div className="headText">3. Believer Group</div>
                        <div className="dynamicContent">{believerGroup.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                      </div>
                    </div>
                    <div className="row clearfix card">
                      <div className="col-md-12">
                        <div className="headText">4. Impact Point</div>
                        <div className="dynamicContent">{impactPoint.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                      </div>
                    </div>
                    <div className="row clearfix card">
                      <div className="col-md-12">
                        <div className="headText">5. Prayaan Statement</div>
                        <div className="dynamicContent">{prayaanStatement.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                      </div>
                    </div>
                    <div className="row clearfix card">
                      <div className="col-md-12">
                        <div className="headText">6. Date of Launch of Prayaan</div>
                        <div className="dynamicContent">{dateofLaunch.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                      </div>
                    </div>
                    <div className="row clearfix card">
                      <div className="col-md-12">
                        <div className="headText">7. List of activities which we will never do</div>
                        <div className="dynamicContent">{listofactivities.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </PDFExport>
          ) : (null)}

        </div>
      </section>
    </>
  )
}

