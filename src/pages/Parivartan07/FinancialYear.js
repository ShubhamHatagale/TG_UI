import React, { useEffect, useState } from "react";
import Table from "../Parivartan07/CustomerTable";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-bootstrap/Modal";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import ModalSubmit from "../../components/ModalSubmit";
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";




const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const useStylesVerticle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Form() {
  var s_id = localStorage.getItem('tr_id')
  const [inputListFinal, setInputListFinal] = useState([
    {
      value0: 0,
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      value5: 0,
      value6: 0,
      value7: 0,
      value8: 0,
      value9: 0,
      value10: 0,
      value11: 0,
    }
  ]);

  // const [inputListFinal, setInputListFinal] = useState([
  //   {}
  // ]);

  const history = useHistory();

  // var dd=getFullYear()
  const [date, setdate] = useState();
  const [Fdate, setFdate] = useState();
  const pdfExportComponent = React.useRef(null);
  const [formData, setformData] = useState([]);
  const [formValid, setformValid] = useState(false);
  const [vilakPara, setvilakPara] = useState(
    "Vilakshan and Associated Parameters"
  );
  const [fy1, setfy1] = useState();
  const [fy2, setfy2] = useState();
  const [fy3, setfy3] = useState();
  const [fy4, setfy4] = useState();
  const [fy5, setfy5] = useState();
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



  const [fyE1, setfyE1] = useState("");
  const [fyE2, setfyE2] = useState("");
  const [fyE3, setfyE3] = useState("");
  const [fyE4, setfyE4] = useState("");
  const [fyE5, setfyE5] = useState("");

  const [editId, seteditId] = useState("");
  const [delId, setdelId] = useState("");
  const [show, setShow] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [vilakParaE, setvilakParaE] = useState("");
  const [DrishtiTotal, setDrishtiTotal] = useState("");
  const [Months, setMonths] = useState([
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "August",
    "September",
    "December",
    "January",
    "February",
    "March"
  ]);

  const [total, settotal] = useState(0);
  const [pdfShowDes, setpdfShowDes] = useState(0);
  const [drishiData, setdrishiData] = useState("");
  const [completeData, setcompleteData] = useState("");
  const [Madd, setMadd] = useState(false);

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
    seteditModal(false);
  };

  const ViewModel = () => {
    setviewModal(true);
  };
  const changeInpts = (event) => {
    setvilakParaE(event.target.value);
  };


  const OnSubmitUpdate = (edId) => {
    // alert(edId);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      drishti_parameter: vilakParaE,
      year_1: fyE1,
      year_2: fyE2,
      year_3: fyE3,
      year_4: fyE4,
      year_5: fyE5,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/drishti/${edId}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData);
        if (resData.status == 200) {
          // console.log("updated");
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

  const getYear = () => {
    let ddts = new Date().getFullYear();
    let ddti = ddts.toString().substr(-2);
    let ddt = parseInt(ddti);

    let ddtF1 = ddts + 1;
    let ddtF2 = ddts + 2;
    let ddtF3 = ddts + 3;
    let ddtF4 = ddts + 4;
    // let ddtF5 = ddts + 5;

    let ddt1 = ddt + 1;
    let ddt2 = ddt + 2;
    let ddt3 = ddt + 3;
    let ddt4 = ddt + 4;
    let ddt5 = ddt + 5;

    setdate(ddt);
    setFdate(ddts);

    setfy1("FY " + ddts + "-" + ddt1);
    setfy2("FY " + ddtF1 + "-" + ddt2);
    setfy3("FY " + ddtF2 + "-" + ddt3);
    setfy4("FY " + ddtF3 + "-" + ddt4);
    setfy5("FY " + ddtF4 + "-" + ddt5);
  };

  const classes = useStyles();
  const verticleclasses = useStylesVerticle();
  const [value, setValue] = React.useState(0);


  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    getYear();
    GetallRecords();
  }, []);




  const deleteConfirm = () => {
    // alert(delId);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "delete",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/drishti/${delId}`, requestOptionsget)
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
    fetch(`https://parivartan.transganization.com/nodejs/masters/drishti/${edit_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        seteditId(resData.data[0].id);
        // console.log(resData.data);
        setvilakParaE(resData.data[0].drishti_parameter);
        setfyE1(resData.data[0].year_1);
        setfyE2(resData.data[0].year_2);
        setfyE3(resData.data[0].year_3);
        setfyE4(resData.data[0].year_4);
        setfyE5(resData.data[0].year_5);
      })
      .catch((error) => console.log("error", error));
  };




  const deletefn = (edit_id) => {
    // alert(edit_id);
    setdelId(edit_id);
    setShow(true);
  };








  const handleSubmit = (e) => {
    if (drishiData.length === 0) {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        features: inputListFinal,
        email_id: s_id,
        created_by: s_id
      });
      var requestOptionsrichtext = {
        method: "POST",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(`https://parivartan.transganization.com/nodejs/masters/drishti_financial_year`, requestOptionsrichtext)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Data Added succesfully");
            setMadd(true);
            // setMadd(false);
            // renderTable();

            setTimeout(() => {
              setMadd(false);
            }, 1000)
            GetallRecords();
            // renderTable();


          }
          // renderTable();

          GetallRecords();
        })
        .catch((error) => console.log("error", error));
      setformValid(true);
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
        `https://parivartan.transganization.com/nodejs/masters/drishti_financial_year/${s_id}`,
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
            GetallRecords()
            // props.OnValidateTab1(true);


            // GetallRecords();
          }
        })
        .catch((error) => console.log("error", error));
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

    fetch(
      `https://parivartan.transganization.com/nodejs/masters/drishti/user/1`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        if (resData.data.id > 0) {
          setvarifiedValue(resData.data[0].verified);
          setUpid(resData.data[0].id);
        }

      });

    fetch(`https://parivartan.transganization.com/nodejs/masters/drishti/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData.data);
        setcompleteData(resData.data);
        // console.log("dddddddd", completeData);
      })
      .catch((error) => console.log("error", error));





    fetch(`https://parivartan.transganization.com/nodejs/masters/drishti_financial_year/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData.data);
        console.log(resData.data);
        console.log(resData.status);

        if (resData.status == 200) {
          setdrishiData(resData.data);

          console.log("Data Added succesfully")

          console.log(resData.data.length);
          console.log(completeData.length);

          console.log("---resDAta--->", resData.data[0]);
          let MyValues1 = resData.data;

          let MyValues = resData.data;
          if (MyValues.length > 0) {
            // setedituser(true);
            setUpid(resData.data[0].id);

          }
          console.log("Edit Values", MyValues);

          MyValues.map((item, key) => {
            console.log("before Eval", item.features);
            let Feature = eval(item.features);
            let Feature2 = eval(item.features2);

            console.log("SDfjdskjfn jsdhfkjsdfn", Feature);
            console.log("SDfjdskjfn jsdhfkjsdfn22", Feature2);

            // setCustomerList(Feature);
            // setInputList(Feature);
            setInputListFinal(Feature)
            // setInputListFinal2(Feature2)

          });

          console.log("Edit Values", MyValues1);

        }

        // setcompleteData(resData.data);

      })
      .catch((error) => console.log("error", error))



  }
  // const renderTable = () => {
  //   return <Table AllData={completeData} />;
  // };

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
      fetch(`https://parivartan.transganization.com/nodejs/masters/drishti/verify/${Upid}`, requestOptions)
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

  const selectYear = (e) => {
    console.log(e.target.options[e.target.selectedIndex].text)
    // console.log(e.target.name)
    // console.log(e.target.value)

    const { name, value, ips } = e.target;
    const list = [...inputListFinal];
    // console.log("Here is the Value---1>", list);
    // console.log(value)
    list[name]["drishtiTotal"] = value;
    list[name]["drishtiYear"] = e.target.options[e.target.selectedIndex].text;

    setInputListFinal(list);
    // setcompleteData(list);
    // console.log(inputListFinal)
  }

  const selectDrishtiParameter = (e) => {
    // console.log(e.target.options[e.target.selectedIndex].text)
    // console.log(e.target.name)
    // console.log(e.target.value)

    const { name, value, ips } = e.target;
    const list = [...inputListFinal];
    // console.log("Here is the Value---1>", list);
    // console.log(value)
    // list[name]["drishtiTotal"] = value;
    list[name]["drishti_parameter"] = e.target.options[e.target.selectedIndex].text;

    setInputListFinal(list);
    // setcompleteData(list);
    console.log(inputListFinal)
  }



  // handle input change
  const handleInputChange = (e, index) => {
    // console.log(e.target.id)
    // console.log(e.target.name)
    // console.log(e.target.value)
    // console.log(index)
    var num = 0;

    // console.log(e.target.ips)

    // console.log(index)

    // if (e.target.value > 9) {
    //   setShowHideErr(false)
    // } else {
    //   setShowHideErr(true);
    //   // alert(Show)
    // }

    const { name, value, ips } = e.target;
    const list = [...inputListFinal];
    // console.log("Here is the Value---1>", list);
    // console.log(list[index].value0);

    // console.log(parseInt(list[index][`value${0}`]+list[index][`value${1}`]))

    // for (var i = 0; i <= 11; i++) {
    //   // console.log(i)
    //   // console.log(num += +value[i])
    //   console.log(list[index][`value${index}`]);
    // }


    list[index][name] = parseInt(value);
    console.log(valSum(inputListFinal[index]))
    list[index]["Total"] = valSum(inputListFinal[index]);

    // list[index]["is_display"] = 0;

    // console.log(list[index][name]);
    // console.log(value + "val");

    console.log("Here is the Value---2>", list);

    setInputListFinal(list);
    // console.log(inputListFinal[index].value0)


    // console.log(num)
    // setcompleteData(list);

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
    // console.log(inputList);
  };



  const valSum = (arr) => {
    console.log(arr)
    let sum = (parseInt(arr.value0) + parseInt(arr.value1) + parseInt(arr.value2) + parseInt(arr.value3) + parseInt(arr.value4) + parseInt(arr.value5) + parseInt(arr.value6) + parseInt(arr.value7) + parseInt(arr.value8) + parseInt(arr.value9) + parseInt(arr.value10) + parseInt(arr.value11));
    return sum;
  }


  return (
    <>
      <Modal
        size="sm"
        show={Mupdate}
        onHide={() => setMupdate(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Update Successful</Modal.Body>
      </Modal>


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


      {completeData.length > 0 ? (<div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">

            {inputListFinal.map((x, i) => {
              console.log("The competion sheet", x)
              return (
                <>
                  <div className="card p-4 mt-2">
                    <div className="body p-5">
                      <form>
                        <div className="row clearfix">
                          <div className="col-md-6">
                            <h2 className="card-inside-title" >
                              <strong>Financial Year</strong>
                            </h2>
                          </div>
                          <div className="col-md-4">
                            <h2 className="card-inside-title" >
                              <strong>
                                <div className="col-lg-12">
                                  {console.log(x[`drishtiYear`])}
                                  <select className="form-control"
                                    name={`${i}`}
                                    value={x[`drishtiYear`]}
                                    onChange={selectYear}
                                  >
                                    <option style={{ color: "black", boder: "1px solid black", fontWeight: "bold" }} value="select" >{x[`drishtiYear`] ? x[`drishtiYear`] : "Select"}</option>
                                    {console.log(completeData)}

                                    {/* {completeData.map((item, key) => ( */}
                                    <option name={Fdate - date + 1} value={completeData[completeData.length - 1].year_1}>FYE {Fdate}-{date + 1}</option>
                                    <option value={completeData[completeData.length - 1].year_2}>FYE {Fdate + 1}-{date + 2}</option>
                                    <option value={completeData[completeData.length - 1].year_3}>FYE {Fdate + 2}-{date + 3}</option>
                                    <option value={completeData[completeData.length - 1].year_4}>FYE {Fdate + 3}-{date + 4}</option>
                                    <option value={completeData[completeData.length - 1].year_5}>FYE {Fdate + 4}-{date + 5}</option>

                                    {/* ))} */}
                                  </select>
                                </div>
                              </strong>
                            </h2>
                          </div>


                          <div className="col-md-6">
                            <h2 className="card-inside-title" >
                              <strong>Vilakshan</strong>
                            </h2>
                          </div>

                          <div className="col-md-4">
                            <h2 className="card-inside-title" >
                              <strong>
                                <div className="col-lg-12">
                                  {/* {console.log(x[`drishtiYear`])} */}
                                  <select className="form-control"
                                    name={`${i}`}
                                    value={x[`drishti_parameter`]}
                                    onChange={selectDrishtiParameter}
                                  >
                                    <option style={{ color: "black", boder: "1px solid black", fontWeight: "bold" }} value="select" >{x[`drishti_parameter`] ? x[`drishti_parameter`] : "Select"}</option>
                                    {/* {console.log(completeData)}
                                    {console.log(completeData[completeData.length - 1].drishti_parameter)} */}
                                    {completeData.map((item, key) => (
                                      <option>{item.drishti_parameter}</option>
                                    ))}

                                    {/* ))} */}
                                  </select>
                                </div>
                              </strong>
                            </h2>
                          </div>


                          {/* <div className="col-md-6">
                            <h2 className="card-inside-title ml-3" >
                              <strong>{completeData[completeData.length - 1].drishti_parameter}</strong>
                            </h2>
                          </div>
 */}

                          <div className="col-md-6">
                            <h2 className="card-inside-title mt-2" >
                              <strong>Drishti Total</strong>
                            </h2>
                          </div>
                          <div className="col-md-4 text-center ml-2">
                            {Array.from({ length: 1 }, (item, index) => {
                              return (
                                <input
                                  type="text"
                                  className="form-control text-center m-1"
                                  placeholder="0"
                                  maxLength={500}
                                  max={500}
                                  // name={`drishtiTotal${index}`}
                                  value={x[`drishtiTotal`]}
                                  disabled
                                  // onChange={(e) => handleInputChange(e, i)}
                                  required
                                />
                                // <div className="row clearfix">
                                //   <div className="col-lg-6">
                                //     <h2 className="card-inside-title" className="card-inside-title text-center">
                                //       <strong>April</strong>
                                //     </h2>
                                //   </div>
                                //   <div className="col-lg-6">

                                //     <input
                                //       type="text"
                                //       className="form-control"
                                //       placeholder="0"
                                //       maxLength={500}
                                //       max={500}
                                //       // name={`value${index}`}
                                //       // value={x[`value${index}`]}
                                //       // onChange={(e) => handleInputChange(e, i)}
                                //       required
                                //     />

                                //   </div>
                                // </div>

                              )

                            })}
                          </div>
                          <br></br>

                          <div className="col-md-6 mt-5" >
                            <h1 className="card-inside-title ml-1" style={{ fontSize: "20px" }}>
                              <strong>Month</strong>
                            </h1>
                          </div>
                          <div className="col-md-6 mt-5">
                            <h1 className="card-inside-title ml-3" style={{ fontSize: "20px" }}>
                              <strong>No.Of Vilakshan</strong>
                            </h1>
                          </div>


                          {Months ? (
                            <>
                              {Array.from({ length: 12 }, (item, index) => {
                                return (
                                  <>
                                    <div className="col-md-6 m-1">
                                      <h2 className="card-inside-title " >
                                        <strong>{Months[index]}</strong>
                                      </h2>
                                    </div>
                                    <div className="col-md-4">
                                      <input
                                        type="number"
                                        className="form-control text-center m-1"
                                        placeholder="0"
                                        maxLength={500}
                                        max={500}
                                        name={`value${index}`}
                                        value={x[`value${index}`] > 0 ? x[`value${index}`] : 0}
                                        onChange={(e) => handleInputChange(e, i)}
                                        required
                                      />
                                    </div>
                                    {console.log(parseInt(inputListFinal[i].value0) + parseInt(inputListFinal[i].value1) + parseInt(inputListFinal[i].value2) + parseInt(inputListFinal[i].value3) + parseInt(inputListFinal[i].value4) + parseInt(inputListFinal[i].value5) + parseInt(inputListFinal[i].value6) + parseInt(inputListFinal[i].value7) + parseInt(inputListFinal[i].value8) + parseInt(inputListFinal[i].value9) + parseInt(inputListFinal[i].value10) + parseInt(inputListFinal[i].value11))}

                                    {/* {console.log([1, 2, 3, 4].reduce((a, b) => a + b, 0))} */}
                                  </>

                                )

                              })}

                              {Array.from({ length: 1 }, (item, index) => {
                                return (
                                  <>
                                    <div className="col-md-6 m-1">
                                      <h2 className="card-inside-title" >
                                        <strong>Total</strong>
                                      </h2>
                                    </div>
                                    <div className="col-md-4">
                                      <input
                                        type="number"
                                        className="form-control text-center m-1"
                                        placeholder="0"
                                        maxLength={500}
                                        max={500}
                                        name={`Total${index}`}
                                        // value={valSum(inputListFinal[i])}
                                        value={x[`Total`]}

                                        disabled
                                        // onChange={(e) => handleInputChange(e, i)}
                                        required
                                      />
                                    </div>



                                    {x[`drishtiTotal`] == x[`Total`] ? (
                                      <div className="col-md-10 text-center p-5 bold">Month On Month Calculation Matched</div>
                                    ) : (
                                      <div className="col-md-10 text-center p-5 bold">Month On Month Calculation Not Matched</div>
                                    )}
                                    {console.log(parseInt(inputListFinal[i].value0) + parseInt(inputListFinal[i].value1) + parseInt(inputListFinal[i].value2) + parseInt(inputListFinal[i].value3) + parseInt(inputListFinal[i].value4) + parseInt(inputListFinal[i].value5) + parseInt(inputListFinal[i].value6) + parseInt(inputListFinal[i].value7) + parseInt(inputListFinal[i].value8) + parseInt(inputListFinal[i].value9) + parseInt(inputListFinal[i].value10) + parseInt(inputListFinal[i].value11))}

                                    {/* {console.log([1, 2, 3, 4].reduce((a, b) => a + b, 0))} */}


                                  </>

                                )

                              })}

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





                            </>



                          ) : null}


                        </div>
                      </form>
                    </div>
                  </div>

                </>

              )
            })}




            {completeData.length > 0 ? (
              <>
                {/* For Pdf -----------------------> */}
                <div
                  style={{
                    position: "absolute",
                    left: "-3000px",
                    top: 0,
                  }}
                >
                  {pdfShowDes > 0 ? (

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

                        <div >
                          <div id="divToPrint" className="mt4 pdfBody" >

                            {inputListFinal.map((x, i) => {
                              console.log("The competion sheet", x)
                              return (
                                <>
                                  <div className="card p-4 mt-2">
                                    <div className="body p-5">
                                      <form>
                                        <div className="row clearfix">
                                          <div className="col-md-6">
                                            <h2 className="card-inside-title" >
                                              <strong>Financial Year</strong>
                                            </h2>
                                          </div>
                                          <div className="col-md-4">
                                            <h2 className="card-inside-title" >
                                              <strong>
                                                <div className="col-lg-12">
                                                  <select className="form-control"
                                                    name={`${i}`}
                                                    value={x[`drishtiTotal${i}`]}
                                                    onChange={selectYear}
                                                  >
                                                    <option value="select" >{x[`drishtiYear`] ? x[`drishtiYear`] : "Select"}</option>
                                                    {console.log(completeData)}
                                                    {/* {completeData.map((item, key) => ( */}
                                                    <option name={Fdate - date + 1} value={completeData[completeData.length - 1].year_1}>FYE {Fdate}-{date + 1}</option>
                                                    <option value={completeData[completeData.length - 1].year_2}>FYE {Fdate + 1}-{date + 2}</option>
                                                    <option value={completeData[completeData.length - 1].year_3}>FYE {Fdate + 2}-{date + 3}</option>
                                                    <option value={completeData[completeData.length - 1].year_4}>FYE {Fdate + 3}-{date + 4}</option>
                                                    <option value={completeData[completeData.length - 1].year_5}>FYE {Fdate + 4}-{date + 5}</option>

                                                    {/* ))} */}
                                                  </select>
                                                </div>
                                              </strong>
                                            </h2>
                                          </div>


                                          <div className="col-md-6">
                                            <h2 className="card-inside-title" >
                                              <strong>Vilakshan</strong>
                                            </h2>
                                          </div>
                                          <div className="col-md-6">
                                            <h2 className="card-inside-title ml-3" >
                                              <strong>{completeData[completeData.length - 1].drishti_parameter}</strong>
                                            </h2>
                                          </div>


                                          <div className="col-md-6">
                                            <h2 className="card-inside-title mt-2" >
                                              <strong>Drishti Total</strong>
                                            </h2>
                                          </div>
                                          <div className="col-md-4 text-center ml-2">
                                            {Array.from({ length: 1 }, (item, index) => {
                                              return (
                                                <input
                                                  type="text"
                                                  className="form-control text-center m-1"
                                                  placeholder="0"
                                                  maxLength={500}
                                                  max={500}
                                                  // name={`drishtiTotal${index}`}
                                                  value={x[`drishtiTotal`]}
                                                  disabled
                                                  // onChange={(e) => handleInputChange(e, i)}
                                                  required
                                                />
                                                // <div className="row clearfix">
                                                //   <div className="col-lg-6">
                                                //     <h2 className="card-inside-title" className="card-inside-title text-center">
                                                //       <strong>April</strong>
                                                //     </h2>
                                                //   </div>
                                                //   <div className="col-lg-6">

                                                //     <input
                                                //       type="text"
                                                //       className="form-control"
                                                //       placeholder="0"
                                                //       maxLength={500}
                                                //       max={500}
                                                //       // name={`value${index}`}
                                                //       // value={x[`value${index}`]}
                                                //       // onChange={(e) => handleInputChange(e, i)}
                                                //       required
                                                //     />

                                                //   </div>
                                                // </div>

                                              )

                                            })}
                                          </div>
                                          <br></br>

                                          <div className="col-md-6 mt-5" >
                                            <h1 className="card-inside-title ml-1" style={{ fontSize: "20px" }}>
                                              <strong>Month</strong>
                                            </h1>
                                          </div>
                                          <div className="col-md-6 mt-5">
                                            <h1 className="card-inside-title ml-3" style={{ fontSize: "20px" }}>
                                              <strong>No.Of Vilakshan</strong>
                                            </h1>
                                          </div>


                                          {Months ? (
                                            <>
                                              {Array.from({ length: 12 }, (item, index) => {
                                                return (
                                                  <>
                                                    <div className="col-md-6 m-1">
                                                      <h2 className="card-inside-title " >
                                                        <strong>{Months[index]}</strong>
                                                      </h2>
                                                    </div>
                                                    <div className="col-md-4">
                                                      <input
                                                        type="number"
                                                        className="form-control text-center m-1"
                                                        placeholder="0"
                                                        maxLength={500}
                                                        max={500}
                                                        name={`value${index}`}
                                                        value={x[`value${index}`] > 0 ? x[`value${index}`] : 0}
                                                        onChange={(e) => handleInputChange(e, i)}
                                                        required
                                                      />
                                                    </div>
                                                    {console.log(parseInt(inputListFinal[i].value0) + parseInt(inputListFinal[i].value1) + parseInt(inputListFinal[i].value2) + parseInt(inputListFinal[i].value3) + parseInt(inputListFinal[i].value4) + parseInt(inputListFinal[i].value5) + parseInt(inputListFinal[i].value6) + parseInt(inputListFinal[i].value7) + parseInt(inputListFinal[i].value8) + parseInt(inputListFinal[i].value9) + parseInt(inputListFinal[i].value10) + parseInt(inputListFinal[i].value11))}

                                                    {/* {console.log([1, 2, 3, 4].reduce((a, b) => a + b, 0))} */}
                                                  </>

                                                )

                                              })}

                                              {Array.from({ length: 1 }, (item, index) => {
                                                return (
                                                  <>
                                                    <div className="col-md-6 m-1">
                                                      <h2 className="card-inside-title" >
                                                        <strong>Total</strong>
                                                      </h2>
                                                    </div>
                                                    <div className="col-md-4">
                                                      <input
                                                        type="number"
                                                        className="form-control text-center m-1"
                                                        placeholder="0"
                                                        maxLength={500}
                                                        max={500}
                                                        name={`Total${index}`}
                                                        // value={valSum(inputListFinal[i])}
                                                        value={x[`Total`]}

                                                        disabled
                                                        // onChange={(e) => handleInputChange(e, i)}
                                                        required
                                                      />
                                                    </div>



                                                    {x[`drishtiTotal`] == x[`Total`] ? (
                                                      <div className="col-md-10 text-center p-2 bold">Month On Month Calculation Matched</div>
                                                    ) : (
                                                      <div className="col-md-10 text-center p-2 bold">Month On Month Calculation Not Matched</div>
                                                    )}
                                                    {console.log(parseInt(inputListFinal[i].value0) + parseInt(inputListFinal[i].value1) + parseInt(inputListFinal[i].value2) + parseInt(inputListFinal[i].value3) + parseInt(inputListFinal[i].value4) + parseInt(inputListFinal[i].value5) + parseInt(inputListFinal[i].value6) + parseInt(inputListFinal[i].value7) + parseInt(inputListFinal[i].value8) + parseInt(inputListFinal[i].value9) + parseInt(inputListFinal[i].value10) + parseInt(inputListFinal[i].value11))}

                                                    {/* {console.log([1, 2, 3, 4].reduce((a, b) => a + b, 0))} */}


                                                  </>

                                                )

                                              })}






                                            </>



                                          ) : null}


                                        </div>
                                      </form>
                                    </div>
                                  </div>

                                </>

                              )
                            })}
                          </div>
                        </div>

                      </Modal.Body>

                    </PDFExport>
                  ) : null}
                </div>


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

                    <div >
                      <div id="divToPrint" className="mt4 pdfBody" >
                        {inputListFinal.map((x, i) => {
                          console.log("The competion sheet", x)
                          return (
                            <>
                              <div className="card p-4 mt-2">
                                <div className="body p-5">
                                  <form>
                                    <div className="row clearfix">
                                      <div className="col-md-6">
                                        <h2 className="card-inside-title" >
                                          <strong>Financial Year</strong>
                                        </h2>
                                      </div>
                                      <div className="col-md-4">
                                        <h2 className="card-inside-title" >
                                          <strong>
                                            <div className="col-lg-12">
                                              <select className="form-control"
                                                name={`${i}`}
                                                value={x[`drishtiTotal${i}`]}
                                                onChange={selectYear}
                                                disabled
                                              >
                                                <option value="select" >{x[`drishtiYear`] ? x[`drishtiYear`] : "Select"}</option>
                                                {console.log(completeData)}
                                                {/* {completeData.map((item, key) => ( */}
                                                <option name={Fdate - date + 1} value={completeData[completeData.length - 1].year_1}>FYE {Fdate}-{date + 1}</option>
                                                <option value={completeData[completeData.length - 1].year_2}>FYE {Fdate + 1}-{date + 2}</option>
                                                <option value={completeData[completeData.length - 1].year_3}>FYE {Fdate + 2}-{date + 3}</option>
                                                <option value={completeData[completeData.length - 1].year_4}>FYE {Fdate + 3}-{date + 4}</option>
                                                <option value={completeData[completeData.length - 1].year_5}>FYE {Fdate + 4}-{date + 5}</option>

                                                {/* ))} */}
                                              </select>
                                            </div>
                                          </strong>
                                        </h2>
                                      </div>


                                      <div className="col-md-6">
                                        <h2 className="card-inside-title" >
                                          <strong>Vilakshan</strong>
                                        </h2>
                                      </div>
                                      <div className="col-md-6">
                                        <h2 className="card-inside-title ml-3" >
                                          <strong>{completeData[completeData.length - 1].drishti_parameter}</strong>
                                        </h2>
                                      </div>


                                      <div className="col-md-6">
                                        <h2 className="card-inside-title mt-2" >
                                          <strong>Drishti Total</strong>
                                        </h2>
                                      </div>
                                      <div className="col-md-4 text-center ml-2">
                                        {Array.from({ length: 1 }, (item, index) => {
                                          return (
                                            <input
                                              type="text"
                                              className="form-control text-center m-1"
                                              placeholder="0"
                                              maxLength={500}
                                              max={500}
                                              // name={`drishtiTotal${index}`}
                                              value={x[`drishtiTotal`]}
                                              disabled
                                              // onChange={(e) => handleInputChange(e, i)}
                                              required
                                            />
                                            // <div className="row clearfix">
                                            //   <div className="col-lg-6">
                                            //     <h2 className="card-inside-title" className="card-inside-title text-center">
                                            //       <strong>April</strong>
                                            //     </h2>
                                            //   </div>
                                            //   <div className="col-lg-6">

                                            //     <input
                                            //       type="text"
                                            //       className="form-control"
                                            //       placeholder="0"
                                            //       maxLength={500}
                                            //       max={500}
                                            //       // name={`value${index}`}
                                            //       // value={x[`value${index}`]}
                                            //       // onChange={(e) => handleInputChange(e, i)}
                                            //       required
                                            //     />

                                            //   </div>
                                            // </div>

                                          )

                                        })}
                                      </div>
                                      <br></br>

                                      <div className="col-md-6 mt-5" >
                                        <h1 className="card-inside-title ml-1" style={{ fontSize: "20px" }}>
                                          <strong>Month</strong>
                                        </h1>
                                      </div>
                                      <div className="col-md-6 mt-5">
                                        <h1 className="card-inside-title ml-3" style={{ fontSize: "20px" }}>
                                          <strong>No.Of Vilakshan</strong>
                                        </h1>
                                      </div>


                                      {Months ? (
                                        <>
                                          {Array.from({ length: 12 }, (item, index) => {
                                            return (
                                              <>
                                                <div className="col-md-6 m-1">
                                                  <h2 className="card-inside-title " >
                                                    <strong>{Months[index]}</strong>
                                                  </h2>
                                                </div>
                                                <div className="col-md-4">
                                                  <input
                                                    type="number"
                                                    className="form-control text-center m-1"
                                                    placeholder="0"
                                                    maxLength={500}
                                                    max={500}
                                                    name={`value${index}`}
                                                    value={x[`value${index}`] > 0 ? x[`value${index}`] : 0}
                                                    onChange={(e) => handleInputChange(e, i)}
                                                    required
                                                    disabled
                                                  />
                                                </div>
                                                {console.log(parseInt(inputListFinal[i].value0) + parseInt(inputListFinal[i].value1) + parseInt(inputListFinal[i].value2) + parseInt(inputListFinal[i].value3) + parseInt(inputListFinal[i].value4) + parseInt(inputListFinal[i].value5) + parseInt(inputListFinal[i].value6) + parseInt(inputListFinal[i].value7) + parseInt(inputListFinal[i].value8) + parseInt(inputListFinal[i].value9) + parseInt(inputListFinal[i].value10) + parseInt(inputListFinal[i].value11))}

                                                {/* {console.log([1, 2, 3, 4].reduce((a, b) => a + b, 0))} */}
                                              </>

                                            )

                                          })}

                                          {Array.from({ length: 1 }, (item, index) => {
                                            return (
                                              <>
                                                <div className="col-md-6 m-1">
                                                  <h2 className="card-inside-title" >
                                                    <strong>Total</strong>
                                                  </h2>
                                                </div>
                                                <div className="col-md-4">
                                                  <input
                                                    type="number"
                                                    className="form-control text-center m-1"
                                                    placeholder="0"
                                                    maxLength={500}
                                                    max={500}
                                                    name={`Total${index}`}
                                                    // value={valSum(inputListFinal[i])}
                                                    value={x[`Total`]}

                                                    disabled
                                                    // onChange={(e) => handleInputChange(e, i)}
                                                    required
                                                  />
                                                </div>



                                                {x[`drishtiTotal`] == x[`Total`] ? (
                                                  <div className="col-md-10 text-center p-5 bold">Month On Month Calculation Matched</div>
                                                ) : (
                                                  <div className="col-md-10 text-center p-5 bold">Month On Month Calculation Not Matched</div>
                                                )}
                                                {console.log(parseInt(inputListFinal[i].value0) + parseInt(inputListFinal[i].value1) + parseInt(inputListFinal[i].value2) + parseInt(inputListFinal[i].value3) + parseInt(inputListFinal[i].value4) + parseInt(inputListFinal[i].value5) + parseInt(inputListFinal[i].value6) + parseInt(inputListFinal[i].value7) + parseInt(inputListFinal[i].value8) + parseInt(inputListFinal[i].value9) + parseInt(inputListFinal[i].value10) + parseInt(inputListFinal[i].value11))}

                                                {/* {console.log([1, 2, 3, 4].reduce((a, b) => a + b, 0))} */}


                                              </>

                                            )

                                          })}







                                        </>



                                      ) : null}


                                    </div>
                                  </form>
                                </div>
                              </div>

                            </>

                          )
                        })}
                      </div>
                    </div>

                  </Modal.Body>
                </Modal>

                <div style={{ marginTop: 30 }}></div>
                {/* {renderTable()} */}

                {/* <div className="row clearfix">
                              <div className="col-md-12">
                                <div class="table-responsive" id="Table">
                                  <table class="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Vilakshan and Associated Parameters</th>
                                        <th>FY 2021-22</th>
                                        <th>FY 2022-23</th>
                                        <th>FY 2023-24</th>
                                        <th>FY 2024-25</th>
                                        <th>FY 2025-26</th>
                                        <th>Action</th>

                                      </tr>
                                    </thead>
                                    <tbody>
                                      {completeData.map((item, key) => (
                                        <tr>
                                          <td>{item.drishti_parameter}</td>
                                          <td>{item.year_1}</td>
                                          <td>{item.year_2}</td>
                                          <td>{item.year_3}</td>
                                          <td>{item.year_4}</td>
                                          <td>{item.year_5}</td>
                                          <td colspan="8">
                                            <div class="btn-group">
                                              <button
                                                type="submit"
                                                title="edit"
                                                class="btn btn-success zmdi zmdi-edit waves-effect pull-left"
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
                                </div>
                              </div>
                            </div> */}



                <Modal
                  size="sm"
                  show={Mupdate}
                  onHide={() => setMupdate(false)}
                  aria-labelledby="example-modal-sizes-title-sm"
                >
                  <Modal.Body >Form Update Successful</Modal.Body>
                </Modal>

              </>
            ) : (null)
            }


            <div className="row clearfix ml-3 m-5">
              <button
                type="button"
                onClick={handleSubmit}
                class="btn savebtn btn-square waves-effect"
              >
                SAVE <i className="ml-1 zmdi zmdi-save " />
              </button>

              {completeData.length > 0 ? (<button type="button" class="btn viewbtn  waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={HandleSubmit}>SUBMIT <i className="ml-1 zmdi zmdi-check " /> </button>
              ) : null}



            </div>
            {completeData.length > 0 ? (
              <>
                <button
                  type="button"
                  class="ml-4 btn viewbtn waves-effect ml-5"
                  onClick={ViewModel}
                >
                  View  <i className="ml-1 zmdi zmdi-eye " />                        </button>
                <button type="button" class="btn downloadbtn waves-effect" onClick={exportPDFWithMethod}>Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i></button>
              </>
            ) : null}

          </div>
        </div>
      </div>) : null}







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
          <Button variant="primary" onClick={deleteConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        size="lg"
        show={editModal}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit VilakshanMap
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div className="body">
                    {/* <form> */}
                    <h2 className="card-inside-title" className="card-inside-title">
                      <strong>Vilakshan and Associated Parameters </strong>
                    </h2>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Vilakshan and Associated Parameters"
                      name="vilakParaE"
                      onChange={changeInpts}
                      value={vilakParaE}
                    />
                    {/* <input type="text" onChange={changeInpt} value={vilakParaE}/> */}
                    <h2 className="card-inside-title" className="card-inside-title">
                      <strong>
                        FYE {Fdate}-{date + 1}
                      </strong>
                    </h2>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`FYE ${Fdate}-${date + 1}`}
                      name="fyE1"
                      onChange={(event) => {
                        setfyE1(event.target.value);
                      }}
                      value={fyE1}
                    />
                    <h2 className="card-inside-title" className="card-inside-title">
                      <strong>
                        FYE {Fdate + 1}-{date + 2}
                      </strong>
                    </h2>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`FYE ${Fdate + 1}-${date + 2}`}
                      name="fyE2"
                      onChange={(event) => {
                        setfyE2(event.target.value);
                      }}
                      value={fyE2}
                    />
                    <h2 className="card-inside-title" className="card-inside-title">
                      <strong>
                        FYE {Fdate + 2}-{date + 3}
                      </strong>
                    </h2>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`FYE ${Fdate + 2}-${date + 3}`}
                      name="fyE3"
                      onChange={(event) => {
                        setfyE3(event.target.value);
                      }}
                      value={fyE3}
                    />
                    <h2 className="card-inside-title" className="card-inside-title">
                      <strong>
                        FYE {Fdate + 3}-{date + 4}
                      </strong>
                    </h2>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={fyE4}
                      name="fyE4"
                      onChange={(event) => {
                        setfyE4(event.target.value);
                      }}
                      value={fyE4}
                    />

                    <h2 className="card-inside-title" className="card-inside-title">
                      <strong>
                        FYE {Fdate + 4}-{date + 5}
                      </strong>
                    </h2>
                    <input
                      type="text"
                      className="form-control"
                      name="setfyE5"
                      placeholder={`FYE ${Fdate + 4}-${date + 5}`}
                      onChange={(event) => {
                        setfyE5(event.target.value);
                      }}
                      value={fyE5}
                    />
                    <div style={{ marginTop: 20 }}></div>
                    <button
                      type="button"
                      onClick={() => OnSubmitUpdate(editId)}
                      class="btn savebtn btn-square waves-effect"
                    >
                      Update
                    </button>
                    {/* </form> */}
                  </div>
                  <div style={{ marginTop: 30 }}></div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
}
