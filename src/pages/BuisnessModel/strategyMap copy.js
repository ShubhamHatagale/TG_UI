import React, { useState, useEffect } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { Line } from "react-chartjs-2";
import TextField from "@material-ui/core/TextField";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Modal from "react-bootstrap/Modal";
import ModalSubmit from "../../components/ModalSubmit";
import { Button, FormControl, InputLabel, MenuItem, NativeSelect, Select } from "@material-ui/core";

export default function Form(props) {
  const history = useHistory();
  var s_id = localStorage.getItem('tr_id')
  const [problem_solving, setproblem_solving] = useState("");
  const [org_name, setorg_name] = useState("");
  const [product_service_offering_by, setproduct_service_offering_by] = useState("");
  const [customerSegmentData, setcustomerSegmentData] = useState();

  const [inputListFeature, setInputListFeature] = useState([{ featues: "" }]);
  const [inputList, setInputList] = useState([{ competition: "" }]);
  const [inputListddl, setInputListddl] = useState([{}]);
  const [customerList, setCustomerList] = useState([{}]);
  const [customerList2, setCustomerList2] = useState([{}]);

  const [allList, setallList] = useState("");
  const [EditList, setEditList] = useState([{}]);
  const [inputListFinal, setInputListFinal] = useState([{ competition: "" }]);

  const [edituser, setedituser] = useState(false);
  const [Finalizationddl, setFinalizationddl] = useState("");
  const [total, settotal] = useState(0);
  const [value1, setvalue1] = useState("");
  const [value2, setvalue2] = useState("");
  const [value3, setvalue3] = useState("");
  const [value4, setvalue4] = useState("");
  const [holdValue, setholdValue] = useState([]);
  const [pointData, setpointData] = useState([]);
  const [pointData2, setpointData2] = useState([]);

  const [staticarry, setstaticarry] = useState([]);
  const [chartFeature, setchartFeature] = useState([]);
  const [competition, setcompetion] = useState([]);
  const [limit, setLimit] = useState(0);
  let no = holdValue.length;
  let firstValue = [];
  let firstValue2 = [];

  let allfeatueforchart = [];
  let allcompetition = [];
  const options = ["Competition A", "Competition B"];

  const [viewModal, setviewModal] = useState(false);
  const [ShowPdf, setShowPdf] = useState(false);
  const pdfExportComponent = React.useRef(null);
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

  const [basisofplayground, setbasisofplayground] =
    useState("Naishtya Statement");
  const [defineplayground, setdefineplayground] = useState(
    "Time Period and No of Vilakshan Units"
  );


  const [inputList2, setInputList2] = useState([{ featues: "", noofpossiblity: "", possiblity: "", choicemade: "" }]);
  const [text_stmt, settext_stmt] = useState("");
  const [valPropData, setvalPropData] = useState("");

  const [PossibleCombination, setPossibleCombination] = useState("");
  const [defVal, setdefVal] = useState("");
  const [AllValues, setAllValues] = useState([{ data: "" }]);
  const [AllGraphData, setAllGraphData] = useState([]);
  const [gval, setgval] = useState("");


  const [pdfShowDes, setpdfShowDes] = useState(0);

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


  function toPartitions(size) {
    var partition = [];
    return function (acc, v) {
      partition.push(v);
      if (partition.length === size) {
        acc.push(partition);
        partition = [];
      }
      return acc;
    };
  }



  useEffect(() => {
    GetallRecords();
  }, []);



  const GetallRecords = () => {
    if (!s_id) {
      history.push("Not_support");
    }
    var myGetHeaders = new Headers();
    myGetHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myGetHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/valueprop/user/` + `${s_id}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {

        let MyValues = resData.data;
        // console.log("In UseEffect Function", MyValues)
        if (MyValues.length > 0) {
          setedituser(true)
        }
        MyValues.map((item, key) => {
          let Feature = eval(item.features);
          // console.log("Dataa to get map", Feature)
          setPossibleCombination(item.possible_combination)
          setInputList2(Feature)
          settext_stmt(resData.data[0].text_stmt);
          setvarifiedValue(resData.data[0].verified);
          setUpid(resData.data[0].id);

        })
        // settext_stmt(resData.data[0].text_stmt);
        // console.log(resData.data[0].text_stmt);

        setvalPropData(resData.data);
      })

    var myGetHeaders = new Headers();
    myGetHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myGetHeaders,
      redirect: "follow",
    };

    fetch(
      `https://parivartan.transganization.com/nodejs/masters/parivartan_user/user/${s_id}`,
      requestOptions
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

    fetch(`https://parivartan.transganization.com/nodejs/masters/valueprop/user/` + `${s_id}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        let MyValues = resData.data;
        // console.log("In UseEffect Function", MyValues);

        let data;
        MyValues.map((item, key) => {
          let Feature = eval(item.features);

          settotal(Feature.length);
          Feature.map((item, key) => {
            holdValue.push({});
            allfeatueforchart.push(item.featues)
            // console.log("Pushed data", holdValue);
          });
          setchartFeature(allfeatueforchart);
          // setInputList(data)
          setCustomerList(holdValue);
          // console.log("Dataa to get map", Feature);
          setPossibleCombination(item.possible_combination);
          setInputListFeature(Feature);
        });
      });

    fetch(`https://parivartan.transganization.com/nodejs/masters/customerSegment/user/${s_id}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        // setcompleteData(resData.data)
        // console.log("In Beliver Get all Reccords Function", resData.data.length);
        if (resData.data.length > 0) {
          setorg_name(resData.data[0].org_name);
          setproduct_service_offering_by(resData.data[0].product_service_offering_by);
          setproblem_solving(resData.data[0].problem_solving);

          // console.log(resData.data)
          let MyValues = resData.data;
          // console.log("In UseEffect Function", MyValues);

        }
        // setShowData(true)
      });

    fetch(
      `https://parivartan.transganization.com/nodejs/masters/competionsheet/user/${s_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {
        let MyValues = resData.data;
        if (MyValues.length > 0) {
          setedituser(true);
          // setUpid(resData.data[0].id);

        }
        // console.log("Edit Values", MyValues);




        MyValues.map((item, key) => {
          let Feature = eval(item.features);
          let Feature2 = eval(item.features2);
          let abc = item.features;
          let valoDisp;
          console.log(Feature)

          console.log(
            Feature.filter(({ is_display }) => is_display === 1)
          );

          // console.log("item.features", item.features2);
          setCustomerList(Feature);
          setCustomerList2(Feature2);

          // console.log("featureValueLen", Feature[0])
          if (Feature.length > 0) {
            let sub_array = [];
            let super_array = [];

            let sub_array2 = [];
            let super_array2 = [];

            // console.log("Featurea", Feature);
            // const result = Feature.filter(item => item.is_display === 0);
            // console.log(result,"resVal");

            // const resu = Feature.filter(item => item.isDisplay === "");
            valoDisp = Feature.filter(({ is_display }) => is_display === 1)

            valoDisp.map((x, i) => {
              // console.log("hhval", i, x.value0, x.value1, x.value2, x.value3, x.value4, x.value5, x.value6, x.value7, x.value8, x.value9, x.value10, x.value11, x.value12, x.value13, x.value14, x.value15, x.value16, x.value17, x.value18, x.value19, x.value20);
              sub_array.push(x.value0, x.value1, x.value2, x.value3, x.value4, x.value5, x.value6, x.value7, x.value8, x.value9, x.value10, x.value11, x.value12, x.value13, x.value14, x.value15, x.value16, x.value17, x.value18, x.value19, x.value20);
              super_array.push(sub_array.slice(0));
              // console.log("arrayALLPartionnedLength", super_array);

            })

            Feature2.map((d, j) => {
              // console.log("hhval2", j, d.val0, d.val1, d.val2, d.val3, d.val4, d.val5);
              sub_array2.push(d.val0, d.val1, d.val2, d.val3, d.val4, d.val5, d.val6, d.val7, d.val8, d.val9, d.val10, d.val11, d.val12, d.val13, d.val14, d.val15, d.val16, d.val17, d.val18, d.val19, d.val20, d.val21, d.val22, d.val23, d.val24, d.val25);
              // super_array2.push(sub_array.slice(0));
              // console.log("arrayALLPartionnedLength2", sub_array2);
              setpointData2(sub_array2)

            })


            // console.log("lengthttt", super_array[0].length);
            if (super_array[0]) {
              let partitionCount = super_array[0].length;
              // alert(super_array.length-1);
              let arrayALLPartionned = super_array[super_array.length - 1].reduce(toPartitions(partitionCount), []);
              // console.log("arrayALLPartionnedLength", arrayALLPartionned);
              if (arrayALLPartionned.length > 0) {
                // console.log("arrayp", arrayALLPartionned);

                setAllValues(arrayALLPartionned)
                // alert("pushed")
              }
            } else {
              return false;
            }

            // super_array[2].reduce(toPartitions(3), []);
            // console.log("fruitArr", arrayALLPartionned);
          }
          // console.log("fruitArr", super_array[2]);



          setdefVal(valoDisp[0].competition);
          setInputListFinal(valoDisp);
          {
            valoDisp.map((x, i) => {
              // if (i === 0 ) {
              // console.log("Array Data", x[`value${i}`]);
              firstValue.push(x[`value${i}`])
              allcompetition.push(x.competition)
              // console.log("The First Value", firstValue)
              // }
            })
          }
          setstaticarry(firstValue);
          setcompetion(allcompetition);
        });
      });



    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/busiPlayground2`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData.data);
        let get_list = resData.data;
        get_list.map((item, key) => {
          // console.log(item.basisofplayground, item.defineplayground);
          setbasisofplayground(item.basisofplayground);
          setdefineplayground(item.defineplayground);
          // alert(item.Finalizationddl);
          // setdefineplayground(item.defineplayground);

        });
        // setbusiPlaygrounds(resData.data);
      })
      .catch((error) => console.log("error", error));

  }


  const ChangeFinalization = (event, value) => {
    // console.log("change the value", value);
    setAllValues([""]);
    setFinalizationddl(value);
    let alldata = [];
    // console.log("customerList are", customerList)
    // console.log("customerList2 are", customerList2)

    var ids = customerList.reduce((ids, thing) => {
      if (thing.competition === value) {
        // console.log("T", thing)
        ids.push(thing.value0);
        ids.push(thing.value1);
        ids.push(thing.value2);
        ids.push(thing.value3);
        ids.push(thing.value4);
        ids.push(thing.value5);
        ids.push(thing.value6);
        ids.push(thing.value7);
        ids.push(thing.value8);
        ids.push(thing.value9);
        ids.push(thing.value10);
        ids.push(thing.value11);
        ids.push(thing.value12);
        ids.push(thing.value13);
        // console.log("--->--->", ids)
      }
      return ids;
    }, []);

    var ids2 = customerList2.reduce((ids2, thing2) => {
      // alert(thing2.val0)
      if (thing2.val0 != "") {
        ids2.push(thing2.val0);
        ids2.push(thing2.val1);
        ids2.push(thing2.val2);
        ids2.push(thing2.val3);
        ids2.push(thing2.val4);
        ids2.push(thing2.val5);
        ids2.push(thing2.val6);
        ids2.push(thing2.val7);
        ids2.push(thing2.val8);
        ids2.push(thing2.val9);
        ids2.push(thing2.val10);
        ids2.push(thing2.val11);
        ids2.push(thing2.val12);
        ids2.push(thing2.val13);
      }
      return ids2;
    }, []);

    // console.log("cnp------------>", ids2);

    if (value === "CompetitionA") {
      setLimit(1)
    }
    if (value === "CompetitionB") {
      setLimit(2)
    }
    if (value === "CompetitionC") {
      setLimit(3)
    }
    if (value === "CompetitionD") {
      setLimit(4)
    }
    // console.log("Filtered", ids)
    // console.log("Filtered2", ids2)

    // console.log("Value Change", alldata)
    setpointData(ids)
    setpointData2(ids2)
    setFinalizationddl(value)
    // console.log("------>rrr", ids)
  };

  // console.log("checkarrayALLPartionned", AllValues);

  if (AllValues) {
    // console.log("checkarrayALLPartionned", AllValues.length);
    // console.log("AllValues[0]", AllValues[0]);
    // console.log("AllValues[1]", AllValues[1]);

  }

  var data = {
    labels: chartFeature,
    datasets: [
      {
        label: Finalizationddl ? Finalizationddl : "Select",
        data: pointData,
        fill: false,
        borderColor: "#742774",
      },
      {
        label: org_name,
        data: pointData2,
        fill: false,
        borderColor: "#3C876B",

      },
    ],

  };



  // console.log("dddd", pointData);
  // console.log("dddd", pointData2);

  // console.log("dataVar", data);

  var letters = '0123456789ABCDEF';
  var color = '#';
  // console.log("dddAllValuesd", AllValues);

  AllValues.map((x, i) => {
    data.datasets.push({
      "label": competition[i],
      "data": x,
      "borderColor": '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    })
  })

  let val22 = [];
  // console.log("val22", val22)
  var arrayString = firstValue2.toString();
  const jjj = arrayString.replace("'", "a");
  // console.log("ars", jjj);


  // handle input submit
  const OnSubmitHandle = () => {
    setCustomerList([...customerList], inputList);
    let competition = [];
    let Values = [];
    // allObject.push(inputList);
    inputList.map((comp, key) => {
      competition.push(comp);
    });

    customerList.map((item, key) => {
      if (Object.keys(item).length === 3) {
        Values.push(item);

        for (var key in item) {
          // console.log("Key Value is", item);
          // console.log("Key Value is", item[key]);
          // console.log("Key Value is", allObject);
        }
      }
    });
    var allObject = [...competition, ...Values];
    // console.log("all datra", allObject);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // inputList.map((item,key)=>{
    var raw = JSON.stringify({
      features: allObject,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/competionsheet/` + `${s_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {
        // console.log(resData);
        if (resData.status == 200) {
          console.log("Values Submitted Succesfully");
        }
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
      fetch(`https://parivartan.transganization.com/nodejs/masters/competionsheet/verify/${Upid}`, requestOptions)
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
          // console.log(`statusCode: ${res.statusCode}`)
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

      <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
        {/* {firstValue2[0]} */}

        {/* {jjj} */}
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card p-4 mt-2">
              {inputListFeature && inputListFinal ? (
                <div className="body p-5">
                  <div className="header">
                    {/* <h2>
                <strong>Possible Combination  :{PossibleCombination}
                </strong>
                </h2> */}
                  </div>
                  <div style={{ marginTop: 20 }}></div>

                  {inputListFinal.map((x, i) => {
                    // console.log("competitionDropCheck", competition)
                    if (i === limit) {
                      return (
                        <div className="row clearfix">
                          <div className="col">
                            <div className="form-group" style={{ float: "left" }}>
                              <Autocomplete
                                className="float-left"
                                id="controllable-states-demo"
                                defaultValue={Finalizationddl}
                                options={competition}

                                // onChange={}
                                // style={{ width: 0 }}
                                onChange={(event, value) => {
                                  ChangeFinalization(event, value);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} variant="outlined" />
                                )}

                              />
                            </div>
                            <div className="mt-2"  >
                              <Button variant="outlined" style={{ marginLeft: "8px" }} onClick={() => GetallRecords()}>Show All</Button>

                            </div>
                          </div>



                        </div>
                      );
                    }
                  })}
                  <div className="row clearfix">
                    <Line data={data} />
                  </div>

                  <div style={{ marginTop: 30 }}></div>
                  <button
                    type="submit"
                    class="btn savebtn waves-effect"
                    onClick={OnSubmitHandle}
                  >
                    SAVE <i className="ml-1 zmdi zmdi-save " />
                  </button>
                  <button
                    type="button"
                    class="btn viewbtn waves-effect"
                    onClick={ViewModel}
                  >
                    View  <i className="ml-1 zmdi zmdi-eye " />                    </button>

                  <button type="button" class="btn savebtn waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={HandleSubmit}>SUBMIT <i className="ml-1 zmdi zmdi-check " /> </button>

                  {/* <div> */}
                  <button
                    type="button"
                    class="btn downloadbtn waves-effect"
                    onClick={exportPDFWithMethod}
                  >
                    Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
                  </button>

                </div>
                // </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>




      {/* For Pdf -----------------------> */}
      <div
        style={{
          position: "absolute",
          left: "-3000px",
          top: 0,
        }}
      >
        {/* // Strategy Map ----->pdf */}
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
                  Business Model
                </div>
              </div>
              <Modal.Title id="example-modal-sizes-title-lg">

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Customer Segment started */}
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
                                Customer Segmentation
                              </div>
                              <div
                                className="headText"
                              >
                                1. Your Organization Name

                              </div>
                              <div
                                className="dynamicContent"
                              >
                                {org_name.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                              </div>
                            </div>
                          </div>
                          <div className="row clearfix">
                            <div className="col-md-12">
                              <div
                                className="headText"
                              >
                                2. Products/Services Offering by




                              </div>
                              <div
                                className="dynamicContent"
                              >
                                {product_service_offering_by.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                              </div>
                            </div>
                          </div>
                          <div className="row clearfix">
                            <div className="col-md-12">
                              <div
                                className="headText"
                              >
                                3. What is the problem you are solving?

                              </div>
                              <div
                                className="dynamicContent"
                              >
                                {problem_solving.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                                  data={inputList.slice(0, 2)}
                                >
                                  <Column
                                    field="customer_face"
                                    title="List of Customer Face"
                                    width="420px"
                                  />
                                </Grid>
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
                    data={inputList.slice(0, 2)}
                  >
                    <Column
                      field="firstName"
                      title="List of Customer Face"
                      width="420px"
                    />
                  </Grid>
                </div>
              </div>
            </div> */}
                        </div>
                      </div>
                      <div style={{ marginTop: 30 }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* playground business model */}

              <div className="container-fluid">
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                      <div>
                        <div id="divToPrint" className="mt4 pdfBody">
                          <div className="row clearfix">
                            {/* <div className="col-md-12">
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
                  Buiseness Model
                </h1>
              </div> */}
                          </div>
                          <div className="row clearfix">
                            <div className="col-md-12">
                              <div
                                className="pdfHeader"
                              >
                                Playground Buiseness Model

                              </div>
                              <div
                                className="headText"
                              >
                                1. Basis of your Playground


                              </div>
                              <div
                                className="dynamicContent"
                              >
                                {basisofplayground.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                              </div>
                            </div>
                          </div>
                          <div className="row clearfix">
                            <div className="col-md-12">
                              <div
                                className="headText"
                              >
                                2. Define your Playground

                              </div>
                              <div
                                className="dynamicContent"
                              >
                                {defineplayground.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                    data={inputList.slice(0, 2)}
                  >
                    <Column
                      field="customer_face"
                      title="List of Customer Face"
                      width="420px"
                    />
                  </Grid>
                </div>
              </div>
            </div> */}

                          {/* <div className="row clearfix">
              <div className="col-md-12">
                <div className="table-responsive">
                  <Grid
                    style={{
                      maxHeight: "400px",
                    }}
                    data={inputList.slice(0, 2)}
                  >
                    <Column
                      field="firstName"
                      title="List of Customer Face"
                      width="420px"
                    />
                  </Grid>
                </div>
              </div>
            </div> */}
                        </div>
                      </div>
                      <div style={{ marginTop: 30 }}></div>
                    </div>
                  </div>
                </div>
              </div>





              <div className="container-fluid">
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12 col-sm-12 ">
                    <div className="card ">
                      <div id="divToPrint" className="mt4 pdfBody ">

                        <div
                          className="pdfHeader"
                        >
                          Value Proposition

                        </div>

                        {inputList2 ? (
                          <div className="body" style={{ overflowX: "scroll" }}>
                            <div className="header">
                              <h2>
                                <strong>Possible Combination  :{PossibleCombination}
                                </strong>
                              </h2>
                            </div>
                            <div style={{ marginTop: 20 }}>
                            </div>
                            <div className="row clearfix" >
                              <div className="col-md-3">
                                <h2 className="card-inside-title">
                                  <strong>Features</strong>
                                </h2>
                              </div>
                              <div className="col-md-2">
                                <h2 className="card-inside-title">
                                  <strong>No of Possiblities</strong>
                                </h2>
                              </div>
                              <div className="col-md-2">
                                <h2 className="card-inside-title">
                                  <strong>Possiblities</strong>
                                </h2>
                              </div>
                              <div className="col-md-2">
                                <h2 className="card-inside-title">
                                  <strong>Choice Made</strong>
                                </h2>
                              </div>
                            </div>
                            {inputList2.map((x, i) => {
                              return (
                                <div className="row clearfix">
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <span>{x.featues}</span>
                                      {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Features"
                        name="featues"
                        value={x.featues}
                        onChange={(e) => handleInputChange(e, i)}
                      /> */}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="form-group">
                                      <span>{x.noofpossiblity}</span>
                                      {/* <input
                        type="text"
                        className="form-control"
                        placeholder="No of Possiblities"
                        name="noofpossiblity"
                        value={x.noofpossiblity}
                        onChange={(e) => handleInputChange(e, i)}
                      /> */}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="form-group">
                                      <span>{x.possiblity}</span>

                                      {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Possiblities"
                        name="possiblity"
                        value={x.possiblity}
                        onChange={(e) => handleInputChange(e, i)}
                      /> */}
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="form-group">
                                      <span>{x.choicemade}</span>

                                      {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Choice Made"
                        name="choicemade"
                        value={x.choicemade}
                        onChange={(e) => handleInputChange(e, i)}
                      /> */}
                                    </div>
                                  </div>

                                  {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList2)}</div> */}
                                </div>
                              );
                            })}

                            {/* <span>{text_stmt}</span> */}

                            <div style={{ marginTop: 30 }}></div>

                          </div>
                        ) : null}
                      </div>
                    </div>

                  </div>
                </div>
              </div>







              {/* Competition Sheet */}
              <div className="container-fluid">
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                      <div id="divToPrint" className="mt4 pdfBody p-3">

                        <div
                          className="pdfHeader"
                        >
                          Competition Sheet

                        </div>
                        <div style={{ marginTop: 20 }}></div>
                        <div className="row clearfix">
                          <div className="col">
                            <div className="form-group">
                              <span>{org_name}</span>

                              {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Features"
                    name="featue"
                    value={org_name}
                    // onChange={(e) => handleInputChange(e, i)}
                    disabled
                  /> */}
                            </div>

                          </div>
                          {inputListFeature.map((x, i) => {
                            return (
                              <div className="col">
                                <div className="form-group">
                                  <span>{x.featues}</span>

                                  {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Features"
                        name="featue"
                        value={x.featues}
                        onChange={(e) => handleInputChange(e, i)}
                        disabled
                      /> */}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {inputListFinal.map((x, i) => {
                          if (i === 0) {
                            return (
                              <div className="row clearfix">
                                <div className="col">
                                  <div className="form-group">
                                    <span>{x.competition}</span>

                                    {/* <input
                          type="text"
                          className="form-control"
                          placeholder="Competition"
                          name="competition"
                          value={x.competition}
                          onChange={(e) => handleInputChange(e, i)}
                        /> */}
                                  </div>
                                </div>
                                {Array.from({ length: total }, (item, index) => {
                                  return (
                                    <div className="col">
                                      <div className="form-group">
                                        <span>{x[`value${index}`]}</span>

                                        {/* <input
                              type="text"
                              className="form-control"
                              placeholder="value"
                              name={`value${index}`}
                              //   name={`value`}
                              value={x[`value${index}`]}
                              onChange={(e) => handleInputChange(e, i)}
                            /> */}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          }
                        })}
                        {inputListFinal.map((x, i) => {
                          if (i === limit) {
                            return (
                              <div className="row clearfix">
                                <div className="col">
                                  <div className="form-group">
                                    {/* <Autocomplete
                          id="controllable-states-demo"
                          defaultValue={Finalizationddl}
                          options={competition}
                          // onChange={}
                          // style={{ width: 0 }}
                          onChange={(event, value) => {
                            ChangeFinalization(event, value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                          )}
                        />{" "} */}
                                  </div>
                                </div>
                                {Array.from({ length: total }, (item, index) => {
                                  return (
                                    <div className="col">
                                      <div className="form-group">
                                        <span>{`value${index}`}</span>

                                        {/* <input
                              type="text"
                              className="form-control"
                              placeholder="value"
                              name={`value${index}`}
                              //   name={`value`}
                              value={x[`value${index}`]}
                              onChange={(e) => handleInputChange(e, i)}
                            /> */}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          }
                        })}
                      </div>

                    </div>
                  </div>
                </div>
              </div>





              <div className="container-fluid">
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card">
                      <div id="divToPrint" className="mt4 pdfBody ">

                        {inputListFeature && inputListFinal ? (
                          <div className="body">
                            <div className="header">

                              <div className="row clearfix">
                                <div className="col-md-12">
                                  <div
                                    className="pdfHeader"
                                  >
                                    Strategy Map

                                  </div>
                                </div>
                              </div>

                            </div>
                            <div style={{ marginTop: 20 }}></div>
                            <div className="row clearfix">
                              <div className="col">
                                <div className="form-group">
                                  <span>{org_name}</span>

                                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Features"
                    name="featue"
                    value={org_name}
                    // onChange={(e) => handleInputChange(e, i)}
                    disabled
                  /> */}
                                </div>

                              </div>
                              {inputListFeature.map((x, i) => {
                                return (
                                  <div className="col">
                                    <div className="form-group">
                                      <span>{x.featues}</span>

                                      {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Features"
                        name="featue"
                        value={x.featues}
                        onChange={(e) => handleInputChange(e, i)}
                        disabled
                      /> */}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            {inputListFinal.map((x, i) => {
                              if (i === 0) {
                                return (
                                  <div className="row clearfix">
                                    <div className="col">
                                      <div className="form-group">
                                        <span>{x.competition}</span>

                                        {/* <input
                          type="text"
                          className="form-control"
                          placeholder="Competition"
                          name="competition"
                          value={x.competition}
                          onChange={(e) => handleInputChange(e, i)}
                        /> */}
                                      </div>
                                    </div>
                                    {Array.from({ length: total }, (item, index) => {
                                      return (
                                        <div className="col">
                                          <div className="form-group">
                                            <span>{x[`value${index}`]}</span>

                                            {/* <input
                              type="text"
                              className="form-control"
                              placeholder="value"
                              name={`value${index}`}
                              //   name={`value`}
                              value={x[`value${index}`]}
                              onChange={(e) => handleInputChange(e, i)}
                            /> */}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }
                            })}
                            {inputListFinal.map((x, i) => {
                              if (i === limit) {
                                return (
                                  <div className="row clearfix">
                                    <div className="col">
                                      <div className="form-group">
                                        {/* <Autocomplete
                          id="controllable-states-demo"
                          defaultValue={Finalizationddl}
                          options={competition}
                          // onChange={}
                          // style={{ width: 0 }}
                          onChange={(event, value) => {
                            ChangeFinalization(event, value);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" />
                          )}
                        />{" "} */}
                                      </div>
                                    </div>
                                    {Array.from({ length: total }, (item, index) => {
                                      return (
                                        <div className="col">
                                          <div className="form-group">
                                            <span>{`value${index}`}</span>

                                            {/* <input
                              type="text"
                              className="form-control"
                              placeholder="value"
                              name={`value${index}`}
                              //   name={`value`}
                              value={x[`value${index}`]}
                              onChange={(e) => handleInputChange(e, i)}
                            /> */}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              }
                            })}

                            <div style={{ marginTop: 30 }}></div>

                          </div>
                        ) : null}

                      </div>

                    </div>
                  </div>
                </div>
              </div>




            </Modal.Body>
          </PDFExport>
        ) : (null)}



        {/* View Modal-----------------------> */}
        <Modal
          size="lg"
          show={viewModal}
          onHide={handleClose}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton style={{ padding: "10px" }}>
            <div className="col-md-12 row" >
              <div className="col-md-6">
                <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
              </div>
              <div className="col-md-6 pageHeading" >
                Business Model
              </div>
            </div>
            <Modal.Title id="example-modal-sizes-title-lg">

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Customer Segment started */}
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
                              Customer Segmentation
                            </div>
                            <div
                              className="headText"
                            >
                              1. Your Organization Name

                            </div>
                            <div
                              className="dynamicContent"
                            >
                              {org_name.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                            </div>
                          </div>
                        </div>
                        <div className="row clearfix">
                          <div className="col-md-12">
                            <div
                              className="headText"
                            >
                              2. Products/Services Offering by




                            </div>
                            <div
                              className="dynamicContent"
                            >
                              {product_service_offering_by.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                            </div>
                          </div>
                        </div>
                        <div className="row clearfix">
                          <div className="col-md-12">
                            <div
                              className="headText"
                            >
                              3. What is the problem you are solving?

                            </div>
                            <div
                              className="dynamicContent"
                            >
                              {problem_solving.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                                data={inputList.slice(0, 2)}
                              >
                                <Column
                                  field="customer_face"
                                  title="List of Customer Face"
                                  width="420px"
                                />
                              </Grid>
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
                              data={inputList.slice(0, 2)}
                            >
                              <Column
                                field="firstName"
                                title="List of Customer Face"
                                width="420px"
                              />
                            </Grid>
                          </div>
                        </div>
                      </div> */}
                      </div>
                    </div>
                    <div style={{ marginTop: 30 }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* playground business model */}

            <div className="container-fluid">
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="card">
                    <div>
                      <div id="divToPrint" className="mt4 pdfBody">
                        <div className="row clearfix">
                          {/* <div className="col-md-12">
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
                            Buiseness Model
                          </h1>
                        </div> */}
                        </div>
                        <div className="row clearfix">
                          <div className="col-md-12">
                            <div
                              className="pdfHeader"
                            >
                              Playground Buiseness Model

                            </div>
                            <div
                              className="headText"
                            >
                              1. Basis of your Playground


                            </div>
                            <div
                              className="dynamicContent"
                            >
                              {basisofplayground.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                            </div>
                          </div>
                        </div>
                        <div className="row clearfix">
                          <div className="col-md-12">
                            <div
                              className="headText"
                            >
                              2. Define your Playground

                            </div>
                            <div
                              className="dynamicContent"
                            >
                              {defineplayground.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                              data={inputList.slice(0, 2)}
                            >
                              <Column
                                field="customer_face"
                                title="List of Customer Face"
                                width="420px"
                              />
                            </Grid>
                          </div>
                        </div>
                      </div> */}

                        {/* <div className="row clearfix">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <Grid
                              style={{
                                maxHeight: "400px",
                              }}
                              data={inputList.slice(0, 2)}
                            >
                              <Column
                                field="firstName"
                                title="List of Customer Face"
                                width="420px"
                              />
                            </Grid>
                          </div>
                        </div>
                      </div> */}
                      </div>
                    </div>
                    <div style={{ marginTop: 30 }}></div>
                  </div>
                </div>
              </div>
            </div>





            <div className="container-fluid">
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12 ">
                  <div className="card ">
                    <div id="divToPrint" className="mt4 pdfBody ">

                      <div
                        className="pdfHeader"
                      >
                        Value Proposition

                      </div>

                      {inputList2 ? (
                        <div className="body" style={{ overflowX: "scroll" }}>
                          <div className="header">
                            <h2>
                              <strong>Possible Combination  :{PossibleCombination}
                              </strong>
                            </h2>
                          </div>
                          <div style={{ marginTop: 20 }}>
                          </div>
                          <div className="row clearfix" >
                            <div className="col-md-3">
                              <h2 className="card-inside-title">
                                <strong>Features</strong>
                              </h2>
                            </div>
                            <div className="col-md-2">
                              <h2 className="card-inside-title">
                                <strong>No of Possiblities</strong>
                              </h2>
                            </div>
                            <div className="col-md-2">
                              <h2 className="card-inside-title">
                                <strong>Possiblities</strong>
                              </h2>
                            </div>
                            <div className="col-md-2">
                              <h2 className="card-inside-title">
                                <strong>Choice Made</strong>
                              </h2>
                            </div>
                          </div>
                          {inputList2.map((x, i) => {
                            return (
                              <div className="row clearfix">
                                <div className="col-md-3">
                                  <div className="form-group">
                                    <span>{x.featues}</span>
                                    {/* <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Features"
                                  name="featues"
                                  value={x.featues}
                                  onChange={(e) => handleInputChange(e, i)}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="form-group">
                                    <span>{x.noofpossiblity}</span>
                                    {/* <input
                                  type="text"
                                  className="form-control"
                                  placeholder="No of Possiblities"
                                  name="noofpossiblity"
                                  value={x.noofpossiblity}
                                  onChange={(e) => handleInputChange(e, i)}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="form-group">
                                    <span>{x.possiblity}</span>

                                    {/* <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Possiblities"
                                  name="possiblity"
                                  value={x.possiblity}
                                  onChange={(e) => handleInputChange(e, i)}
                                /> */}
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="form-group">
                                    <span>{x.choicemade}</span>

                                    {/* <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Choice Made"
                                  name="choicemade"
                                  value={x.choicemade}
                                  onChange={(e) => handleInputChange(e, i)}
                                /> */}
                                  </div>
                                </div>

                                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList2)}</div> */}
                              </div>
                            );
                          })}

                          {/* <span>{text_stmt}</span> */}

                          <div style={{ marginTop: 30 }}></div>

                        </div>
                      ) : null}
                    </div>
                  </div>

                </div>
              </div>
            </div>







            {/* Competition Sheet */}
            <div className="container-fluid">
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="card">
                    <div id="divToPrint" className="mt4 pdfBody p-3">

                      <div
                        className="pdfHeader"
                      >
                        Competition Sheet

                      </div>
                      <div style={{ marginTop: 20 }}></div>
                      <div className="row clearfix">
                        <div className="col">
                          <div className="form-group">
                            <span>{org_name}</span>

                            {/* <input
                              type="text"
                              className="form-control"
                              placeholder="Features"
                              name="featue"
                              value={org_name}
                              // onChange={(e) => handleInputChange(e, i)}
                              disabled
                            /> */}
                          </div>

                        </div>
                        {inputListFeature.map((x, i) => {
                          return (
                            <div className="col">
                              <div className="form-group">
                                <span>{x.featues}</span>

                                {/* <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Features"
                                  name="featue"
                                  value={x.featues}
                                  onChange={(e) => handleInputChange(e, i)}
                                  disabled
                                /> */}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {inputListFinal.map((x, i) => {
                        if (i === 0) {
                          return (
                            <div className="row clearfix">
                              <div className="col">
                                <div className="form-group">
                                  <span>{x.competition}</span>

                                  {/* <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Competition"
                                    name="competition"
                                    value={x.competition}
                                    onChange={(e) => handleInputChange(e, i)}
                                  /> */}
                                </div>
                              </div>
                              {Array.from({ length: total }, (item, index) => {
                                return (
                                  <div className="col">
                                    <div className="form-group">
                                      <span>{x[`value${index}`]}</span>

                                      {/* <input
                                        type="text"
                                        className="form-control"
                                        placeholder="value"
                                        name={`value${index}`}
                                        //   name={`value`}
                                        value={x[`value${index}`]}
                                        onChange={(e) => handleInputChange(e, i)}
                                      /> */}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }
                      })}
                      {inputListFinal.map((x, i) => {
                        if (i === limit) {
                          return (
                            <div className="row clearfix">
                              <div className="col">
                                <div className="form-group">
                                  {/* <Autocomplete
                                    id="controllable-states-demo"
                                    defaultValue={Finalizationddl}
                                    options={competition}
                                    // onChange={}
                                    // style={{ width: 0 }}
                                    onChange={(event, value) => {
                                      ChangeFinalization(event, value);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} variant="outlined" />
                                    )}
                                  />{" "} */}
                                </div>
                              </div>
                              {Array.from({ length: total }, (item, index) => {
                                return (
                                  <div className="col">
                                    <div className="form-group">
                                      <span>{`value${index}`}</span>

                                      {/* <input
                                        type="text"
                                        className="form-control"
                                        placeholder="value"
                                        name={`value${index}`}
                                        //   name={`value`}
                                        value={x[`value${index}`]}
                                        onChange={(e) => handleInputChange(e, i)}
                                      /> */}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }
                      })}
                    </div>

                  </div>
                </div>
              </div>
            </div>





            <div className="container-fluid">
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="card">
                    <div id="divToPrint" className="mt4 pdfBody ">

                      {inputListFeature && inputListFinal ? (
                        <div className="body">
                          <div className="header">

                            <div className="row clearfix">
                              <div className="col-md-12">
                                <div
                                  className="pdfHeader"
                                >
                                  Strategy Map

                                </div>
                              </div>
                            </div>

                          </div>
                          <div style={{ marginTop: 20 }}></div>
                          <div className="row clearfix">
                            <div className="col">
                              <div className="form-group">
                                <span>{org_name}</span>

                                {/* <input
                              type="text"
                              className="form-control"
                              placeholder="Features"
                              name="featue"
                              value={org_name}
                              // onChange={(e) => handleInputChange(e, i)}
                              disabled
                            /> */}
                              </div>

                            </div>
                            {inputListFeature.map((x, i) => {
                              return (
                                <div className="col">
                                  <div className="form-group">
                                    <span>{x.featues}</span>

                                    {/* <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Features"
                                  name="featue"
                                  value={x.featues}
                                  onChange={(e) => handleInputChange(e, i)}
                                  disabled
                                /> */}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          {inputListFinal.map((x, i) => {
                            if (i === 0) {
                              return (
                                <div className="row clearfix">
                                  <div className="col">
                                    <div className="form-group">
                                      <span>{x.competition}</span>

                                      {/* <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Competition"
                                    name="competition"
                                    value={x.competition}
                                    onChange={(e) => handleInputChange(e, i)}
                                  /> */}
                                    </div>
                                  </div>
                                  {Array.from({ length: total }, (item, index) => {
                                    return (
                                      <div className="col">
                                        <div className="form-group">
                                          <span>{x[`value${index}`]}</span>

                                          {/* <input
                                        type="text"
                                        className="form-control"
                                        placeholder="value"
                                        name={`value${index}`}
                                        //   name={`value`}
                                        value={x[`value${index}`]}
                                        onChange={(e) => handleInputChange(e, i)}
                                      /> */}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            }
                          })}
                          {inputListFinal.map((x, i) => {
                            if (i === limit) {
                              return (
                                <div className="row clearfix">
                                  <div className="col">
                                    <div className="form-group">
                                      {/* <Autocomplete
                                    id="controllable-states-demo"
                                    defaultValue={Finalizationddl}
                                    options={competition}
                                    // onChange={}
                                    // style={{ width: 0 }}
                                    onChange={(event, value) => {
                                      ChangeFinalization(event, value);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} variant="outlined" />
                                    )}
                                  />{" "} */}
                                    </div>
                                  </div>
                                  {Array.from({ length: total }, (item, index) => {
                                    return (
                                      <div className="col">
                                        <div className="form-group">
                                          <span>{`value${index}`}</span>

                                          {/* <input
                                        type="text"
                                        className="form-control"
                                        placeholder="value"
                                        name={`value${index}`}
                                        //   name={`value`}
                                        value={x[`value${index}`]}
                                        onChange={(e) => handleInputChange(e, i)}
                                      /> */}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            }
                          })}

                          <div style={{ marginTop: 30 }}></div>

                        </div>
                      ) : null}

                    </div>

                  </div>
                </div>
              </div>
            </div>




          </Modal.Body>
        </Modal>



      </div>



    </>
  );
}
