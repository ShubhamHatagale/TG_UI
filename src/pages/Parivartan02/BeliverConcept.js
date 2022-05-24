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
  var s_id = localStorage.getItem('tr_id')
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

  const [belEmail, setbelEmail] = useState("");
  const [transEmail, settransEmail] = useState("");
  const [bypassEmail, setbypassEmail] = useState("");
  const [beliverName, setbeliverName] = useState("");


  const [varifiedValue, setvarifiedValue] = useState("");
  const [Upid, setUpid] = useState("");
  const [varval, setvarval] = useState("");
  const [EnteredBeliverOTP, setEnteredBeliverOTP] = useState('');
  const [showWrongOtp, setshowWrongOtp] = useState(false);
  const [pdfShowDes, setpdfShowDes] = useState(0);

  // useEffect(() => {  var s_id = localStorage.getItem('tr_id')
  //   if (!id) {
  //     history.push("Not_support");
  //   }

  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    GetallRecords();
  }, []);

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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    console.log("In belGroup change handler ", list);
    list[index][name] = value;
    setInputList(list);
  };

  const handleInputChange2 = (e, index) => {
    const { name, value } = e.target;
    const list2 = [...inputList2];
    console.log("In belGroup change handler ", list2);
    list2[index][name] = value;
    setinputList2(list2);
  };

  const handleClose = () => {
    setShow(false);
    setviewModal(false);
  };

  const ViewModel = () => {
    setviewModal(true);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleRemoveClick2 = (index) => {
    const list2 = [...inputList2];
    list2.splice(index, 1);
    setinputList2(list2);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { beliverse_group: "" }]);
    console.log(inputList);
  };

  const handleAddClick2 = () => {
    setinputList2([...inputList2, { face_of_tribe: "" }]);
    console.log(inputList2);
  };

  const OnSubmitHandle = () => {
    if (belConceptDataa.length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        beliverse_group: inputList,
        face_of_tribe: inputList2,
        tribe: YourTribe,
        primary_customer_beliver: PrimaryCustomer,
        face_of_primary_customer_beliver: FaceBeliver,
        email_id: `${s_id}`,
        created_by: `${s_id}`
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/beliverConcepts/`,
        requestOptions
      )
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Values Submitted Succesfully");
            setSmShow(true);
            setTimeout(() => {
              setSmShow(false);
            }, 1000)
          }
          GetallRecords();
        })
        .catch((error) => console.log("error", error));
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        beliverse_group: inputList,
        face_of_tribe: inputList2,
        tribe: YourTribe,
        primary_customer_beliver: PrimaryCustomer,
        face_of_primary_customer_beliver: FaceBeliver,
        email_id: `${s_id}`,
        created_by: `${s_id}`
      });
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`https://parivartan.transganization.com/nodejs/masters/beliverConcepts/${Upid}`, requestOptions)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Values Submitted Succesfully");
            setSmShow(true);
            setTimeout(() => {
              setSmShow(false);
            }, 1000)
          }
          GetallRecords();
        })
        .catch((error) => console.log("error", error));
    }
  };

  const GetallRecords = () => {
    // console.log("hhistory",history)
    var localUid = localStorage.getItem("tr_id");
    var myGetHeaders = new Headers();
    myGetHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myGetHeaders,
      redirect: "follow",
    };
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/beliverConcepts/user/${s_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log("In Beliver Get all Reccords Function", resData.data);
        if (resData.data.length > 0) {
          setYourTribe(resData.data[0].tribe);
          setCustomerBeliver(resData.data[0].customer_believer);
          setPrimaryCustomer(resData.data[0].primary_customer_beliver);
          setFaceBeliver(resData.data[0].face_of_primary_customer_beliver)
          setbelConceptDataa(resData.data);
          setvarifiedValue(resData.data[0].verified);
          setUpid(resData.data[0].id);

          let MyValues = resData.data;
          console.log("In UseEffect Function", MyValues);
          MyValues.map((item, key) => {
            let beliverGroups = eval(item.beliverse_group);
            let faceOfTribe = eval(item.face_of_tribe);
            console.log("Data beliverGroups ", beliverGroups);
            console.log("Data faceOfTribe", faceOfTribe);
            setInputList(beliverGroups);
            setinputList2(faceOfTribe);
          });
          setShowPdf(true);
        }
        setbelConceptDataa(resData.data);
        setShowData(true);
      });

    fetch(
      `https://parivartan.transganization.com/nodejs/masters/parivartan_user/user/${s_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {
        if (resData.data.id > 0) {
          console.log("email", resData.data.beliver_email);
          setbelEmail(resData.data.beliver_email);
          settransEmail(resData.data.tranz_email);
          setbypassEmail(resData.data.bypass_email);
          setbeliverName(resData.data.beliver_name);

        }

      });

  };

  const handleChangeYourTribe = (newContent) => {
    setYourTribe(newContent);
  };

  const handleChangePrimaryCustomer = (newContent) => {
    setPrimaryCustomer(newContent);
  };
  const handleChangeFaceBeliver = (newContent) => {
    setFaceBeliver(newContent);
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
      fetch(`https://parivartan.transganization.com/nodejs/masters/beliverConcepts/verify/${Upid}`, requestOptions)
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
                    <button type="submit" class="btn savebtn  waves-effect" onClick={OnVerifyHandleConfirm}>Verify </button>
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
                  <button type="submit" class="btn waves-effect" onClick={ResendBeliverDataTrans}>RESEND OTP For Transaganiser </button>
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
        <Modal.Body >Form Saved Successful</Modal.Body>
      </Modal>

      <section class="content" style={{ backgroundColor: "white" }} >
        <div class="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Believer Concept</h2>
                <button
                  className="btn btn-primary btn-icon mobile_menu"
                  type="button"
                >
                  <i className="zmdi zmdi-sort-amount-desc"></i>
                </button>
              </div>
              {/* {/* <div className="col-lg-5 col-md-6 col-sm-12">
                <button
                  className="btn btn-primary btn-icon float-right right_icon_toggle_btn"
                  type="button"
                >
                  <i className="zmdi zmdi-arrow-right"></i>
                </button>
              </div> */}
            </div>
          </div>
          {showData ? (
            <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="card p-3">
                    <div className="header">
                    </div>
                    <div className="body p-5">
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <h2 className="card-inside-title">
                            <strong>List of Believers Group </strong>
                          </h2>
                        </div>
                      </div>
                      {inputList.map((x, i) => {
                        return (
                          <div className="row clearfix">
                            <div className="col-md-10">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="beliverse_group"
                                  value={x.beliverse_group}
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              {inputList.length !== 1 && (
                                <button
                                  type="button"
                                  className="btn btn-raised rembtn btn-square waves-effect m-l-40 "
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  <strong>REMOVE</strong>
                                </button>
                              )}
                              {inputList.length - 1 === i && (
                                <button
                                  type="button"
                                  className="btn btn-raised addbtn btn-square waves-effect m-l-40 "
                                  onClick={handleAddClick}
                                >
                                  <strong>ADD</strong>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <h2 className="card-inside-title">
                            <strong>Your Tribe</strong>
                          </h2>
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-1"></div>
                        <div className="col-md-12">
                          <Editor
                            contents={YourTribe}
                            getValue={handleChangeYourTribe}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: 30 }}></div>
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <h2 className="card-inside-title">
                            <strong>
                              Key Words To Define Face of Your Tribe{fname}
                            </strong>
                          </h2>
                        </div>
                      </div>
                      {inputList2.map((y, i) => {
                        return (
                          <div className="row clearfix">
                            <div className="col-md-10">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="face_of_tribe"
                                  value={y.face_of_tribe}
                                  onChange={(e) => handleInputChange2(e, i)}
                                />
                              </div>
                            </div>
                            <div className="col-md-2">
                              {inputList2.length !== 1 && (
                                <button
                                  type="button"
                                  className="btn btn-raised rembtn btn-square waves-effect m-l-40 "
                                  onClick={() => handleRemoveClick2(i)}
                                >
                                  <strong>REMOVE</strong>
                                </button>
                              )}
                              {inputList2.length - 1 === i && (
                                <button
                                  type="button"
                                  className="btn btn-raised addbtn btn-square waves-effect m-l-40 "
                                  onClick={handleAddClick2}
                                >
                                  <strong>ADD</strong>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div style={{ marginTop: 30 }}></div>
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <h2 className="card-inside-title">
                            <strong>Define Primary Customer Believer</strong>
                          </h2>
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-1"></div>
                        <div className="col-md-12">
                          <Editor
                            contents={PrimaryCustomer}
                            getValue={handleChangePrimaryCustomer}
                          />
                        </div>
                      </div>
                      <div style={{ marginTop: 30 }}></div>
                      <div className="row clearfix">
                        <div className="col-md-1"></div>
                        <div className="col-md-12">
                          <h2 className="card-inside-title">
                            <strong>
                              Define Face of Primary Customer Believer
                            </strong>
                          </h2>
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-1"></div>
                        <div className="col-md-12">
                          <Editor
                            contents={FaceBeliver}
                            getValue={handleChangeFaceBeliver}
                          />
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-1"></div>
                        <div style={{ marginTop: 30 }}></div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          class="btn savebtn waves-effect"
                          onClick={OnSubmitHandle}
                        >
                          SAVE <i class="ml-1 zmdi zmdi-save"></i>
                        </button>
                        {ShowPdf ? (
                          <>


                            <button
                              type="button"
                              class="btn viewbtn waves-effect"
                              onClick={ViewModel}
                            >
                              View  <i className="ml-1 zmdi zmdi-eye " />                          </button>

                            <button type="button" class="btn savebtn waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={HandleSubmit}>SUBMIT <i class="ml-1 zmdi zmdi-check"></i></button>

                            <button
                              type="button"
                              class="btn downloadbtn waves-effect"
                              onClick={exportPDFWithMethod}
                            >
                              Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
                            </button>
                          </>

                        ) : null}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (null)}

        </div>
      </section>

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
              Customer
            </div>
          </div>
          <Modal.Title id="example-modal-sizes-title-lg">

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div>
                    <div id="divToPrint" className="mt4 pdfBody">

                      <div className="row clearfix">
                        <div className="col-md-12">
                          <div
                            className="pdfHeader"
                          >
                            Believers Concept
                          </div>
                          <div
                            className="headText"

                          >
                            1.Your Tribe
                          </div>
                          <div
                            className="dynamicContent"
                          >
                            {YourTribe.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <div
                            className="headText"

                          >
                            2.Define Primary Customer Believer
                          </div>
                          <div
                            className="dynamicContent"

                          >
                            {PrimaryCustomer.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <div
                            className="headText"

                          >
                            3.Define Face of Primary Customer Believer
                          </div>
                          <div
                            className="dynamicContent"

                          >
                            {FaceBeliver.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix pl-2">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <Grid
                              style={{
                                maxHeight: "400px",
                              }}
                              data={inputList.slice(0, 200)}
                            >
                              <Column
                                field="beliverse_group"
                                title="List of Believers Group "
                                width="420px"
                              />
                            </Grid>
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix pl-2">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <Grid
                              style={{
                                maxHeight: "400px",
                              }}
                              data={inputList2.slice(0, 200)}
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
                    </div>
                  </div>
                  <div style={{ marginTop: 30 }}></div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>



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
            <Modal.Header style={{ padding: "10px" }}>
              <div className="col-md-12 row" >
                <div className="col-md-6">
                  <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                </div>
                <div className="col-md-6 pageHeading" >
                  Customer
                </div>
              </div>
              <Modal.Title id="example-modal-sizes-title-lg">

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container-fluid">
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                      <div>
                        <div id="divToPrint" className="mt4 pdfBody">

                          <div className="row clearfix">
                            <div className="col-md-12">
                              <div
                                className="pdfHeader"
                              >
                                Believers Concept
                              </div>
                              <div
                                className="headText"

                              >
                                1.Your Tribe
                              </div>
                              <div
                                className="dynamicContent"
                              >
                                {YourTribe.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                              </div>
                            </div>
                          </div>
                          <div className="row clearfix">
                            <div className="col-md-12">
                              <div
                                className="headText"

                              >
                                2.Define Primary Customer Believer
                              </div>
                              <div
                                className="dynamicContent"

                              >
                                {PrimaryCustomer.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                              </div>
                            </div>
                          </div>


                          <div className="row clearfix" className="page-break">
                            <div className="col-md-12">
                              <div
                                className="headText"

                              >
                                3.Define Face of Primary Customer Believer
                              </div>
                              <div
                                className="dynamicContent"

                              >
                                {FaceBeliver.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                              </div>
                            </div>
                          </div>
                          <div className="row clearfix pl-2">
                            <div className="col-md-12">
                              <div className="table-responsive">
                                <Grid
                                  style={{
                                    maxHeight: "400px",
                                  }}
                                  data={inputList.slice(0, 200)}
                                >
                                  <Column
                                    field="beliverse_group"
                                    title="List of Believers Group "
                                    width="420px"
                                  />
                                </Grid>
                              </div>
                            </div>
                          </div>
                          <div className="row clearfix pl-2">
                            <div className="col-md-12">
                              <div className="table-responsive">
                                <Grid
                                  style={{
                                    maxHeight: "400px",
                                  }}
                                  data={inputList2.slice(0, 200)}
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
                        </div>
                      </div>
                      <div style={{ marginTop: 30 }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </PDFExport>
        ) : (null)}

      </div>
    </>
  );
}
