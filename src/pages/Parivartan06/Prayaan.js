import React, { useState, useEffect } from "react";
import Editor from "../../components/SunEditor";
import "suneditor/dist/css/suneditor.min.css"; //Import Sun Editor's CSS File
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import Table from "../Parivartan06/NaisthyaTable";
import ReactExport from "react-data-export";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import ModalSubmit from "../../components/ModalSubmit";
import { useHistory } from "react-router-dom";

export default function NaisthyaPrayaan() {
  var s_id = localStorage.getItem('tr_id')

  const history = useHistory();
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const pdfExportComponent = React.useRef(null);
  const [showData, setShowData] = useState(false);
  const [Prayaan_Category, setPrayaan_Category] = useState("");
  const [Prayaan_Steps, setPrayaan_Steps] = useState("");
  const [Executor, setExecutor] = useState("");
  const [Owner, setOwner] = useState("");
  const [Start_Date, setStart_Date] = useState("");
  const [Date_of_Completion, setDate_of_Completion] = useState("");


  // For Edit
  const [Prayaan_CategoryEdit, setPrayaan_CategoryEdit] = useState("");
  const [Prayaan_StepsEdit, setPrayaan_StepsEdit] = useState("");
  const [ExecutorEdit, setExecutorEdit] = useState("");
  const [OwnerEdit, setOwnerEdit] = useState("");
  const [Start_DateEdit, setStart_DateEdit] = useState("");
  const [Date_of_CompletionEdit, setDate_of_CompletionEdit] = useState("");


  const [Madd, setMadd] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [Mdelete, setMdelete] = useState(false);




  let [prayaanData, setPrayaanData] = useState("");

  const [loading, setloading] = useState(false);
  const [editId, seteditId] = useState("");
  const [delId, setdelId] = useState("");
  let [completeData, setcompleteData] = useState("");
  // let [formData, setformData] = useState("");
  let [vilakshanData, setVilakshanData] = useState("");
  const [show, setShow] = useState(false);
  const [editModal, seteditModal] = useState(false);
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

  useEffect(() => {
    var s_id = localStorage.getItem('tr_id')
    if (!s_id) {
      history.push("Not_support");
    }

    GetallRecords();
  }, []);

  const exportPDFWithMethod = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };


  const ViewModel = () => {
    setviewModal(true);
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
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/prayaan/${delId}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        setMdelete(true);
        setTimeout(() => {
          setMdelete(false);
        }, 1000)
        GetallRecords();
        seteditId(resData.data[0].id);
        console.log("deleted");
        setShow(false);

      })
      .catch((error) => console.log("error", error));
    setShow(false);
  };
  // const handleShow = () => setShow(true);

  const OnSubmitUpdate = (edId) => {
    // alert(edId)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      prayaan_category: Prayaan_CategoryEdit,
      prayaan_steps: Prayaan_StepsEdit,
      executer: ExecutorEdit,
      owner: OwnerEdit,
      start_date: Start_DateEdit,
      completion_date: Date_of_CompletionEdit,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/prayaan/${edId}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData);
        if (resData.status == 200) {
          console.log("updated");
          setMupdate(true);
          // setMupdate(false);
          setTimeout(() => {
            setMupdate(false);
          }, 1000)
          GetallRecords();
        }
      })
      .catch((error) => console.log("error", error));
    setShow(false);
    seteditModal(false);
    GetallRecords();
  };


  const editfn = (edit_id) => {
    // alert(edit_id);
    seteditModal(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/prayaan/${edit_id}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData.data[0].id);
        seteditId(resData.data[0].id);
        setPrayaan_CategoryEdit(resData.data[0].prayaan_category);
        setPrayaan_StepsEdit(resData.data[0].prayaan_steps);
        setExecutorEdit(resData.data[0].executer);
        setOwnerEdit(resData.data[0].owner);
        setStart_DateEdit(resData.data[0].start_date);
        setDate_of_CompletionEdit(resData.data[0].completion_date);

      })
      .catch((error) => console.log("error", error));
  };
  const deletefn = (edit_id) => {
    // alert(edit_id)
    setdelId(edit_id);
    setShow(true);
  };

  const OnSubmitForm = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      prayaan_category: Prayaan_Category,
      prayaan_steps: Prayaan_Steps,
      executer: Executor,
      owner: Owner,
      start_date: Start_Date,
      completion_date: Date_of_Completion,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/prayaan`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData);
        GetallRecords();
        if (resData.status == 200) {
          console.log("All Data Added succesfully");
          setMadd(true);
          // setMadd(false);
          setTimeout(() => {
            setMadd(false);
          }, 1000)

          setPrayaan_Category("");
          setPrayaan_Steps("");
          setExecutor("");
          setOwner("");
          setStart_Date("");
          setDate_of_Completion("");

        }
      })
      .catch((error) => console.log("error", error));
  };
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

    fetch(`https://parivartan.transganization.com/nodejs/masters/prayaan/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData.data);
        setPrayaanData(resData.data);
        setvarifiedValue(resData.data[0].verified);
        setUpid(resData.data[0].id);

        setShowData(true);
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
      fetch(`https://parivartan.transganization.com/nodejs/masters/prayaan/verify/${Upid}`, requestOptions)
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
        show={Madd}
        onHide={() => setMadd(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Saved Successful</Modal.Body>
      </Modal>

      <Modal
        size="sm"
        show={Mupdate}
        onHide={() => setMupdate(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Update Successful</Modal.Body>
      </Modal>

      <Modal
        size="sm"
        show={Mdelete}
        onHide={() => setMdelete(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Row Deleted Successfully</Modal.Body>
      </Modal>

      <section class="content" style={{ backgroundColor: "white" }}>
        <div class="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Prayaan </h2>
                <button
                  className="btn btn-primary btn-icon mobile_menu"
                  type="button"
                >
                  <i className="zmdi zmdi-sort-amount-desc"></i>
                </button>
              </div>
              {/* <div className="col-lg-5 col-md-6 col-sm-12">
                <button
                  className="btn btn-primary btn-icon float-right right_icon_toggle_btn"
                  type="button"
                >
                  <i className="zmdi zmdi-arrow-right"></i>
                </button>
              </div> */}
            </div>
          </div>
          {/* {showData ? ( */}
          <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card p-4 mt-2">
                  <div className="body p-5">
                    <div className="row clearfix">
                      <div className="col">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Prayaan Category"
                            name="Prayaan_Category"
                            value={Prayaan_Category}
                            onChange={(event) => {
                              setPrayaan_Category(event.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Prayaan Steps"
                            name="Prayaan_Steps"
                            value={Prayaan_Steps}
                            onChange={(event) => {
                              setPrayaan_Steps(event.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Executor"
                            name="Executor"
                            value={Executor}
                            onChange={(event) => {
                              setExecutor(event.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Owner"
                            name="Owner"
                            value={Owner}
                            onChange={(event) => {
                              setOwner(event.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="Date"
                            className="form-control"
                            placeholder="Start Date"
                            name="Start_Date"
                            value={Start_Date}
                            onChange={(event) => {
                              setStart_Date(event.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="Date"
                            className="form-control"
                            placeholder="Date of Completions"
                            name="Date_of_Completion"
                            value={Date_of_Completion}
                            onChange={(event) => {
                              setDate_of_Completion(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 20 }}></div>
                    <button
                      type="submit"
                      class="btn savebtn  waves-effect"
                      onClick={OnSubmitForm}
                    >
                      SAVE <i className="ml-1 zmdi zmdi-save"></i>
                    </button>
                    {prayaanData.length > 0 ? (<button type="button" class="btn viewbtn  waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={HandleSubmit}>SUBMIT<i className="ml-1 zmdi zmdi-check"></i></button>
                    ) : null}
                    {prayaanData.length > 0 ? (
                      <div>

                        <div
                          style={{
                            position: "absolute",
                            left: "-3000px",
                            top: 0,
                          }}
                        >
                          <PDFExport
                            paperSize="A3"
                            margin="1cm"
                            ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`}
                            forcePageBreak=".page-break"
                          >
                            <Modal.Header style={{ padding: "10px" }}>
                              <div className="col-md-12 row" >
                                <div className="col-md-6">
                                  <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                                </div>
                                <div className="col-md-6 pageHeading" >
                                  Financial Model
                                </div>
                              </div>
                              <Modal.Title id="example-modal-sizes-title-lg">

                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {/* playground business model */}
                              <div >
                                <div id="divToPrint" className="mt4 pdfBody" >
                                  <div className="row clearfix">
                                    <div className="col-md-12">
                                      <div className="pdfHeader">Building Block</div>
                                      <div class="table-responsive" id="Table">
                                        <table class="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th>Prayaan Category</th>
                                              <th>Prayaan Steps</th>
                                              <th>Executer</th>
                                              <th>Owner</th>
                                              <th>Start Date</th>
                                              <th>Date of Completion</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {prayaanData.map((item, key) => (
                                              <tr>
                                                <td>{item.prayaan_category}</td>
                                                <td>{item.prayaan_steps}</td>
                                                <td>{item.executer}</td>
                                                <td>{item.owner}</td>
                                                <td>{item.start_date}</td>
                                                <td>{item.completion_date}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Modal.Body>
                          </PDFExport>



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
                                  Financial Model
                                </div>
                              </div>
                              <Modal.Title id="example-modal-sizes-title-lg">

                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {/* playground business model */}
                              <div >
                                <div id="divToPrint" className="mt4 pdfBody" >
                                  <div className="row clearfix">
                                    <div className="col-md-12">
                                      <div className="pdfHeader">Building Block</div>
                                      <div class="table-responsive" id="Table">
                                        <table class="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th>Prayaan Category</th>
                                              <th>Prayaan Steps</th>
                                              <th>Executer</th>
                                              <th>Owner</th>
                                              <th>Start Date</th>
                                              <th>Date of Completion</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {prayaanData.map((item, key) => (
                                              <tr>
                                                <td>{item.prayaan_category}</td>
                                                <td>{item.prayaan_steps}</td>
                                                <td>{item.executer}</td>
                                                <td>{item.owner}</td>
                                                <td>{item.start_date}</td>
                                                <td>{item.completion_date}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>


                        </div>
                      </div>
                    ) : null}
                    <div style={{ marginTop: 20 }}></div>
                    {prayaanData.length > 0 ? (
                      <div class="table-responsive" id="Table">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>Prayaan Category</th>
                              <th>Prayaan Steps</th>
                              <th>Executer</th>
                              <th>Owner</th>
                              <th>Start Date</th>
                              <th>Date of Completion</th>
                              <th style={{ textAlign: "center" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prayaanData.map((item, key) => (
                              <tr>
                                <td>{item.prayaan_category}</td>
                                <td>{item.prayaan_steps}</td>
                                <td>{item.executer}</td>
                                <td>{item.owner}</td>
                                <td>{item.start_date}</td>
                                <td>{item.completion_date}</td>
                                <td colspan="8">
                                  <div class="btn-group">
                                    <button
                                      type="submit"
                                      title="edit"
                                      class="btn  zmdi zmdi-edit waves-effect pull-left"
                                      style={{ float: "left" }}
                                      onClick={() => editfn(item.id)}
                                    ></button>
                                    <button
                                      type="submit"
                                      title="delete"
                                      class="btn btn-danger zmdi zmdi-delete waves-effect"
                                      onClick={() => deletefn(item.id)}
                                    ></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <button
                          type="button"
                          class="btn viewbtn  waves-effect"
                          onClick={ViewModel}
                        >
                          View  <i className="ml-1 zmdi zmdi-eye " />                        </button>
                        <button
                          type="button"
                          class="btn downloadbtn waves-effect"
                          onClick={exportPDFWithMethod}
                        > Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i></button>

                      </div>

                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ) : null} */}
        </div>
      </section>



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
            Edit Prayaan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div className="body">
                    <div className="row clearfix">
                      <div className="col">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Prayaan Category"
                            name="Prayaan_Category"
                            value={Prayaan_CategoryEdit}
                            onChange={(event) => {
                              setPrayaan_CategoryEdit(event.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Prayaan Steps"
                            name="Prayaan_Steps"
                            value={Prayaan_StepsEdit}
                            onChange={(event) => {
                              setPrayaan_StepsEdit(event.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Executor"
                            name="Executor"
                            value={ExecutorEdit}
                            onChange={(event) => {
                              setExecutorEdit(event.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Owner"
                            name="Owner"
                            value={OwnerEdit}
                            onChange={(event) => {
                              setOwnerEdit(event.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="Date"
                            className="form-control"
                            placeholder="Start Date"
                            name="Start_Date"
                            value={Start_DateEdit}
                            onChange={(event) => {
                              setStart_DateEdit(event.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="Date"
                            className="form-control"
                            placeholder="Date of Completions"
                            name="Date_of_Completion"
                            value={Date_of_CompletionEdit}
                            onChange={(event) => {
                              setDate_of_CompletionEdit(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 20 }}></div>
                    <button
                      type="submit"
                      class="btn savebtn waves-effect"
                      onClick={() => OnSubmitUpdate(editId)}
                    >
                      Update{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
