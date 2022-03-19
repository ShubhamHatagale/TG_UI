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
  var s_id = localStorage.getItem('tr_id')

  const history = useHistory();
  let rows = [];
  const [parameter, setParameter] = useState("");
  const [non_finacial, setNon_finacial] = useState(0);
  const [objective, setObjective] = useState(0);
  const [measurable, setMeasurable] = useState(0);
  const [volume_growth, setVolume_growth] = useState(0);
  const [value_growth, setValue_growth] = useState(0);
  const [near_far, setNear_far] = useState(0);
  const [operational_excellence, setOperational_excellence] = useState("");
  const [customer_intimacy, setCustomer_intimacy] = useState("");

  const [editId, seteditId] = useState("");
  const [delId, setdelId] = useState("");

  const [parameterEdit, setParameterEdit] = useState("");
  const [non_finacialEdit, setNon_finacialEdit] = useState(0);
  const [objectiveEdit, setObjectiveEdit] = useState(0);
  const [measurableEdit, setMeasurableEdit] = useState(0);
  const [volume_growthEdit, setVolume_growthEdit] = useState(0);
  const [value_growthEdit, setValue_growthEdit] = useState(0);
  const [near_farEdit, setNear_farEdit] = useState(0);
  const [operational_excellenceEdit, setOperational_excellenceEdit] =
    useState("");
  const [customer_intimacyEdit, setCustomer_intimacyEdit] = useState("");
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
  const [belEmail, setbelEmail] = useState("");
  const [transEmail, settransEmail] = useState("");
  const [bypassEmail, setbypassEmail] = useState("");
  const [beliverName, setbeliverName] = useState("");

  const [varifiedValue, setvarifiedValue] = useState("");
  const [Upid, setUpid] = useState("");
  const [varval, setvarval] = useState("");
  const [EnteredBeliverOTP, setEnteredBeliverOTP] = useState('');
  const [showWrongOtp, setshowWrongOtp] = useState(false);

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
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/vilakshan/checked/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData);
        if (resData.status == 200) {
          console.log("updated");
          // setMupdate(true);
          // setTimeout(() => {
          //   setMupdate(false);
          // }, 1000)
          // GetallRecords();
        }
      })
      .catch((error) => console.log("error", error));
    setShow(false);
    seteditModal(false);
    GetallRecords();



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
    fetch(`http://localhost:9002/masters/vilakshan/${delId}`, requestOptionsget)
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
        GetallRecords();
      })
      .catch((error) => console.log("error", error));
  };
  // const handleShow = () => setShow(true);

  const OnSubmitUpdate = (edId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      parameter: parameterEdit,
      non_finacial: non_finacialEdit,
      objective: objectiveEdit,
      measurable: measurableEdit,
      volume_growth: volume_growthEdit,
      value_growth: value_growthEdit,
      near_far: near_farEdit,
      operational_excellence: operational_excellenceEdit,
      customer_intimacy: customer_intimacyEdit,

      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/vilakshan/${edId}`, requestOptions)
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
          GetallRecords();
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
      `http://localhost:9002/masters/vilakshan/${edit_id}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        seteditId(resData.data[0].id);
        setParameterEdit(resData.data[0].parameter);
        setNon_finacialEdit(resData.data[0].non_finacial);
        setObjectiveEdit(resData.data[0].objective);
        setMeasurableEdit(resData.data[0].measurable);
        setVolume_growthEdit(resData.data[0].volume_growth);
        setValue_growthEdit(resData.data[0].value_growth);
        setNear_farEdit(resData.data[0].near_far);
        setOperational_excellenceEdit(resData.data[0].operational_excellence);
        setCustomer_intimacyEdit(resData.data[0].customer_intimacy);
      })
      .catch((error) => console.log("error", error));
  };
  const deletefn = (edit_id) => {
    setdelId(edit_id);
    setShow(true);
  };

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

  const GetallRecords = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `http://localhost:9002/masters/parivartan_user/user/${s_id}`,
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



    fetch(`http://localhost:9002/masters/vilakshan/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setVilakshanData(resData.data);
        setvarifiedValue(resData.data[0].verified);
        setUpid(resData.data[0].id);

      })

      .catch((error) => console.log("error", error));


  };
  const initialValues = {
    parameter: "",
    non_finacial: 0,
    objective: 0,
    measurable: 0,
    volume_growth: 0,
    value_growth: 0,
    near_far: 0,
    operational_excellence: "",
    customer_intimacy: "",
  };
  const validate = Yup.object({
    parameter: Yup.string().required("Required"),
    operational_excellence: Yup.string().required("Required"),
    customer_intimacy: Yup.string().required("Required"),
  });
  const OnSubmitForm = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var rawrich = JSON.stringify({
      parameter: parameter,
      non_finacial: non_finacial,
      objective: objective,
      measurable: measurable,
      volume_growth: volume_growth,
      value_growth: value_growth,
      near_far: near_far,
      operational_excellence: operational_excellence,
      customer_intimacy: customer_intimacy,
      checksVal: checksVal,
      email_id: s_id,
      created_by: s_id
    });
    var requestOptionsrichtext = {
      method: "POST",
      headers: myHeaders,
      body: rawrich,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/vilakshan`, requestOptionsrichtext)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        if (resData.status == 200) {
          console.log("Data Added succesfully");
          // return <Noti />
          setSmShow(true);
          // setSmShow(false);
          setTimeout(() => {
            setSmShow(false);
          }, 1000)
        }
        GetallRecords();
        seteditModal(false);
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
      fetch(`http://localhost:9002/masters/vilakshan/verify/${Upid}`, requestOptions)
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
    GetallRecords()
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
        <Modal.Body >Form Saved Successful</Modal.Body>
      </Modal>


      <Modal
        size="sm"
        show={Mupdate}
        onHide={() => setMupdate(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Updated Successfully</Modal.Body>
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
            Edit Vilakshan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div className="body">
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>List of Paramenters</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="List of Paramenters"
                            name="parameter"
                            onChange={(event) => {
                              setParameterEdit(event.target.value);
                            }}
                            value={parameterEdit}
                          />
                          {/* {formik.errors.parameter ? <div className='error'>{formik.errors.parameter}</div> : null} */}
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Non Financial</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                            class="form-control show-tick"
                            as="select"
                            name="non_finacial"
                            onChange={(event) => {
                              setNon_finacialEdit(event.target.value);
                            }}
                            value={non_finacialEdit}
                          >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Objective</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                            class="form-control show-tick"
                            as="select"
                            name="objective"
                            onChange={(event) => {
                              setObjectiveEdit(event.target.value);
                            }}
                            value={objectiveEdit}
                          >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Measurable</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                            class="form-control show-tick"
                            as="select"
                            name="measurable"
                            onChange={(event) => {
                              setMeasurableEdit(event.target.value);
                            }}
                            value={measurableEdit}
                          >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Volume Growth</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                            class="form-control show-tick"
                            as="select"
                            name="volume_growth"
                            onChange={(event) => {
                              setVolume_growthEdit(event.target.value);
                            }}
                            value={volume_growthEdit}
                          >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Value Growth</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                            class="form-control show-tick"
                            as="select"
                            name="value_growth"
                            onChange={(event) => {
                              setValue_growthEdit(event.target.value);
                            }}
                            value={value_growthEdit}
                          >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Near/Far to PCB</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                            class="form-control show-tick"
                            as="select"
                            name="near_far"
                            onChange={(event) => {
                              setNear_farEdit(event.target.value);
                            }}
                            value={near_farEdit}
                          >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>OPERATIONAL EXCELLENCE</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="OPERATIONAL EXCELLENCE"
                            name="operational_excellence"
                            onChange={(event) => {
                              setOperational_excellenceEdit(event.target.value);
                            }}
                            value={operational_excellenceEdit}
                          />
                          {/* {formik.errors.operational_excellence ? <div className='error'>{formik.errors.operational_excellence}</div> : null} */}
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>CUSTOMER INTIMACY</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="CUSTOMER INTIMACY"
                            name="customer_intimacy"
                            onChange={(event) => {
                              setCustomer_intimacyEdit(event.target.value);
                            }}
                            value={customer_intimacyEdit}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="btn savebtn  waves-effect"
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

      <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card p-4 mt-2">
              <div className="body p-5">
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>List of Paramenters</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="List of Paramenters"
                        name="parameter"
                        onChange={(event) => {
                          setParameter(event.target.value);
                        }}
                        value={parameter}
                      />
                      {/* {formik.errors.parameter ? <div className='error'>{formik.errors.parameter}</div> : null} */}
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Non Financial</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <select
                        class="form-control show-tick"
                        as="select"
                        name="non_finacial"
                        onChange={(event) => {
                          setNon_finacial(event.target.value);
                        }}
                        value={non_finacial}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Objective</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <select
                        class="form-control show-tick"
                        as="select"
                        name="objective"
                        onChange={(event) => {
                          setObjective(event.target.value);
                        }}
                        value={objective}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Measurable</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <select
                        class="form-control show-tick"
                        as="select"
                        name="measurable"
                        onChange={(event) => {
                          setMeasurable(event.target.value);
                        }}
                        value={measurable}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Volume Growth</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <select
                        class="form-control show-tick"
                        as="select"
                        name="volume_growth"
                        onChange={(event) => {
                          setVolume_growth(event.target.value);
                        }}
                        value={volume_growth}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Value Growth</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <select
                        class="form-control show-tick"
                        as="select"
                        name="value_growth"
                        onChange={(event) => {
                          setValue_growth(event.target.value);
                        }}
                        value={value_growth}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Near/Far to PCB</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <select
                        class="form-control show-tick"
                        as="select"
                        name="near_far"
                        onChange={(event) => {
                          setNear_far(event.target.value);
                        }}
                        value={near_far}
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>OPERATIONAL EXCELLENCE</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="OPERATIONAL EXCELLENCE"
                        name="operational_excellence"
                        onChange={(event) => {
                          setOperational_excellence(event.target.value);
                        }}
                        value={operational_excellence}
                      />
                      {/* {formik.errors.operational_excellence ? <div className='error'>{formik.errors.operational_excellence}</div> : null} */}
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>CUSTOMER INTIMACY</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CUSTOMER INTIMACY"
                        name="customer_intimacy"
                        onChange={(event) => {
                          setCustomer_intimacy(event.target.value);
                        }}
                        value={customer_intimacy}
                      />
                      {/* {formik.errors.customer_intimacy ? <div className='error'>{formik.errors.customer_intimacy}</div> : null} */}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn savebtn  waves-effect"
                  onClick={OnSubmitForm}
                >
                  SAVE <i className="ml-1 zmdi zmdi-save " />
                </button>

                {vilakshanData.length > 0 ? (<button type="button" class="btn viewbtn waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={HandleSubmit}>SUBMIT <i className="ml-1 zmdi zmdi-check " /> </button>
                ) : null}

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
                      View  <i className="ml-1 zmdi zmdi-eye " />                    </button>
                 
                  </div> */}



                {vilakshanData.length > 0 ? (
                  <div>


                    <div
                      style={{
                        position: "absolute",
                        left: "-3000px",
                        top: 0,
                      }}
                    >
                      <PDFExport
                        paperSize="A2"
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
                          {vilakshanData.length > 0 ? (

                            <div>
                              <div id="divToPrint" className="mt4">

                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <div
                                      className="pdfHeader"
                                    >
                                      Vilakshan
                                    </div>
                                    <div class="table-responsive" id="Table">
                                      <table class="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>List of Parameter</th>
                                            <th>Non Financial</th>
                                            <th>Objective</th>
                                            <th>Measurable</th>
                                            <th>Volume Growth</th>
                                            <th>Value Growth</th>
                                            <th>Near/Far to PCB</th>
                                            <th>OPERATIONAL EXCELLENCE</th>
                                            <th>CUSTOMER INTIMACY</th>
                                            <th>Vilakshan</th>

                                          </tr>
                                        </thead>
                                        <tbody>
                                          {vilakshanData.map((itm, key) => (
                                            <tr>
                                              <td>{itm.parameter}</td>
                                              <td>{itm.non_finacial}</td>
                                              <td>{itm.objective}</td>
                                              <td>{itm.measurable}</td>
                                              <td>{itm.volume_growth}</td>
                                              <td>{itm.value_growth}</td>
                                              <td>{itm.near_far}</td>
                                              <td>{itm.operational_excellence}</td>
                                              <td>{itm.customer_intimacy}</td>
                                              <td>{(itm.checkVal == "true") ? <div>Yes</div> : <div>No</div>}</td>

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
                      </PDFExport>
                    </div>
                  </div>
                ) : null}

                {/* <div>{JSON.stringify(vilakshanData)}</div> */}
                {vilakshanData.length > 0 ? (
                  <div style={{ marginTop: 30 }} class="table-responsive" id="Table">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>List of Parameter</th>
                          <th>Non Financial</th>
                          <th>Objective</th>
                          <th>Measurable</th>
                          <th>Volume Growth</th>
                          <th>Value Growth</th>
                          <th>Near/Far to PCB</th>
                          <th>OPERATIONAL EXCELLENCE</th>
                          <th>CUSTOMER INTIMACY</th>
                          <th>Vilakshan</th>

                          <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vilakshanData.map((item, key) => (
                          <tr>
                            <td>{item.parameter}</td>
                            <td>{item.non_finacial}</td>
                            <td>{item.objective}</td>
                            <td>{item.measurable}</td>
                            <td>{item.volume_growth}</td>
                            <td>{item.value_growth}</td>
                            <td>{item.near_far}</td>
                            <td>{item.operational_excellence}</td>
                            <td>{item.customer_intimacy}</td>


                            <td>
                              <div class="btn-group m-1">
                                {/* <span></span> */}
                                <input type="checkbox" className="m-2" checked={(item.checkVal == "true" ? item.checkVal : item.checkVal = '')} onChange={() => yesFn(item.checkVal, item.id)} />
                              </div>
                              {/* <div class="btn-group m-1">
                                <span>No {item.checkVal}</span>
                                <input type="checkbox" checked={(item.checkVal=="true" ? item.checkVal : item.checkVal='')} onChange={() => noFn()} />
                              </div> */}

                            </td>
                            {/* <i className="zmdi zmdi-assignment"></i> */}
                            <td colspan="8">
                              <div class="btn-group">
                                <button
                                  type="submit"
                                  title="edit"
                                  class="btn zmdi zmdi-edit waves-effect pull-left"
                                  style={{ float: "left" }}
                                  onClick={() => editfn(item.id)}
                                ></button>{" "}
                                <button
                                  type="submit"
                                  title="delete"
                                  class="btn btn-danger zmdi zmdi-delete waves-effect"
                                  onClick={() => deletefn(item.id)}
                                ></button>{" "}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>


              {vilakshanData.length > 0 ? (
                <>
                  <button
                    type="button"
                    class="btn viewbtn waves-effect ml-5"
                    onClick={ViewModel}
                  >
                    View  <i className="ml-1 zmdi zmdi-eye " />              </button>
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

      {/* View Modal-----------------------> */}
      < Modal
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
          {vilakshanData.length > 0 ? (

            <div>
              <div id="divToPrint" className="mt4">

                <div className="row clearfix">
                  <div className="col-md-12">
                    <div
                      className="pdfHeader"
                    >
                      Vilakshan
                    </div>
                    <div class="table-responsive" id="Table">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>List of Parameter</th>
                            <th>Non Financial</th>
                            <th>Objective</th>
                            <th>Measurable</th>
                            <th>Volume Growth</th>
                            <th>Value Growth</th>
                            <th>Near/Far to PCB</th>
                            <th>OPERATIONAL EXCELLENCE</th>
                            <th>CUSTOMER INTIMACY</th>
                            <th>Vilakshan</th>

                          </tr>
                        </thead>
                        <tbody>
                          {vilakshanData.map((itm, key) => (
                            <tr>
                              <td>{itm.parameter}</td>
                              <td>{itm.non_finacial}</td>
                              <td>{itm.objective}</td>
                              <td>{itm.measurable}</td>
                              <td>{itm.volume_growth}</td>
                              <td>{itm.value_growth}</td>
                              <td>{itm.near_far}</td>
                              <td>{itm.operational_excellence}</td>
                              <td>{itm.customer_intimacy}</td>
                              <td>{(itm.checkVal == "true") ? <div>Yes</div> : <div>No</div>}</td>

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
