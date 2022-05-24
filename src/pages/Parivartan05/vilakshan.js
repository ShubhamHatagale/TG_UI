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
import List from "../../components/data";
import { ListContainer, ListItem } from "../components/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragHandle } from "../components/DragHandle";

export default function Vilakshan(props) {
  const list = List.getList();
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

  const [vilakshanData, setVilakshanData] = useState('');
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
  const [errorshow, seterrorshow] = useState(false);
  const [inputListFinal, setInputListFinal] = useState([{ competition: "" }]);
  let [DrpValues, setDrpValues] = useState("");
  const [total, settotal] = useState(0);
  const [inputList, setInputList] = useState([{ competition: "" }]);
  const [completeData, setcompleteData] = useState('')
  const [statusText, setstatusText] = useState('')

  const ViewModel = () => {
    setviewModal(true);
  };


  const handleClose = () => {
    setShow(false);
    seteditModal(false);
    setviewModal(false);

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
    setstatusText("Loading...")

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
          setstatusText("")

        }

      });



    fetch(`https://parivartan.transganization.com/nodejs/masters/vilakshan/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setvarifiedValue(resData.data[0].verified);
        setUpid(resData.data[0].id);

        setcompleteData(resData.data);
        console.log("---resDAta--->", resData.data[0]);
        let MyValues1 = resData.data;

        let MyValues = resData.data;
        if (MyValues.length > 0) {
          // setedituser(true);
          setUpid(resData.data[0].id);
          setstatusText("")

        }
        console.log("Edit Values", MyValues);

        MyValues.map((item, key) => {
          console.log("before Eval", item.features);
          let Feature = eval(item.features);
          let Feature2 = eval(item.features2);
          setVilakshanData(Feature);

          console.log("SDfjdskjfn jsdhfkjsdfn", Feature);
          console.log("SDfjdskjfn jsdhfkjsdfn22", Feature2);

          // setCustomerList(Feature);
          setInputList(Feature);
          setInputListFinal(Feature)
          // setInputListFinal2(Feature2)

        });

        console.log("Edit Values", MyValues1);


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
      fetch(`https://parivartan.transganization.com/nodejs/masters/vilakshan/verify/${Upid}`, requestOptions)
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


  // handle input change
  const handleInputChange = (e, index) => {
    console.log(e.target.value)
    console.log(e.target.name)
    // console.log(e.target.ips)

    console.log(index)

    // if (e.target.value > 9) {
    //   setShowHideErr(false)
    // } else {
    //   setShowHideErr(true);
    //   // alert(Show)
    // }

    const { name, value } = e.target;
    const list = [...inputListFinal];
    console.log("Here is the Value---1>", list);
    list[index][name] = value;
    list[index]["is_display"] = 0;

    console.log(list[index][name]);
    console.log(value + "val");

    setInputListFinal(list);
  };

  const handleInputChange2 = (e, index) => {
    console.log(e.target.value)
    console.log(e.target.name)
    console.log(e.target.checked)

    // console.log(e.target.ips)

    console.log(index)

    // if (e.target.value > 9) {
    //   setShowHideErr(false)
    // } else {
    //   setShowHideErr(true);
    //   // alert(Show)
    // }

    const { name, checked } = e.target;
    const list = [...inputListFinal];
    console.log("Here is the Value---1>", list);
    list[index][name] = checked;
    list[index]["is_display"] = 0;

    console.log(list[index][name]);
    console.log(checked + "val");

    setInputListFinal(list);
  };


  const handleRemoveClick = (index) => {
    const list = [...inputListFinal];
    setInputListFinal(list);
    list.splice(index, 1);
  };

  const handleAddClick = () => {
    let value = [];
    let key = [];
    value.push('competition');
    for (let i = 1; i <= total; i++) {
      value.push(`value${i}`)
    }
    for (let i = 1; i <= total; i++) {
      key.push([`${i}`])
    }
    var pack = function (arr) {
      var length = arr.length,
        result = {},
        i;
      for (i = 0; i < length; i++) {
        result[(i < 10 ? '0' : '') + (i + 1)] = arr[i];
      }
      return result;
    };
    const finalobject = pack(value); //{01: "one", 02: "two", 03: "three"}      
    console.log("object is", finalobject)
    setInputListFinal([...inputListFinal, finalobject]);
    console.log(inputList);
  };


  const OnSubmitHandle = () => {
    console.log(inputListFinal)

    if (completeData.length === 0) {

      console.log(inputListFinal)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        features: inputListFinal,
        email_id: s_id,
        created_by: s_id,
        updated_by: s_id
      });
      var requestOptionsrichtext = {
        method: "POST",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(`https://parivartan.transganization.com/nodejs/masters/vilakshan`, requestOptionsrichtext)
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

    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        features: inputListFinal,
        email_id: s_id,
        created_by: s_id,
      });
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/vilakshan/${s_id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Values Submitted Succesfully==>");
            setMupdate(true);
            setTimeout(() => {
              setMupdate(false);
            }, 1000)
            // props.OnValidate1(true)


            GetallRecords();
          }
        })
        .catch((error) => console.log("error", error));
    }



  };


  const updateJson = (featureJson) => {
    GetallRecords();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      features: featureJson,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/vilakshan/${s_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        GetallRecords();

        if (resData.status == 200) {
          // console.log("Values Submitted Succesfully==>");
          // setMupdate(true);
          // setTimeout(() => {
          //   setMupdate(false);
          // }, 1000)
          // props.OnValidate1(true)


          GetallRecords();

        }
        GetallRecords();

      })
      .catch((error) => console.log("error", error));
  }


  const handleFilter = (e) => {
    setstatusText("Loading...")

    const fvalue = e.target.value;
    const optionName = e.target.name;

    console.log(e.target.value)
    console.log(e.target.name)

    if (fvalue === "select") {
      setstatusText("Loading...")
      GetallRecords()
      setstatusText("")
      return false
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/vilakshan/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData.data);

        // console.log("---resDAta--->", resData.data[0]);
        // let MyValues1 = resData.data;

        let MyValues = resData.data;
        if (MyValues.length > 0) {
          // setedituser(true);
          setUpid(resData.data[0].id);

        }
        // console.log("Edit Values", MyValues);

        MyValues.map((item, key) => {
          // console.log("before Eval", item.features);
          const Feature = eval(item.features);
          // let Feature2 = eval(item.features2);

          console.log("SDfjdskjfn jsdhfkjsdfn", Feature);
          // console.log("SDfjdskjfn jsdhfkjsdfn22", Feature2);
          console.log(optionName === "tag0")
          if (optionName === "tag0") {
            var optionVal = Feature.filter(({ tag0 }) => tag0 === fvalue)
          } else if (optionName === "tag1") {
            var optionVal = Feature.filter(({ tag1 }) => tag1 === fvalue)
          } else if (optionName === "tag2") {
            var optionVal = Feature.filter(({ tag2 }) => tag2 === fvalue)
          } else if (optionName === "tag3") {
            var optionVal = Feature.filter(({ tag3 }) => tag3 === fvalue)
          } else if (optionName === "tag4") {
            var optionVal = Feature.filter(({ tag4 }) => tag4 === fvalue)
          } else if (optionName === "tag5") {
            var optionVal = Feature.filter(({ tag5 }) => tag5 === fvalue)
          }
          console.log(optionVal)
          // setCustomerList(Feature);
          setInputListFinal(optionVal)
          console.log(optionVal)
          setstatusText("Loading...")

          if (optionVal.length === 0) {
            setstatusText("No Data Found")
          } else if (optionVal.length > 0) {
            setstatusText("")
          }
          // setInputListFinal2(Feature2)

        });

        // console.log("Edit Values", MyValues1);


      })

      .catch((error) => console.log("error", error));



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
            Cancel
          </Button>
          <Button variant="primary" >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>



      <div className="row clearfix" style={{ backgroundColor: "#F3F6F9" }}>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card p-4 mt-2">
            <div className="body p-5" style={{ overflowX: "scroll" }}>
              <div style={{ backgroundColor: "white", width: "80rem", overflowX: "auto", }}>
                {errorshow == true ? (<div style={{ margin: "10px", marginLeft: "30px", text: "red" }}>
                  <span className="text-danger">Please fill the name</span>
                </div>) : null}
                {/* <div style={{ marginTop: 20 }}></div> */}
                <DragDropContext
                  onDragEnd={(param) => {
                    const srcI = param.source.index;
                    const desI = param.destination?.index;
                    if (desI) {
                      inputListFinal.splice(desI, 0, inputListFinal.splice(srcI, 1)[0]);
                      List.saveList(inputListFinal);
                      console.log(inputListFinal)
                      GetallRecords()
                      updateJson(inputListFinal);
                    }
                  }}
                >
                  <ListContainer className="row clearfix flex-nowrap">
                    <div className="col-lg-2 ">
                      <strong>List of Paramenters</strong>
                      {/* {org_name} */}
                    </div>
                    <div className="col-lg-2 text-center">
                      <strong>Non Financial</strong>
                      <div className="col-lg-12">
                        <select className="form-control " name="tag0" onChange={handleFilter}>
                          <option value="select">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-2 text-center">
                      <strong>Objective</strong>
                      <div className="col-lg-12">
                        <select className="form-control " name="tag1" onChange={handleFilter}>
                          <option value="select">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2 ml-3 text-center">
                      <strong>Measurable</strong>
                      <div className="col-lg-12">
                        <select className="form-control " name="tag2" onChange={handleFilter}>
                          <option value="select">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2 ml-3 text-center">
                      <strong>Volume Growth</strong>
                      <div className="col-lg-12">
                        <select className="form-control " name="tag3" onChange={handleFilter}>
                          <option value="select">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2 ml-3 text-center">
                      <strong>Value Growth</strong>
                      <div className="col-lg-12">
                        <select className="form-control " name="tag4" onChange={handleFilter}>
                          <option value="select">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2 ml-3 text-center">
                      <strong>Near/Far to PCB</strong>
                      <div className="col-lg-12">
                        <select className="form-control " name="tag4" onChange={handleFilter}>
                          <option value="select">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2 ml-3 text-center">
                      <strong>OPERATIONAL EXCELLENCE</strong>
                    </div>
                    <div className="col-lg-2 ml-3 text-center">
                      <strong>CUSTOMER INTIMACY</strong>
                    </div>
                    <div className="col-lg-2 ">
                      <strong>Vilakshan</strong>
                    </div>


                  </ListContainer>

                  <Droppable droppableId="droppable-1">
                    {(provided, _) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {inputListFinal.map((x, i) => {
                          console.log("The competion sheet", x)
                          return (

                            <Draggable
                              key={i}
                              draggableId={"draggable-" + i}
                              index={i}
                            >
                              {(provided, snapshot) => (
                                <ListItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  style={{
                                    ...provided.draggableProps.style,
                                    boxShadow: snapshot.isDragging
                                      ? "0 0 .4rem #666"
                                      : "none",
                                  }}
                                >

                                  <div className="row clearfix flex-nowrap">
                                    <DragHandle {...provided.dragHandleProps} className="mr-2" />
                                    {Array.from({ length: 1 }, (item, index) => {
                                      return (
                                        <>
                                          <div className="col-lg-2">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="0"
                                              maxLength={500}
                                              max={500}
                                              name={`value${index}`}
                                              value={x[`value${index}`]}
                                              onChange={(e) => handleInputChange(e, i)}
                                              required
                                            />

                                          </div>

                                        </>


                                      );
                                    })
                                    }


                                    {Array.from({ length: 6 }, (item, index) => {
                                      return (
                                        completeData.length > 0 ? (
                                          <>
                                            {console.log(`select-${index}`)}
                                            {console.log(x[`select${index}`])}
                                            <div className="col-lg-2">

                                              {/* <span>{x[`tag${index}`]}</span> */}
                                              <select className="form-control " name={`tag${index}`} id={x[`${index}`]} value={x[`tag${index}`]} onChange={(e) => handleInputChange(e, i)}>
                                                <option value=""></option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                                {/* ))} */}
                                              </select>

                                            </div>
                                            {/* ) : (null)} */}
                                          </>
                                        ) : (
                                          <div className="col-lg-2">
                                            <select className="form-control" name={`tag${index}`} id={x[`${index}`]} value={x[`tag${index}`]} onChange={(e) => handleInputChange(e, i)}>
                                              {/* {DrpValues.map((item, key) => ( */}
                                              {/* // console.log(item.vilakshan_journey) */}
                                              <option value=""></option>
                                              <option value="Yes">Yes</option>
                                              <option value="No">No</option>
                                              {/* ))} */}
                                            </select>
                                          </div>
                                        )
                                      );
                                    })
                                    }

                                    {Array.from({ length: 2 }, (item, index) => {
                                      return (
                                        <>
                                          <div className="col-lg-2">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="0"
                                              maxLength={500}
                                              max={500}
                                              name={`value_sec${index}`}
                                              value={x[`value_sec${index}`]}
                                              onChange={(e) => handleInputChange(e, i)}
                                              required
                                            />

                                          </div>

                                        </>

                                      );
                                    })
                                    }

                                    {Array.from({ length: 1 }, (item, index) => {
                                      return (
                                        <>
                                          <div className="col-lg-2">
                                            <div class="btn-group m-1">
                                              <input type="checkbox"
                                                className="m-2"
                                                name={`checkVal${index}`}
                                                value={x[`checkVal${index}`]}
                                                checked={x[`checkVal${index}`]}
                                                onChange={(e) => handleInputChange2(e, i)}
                                              />
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })
                                    }


                                    <div className="col-md-2">
                                      {inputListFinal.length !== 1 && (
                                        <button
                                          type="button"
                                          className="btn btn-raised rembtn btn-square waves-effect m-l-40"
                                          onClick={() => handleRemoveClick(i)}
                                        >
                                          <strong>REMOVE</strong>
                                        </button>
                                      )}
                                      {inputListFinal.length - 1 === i && (
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
                                </ListItem>
                              )}







                            </Draggable>
                          );
                        })}
                      </div>

                    )}
                  </Droppable>
                  {/* <div className="text-center">Loading...</div> */}
                  <div className="text-center">{statusText}</div>
                </DragDropContext>

                <div style={{ marginTop: 30 }}></div>
                <button
                  type="submit"
                  class="btn savebtn waves-effect mb-5"
                  onClick={OnSubmitHandle}
                >
                  SAVE <i className="ml-1 zmdi zmdi-save " />
                </button>

                {/* {completeData.length > 0 ? (<button type="button" class="btn viewbtn waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={() => props.OnValidate1(true)}>SUBMIT <i className="ml-1 zmdi zmdi-check " /> </button>
                        ) : null} */}


              </div>


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
                                            <td>{itm.value0}</td>
                                            <td>{itm.tag0}</td>
                                            <td>{itm.tag1}</td>
                                            <td>{itm.tag2}</td>
                                            <td>{itm.tag3}</td>
                                            <td>{itm.tag4}</td>
                                            <td>{itm.tag5}</td>
                                            <td>{itm.value_sec0}</td>
                                            <td>{itm.value_sec1}</td>
                                            <td>{(itm.checkVal0 == true) ? <div>Yes</div> : <div>No</div>}</td>

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
          {/* {console.log(vilakshanData.length > 0)}
          {console.log(vilakshanData[0])} */}
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
                            <>
                              <tr>
                                <td>{itm.value0}</td>
                                <td>{itm.tag0}</td>
                                <td>{itm.tag1}</td>
                                <td>{itm.tag2}</td>
                                <td>{itm.tag3}</td>
                                <td>{itm.tag4}</td>
                                <td>{itm.tag5}</td>
                                <td>{itm.value_sec0}</td>
                                <td>{itm.value_sec1}</td>
                                <td>{(itm.checkVal0 == true) ? <div>Yes</div> : <div>No</div>}</td>

                              </tr>
                            </>

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
