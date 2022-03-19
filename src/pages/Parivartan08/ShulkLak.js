import React, { useEffect, useState } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ReactExport from "react-data-export";
import Modal from "react-bootstrap/Modal";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import ModalSubmit from "../../components/ModalSubmit";
import { useHistory } from "react-router-dom";

export default function Form() {
  // var dd=getFullYear()
  const history = useHistory();
  var s_id = localStorage.getItem('tr_id')

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const pdfExportComponent = React.useRef(null);
  let [ShulkData, setShulkData] = useState("");
  const [date, setdate] = useState();
  const [Fdate, setFdate] = useState();
  const [showData, setShowData] = useState(false);
  const [formData, setformData] = useState([]);
  const [formValid, setformValid] = useState(false);
  const [revenue, setrevenue] = useState();
  const [cost_of_goods_sold, setcost_of_goods_sold] = useState();
  const [gross_profit, setgross_profit] = useState();
  const [gross_profit_per, setgross_profit_per] = useState();

  const [overhead_expenses, setoverhead_expenses] = useState();
  const [ebidta, setebidta] = useState();
  const [interest, setinterest] = useState();
  const [ebdte, setebdte] = useState();
  const [depreciation, setdepreciation] = useState();
  const [ebtax, setebtax] = useState();
  const [Tax1, setTax1] = useState();
  const [taxamt, settaxamt] = useState();
  const [patax, setpatax] = useState();
  const [total, settotal] = useState();

  const [revenue2, setrevenue2] = useState();
  const [cost_of_goods_sold2, setcost_of_goods_sold2] = useState();
  const [gross_profit2, setgross_profit2] = useState();
  const [overhead_expenses2, setoverhead_expenses2] = useState();
  const [ebidta2, setebidta2] = useState();
  const [interest2, setinterest2] = useState();
  const [ebdte2, setebdte2] = useState();
  const [depreciation2, setdepreciation2] = useState();
  const [ebtax2, setebtax2] = useState();
  const [taxamt2, settaxamt2] = useState();
  const [patax2, setpatax2] = useState();
  const [Mupdate, setMupdate] = useState(false);
  const [Madd, setMadd] = useState(false);
  const [avg_rate, setavg_rate] = useState();
  const [avgDevideBy, setavgDevideBy] = useState();


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

  const exportPDFWithMethod = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const handleClose = () => {
    // setShowData(false);
    setviewModal(false);
  };

  const revenuefn = (event) => {
    let value = Number(event.target.value);
    let value2 = ((Number(gross_profit)) / value);
    setgross_profit_per(value2);
    setgross_profit(value - cost_of_goods_sold);
    setrevenue(value);

    let cal = (value - cost_of_goods_sold)
    let value3 = (cal / value * 100);
    setgross_profit_per(value3);

    // setgross_profit(value);
    // setebidta(value);
    // setebdte(value);
    // setebtax(value);
    // setpatax(value);
    // settotal(revenue);
    // console.log(gross_profit, "/", value)
    // console.log(gross_profit / value)



  };
  const AVG_ratefn = (event) => {
    setavgDevideBy(event.target.value);

    let value = Number(event.target.value);
    let cal = Number(revenue2 / value);

    setavg_rate(cal.toFixed(2));
    // console.log()
    // setrevenue2(value + Number(ebidta2));
    // setcost_of_goods_sold2(value + Number(ebidta2));


  };

  const cost_of_goods_soldfn = (event) => {
    let value = Number(event.target.value);
    let cal = (Number(revenue) - value)
    console.log(cal / (Number(revenue)));
    let value2 = (cal / (Number(revenue)) * 100);
    let cal1 = (revenue - value);
    setgross_profit(cal1.toFixed(2))
    setgross_profit_per(value2);

    setcost_of_goods_sold(value);
    // setebidta(revenue - value);
    // setebdte(revenue - value);
    // setebtax(revenue - value);
    // setpatax(revenue - value);
  };

  const gross_profitfn = (event) => {
  };

  const gross_profit_perfn = (event) => {
  };

  const overhead_expensesfn = (event) => {
    let value = Number(event.target.value);
    let cal = (Number(gross_profit - value))
    setebidta(cal.toFixed(2));
    setoverhead_expenses(value);


    // console.log((Number(cost_of_goods_sold / revenue) / 1));
    setoverhead_expenses2(value);
    let cc = value + Number(ebidta2);
    setgross_profit2(cc.toFixed(2));
    // setrevenue2(value + Number(ebidta2));
    setcost_of_goods_sold2(value + Number(ebidta2));
    // setavg_rate(revenue2 / avgDevideBy);
    let value2 = value + Number(ebidta2)
    setavg_rate(value2 / avgDevideBy);
    let cal1 = (cc / 0.2);
    setrevenue2(cal1.toFixed(2));
    let cal2 = (cal - cc);
    setcost_of_goods_sold2(cal2.toFixed(2));

  };

  const ebidtafn = (event) => {
    setebidta(event.target.value);
  };




  const interestfn = (event) => {
    let value = Number(event.target.value);
    setinterest(value);
    setinterest2(value)

    let cal = Number(ebidta - value);

    setebdte(cal.toFixed(2));
    setebtax(cal.toFixed(2));
    setpatax(cal.toFixed(2));

    let calx = Number(ebdte2) + value;
    setebidta2(calx.toFixed(2))

    let cal2 = (Number(calx) + Number(overhead_expenses));
    setgross_profit2(cal2.toFixed(2));


    let cal3 = (Number(cal2) / Number(gross_profit_per) * 100)
    let revenue2Value = (cal3.toFixed(2));
    setrevenue2(revenue2Value);

    let cal4 = (Number(revenue2Value) - Number(cal2))
    let cost_of_goods_sold2Value = (cal4.toFixed(2));
    setcost_of_goods_sold2(cost_of_goods_sold2Value);

    let cal5 = (Number(revenue2Value) / Number(avgDevideBy))
    setavg_rate(cal5.toFixed(2));

  };

  const ebdtefn = (event) => {
    setebdte(event.target.value);
  };

  const depreciationfn = (event) => {
    let value = Number(event.target.value);

    setdepreciation(value);
    setdepreciation2(value)

    let calx = (ebdte - value);

    setebtax(calx.toFixed(2));

    let cal = value + Number(ebtax2);

    setebdte2(cal.toFixed(2))
    setebidta2(cal.toFixed(2))
    setgross_profit2(cal.toFixed(2))
    setrevenue2(cal.toFixed(2))
    setcost_of_goods_sold2(cal.toFixed(2))
    let value2 = cal
    setavg_rate(value2 / avgDevideBy);

    // setpatax(ebdte - event.target.value);
  };

  const ebtaxfn = (event) => {
    setebtax(event.target.value);
  };

  const Tax1fn = (event) => {
  };

  const taxamtfn = (event) => {
    let value = Number(event.target.value);
    let cal = (Number(ebtax) * value / 100)
    setTax1(cal.toFixed(2));
    console.log(Number(ebtax), "-", cal);
    let value1 = (Number(ebtax) - cal);
    setpatax(value1.toFixed(2));

    settaxamt(value);
    settaxamt2(value);

  };

  const pataxfn = (event) => {
    setpatax(event.target.value);
  };

  const dataSet1 = [
    {
      header: "Revenue",
      amount: revenue,
    },
    {
      header: "Cost of Goods Sold",
      amount: cost_of_goods_sold,
    },
    {
      header: "Gross Profit",
      amount: gross_profit,
    },
    {
      header: "Overhead Expenses",
      amount: overhead_expenses,
    },
    {
      header: "Earning Before Interest, Depreciation, Tax & Amount (EBIDTA)",
      amount: ebidta,
    },
    {
      header: "Interest",
      amount: interest,
    },
    {
      header: "Earning Before Depreciation & Taxes (EBDT)",
      amount: ebdte,
    },
    {
      header: "Depreciation",
      amount: depreciation,
    },
    {
      header: "Earning Before Tax",
      amount: ebtax,
    },
    {
      header: "Tax Amount (as per %)",
      amount: taxamt,
    },
    {
      header: "Profit After Tax",
      amount: patax,
    },
  ]
  const dataSet2 = [
    {
      header: "Revenue",
      amount: revenue2,
    },
    {
      header: "Cost of Goods Sold",
      amount: cost_of_goods_sold2,
    },
    {
      header: "Gross Profit",
      amount: gross_profit2,
    },
    {
      header: "Overhead Expenses",
      amount: overhead_expenses2,
    },
    {
      header: "Earning Before Interest, Depreciation, Tax & Amount (EBIDTA)",
      amount: ebidta2,
    },
    {
      header: "Interest",
      amount: interest2,
    },
    {
      header: "Earning Before Depreciation & Taxes (EBDT)",
      amount: ebdte2,
    },
    {
      header: "Depreciation",
      amount: depreciation2,
    },
    {
      header: "Earning Before Tax",
      amount: ebtax2,
    },
    {
      header: "Tax Amount (as per %)",
      amount: taxamt2,
    },
    {
      header: "Profit After Tax",
      amount: patax2,
    },
  ]
  const revenuefn2 = (event) => {
    let per = (Number(cost_of_goods_sold / revenue) / 1);
    console.log("per : " + per + "gross : " + event);
    let value = ((Number(event)) / per);
    console.log(Number(event) / (Number(cost_of_goods_sold / revenue) / 1))
    setrevenue2(value);
    setcost_of_goods_sold2(value);
    setavg_rate(revenue2 / avgDevideBy);


    return value;
  };

  const cost_of_goods_soldfn2 = (event) => {
    let per = (Number(cost_of_goods_sold / revenue) / 1)
    let value = (Number(event) * per)
    console.log(Number(event) + "" + per);
    // setcost_of_goods_sold2(value);
    setavg_rate(revenue2 / avgDevideBy);

  };

  const overhead_expensesfn2 = (event) => {
    // console.log((Number(cost_of_goods_sold / revenue) / 1));
    setoverhead_expenses2(event.target.value);
    let value = Number(event.target.value);
    let cc = value + Number(ebidta2);
    setgross_profit2(cc.toFixed(2));


    let cal3 = (Number(cc) / Number(gross_profit_per) * 100);
    console.log(Number(cc), " /", Number(gross_profit_per));
    let revenue2Value = (cal3.toFixed(2));
    setrevenue2(revenue2Value);

    let value2 = value + Number(ebidta2)
    setavg_rate(Number(value2 / avgDevideBy).toFixed(2));

    let cal2 = (cal3 - cc);
    setcost_of_goods_sold2(cal2.toFixed(2));

  };

  const ebidtafn2 = (event) => {
    setebidta2(event.target.value)
    let value = Number(event.target.value);
    // setebidta2(value + Number(ebdte2))
    // setgross_profit2(value + Number(ebdte2))
    // setavg_rate(revenue2 / avgDevideBy);

  };

  const gross_profitfn2 = (event) => {

  };

  const interestfn2 = (event) => {
    setinterest2(event.target.value)
    let value = Number(event.target.value);
    let cal = Number(ebdte2) + value;
    setebidta2(cal.toFixed(2))

    let cal2 = (Number(cal) + Number(overhead_expenses));
    setgross_profit2(cal2.toFixed(2));

    let cal3 = (Number(cal2) / Number(gross_profit_per) * 100);
    console.log(Number(cal2), " /", Number(gross_profit_per));
    let revenue2Value = (cal3.toFixed(2));
    setrevenue2(revenue2Value);

    let cal4 = (Number(revenue2Value) - Number(cal2))
    let cost_of_goods_sold2Value = (cal4.toFixed(2));
    setcost_of_goods_sold2(cost_of_goods_sold2Value);

    let cal5 = (Number(revenue2Value) / Number(avgDevideBy))
    setavg_rate(cal5.toFixed(2));

  };

  const ebdtefn2 = (event) => {

  };

  const depreciationfn2 = (event) => {
    setdepreciation2(event.target.value)
    let value = Number(event.target.value);
    let cal = value + Number(ebtax2);

    setebdte2(cal.toFixed(2))
    let cal2 = (Number(cal) + Number(interest2))
    setebidta2(cal2.toFixed(2))

    let cal3 = (Number(cal2) + Number(overhead_expenses))
    setgross_profit2(cal3.toFixed(2))

    let cal4 = (Number(cal3) / Number(gross_profit_per) * 100);
    console.log(Number(cal2), " /", Number(gross_profit_per));
    let revenue2Value = (cal4.toFixed(2));
    setrevenue2(revenue2Value);


    let cal5 = (Number(revenue2Value) - Number(cal3))
    let cost_of_goods_sold2Value = (cal5.toFixed(2));
    setcost_of_goods_sold2(cost_of_goods_sold2Value);


    let val = (revenue2Value / avgDevideBy);
    setavg_rate(val.toFixed(2));

  };

  const ebtaxfn2 = (event) => {

  };

  const pataxfn2 = (event) => {
    setpatax2(event.target.value);
    let value = Number(event.target.value);
    let value2 = (Number(taxamt2) / 100);
    console.log(value2);

    console.log((value, " / ", value2))
    let cal = (value / value2);
    setebtax2(cal.toFixed(2))

    // For depreciation 2
    // setdepreciation2(event.target.value)
    // let value = Number(event.target.value);
    let cal2 = (Number(depreciation) + Number(cal));
    console.log(Number(cal), "+", Number(depreciation))
    setebdte2(cal2.toFixed(2))
    setebidta2(cal2.toFixed(2))
    setgross_profit2(cal2.toFixed(2))
    setrevenue2(cal2.toFixed(2))
    setcost_of_goods_sold2(cal2.toFixed(2))
    let value3 = cal2
    setavg_rate(value3 / avgDevideBy);


    // for interst fn2

    // setinterest2(event.target.value)
    // let value = Number(interest);
    let cal3 = Number(cal2) + Number(interest);
    setebidta2(cal3.toFixed(2))

    let cal4 = (Number(cal3) + Number(overhead_expenses));
    setgross_profit2(cal4.toFixed(2));


    let cal5 = (Number(cal4) / Number(gross_profit_per) * 100)
    let revenue2Value = (cal5.toFixed(2));
    setrevenue2(revenue2Value);

    let cal6 = (Number(revenue2Value) - Number(cal4))
    let cost_of_goods_sold2Value = (cal6.toFixed(2));
    setcost_of_goods_sold2(cost_of_goods_sold2Value.toFixed(2));

    let cal7 = (Number(revenue2Value) / Number(avgDevideBy))
    setavg_rate(cal7.toFixed(2));



  };

  const taxamtfn2 = (event) => {
    settaxamt2(event.target.value)
    let value = Number(event.target.value);


    let valuex = (Number(value) / 100);
    console.log(valuex);

    let value2 = value + Number(patax2)
    // setavg_rate(value2 / avgDevideBy);
    let cal = (patax2 / valuex);
    setebtax2(cal.toFixed(2));


  };

  const ViewModel = () => {
    setviewModal(true);
  };

  useEffect(() => {
    GetallRecords();
  }, []);

  const OnSubmitForm = () => {
    if (ShulkData.length === 0) {
      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        revenue_1: revenue,
        cost_of_goods_sold_1: cost_of_goods_sold,
        gross_profit_1: gross_profit,

        gross_profit_per: gross_profit_per,

        overhead_expenses_1: overhead_expenses,
        ebidta_1: ebidta,
        interest_1: interest,
        ebdt_1: ebdte,
        depreciation_1: depreciation,
        earning_before_tax_1: ebtax,

        Tax1: Tax1,

        tax_amount_1: taxamt,
        profit_after_tax_1: patax,
        revenue_2: revenue2,
        cost_of_goods_sold_2: cost_of_goods_sold2,
        gross_profit_2: gross_profit2,
        overhead_expenses_2: overhead_expenses2,
        ebidta_2: ebidta2,
        interest_2: interest2,
        ebdt_2: ebdte2,
        depreciation_2: depreciation2,
        earning_before_tax_2: ebtax2,
        tax_amount_2: patax2,
        profit_after_tax_2: patax2,

        avgDevideBy: avgDevideBy,
        avg_rate: avg_rate,

        email_id: s_id,
        created_by: s_id
      });
      var requestOptionsrichtext = {
        method: "POST",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(`http://localhost:9002/masters/shulk-lakshya`, requestOptionsrichtext)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Data Added succesfully");
            setMadd(true);
            // setMadd(false);
            setTimeout(() => {
              setMadd(false);
            }, 1000)
          }
          GetallRecords();
        })
        .catch((error) => console.log("error", error));
    }
    else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        revenue_1: revenue,
        cost_of_goods_sold_1: cost_of_goods_sold,
        gross_profit_1: gross_profit,

        gross_profit_per: gross_profit_per,

        overhead_expenses_1: overhead_expenses,
        ebidta_1: ebidta,
        interest_1: interest,
        ebdt_1: ebdte,
        depreciation_1: depreciation,
        earning_before_tax_1: ebtax,

        Tax1: Tax1,

        tax_amount_1: taxamt,
        profit_after_tax_1: patax,
        revenue_2: revenue2,
        cost_of_goods_sold_2: cost_of_goods_sold2,
        gross_profit_2: gross_profit2,
        overhead_expenses_2: overhead_expenses2,
        ebidta_2: ebidta2,
        interest_2: interest2,
        ebdt_2: ebdte2,
        depreciation_2: depreciation2,
        earning_before_tax_2: ebtax2,
        tax_amount_2: patax2,
        profit_after_tax_2: patax2,

        avgDevideBy: avgDevideBy,
        avg_rate: avg_rate,

        email_id: s_id,
        updated_by: s_id
      });
      console.log(rawrich)
      var requestOptionsrichtext = {
        method: "PUT",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };

      // http://localhost:9002/masters/
      fetch(`http://localhost:9002/masters/shulk-lakshya/` + `${Upid}`, requestOptionsrichtext)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Data Added succesfully");
            setMupdate(true);
            // setMupdate(false);
            setTimeout(() => {
              setMupdate(false);
            }, 1000)
          }
          GetallRecords();
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
      `http://localhost:9002/masters/parivartan_user/user/${s_id}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        if (s_id) {
          setbelEmail(resData.data.beliver_email);
          settransEmail(resData.data.tranz_email);
          setbypassEmail(resData.data.bypass_email);
          setbeliverName(resData.data.beliver_name);

        }
      });
    fetch(`http://localhost:9002/masters/shulk-lakshya/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setvarifiedValue(resData.data[0].verified);
        setUpid(resData.data[0].id);
        let get_list = resData.data;
        get_list.map((item, key) => {
          setrevenue(item.revenue_1)
          setcost_of_goods_sold(item.cost_of_goods_sold_1)
          setgross_profit(item.gross_profit_1)
          setgross_profit_per(item.gross_profit_per)

          setoverhead_expenses(item.overhead_expenses_1)
          setebidta(item.ebidta_1)
          setinterest(item.interest_1)
          setebdte(item.ebdt_1)
          setdepreciation(item.depreciation_1)
          setebtax(item.earning_before_tax_1)
          setTax1(item.Tax1);

          settaxamt(item.tax_amount_1)
          setpatax(item.profit_after_tax_1)
          setrevenue2(item.revenue_2)
          setcost_of_goods_sold2(item.cost_of_goods_sold_2)
          setgross_profit2(item.gross_profit_2)
          setoverhead_expenses2(item.overhead_expenses_2)
          setebidta2(item.ebidta_2)
          setinterest2(item.interest_2)
          setebdte2(item.ebdt_2)
          setdepreciation2(item.depreciation_2)
          setebtax2(item.earning_before_tax_2)
          settaxamt2(item.tax_amount_2)
          setpatax2(item.profit_after_tax_2)
          setavgDevideBy(item.avgDevideBy)
          setavg_rate(item.avg_rate)


        });
        setShulkData(resData.data);
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
      fetch(`http://localhost:9002/masters/shulk-lakshya/verify/${Upid}`, requestOptions)
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

      <section class="content" style={{ backgroundColor: "white" }}>
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


        <div class="body_scroll" >
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Shulk Lakshya</h2>
                <button className="btn btn-primary btn-icon mobile_menu" type="button"><i className="zmdi zmdi-sort-amount-desc"></i></button>
              </div>
              {/* <div className="col-lg-5 col-md-6 col-sm-12">
                <button className="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i className="zmdi zmdi-arrow-right"></i></button>
              </div> */}
            </div>
          </div>
          {/* {showData ? ( */}
          <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card p-4 mt-2">
                  <div className="body p-5">
                    <form>
                      <div className="row clearfix">
                        <div className="col-md-4">
                          <h2 >
                            <strong>Headers</strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <h2 >
                            <strong>Amount</strong>
                          </h2>
                        </div>

                        <div className="col-md-4">
                          <span >
                            {/* <strong>AVG Rate per Vilakshan Unit </strong>
                              <strong>No of Expected Vilakshan to be achived to reach Revenue</strong> */}

                          </span>
                        </div>
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Revenue</strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="revenue"
                            onChange={revenuefn}
                            placeholder="Revenue"
                            value={revenue}
                          />
                        </div>

                        {/* <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              name="AVG_rate"
                              onChange={AVG_ratefn}
                              // placeholder="AVG_rate"
                              value={avgDevideBy}
                            />
                          </div> */}
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Cost of Goods Sold </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="cost_of_goods_sold"
                            onChange={cost_of_goods_soldfn}
                            placeholder="Cost of Goods Sold"
                            value={cost_of_goods_sold}
                          />
                        </div>
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Gross Profit </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            id="gross_profit"
                            name="gross_profit"
                            onChange={gross_profitfn}
                            placeholder="Gross Profit"
                            value={gross_profit}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Gross Profit %</strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            id="gross_profit_per"
                            name="gross_profit_per"
                            onChange={gross_profit_perfn}
                            placeholder="Gross Profit Percent"
                            value={gross_profit_per}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Overhead Expenses </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="overhead_expenses"
                            onChange={overhead_expensesfn}
                            placeholder="Overhead Expenses"
                            value={overhead_expenses}
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>
                              Earning Before Interest, Depreciation, Tax & Amount
                              (EBIDTA)
                            </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="ebidta"
                            onChange={ebidtafn}
                            placeholder="Earning Before Interest, Depreciation, Tax & Amount (EBIDTA)"
                            value={ebidta}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Interest </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="setinterest"
                            onChange={interestfn}
                            placeholder="Interest"
                            value={interest}
                          />
                        </div>
                      </div>



                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>
                              Earning Before Depreciation & Taxes (EBDT){" "}
                            </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="ebdtefn"
                            onChange={ebdtefn}
                            placeholder="Earning Before Depreciation & Taxes (EBDT)"
                            value={ebdte}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Depreciation </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="depreciation"
                            onChange={depreciationfn}
                            placeholder="Depreciation"
                            value={depreciation}
                          />
                        </div>
                      </div>
                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Earning Before Tax </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="ebtax"
                            onChange={ebtaxfn}
                            placeholder="Earning Before Tax"
                            value={ebtax}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Tax Amount (as per %) </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="taxamt"
                            onChange={taxamtfn}
                            placeholder="Tax Amount (as per %)"
                            value={taxamt}
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Tax </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="Tax1"
                            onChange={Tax1fn}
                            placeholder="Tax"
                            value={Tax1}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Profit After Tax </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="patax"
                            onChange={pataxfn}
                            placeholder="Profit After Tax"
                            value={patax}
                            readOnly
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div style={{ marginTop: 40 }}></div>



                  {/* Second section start here */}
                  <div className="body">
                    <form>
                      <div className="row clearfix">
                        <div className="col-md-4">
                          <h2 >
                            <strong>Headers</strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <h2 >
                            <strong>Amount</strong>
                          </h2>
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Profit After Tax </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="patax"
                            onChange={pataxfn2}
                            placeholder="Profit After Tax"
                            value={patax2}
                          />
                        </div>
                      </div>



                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Tax Amount (as per %) </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="taxamt"
                            onChange={taxamtfn2}
                            placeholder="Tax Amount (as per %)"
                            value={taxamt2}
                          />
                        </div>
                      </div>


                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Earning Before Tax </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="ebtax"
                            onChange={ebtaxfn2}
                            placeholder="Earning Before Tax"
                            value={ebtax2}
                            readOnly
                          />
                        </div>
                      </div>






                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Depreciation </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="depreciation"
                            onChange={depreciationfn2}
                            placeholder="Depreciation"
                            value={depreciation2}
                          />
                        </div>
                      </div>



                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>
                              Earning Before Depreciation & Taxes (EBDT){" "}
                            </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="ebdtefn"
                            onChange={ebdtefn2}
                            placeholder="Earning Before Depreciation & Taxes (EBDT)"
                            value={ebdte2}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Interest </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="setinterest"
                            onChange={interestfn2}
                            placeholder="Interest"
                            value={interest2}
                          />
                        </div>
                      </div>


                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>
                              Earning Before Interest, Depreciation, Tax & Amount
                              (EBIDTA)
                            </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="ebidta"
                            onChange={ebidtafn2}
                            placeholder="Earning Before Interest, Depreciation, Tax & Amount (EBIDTA)"
                            value={ebidta2}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Overhead Expenses </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="overhead_expenses"
                            onChange={overhead_expensesfn2}
                            placeholder="Overhead Expenses"
                            value={overhead_expenses2}
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Gross Profit </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            id="gross_profit"
                            name="gross_profit"
                            onChange={gross_profitfn2}
                            placeholder="Gross Profit"
                            value={gross_profit2}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Revenue</strong>
                          </h2>
                        </div>
                        <div className="col-md-4">


                          <input
                            type="text"
                            className="form-control"
                            name="revenue"
                            onChange={revenuefn2}
                            placeholder="Revenue"
                            value={revenue2}
                            readOnly
                          />
                        </div>


                      </div>

                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>Cost of Goods Sold </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="cost_of_goods_sold"
                            onChange={cost_of_goods_soldfn2}
                            placeholder="Cost of Goods Sold"
                            value={cost_of_goods_sold2}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="row clearfix" style={{ marginTop: 80 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>AVG Rate per Vilakshan Unit</strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="AVG_rate"
                            onChange={AVG_ratefn}
                            placeholder="AVG Rate per Vilakshan Unit"
                            value={avgDevideBy}
                          />
                        </div>
                      </div>



                      <div className="row clearfix" style={{ marginTop: 20 }}>
                        <div className="col-md-4">
                          <h2 className="card-inside-title">
                            <strong>No of Expected Vilakshan to be achived to reach Revenue </strong>
                          </h2>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            name="AVG_rate"
                            // onChange={AVG_ratefn}
                            placeholder="AVG_rate"
                            value={avg_rate}
                            readOnly
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={OnSubmitForm}
                        class="btn savebtn btn-square waves-effect"
                      >
                        SAVE  <i className="ml-1 zmdi zmdi-save"></i>
                      </button>

                      {ShulkData.length > 0 ? (<button type="button" class="btn viewbtn  waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={HandleSubmit}>SUBMIT  <i className="ml-1 zmdi zmdi-check"></i></button>
                      ) : null}
                    </form>
                    {ShulkData.length > 0 ? (
                      <div>
                        <button
                          type="button"
                          class="btn viewbtn waves-effect"
                          onClick={ViewModel}
                        >
                          View  <i className="ml-1 zmdi zmdi-eye " />                        </button>
                        <button type="button" class="btn downloadbtn waves-effect" onClick={exportPDFWithMethod}>Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i></button>

                        <div
                          style={{
                            position: "absolute",
                            left: "-3000px",
                            top: 0,
                          }}>
                          <PDFExport paperSize="A3" margin="1cm" ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`} forcePageBreak=".page-break">
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
                              <div>
                                <div id="divToPrint" className="mt4 pdfBody">

                                  <div className="row clearfix">
                                    <div className="col-md-12">
                                      <div className="pdfHeader">Shulk Lakshya</div>
                                      <div class="table-responsive" id="Table">
                                        <table class="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th>Headers</th>
                                              <th>Amount</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>Revenue</td>
                                              <td>{ShulkData[0].revenue_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Cost of Goods Sold</td>
                                              <td>{ShulkData[0].cost_of_goods_sold_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Gross Profit</td>
                                              <td>{ShulkData[0].gross_profit_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Overhead Expenses</td>
                                              <td>{ShulkData[0].overhead_expenses_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Earning Before Interest, Depreciation, Tax & Amount (EBIDTA)</td>
                                              <td>{ShulkData[0].ebidta_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Interest</td>
                                              <td>{ShulkData[0].interest_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Earning Before Depreciation & Taxes (EBDT)</td>
                                              <td>{ShulkData[0].ebdt_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Depreciation</td>
                                              <td>{ShulkData[0].depreciation_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Earning Before Tax</td>
                                              <td>{ShulkData[0].earning_before_tax_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Tax Amount (as per %)</td>
                                              <td>{ShulkData[0].tax_amount_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Profit After Tax</td>
                                              <td>{ShulkData[0].profit_after_tax_1}</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row clearfix" className="page-break">
                                    <div class="table-responsive" id="Table">
                                      <table class="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>Headers</th>
                                            <th>Amount</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>Revenue</td>
                                            <td>{ShulkData[0].revenue_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Cost of Goods Sold</td>
                                            <td>{ShulkData[0].cost_of_goods_sold_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Gross Profit</td>
                                            <td>{ShulkData[0].gross_profit_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Overhead Expenses</td>
                                            <td>{ShulkData[0].overhead_expenses_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Earning Before Interest, Depreciation, Tax & Amount (EBIDTA)</td>
                                            <td>{ShulkData[0].ebidta_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Interest</td>
                                            <td>{ShulkData[0].interest_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Earning Before Depreciation & Taxes (EBDT)</td>
                                            <td>{ShulkData[0].ebdt_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Depreciation</td>
                                            <td>{ShulkData[0].depreciation_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Earning Before Tax</td>
                                            <td>{ShulkData[0].earning_before_tax_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Tax Amount (as per %)</td>
                                            <td>{ShulkData[0].tax_amount_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Profit After Tax</td>
                                            <td>{ShulkData[0].profit_after_tax_2}</td>
                                          </tr>
                                        </tbody>
                                      </table>
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
                              <div>
                                <div id="divToPrint" className="mt4 pdfBody">

                                  <div className="row clearfix">
                                    <div className="col-md-12">
                                      <div className="pdfHeader">Shulk Lakshya</div>
                                      <div class="table-responsive" id="Table">
                                        <table class="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th>Headers</th>
                                              <th>Amount</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>Revenue</td>
                                              <td>{ShulkData[0].revenue_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Cost of Goods Sold</td>
                                              <td>{ShulkData[0].cost_of_goods_sold_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Gross Profit</td>
                                              <td>{ShulkData[0].gross_profit_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Overhead Expenses</td>
                                              <td>{ShulkData[0].overhead_expenses_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Earning Before Interest, Depreciation, Tax & Amount (EBIDTA)</td>
                                              <td>{ShulkData[0].ebidta_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Interest</td>
                                              <td>{ShulkData[0].interest_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Earning Before Depreciation & Taxes (EBDT)</td>
                                              <td>{ShulkData[0].ebdt_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Depreciation</td>
                                              <td>{ShulkData[0].depreciation_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Earning Before Tax</td>
                                              <td>{ShulkData[0].earning_before_tax_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Tax Amount (as per %)</td>
                                              <td>{ShulkData[0].tax_amount_1}</td>
                                            </tr>
                                            <tr>
                                              <td>Profit After Tax</td>
                                              <td>{ShulkData[0].profit_after_tax_1}</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row clearfix" className="page-break">
                                    <div class="table-responsive" id="Table">
                                      <table class="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>Headers</th>
                                            <th>Amount</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>Revenue</td>
                                            <td>{ShulkData[0].revenue_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Cost of Goods Sold</td>
                                            <td>{ShulkData[0].cost_of_goods_sold_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Gross Profit</td>
                                            <td>{ShulkData[0].gross_profit_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Overhead Expenses</td>
                                            <td>{ShulkData[0].overhead_expenses_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Earning Before Interest, Depreciation, Tax & Amount (EBIDTA)</td>
                                            <td>{ShulkData[0].ebidta_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Interest</td>
                                            <td>{ShulkData[0].interest_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Earning Before Depreciation & Taxes (EBDT)</td>
                                            <td>{ShulkData[0].ebdt_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Depreciation</td>
                                            <td>{ShulkData[0].depreciation_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Earning Before Tax</td>
                                            <td>{ShulkData[0].earning_before_tax_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Tax Amount (as per %)</td>
                                            <td>{ShulkData[0].tax_amount_2}</td>
                                          </tr>
                                          <tr>
                                            <td>Profit After Tax</td>
                                            <td>{ShulkData[0].profit_after_tax_2}</td>
                                          </tr>
                                        </tbody>
                                      </table>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ) : (null)} */}
        </div>
      </section >
    </>
  );
}
