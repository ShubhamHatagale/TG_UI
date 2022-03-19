import React, { useState, useEffect } from 'react';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Editor from "../../components/SunEditor"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import ModalSubmit from '../../components/ModalSubmit';
import { useHistory } from "react-router-dom";

export default function Dashboard(props) {
  var s_id = localStorage.getItem('tr_id')

  const history = useHistory();
  const pdfExportComponent = React.useRef(null);
  const [perspective, setPerspective] = useState('Values');
  const [perspectiveEdit, setPerspectiveEdit] = useState('');
  const [reportNameEdit, setReportNameEdit] = useState("");
  const [descreption_of_the_reportEdit, setdescreption_of_the_reportEdit] = useState("");

  const [description_of_the_report, setdescription_of_the_report] = useState("");

  const [areaEdit, setAreaEdit] = useState("");
  const [dailyEdit, setDailyEdit] = useState(0);
  const [weeklyEdit, setWeeklyEdit] = useState(0);
  const [monthlyEdit, setMonthlyEdit] = useState(0);
  const [quaterlyEdit, setQuaterlyEdit] = useState(0);
  const [halfYearlyEdit, setHalfYearlyEdit] = useState(0);
  const [yearlyEdit, setYearlyEdit] = useState(0);

  const [reportName, setReportName] = useState("");
  const [area, setArea] = useState("");
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [quaterly, setQuaterly] = useState(0);
  const [halfYearly, setHalfYearly] = useState(0);
  const [yearly, setYearly] = useState(0);

  let [dashboardData, setDashboardData] = useState('')
  const [editId, seteditId] = useState("");
  const [delId, setdelId] = useState("");
  const [show, setShow] = useState(false);
  const [editModal, seteditModal] = useState(false);

  const [Madd, setMadd] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [Mdelete, setMdelete] = useState(false);
  const [viewModal, setviewModal] = useState(false);

  const [BeliverOTP, setBeliverOTP] = useState('');
  const [transOTP, setTransOTP] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [secondsfortrans, setsecondsfortrans] = useState(0);
  const [ShowResetOTP, setShowResetOTP] = useState(true);
  const [ShowResetOTPTrans, setShowResetOTPTrans] = useState(true);
  const [showConfirmBox, setshowConfirmBox] = useState(false);
  const [ShowPdf, setShowPdf] = useState(false);

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




  const OnSubmitUpdate = (edId) => {
    // alert(edId)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      description_of_the_report: descreption_of_the_reportEdit,
      report_name: reportNameEdit,
      area: areaEdit,
      daily: dailyEdit,
      weekly: weeklyEdit,
      monthly: monthlyEdit,
      quaterly: quaterlyEdit,
      half_yearly: halfYearlyEdit,
      yearly: yearlyEdit,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/dashboard/${edId}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData);
        if (resData.status == 200) {
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

  const deleteConfirm = () => {
    // alert(delId);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "delete",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/dashboard/${delId}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        // seteditId(resData.data[0].id);
        // console.log("deleted");
        setShow(false);
        setMdelete(true);
        // setMdelete(false);
        setTimeout(() => {
          setMdelete(false);
        }, 1000)
        GetallRecords();
      })
      .catch((error) => console.log("error", error));
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
      `http://localhost:9002/masters/dashboard/${edit_id}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        seteditId(resData.data[0].id);
        // console.log(resData.data);
        setdescreption_of_the_reportEdit(resData.data[0].description_of_the_report);
        setReportNameEdit(resData.data[0].report_name);
        setAreaEdit(resData.data[0].area);
        setDailyEdit(resData.data[0].daily);
        setWeeklyEdit(resData.data[0].weekly);
        setMonthlyEdit(resData.data[0].monthly);
        setQuaterlyEdit(resData.data[0].quaterly);
        setHalfYearlyEdit(resData.data[0].half_yearly);
        setYearlyEdit(resData.data[0].yearly);
      })
      .catch((error) => console.log("error", error));
  };
  const deletefn = (edit_id) => {
    // alert(edit_id);
    setdelId(edit_id)
    setShow(true);
  };

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
    setviewModal(true);
  };


  const handleClose = () => {
    setShow(false);
    seteditModal(false);
    setviewModal(false);

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
    fetch(`http://localhost:9002/masters/dashboard/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData.data);
        setDashboardData(resData.data);
        setvarifiedValue(resData.data[0].verified);
        setUpid(resData.data[0].id);
        // alert(resData.data[0].verified);

      })
      .catch((error) => console.log("error", error))
  }
  const OnSubmitForm = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var rawrich = JSON.stringify({
      perspective: perspective,
      description_of_the_report: description_of_the_report,
      report_name: reportName,
      area: area,
      daily: daily,
      weekly: weekly,
      monthly: monthly,
      quaterly: quaterly,
      half_yearly: halfYearly,
      yearly: yearly,
      email_id: s_id,
      created_by: s_id
    })
    var requestOptionsrichtext = {
      method: "POST",
      headers: myHeaders,
      body: rawrich,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/dashboard`, requestOptionsrichtext)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData);
        if (resData.status == 200) {
          // console.log("Data Added succesfully")
          setMadd(true);
          // setMadd(false);
          setTimeout(() => {
            setMadd(false);
          }, 1000)

          GetallRecords();

        }
        GetallRecords();
      })
      .catch((error) => console.log("error", error))

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
      fetch(`http://localhost:9002/masters/dashboard/verify/${Upid}`, requestOptions)
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
                    <button type="submit" class="btn addbtn  waves-effect" onClick={OnVerifyHandleConfirm}>Verify </button>
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
                  <button type="submit" class="btn addbtn  waves-effect" onClick={ResendBeliverDataTrans}>RESEND OTP For Transaganiser </button>
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

      <Modal
        size="sm"
        show={Madd}
        onHide={() => setMadd(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Saved Successful</Modal.Body>
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
            Edit Dashboard
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="container-fluid" >
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div className="body">
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title"><strong>Perspective</strong></h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                            class="form-control show-tick"
                            as="select"
                            name="perspective"
                            onChange={(event) => {
                              setPerspectiveEdit(event.target.value);
                            }}
                            value={perspectiveEdit}
                          >
                            <option value="Quantitative">Quantitative</option>
                            <option value="Process">Process</option>
                            <option value="Learning and Development">Learning and Development</option>
                            <option value="Customer Feedback">Customer Feedback</option>
                            <option value="Values">Values</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title"><strong>Description of the Report</strong></h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Description of the Report" name="descreption_of_the_reportEdit" onChange={(event) => { setdescreption_of_the_reportEdit(event.target.value) }} value={descreption_of_the_reportEdit} />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title"><strong>Report Name</strong></h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Report Name" name="report_name" onChange={(event) => { setReportNameEdit(event.target.value) }} value={reportNameEdit} />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title"><strong>Area/Department</strong></h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Area/Department" name="area" onChange={(event) => { setAreaEdit(event.target.value) }} value={areaEdit} />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Daily</strong></h2>
                        <Checkbox color="primary" checked={dailyEdit} onChange={(event) => { setDailyEdit(event.target.checked) }} />
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Weekly</strong></h2>
                        <Checkbox color="primary" checked={weeklyEdit} onChange={(event) => { setWeeklyEdit(event.target.checked) }} />
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Monthly</strong></h2>
                        <Checkbox color="primary" checked={monthlyEdit} onChange={(event) => { setMonthlyEdit(event.target.checked) }} />
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Quaterly</strong></h2>
                        <Checkbox color="primary" checked={quaterlyEdit} onChange={(event) => { setQuaterlyEdit(event.target.checked) }} />
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Half Yearly</strong></h2>
                        <Checkbox color="primary" checked={halfYearlyEdit} onChange={(event) => { setHalfYearlyEdit(event.target.checked) }} />
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Yearly</strong></h2>
                        <Checkbox color="primary" checked={yearlyEdit} onChange={(event) => { setYearlyEdit(event.target.checked) }} />
                      </div>
                    </div>
                    <button type="submit" class="btn savebtn  waves-effect" onClick={() => OnSubmitUpdate(editId)}>Update </button>
                  </div>
                  <div style={{ marginTop: 30 }}></div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modals Code Ended Here */}

      {/* Main Content Start */}
      <section class="content" style={{ backgroundColor: "white" }}>
        <div class="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Dashboard</h2>
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
          <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card p-4 mt-2">
                  <div className="body p-5">
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title"><strong>Perspective</strong></h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <select
                            class="form-control show-tick"
                            as="select"
                            name="perspective"
                            onChange={(event) => {
                              setPerspective(event.target.value);
                            }}
                            value={perspective}
                          >
                            <option value="Quantitative">Quantitative</option>
                            <option value="Process">Process</option>
                            <option value="Learning and Development">Learning and Development</option>
                            <option value="Customer Feedback">Customer Feedback</option>
                            <option value="Values">Values</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title"><strong>Description of the Report</strong></h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Description Of The Report" name="description_of_the_report" onChange={(event) => { setdescription_of_the_report(event.target.value) }} value={description_of_the_report} />
                        </div>
                      </div>
                    </div>


                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title"><strong>Report Name</strong></h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Report Name" name="report_name" onChange={(event) => { setReportName(event.target.value) }} value={reportName} />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title"><strong>Area/Department</strong></h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Area/Department" name="area" onChange={(event) => { setArea(event.target.value) }} value={area} />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Daily</strong></h2>
                        <Checkbox color="primary" checked={daily} onChange={(event) => { setDaily(event.target.checked) }} />
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Weekly</strong></h2>
                        <Checkbox color="primary" checked={weekly} onChange={(event) => { setWeekly(event.target.checked) }} />
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Monthly</strong></h2>
                        <Checkbox color="primary" checked={monthly} onChange={(event) => { setMonthly(event.target.checked) }} />
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Quaterly</strong></h2>
                        <Checkbox color="primary" checked={quaterly} onChange={(event) => { setQuaterly(event.target.checked) }} />
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Half Yearly</strong></h2>
                        <Checkbox color="primary" checked={halfYearly} onChange={(event) => { setHalfYearly(event.target.checked) }} />
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title"><strong>Yearly</strong></h2>
                        <Checkbox color="primary" checked={yearly} onChange={(event) => { setYearly(event.target.checked) }} />
                      </div>
                    </div>
                    <button type="submit" class="btn savebtn  waves-effect" onClick={OnSubmitForm}>SAVE    <i className="ml-1 zmdi zmdi-save " /> </button>
                    {dashboardData.length > 0 ? (<button type="button" class="btn viewbtn  waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={HandleSubmit}>SUBMIT <i className="ml-1 zmdi zmdi-check " /></button>
                    ) : null}
                    {dashboardData.length > 0 ? (
                      <div>
                        <div
                          style={{
                            position: "absolute",
                            left: "-3000px",
                            top: 0,
                          }}>
                          <PDFExport paperSize="A2" margin="1cm" ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`} forcePageBreak=".page-break">
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
                                      <div className="pdfHeader">Dashboard</div>
                                      <div class="table-responsive" id="Table">
                                        <table class="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th>Perspective</th>
                                              <th>Description of the Report</th>
                                              <th>Report Name</th>
                                              <th>Area/Department</th>
                                              <th>Daily</th>
                                              <th>Weekly</th>
                                              <th>Monthly</th>
                                              <th>Quaterly</th>
                                              <th>Half Yearly</th>
                                              <th>Yearly</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {dashboardData.map((item, key) => (
                                              <tr>
                                                <td>{item.perspective}</td>
                                                <td>{item.description_of_the_report}</td>
                                                <td>{item.report_name}</td>
                                                <td>{item.area}</td>
                                                <td>{item.daily}</td>
                                                <td>{item.weekly}</td>
                                                <td>{item.monthly}</td>
                                                <td>{item.quaterly}</td>
                                                <td>{item.half_yearly}</td>
                                                <td>{item.yearly}</td>
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
                                      <div className="pdfHeader">Dashboard</div>
                                      <div class="table-responsive" id="Table">
                                        <table class="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th>Perspective</th>
                                              <th>Description of the Report</th>

                                              <th>Report Name</th>
                                              <th>Area/Department</th>
                                              <th>Daily</th>
                                              <th>Weekly</th>
                                              <th>Monthly</th>
                                              <th>Quaterly</th>
                                              <th>Half Yearly</th>
                                              <th>Yearly</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {dashboardData.map((item, key) => (
                                              <tr>
                                                <td>{item.perspective}</td>
                                                <td>{item.description_of_the_report}</td>
                                                <td>{item.report_name}</td>
                                                <td>{item.area}</td>
                                                <td>{item.daily}</td>
                                                <td>{item.weekly}</td>
                                                <td>{item.monthly}</td>
                                                <td>{item.quaterly}</td>
                                                <td>{item.half_yearly}</td>
                                                <td>{item.yearly}</td>
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
                    ) : (null)
                    }

                    <div style={{ marginTop: 30 }}></div>
                    {dashboardData.length > 0 ? (
                      <div class="table-responsive" id="Table">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>Perspective</th>
                              <th>Description of the Report</th>

                              <th>Report Name</th>
                              <th>Area/Department</th>
                              <th>Daily</th>
                              <th>Weekly</th>
                              <th>Monthly</th>
                              <th>Quaterly</th>
                              <th>Half Yearly</th>
                              <th>Yearly</th>
                              <th style={{ textAlign: "center" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dashboardData.map((item, key) => (
                              <tr>
                                <td>{item.perspective}</td>
                                <td>{item.description_of_the_report}</td>
                                <td>{item.report_name}</td>
                                <td>{item.area}</td>
                                <td>{item.daily}</td>
                                <td>{item.weekly}</td>
                                <td>{item.monthly}</td>
                                <td>{item.quaterly}</td>
                                <td>{item.half_yearly}</td>
                                <td>{item.yearly}</td>
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
                        <button
                          type="button"
                          class="btn viewbtn waves-effect"
                          onClick={ViewModel}
                        >
                          View  <i className="ml-1 zmdi zmdi-eye " />                        </button>
                        <button type="button" class="btn downloadbtn waves-effect" onClick={exportPDFWithMethod}>Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i></button>

                      </div>
                    ) : (null)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}