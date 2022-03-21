import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ReactExport from "react-data-export";
import Modal from "react-bootstrap/Modal";
import ModalSubmit from "../../components/ModalSubmit";
import { useHistory } from "react-router-dom";

export default function Form() {
  var s_id = localStorage.getItem('tr_id')

  const history = useHistory();

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const pdfExportComponent = React.useRef(null);
  let [non_negoData, setnon_negoData] = useState("");
  const [date, setdate] = useState();
  const [Fdate, setFdate] = useState();

  const [formData, setformData] = useState([]);
  const [formValid, setformValid] = useState(false);
  const [gross_margin, setgross_margin] = useState();
  const [opportunity_size, setopportunity_size] = useState();
  const [unit_pricing, setunit_pricing] = useState();
  const [unit_margin, setunit_margin] = useState();
  const [time_to_breakeven, settime_to_breakeven] = useState();
  const [fixed_cost_investment, setfixed_cost_investment] = useState();
  const [credit_terms, setcredit_terms] = useState();
  const [npv, setnpv] = useState();
  const [total, settotal] = useState();

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

  const [basisofplayground, setbasisofplayground] =
    useState("Naishtya Statement");
  const [defineplayground, setdefineplayground] = useState(
    "Time Period and No of Vilakshan Units"
  );
  const [completeData, setcompleteData] = useState("");

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


  const [Madd, setMadd] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [Mdelete, setMdelete] = useState(false);
  const [showData, setShowData] = useState(false);



  const exportPDFWithMethod = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  const handleClose = () => {
    // setShowData(false);
    setviewModal(false);
  };

  const ViewModel = () => {
    setviewModal(true);
  };


  const gross_marginfn = (event) => {
    setgross_margin(event.target.value);
  };

  const opportunity_sizefn = (event) => {
    setopportunity_size(event.target.value);
  };

  const unit_marginfn = (event) => {
    setunit_margin(event.target.value);
  };

  const time_to_breakevenfn = (event) => {
    settime_to_breakeven(event.target.value);
  };
  const unit_pricingfn = (event) => {
    setunit_pricing(event.target.value);

  };

  const fixed_cost_investmentfn = (event) => {
    setfixed_cost_investment(event.target.value);
  };

  const credit_termsfn = (event) => {
    setcredit_terms(event.target.value);
  };

  const npvfn = (event) => {
    setnpv(event.target.value);
  };

  const [end_prod_quality, setend_prod_quality] = useState();
  const [supplier_quality_standard, setsupplier_quality_standard] = useState();
  const [customer_service, setcustomer_service] = useState();
  const [channels, setchannels] = useState();
  const [lead_time, setlead_time] = useState();
  const [fixed_cost_investment2, setfixed_cost_investment2] = useState();
  const [through_put, setthrough_put] = useState();
  const [pricing, setpricing] = useState();
  const [prod_dev_life_cycle, setprod_dev_life_cycle] = useState();
  const [brand_parameter, setbrand_parameter] = useState();





  // urja char states--->

  const [TotalRevenue1, setTotalRevenue1] = useState(1000);
  const [RevenueReadOnly1, setRevenueReadOnly1] = useState("%");
  const [DirectExpences1, setDirectExpences1] = useState(150);
  const [DirectExpencesReadOnly1, setDirectExpencesReadOnly1] = useState("%");
  const [GrossProfit1, setGrossProfit1] = useState();
  const [GrossProfitID1, setGrossProfitID1] = useState("%");
  const [IndirectExpences1, setIndirectExpences1] = useState(450);
  const [IndirectExpencesID1, setIndirectExpencesID1] = useState("%");
  const [EBITDA1, setEBITDA1] = useState();
  const [EBITDApercent1, setEBITDApercent1] = useState("0");
  const [EBITDA_ID1, setEBITDA_ID1] = useState("%");



  const [TotalRevenue2, setTotalRevenue2] = useState(1000);
  const [RevenueReadOnly2, setRevenueReadOnly2] = useState("%");
  const [DirectExpences2, setDirectExpences2] = useState(150);
  const [DirectExpencesReadOnly2, setDirectExpencesReadOnly2] = useState("%");
  const [GrossProfit2, setGrossProfit2] = useState();
  const [GrossProfitID2, setGrossProfitID2] = useState("%");
  const [IndirectExpences2, setIndirectExpences2] = useState(450);
  const [IndirectExpencesID2, setIndirectExpencesID2] = useState("%");
  const [EBITDA2, setEBITDA2] = useState();
  const [EBITDApercent2, setEBITDApercent2] = useState("0");
  const [EBITDA_ID2, setEBITDA_ID2] = useState("%");



  const [TotalRevenue3, setTotalRevenue3] = useState(0);
  const [RevenueReadOnly3, setRevenueReadOnly3] = useState("%");
  const [DirectExpences3, setDirectExpences3] = useState(0);
  const [DirectExpencesReadOnly3, setDirectExpencesReadOnly3] = useState("%");
  const [GrossProfit3, setGrossProfit3] = useState(0);
  const [GrossProfitID3, setGrossProfitID3] = useState("%");
  const [IndirectExpences3, setIndirectExpences3] = useState(0);
  const [IndirectExpencesID3, setIndirectExpencesID3] = useState("%");
  const [EBITDA3, setEBITDA3] = useState(0);
  const [EBITDApercent3, setEBITDApercent3] = useState("0");
  const [EBITDA_ID3, setEBITDA_ID3] = useState("%");

  const [TotalRevenue4, setTotalRevenue4] = useState(0);
  const [RevenueReadOnly4, setRevenueReadOnly4] = useState("%");
  const [DirectExpences4, setDirectExpences4] = useState(0);
  const [DirectExpencesReadOnly4, setDirectExpencesReadOnly4] = useState("%");
  const [GrossProfit4, setGrossProfit4] = useState(0);
  const [GrossProfitID4, setGrossProfitID4] = useState("%");
  const [IndirectExpences4, setIndirectExpences4] = useState(0);
  const [IndirectExpencesID4, setIndirectExpencesID4] = useState("%");
  const [EBITDA4, setEBITDA4] = useState(0);
  const [EBITDApercent4, setEBITDApercent4] = useState("0");
  const [EBITDA_ID4, setEBITDA_ID4] = useState("%");


  const [TotalRevenue5, setTotalRevenue5] = useState(0);
  const [RevenueReadOnly5, setRevenueReadOnly5] = useState("%");
  const [DirectExpences5, setDirectExpences5] = useState(0);
  const [DirectExpencesReadOnly5, setDirectExpencesReadOnly5] = useState("%");
  const [GrossProfit5, setGrossProfit5] = useState(0);
  const [GrossProfitID5, setGrossProfitID5] = useState("%");
  const [IndirectExpences5, setIndirectExpences5] = useState(0);
  const [IndirectExpencesID5, setIndirectExpencesID5] = useState("%");
  const [EBITDA5, setEBITDA5] = useState(0);
  const [EBITDApercent5, setEBITDApercent5] = useState("0");
  const [EBITDA_ID5, setEBITDA_ID5] = useState("%");


  const [TotalRevenue6, setTotalRevenue6] = useState(0);
  const [RevenueReadOnly6, setRevenueReadOnly6] = useState("%");
  const [DirectExpences6, setDirectExpences6] = useState(0);
  const [DirectExpencesReadOnly6, setDirectExpencesReadOnly6] = useState("%");
  const [GrossProfit6, setGrossProfit6] = useState(0);
  const [GrossProfitID6, setGrossProfitID6] = useState("%");
  const [IndirectExpences6, setIndirectExpences6] = useState(0);
  const [IndirectExpencesID6, setIndirectExpencesID6] = useState("%");
  const [EBITDA6, setEBITDA6] = useState(0);
  const [EBITDApercent6, setEBITDApercent6] = useState("0");
  const [EBITDA_ID6, setEBITDA_ID6] = useState("%");

  const end_prod_qualityfn2 = (event) => {
    setend_prod_quality(event.target.value);
  };

  const supplier_quality_standardfn2 = (event) => {
    setsupplier_quality_standard(event.target.value);
  };

  const channelsfn = (event) => {
    setchannels(event.target.value);
  };

  const lead_timefn = (event) => {
    setlead_time(event.target.value);

  };

  const customer_servicefn = (event) => {
    setcustomer_service(event.target.value);

  };

  const fixed_cost_investmentfn2 = (event) => {
    setfixed_cost_investment2(event.target.value);
  };

  const through_putfn = (event) => {
    setthrough_put(event.target.value);
  };

  const pricingfn = (event) => {
    setpricing(event.target.value);
  };

  const prod_dev_life_cyclefn = (event) => {
    setprod_dev_life_cycle(event.target.value);
  };

  const brand_parameterfn = (event) => {
    setbrand_parameter(event.target.value);
  };
  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    GetallRecords();
  }, []);


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
      fetch(`https://parivartan.transganization.com/nodejs/masters/non_negotiable/verify/${s_id}`, requestOptions)
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






  const OnSubmitForm = () => {
    if (non_negoData.length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        gross_margin: gross_margin,
        opportunity_size: opportunity_size,
        unit_pricing: unit_pricing,
        unit_margin: unit_margin,
        time_to_breakeven: time_to_breakeven,
        fixed_cost_investment: fixed_cost_investment,
        credit_terms: credit_terms,
        npv: npv,
        end_prod_quality: end_prod_quality,
        supplier_quality_standard: supplier_quality_standard,
        customer_service: customer_service,
        channels: channels,
        lead_time: lead_time,
        fixed_cost_investment2: fixed_cost_investment2,
        through_put: through_put,
        pricing: pricing,
        prod_dev_life_cycle: prod_dev_life_cycle,
        brand_parameter: brand_parameter,
        email_id: s_id,
        created_by: s_id,
      });
      var requestOptionsrichtext = {
        method: "POST",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/non_negotiable`,
        requestOptionsrichtext
      )
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
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        gross_margin: gross_margin,
        opportunity_size: opportunity_size,
        unit_pricing: unit_pricing,
        unit_margin: unit_margin,
        time_to_breakeven: time_to_breakeven,
        fixed_cost_investment: fixed_cost_investment,
        credit_terms: credit_terms,
        npv: npv,
        end_prod_quality: end_prod_quality,
        supplier_quality_standard: supplier_quality_standard,
        customer_service: customer_service,
        channels: channels,
        lead_time: lead_time,
        fixed_cost_investment2: fixed_cost_investment2,
        through_put: through_put,
        pricing: pricing,
        prod_dev_life_cycle: prod_dev_life_cycle,
        brand_parameter: brand_parameter,
        email_id: s_id,
        updated_by: s_id,
      });
      console.log(rawrich);
      var requestOptionsrichtext = {
        method: "PUT",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/non_negotiable/` + `${Upid}`, requestOptionsrichtext)
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

    fetch(`https://parivartan.transganization.com/nodejs/masters/non_negotiable/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setvarifiedValue(resData.data[0].verified);
        setUpid(resData.data[0].id);
        ;

        let get_list = resData.data;
        get_list.map((item, key) => {
          setgross_margin(item.gross_margin);
          setopportunity_size(item.opportunity_size);
          setunit_pricing(item.unit_pricing);
          setunit_margin(item.unit_margin);
          settime_to_breakeven(item.time_to_breakeven);
          setfixed_cost_investment(item.fixed_cost_investment);
          setcredit_terms(item.credit_terms);
          setnpv(item.npv);
          setend_prod_quality(item.end_prod_quality);
          setsupplier_quality_standard(item.supplier_quality_standard);
          setcustomer_service(item.customer_service);
          setchannels(item.channels);
          setlead_time(item.lead_time);
          setfixed_cost_investment2(item.fixed_cost_investment2);
          setthrough_put(item.through_put);
          setpricing(item.pricing);
          setprod_dev_life_cycle(item.prod_dev_life_cycle);
          setbrand_parameter(item.brand_parameter);

        });
        setnon_negoData(resData.data);
      })

    fetch(`https://parivartan.transganization.com/nodejs/masters/urjaChar/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        setcompleteData(resData.data);
        setUpid(resData.data[0].id);

        console.log(resData.data[0].TotalRevenue1);
        // alert(resData.status)
        console.log(resData);
        setTotalRevenue1(resData.data[0].TotalRevenue1)
        setDirectExpences1(resData.data[0].DirectExpences1)
        setGrossProfit1(resData.data[0].GrossProfit1)
        setIndirectExpences1(resData.data[0].IndirectExpences1)
        setEBITDA1(resData.data[0].EBITDA1)
        setEBITDApercent1(resData.data[0].EBITDApercent1)

        setTotalRevenue2(resData.data[0].TotalRevenue2)
        setDirectExpences2(resData.data[0].DirectExpences2)
        setGrossProfit2(resData.data[0].GrossProfit2)
        setIndirectExpences2(resData.data[0].IndirectExpences2)
        setEBITDA2(resData.data[0].EBITDA2)
        setEBITDApercent2(resData.data[0].EBITDApercent2)

        setTotalRevenue3(resData.data[0].TotalRevenue3)
        setDirectExpences3(resData.data[0].DirectExpences3)
        setGrossProfit3(resData.data[0].GrossProfit3)
        setIndirectExpences3(resData.data[0].IndirectExpences3)
        setEBITDA3(resData.data[0].EBITDA3)
        setEBITDApercent3(resData.data[0].EBITDApercent3)

        setTotalRevenue4(resData.data[0].TotalRevenue4)
        setDirectExpences4(resData.data[0].DirectExpences4)
        setGrossProfit4(resData.data[0].GrossProfit4)
        setIndirectExpences4(resData.data[0].IndirectExpences4)
        setEBITDA4(resData.data[0].EBITDA4)
        setEBITDApercent4(resData.data[0].EBITDApercent4)

        setTotalRevenue5(resData.data[0].TotalRevenue5)
        setDirectExpences5(resData.data[0].DirectExpences5)
        setGrossProfit5(resData.data[0].GrossProfit5)
        setIndirectExpences5(resData.data[0].IndirectExpences5)
        setEBITDA5(resData.data[0].EBITDA5)
        setEBITDApercent5(resData.data[0].EBITDApercent5)


        setTotalRevenue6(resData.data[0].TotalRevenue6)
        setDirectExpences6(resData.data[0].DirectExpences6)
        setGrossProfit6(resData.data[0].GrossProfit6)
        setIndirectExpences6(resData.data[0].IndirectExpences6)
        setEBITDA6(resData.data[0].EBITDA6)
        setEBITDApercent6(resData.data[0].EBITDApercent6)

        if (resData.status == 200) {
          console.log("Data Added succesfully");
          // alert("hhh")
          // alert(resData.status)

          // alert(resData.data[0].TotalRevenue1)




        }
      })
      .catch((error) => console.log("error", error));



    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/busiPlayground2/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        let get_list = resData.data;
        get_list.map((item, key) => {
          console.log(item.basisofplayground, item.defineplayground);
          setbasisofplayground(item.basisofplayground);
          setdefineplayground(item.defineplayground);
          // alert(item.Finalizationddl);
          // setdefineplayground(item.defineplayground);

        });
        // setbusiPlaygrounds(resData.data);
      })
      .catch((error) => console.log("error", error));


  };







  const dataSet1 = [
    {
      parameters: "Gross Margin",
      financials: gross_margin,
    },
    {
      parameters: "Opportunity Size",
      financials: opportunity_size,
    },
    {
      parameters: "Unit Pricing",
      financials: unit_pricing,
    },
    {
      parameters: "Unit Margin",
      financials: unit_margin,
    },
    {
      parameters: "Time to Breakeven",
      financials: time_to_breakeven,
    },
    {
      parameters: "Fixed Cost Investment",
      financials: fixed_cost_investment,
    },
    {
      parameters: "Credit Terms",
      financials: credit_terms,
    },
    {
      parameters: "NPV",
      financials: npv,
    }
  ]
  const dataSet2 = [
    {
      parameters: "End Product Quality",
      operational: end_prod_quality,
    },
    {
      parameters: "Supplier Quality Standard",
      operational: supplier_quality_standard,
    },
    {
      parameters: "Customer Service",
      operational: customer_service,
    },
    {
      parameters: "Channels",
      operational: channels,
    },
    {
      parameters: "Lead Time",
      operational: lead_time,
    },
    {
      parameters: "Fixed Cost Investment",
      operational: fixed_cost_investment2,
    },
    {
      parameters: "Through Put",
      operational: through_put,
    },
    {
      parameters: "Pricing",
      operational: pricing,
    },
    {
      parameters: "Product Development Life Cycle",
      operational: prod_dev_life_cycle,
    },
    {
      parameters: "Brand Parameters",
      operational: brand_parameter,
    },
  ]

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



      {/* {non_negoData ? ( */}
      <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card p-4 mt-2">
              <div className="body p-5" >
                <form>
                  <div className="row clearfix">
                    <div className="col-md-6">
                      <h2>
                        <strong>Parameters</strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <h2>
                        <strong>Financials</strong>
                      </h2>
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Gross Margin</strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="gross_margin"
                        onChange={gross_marginfn}
                        placeholder="Gross Margin"
                        value={gross_margin}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Opportunity Size</strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="opportunity_size"
                        onChange={opportunity_sizefn}
                        placeholder="Opportunity Size"
                        value={opportunity_size}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Unit Pricing </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="unit_pricing"
                        name="unit_pricing"
                        onChange={unit_pricingfn}
                        placeholder="Unit Pricing"
                        value={unit_pricing}

                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Unit Margin </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="unit_margin"
                        onChange={unit_marginfn}
                        placeholder="Unit Margin"
                        value={unit_margin}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Time to Breakeven</strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="time_to_breakeven"
                        onChange={time_to_breakevenfn}
                        placeholder="Time To Breakevenfn"
                        value={time_to_breakeven}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Fixed Cost Investment </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="fixed_cost_investment"
                        onChange={fixed_cost_investmentfn}
                        placeholder="Fixed Cost Investment"
                        value={fixed_cost_investment}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Credit Terms</strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="credit_terms"
                        onChange={credit_termsfn}
                        placeholder="Credit Terms"
                        value={credit_terms}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>NPV </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="npv"
                        onChange={npvfn}
                        placeholder="NPV"
                        value={npv}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div style={{ marginTop: 40 }}></div>
              <div className="body">
                <form>
                  <div className="row clearfix">
                    <div className="col-md-6">
                      <h2>
                        <strong>Parameters</strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <h2>
                        <strong>Operational</strong>
                      </h2>
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>End Product Quality</strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="end_prod_quality"
                        onChange={end_prod_qualityfn2}
                        placeholder="End Product Quality"
                        value={end_prod_quality}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Supplier Quality Standard </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="supplier_quality_standard"
                        onChange={supplier_quality_standardfn2}
                        placeholder="Supplier Quality Standard"
                        value={supplier_quality_standard}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Customer Service </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        id="customer_service"
                        name="customer_service"
                        onChange={customer_servicefn}
                        placeholder="Customer Service"
                        value={customer_service}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Channels </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="channels"
                        onChange={channelsfn}
                        placeholder="Channels"
                        value={channels}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Lead Time</strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="lead_timefn"
                        onChange={lead_timefn}
                        placeholder="Lead time"
                        value={lead_time}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Fixed Cost Investment </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="fixed_cost_investment"
                        onChange={fixed_cost_investmentfn2}
                        placeholder="Fixed Cost Investment"
                        value={fixed_cost_investment2}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Through Put </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="through_put"
                        onChange={through_putfn}
                        placeholder="Through Put"
                        value={through_put}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Pricing </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="pricing"
                        onChange={pricingfn}
                        placeholder="Pricing"
                        value={pricing}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Product Development Life Cycle </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="prod_dev_life_cycle"
                        onChange={prod_dev_life_cyclefn}
                        placeholder="Product Development Life Cycle"
                        value={prod_dev_life_cycle}
                      />
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-6">
                      <h2 className="card-inside-title">
                        <strong>Brand Parameters </strong>
                      </h2>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="brand_parameter"
                        onChange={brand_parameterfn}
                        placeholder="Brand Parameters"
                        value={brand_parameter}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={OnSubmitForm}
                    class="btn savebtn btn-square waves-effect"
                  >
                    SAVE <i className="ml-1 zmdi zmdi-save " />
                  </button>
                  {non_negoData.length > 0 ? (
                    <>
                      <button
                        type="button"
                        class="btn viewbtn waves-effect"
                        onClick={ViewModel}
                      >
                        View  <i className="ml-1 zmdi zmdi-eye " />                      </button>

                      <button type="button" class="btn savebtn waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={HandleSubmit}>SUBMIT <i className="ml-1 zmdi zmdi-check " /> </button>

                      {/* <div> */}
                      <button
                        type="button"
                        class="btn downloadbtn waves-effect"
                        onClick={exportPDFWithMethod}
                      >
                        Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
                      </button>
                    </>
                  ) : (null)}
                  {/* </div> */}
                </form>
                {non_negoData.length > 0 ? (
                  <div>

                    <div
                      style={{
                        position: "absolute",
                        left: "-3000px",
                        top: 0,
                      }}>
                      <PDFExport paperSize="A3" margin="1cm" ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`} forcePageBreak=".page-break">
                        {/* playground business model */}
                        <Modal.Header closeButton style={{ padding: "10px" }}>
                          <Modal.Title id="example-modal-sizes-title-lg">

                          </Modal.Title>

                          <div className="col-md-12 row" >
                            <div className="col-md-6">
                              <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                            </div>
                            <div className="col-md-6 pageHeading" >
                              Business Model
                            </div>
                          </div>

                        </Modal.Header>
                        <Modal.Body>
                          {/* playground business model */}
                          <div>
                            <div id="divToPrint" className="mt4 ">
                              <div className="container-fluid pdfBody">
                                <div className="row clearfix">
                                  <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="card">

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
                                            2) Define your Playground

                                          </div>
                                          <div
                                            className="dynamicContent"
                                          >
                                            {defineplayground.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                                          </div>
                                        </div>
                                      </div>

                                      <div style={{ marginTop: 30 }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>


                              <div>
                                <div id="divToPrint" className="mt4 ">
                                  <div className="container-fluid pdfBody">
                                    <div className="row clearfix">
                                      <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="card">

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
                                                2) Define your Playground

                                              </div>
                                              <div
                                                className="dynamicContent"
                                              >
                                                {defineplayground.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                                              </div>
                                            </div>
                                          </div>

                                          <div style={{ marginTop: 30 }}></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="container-fluid pdfBody">
                                    <div className="row clearfix">
                                      <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="card">

                                          <div className="row clearfix">
                                            <div className="col-md-12">
                                              <div
                                                className="pdfHeader"
                                              >
                                                Urja Charitra

                                              </div>

                                            </div>
                                          </div>
                                          <div style={{ pointerEvents: "none" }}>
                                            <table class="table">
                                              <thead>
                                                <tr>
                                                  <th scope="col">Particulars</th>
                                                  <th scope="col">FY {Fdate - 1}-{date}</th>
                                                  <th scope="col">FY {Fdate - 2}-{date - 1}</th>
                                                  <th scope="col">FY {Fdate - 3}-{date - 2}</th>
                                                  <th scope="col">FY {Fdate - 4}-{date - 3}</th>
                                                  <th scope="col">FY {Fdate - 5}-{date - 4}</th>
                                                  <th scope="col">FY {Fdate - 6}-{date - 5}</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <th scope="row">Total Revenue</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={TotalRevenue1}
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={TotalRevenue2}
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={TotalRevenue3}
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={TotalRevenue4}
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={TotalRevenue5}
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={TotalRevenue6}
                                                  /></td>
                                                </tr>

                                                <tr>
                                                  <th scope="row">Total Revenue (Growth / Degrowth %)</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={RevenueReadOnly1}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={RevenueReadOnly2}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={RevenueReadOnly3}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={RevenueReadOnly4}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={RevenueReadOnly5}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={RevenueReadOnly6}

                                                    readOnly
                                                  /></td>
                                                </tr>



                                                <tr>
                                                  <th scope="row">Direct Expenses</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpences1}

                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpences2}

                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpences3}

                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpences4}

                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpences5}

                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpences6}

                                                  /></td>
                                                </tr>



                                                <tr>
                                                  <th scope="row" >Direct Expenses</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpencesReadOnly1}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpencesReadOnly2}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpencesReadOnly3}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpencesReadOnly4}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpencesReadOnly5}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={DirectExpencesReadOnly6}
                                                    readOnly
                                                  /></td>
                                                </tr>


                                                <tr>
                                                  <th scope="row">Gross Profit</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfit1}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfit2}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfit3}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfit4}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfit5}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfit6}
                                                    readOnly
                                                  /></td>
                                                </tr>

                                                <tr>
                                                  <th scope="row">Gross Profit ( Increase / Decrease)</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfitID1}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfitID2}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfitID3}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfitID4}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfitID5}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={GrossProfitID6}
                                                    readOnly
                                                  /></td>
                                                </tr>

                                                <tr>
                                                  <th scope="row">Indirect Expenses</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpences1}
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpences2}

                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpences3}

                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpences4}

                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpences5}

                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpences6}

                                                  /></td>
                                                </tr>


                                                <tr>
                                                  <th scope="row">Indirect Expenses (Increase / Decrease)</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpencesID1}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpencesID2}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpencesID3}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpencesID4}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpencesID5}
                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={IndirectExpencesID6}
                                                    readOnly
                                                  /></td>
                                                </tr>

                                                <tr>
                                                  <th scope="row">EBITDA</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA1}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA2}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA3}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA4}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA5}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA6}

                                                    readOnly
                                                  /></td>
                                                </tr>


                                                <tr>
                                                  <th scope="row">EBITDA%</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDApercent1 + "%"}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDApercent2 + "%"}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDApercent3 + "%"}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDApercent4 + "%"}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDApercent5 + "%"}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDApercent6 + "%"}

                                                    readOnly
                                                  /></td>
                                                </tr>


                                                <tr>
                                                  <th scope="row">EBITDA (Increase / Decrease)</th>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA_ID1}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA_ID2}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA_ID3}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA_ID4}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA_ID5}

                                                    readOnly
                                                  /></td>
                                                  <td><input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={EBITDA_ID6}

                                                    readOnly
                                                  /></td>
                                                </tr>

                                              </tbody>
                                            </table>
                                          </div>

                                          <div style={{ marginTop: 30 }}></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="container-fluid pdfBody">
                                    <div className="row clearfix ">
                                      <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="pdfHeader">Non Negotiables </div>
                                        <div class="table-responsive" id="Table">
                                          <table class="table table-bordered">
                                            <thead>
                                              <tr>
                                                <th>Parameters</th>
                                                <th>Financials</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>Gross Margin</td>
                                                <td>{non_negoData[0].gross_margin}</td>
                                              </tr>
                                              <tr>
                                                <td>Opportunity Size</td>
                                                <td>{non_negoData[0].opportunity_size}</td>
                                              </tr>
                                              <tr>
                                                <td>Unit Pricing</td>
                                                <td>{non_negoData[0].unit_pricing}</td>
                                              </tr>
                                              <tr>
                                                <td>Unit Margin</td>
                                                <td>{non_negoData[0].unit_margin}</td>
                                              </tr>
                                              <tr>
                                                <td>Time to Breakeven</td>
                                                <td>{non_negoData[0].time_to_breakeven}</td>
                                              </tr>
                                              <tr>
                                                <td>Fixed Cost Investment</td>
                                                <td>{non_negoData[0].fixed_cost_investment}</td>
                                              </tr>
                                              <tr>
                                                <td>Credit Terms</td>
                                                <td>{non_negoData[0].credit_terms}</td>
                                              </tr>
                                              <tr>
                                                <td>NPV</td>
                                                <td>{non_negoData[0].npv}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row clearfix " >
                                      <div className="col-md-12">
                                        <div class="table-responsive" id="Table">
                                          <table class="table table-bordered">
                                            <thead>
                                              <tr>
                                                <th>Parameters</th>
                                                <th>Operational</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>End product quality</td>
                                                <td>{non_negoData[0].end_prod_quality}</td>
                                              </tr>
                                              <tr>
                                                <td>Supplier Quality Standard</td>
                                                <td>{non_negoData[0].supplier_quality_standard}</td>
                                              </tr>
                                              <tr>
                                                <td>Customer Service</td>
                                                <td>{non_negoData[0].customer_service}</td>
                                              </tr>
                                              <tr>
                                                <td>Channels</td>
                                                <td>{non_negoData[0].channels}</td>
                                              </tr>
                                              <tr>
                                                <td>Lead time</td>
                                                <td>{non_negoData[0].lead_time}</td>
                                              </tr>
                                              <tr>
                                                <td>Fixed Cost Investment</td>
                                                <td>{non_negoData[0].fixed_cost_investment2}</td>
                                              </tr>
                                              <tr>
                                                <td>Through Put</td>
                                                <td>{non_negoData[0].through_put}</td>
                                              </tr>
                                              <tr>
                                                <td>Pricing</td>
                                                <td>{non_negoData[0].pricing}</td>
                                              </tr>
                                              <tr>
                                                <td>Product development life cycle</td>
                                                <td>{non_negoData[0].prod_dev_life_cycle}</td>
                                              </tr>
                                              <tr>
                                                <td>Brand Parameters</td>
                                                <td>{non_negoData[0].brand_parameter}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>

                              <div className="container-fluid pdfBody">
                                <div className="row clearfix ">
                                  <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="pdfHeader">Non Negotiables </div>
                                    <div class="table-responsive" id="Table">
                                      <table class="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>Parameters</th>
                                            <th>Financials</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>Gross Margin</td>
                                            <td>{non_negoData[0].gross_margin}</td>
                                          </tr>
                                          <tr>
                                            <td>Opportunity Size</td>
                                            <td>{non_negoData[0].opportunity_size}</td>
                                          </tr>
                                          <tr>
                                            <td>Unit Pricing</td>
                                            <td>{non_negoData[0].unit_pricing}</td>
                                          </tr>
                                          <tr>
                                            <td>Unit Margin</td>
                                            <td>{non_negoData[0].unit_margin}</td>
                                          </tr>
                                          <tr>
                                            <td>Time to Breakeven</td>
                                            <td>{non_negoData[0].time_to_breakeven}</td>
                                          </tr>
                                          <tr>
                                            <td>Fixed Cost Investment</td>
                                            <td>{non_negoData[0].fixed_cost_investment}</td>
                                          </tr>
                                          <tr>
                                            <td>Credit Terms</td>
                                            <td>{non_negoData[0].credit_terms}</td>
                                          </tr>
                                          <tr>
                                            <td>NPV</td>
                                            <td>{non_negoData[0].npv}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>

                                <div className="row clearfix " >
                                  <div className="col-md-12">
                                    <div class="table-responsive" id="Table">
                                      <table class="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>Parameters</th>
                                            <th>Operational</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>End product quality</td>
                                            <td>{non_negoData[0].end_prod_quality}</td>
                                          </tr>
                                          <tr>
                                            <td>Supplier Quality Standard</td>
                                            <td>{non_negoData[0].supplier_quality_standard}</td>
                                          </tr>
                                          <tr>
                                            <td>Customer Service</td>
                                            <td>{non_negoData[0].customer_service}</td>
                                          </tr>
                                          <tr>
                                            <td>Channels</td>
                                            <td>{non_negoData[0].channels}</td>
                                          </tr>
                                          <tr>
                                            <td>Lead time</td>
                                            <td>{non_negoData[0].lead_time}</td>
                                          </tr>
                                          <tr>
                                            <td>Fixed Cost Investment</td>
                                            <td>{non_negoData[0].fixed_cost_investment2}</td>
                                          </tr>
                                          <tr>
                                            <td>Through Put</td>
                                            <td>{non_negoData[0].through_put}</td>
                                          </tr>
                                          <tr>
                                            <td>Pricing</td>
                                            <td>{non_negoData[0].pricing}</td>
                                          </tr>
                                          <tr>
                                            <td>Product development life cycle</td>
                                            <td>{non_negoData[0].prod_dev_life_cycle}</td>
                                          </tr>
                                          <tr>
                                            <td>Brand Parameters</td>
                                            <td>{non_negoData[0].brand_parameter}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
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
                        <Modal.Header closeButton style={{ padding: "10px" }}>
                          <Modal.Title id="example-modal-sizes-title-lg">

                          </Modal.Title>

                          <div className="col-md-12 row" >
                            <div className="col-md-6">
                              <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                            </div>
                            <div className="col-md-6 pageHeading" >
                              Business Model
                            </div>
                          </div>

                        </Modal.Header>
                        <Modal.Body>
                          {/* playground business model */}
                          <div>
                            <div id="divToPrint" className="mt4 ">
                              <div className="container-fluid pdfBody">
                                <div className="row clearfix">
                                  <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="card">

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
                                            2) Define your Playground

                                          </div>
                                          <div
                                            className="dynamicContent"
                                          >
                                            {defineplayground.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                                          </div>
                                        </div>
                                      </div>

                                      <div style={{ marginTop: 30 }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="container-fluid pdfBody">
                                <div className="row clearfix">
                                  <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="card">

                                      <div className="row clearfix">
                                        <div className="col-md-12">
                                          <div
                                            className="pdfHeader"
                                          >
                                            Urja Charitra

                                          </div>

                                        </div>
                                      </div>
                                      <div style={{ pointerEvents: "none" }}>
                                        <table class="table">
                                          <thead>
                                            <tr>
                                              <th scope="col">Particulars</th>
                                              <th scope="col">FY {Fdate - 1}-{date}</th>
                                              <th scope="col">FY {Fdate - 2}-{date - 1}</th>
                                              <th scope="col">FY {Fdate - 3}-{date - 2}</th>
                                              <th scope="col">FY {Fdate - 4}-{date - 3}</th>
                                              <th scope="col">FY {Fdate - 5}-{date - 4}</th>
                                              <th scope="col">FY {Fdate - 6}-{date - 5}</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <th scope="row">Total Revenue</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue1}
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue2}
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue3}
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue4}
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue5}
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue6}
                                              /></td>
                                            </tr>

                                            <tr>
                                              <th scope="row">Total Revenue (Growth / Degrowth %)</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={RevenueReadOnly1}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={RevenueReadOnly2}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={RevenueReadOnly3}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={RevenueReadOnly4}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={RevenueReadOnly5}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={RevenueReadOnly6}

                                                readOnly
                                              /></td>
                                            </tr>



                                            <tr>
                                              <th scope="row">Direct Expenses</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences1}

                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences2}

                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences3}

                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences4}

                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences5}

                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences6}

                                              /></td>
                                            </tr>



                                            <tr>
                                              <th scope="row" >Direct Expenses</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpencesReadOnly1}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpencesReadOnly2}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpencesReadOnly3}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpencesReadOnly4}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpencesReadOnly5}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpencesReadOnly6}
                                                readOnly
                                              /></td>
                                            </tr>


                                            <tr>
                                              <th scope="row">Gross Profit</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfit1}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfit2}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfit3}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfit4}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfit5}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfit6}
                                                readOnly
                                              /></td>
                                            </tr>

                                            <tr>
                                              <th scope="row">Gross Profit ( Increase / Decrease)</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfitID1}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfitID2}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfitID3}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfitID4}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfitID5}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={GrossProfitID6}
                                                readOnly
                                              /></td>
                                            </tr>

                                            <tr>
                                              <th scope="row">Indirect Expenses</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences1}
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences2}

                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences3}

                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences4}

                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences5}

                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences6}

                                              /></td>
                                            </tr>


                                            <tr>
                                              <th scope="row">Indirect Expenses (Increase / Decrease)</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpencesID1}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpencesID2}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpencesID3}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpencesID4}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpencesID5}
                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpencesID6}
                                                readOnly
                                              /></td>
                                            </tr>

                                            <tr>
                                              <th scope="row">EBITDA</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA1}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA2}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA3}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA4}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA5}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA6}

                                                readOnly
                                              /></td>
                                            </tr>


                                            <tr>
                                              <th scope="row">EBITDA%</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDApercent1 + "%"}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDApercent2 + "%"}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDApercent3 + "%"}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDApercent4 + "%"}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDApercent5 + "%"}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDApercent6 + "%"}

                                                readOnly
                                              /></td>
                                            </tr>


                                            <tr>
                                              <th scope="row">EBITDA (Increase / Decrease)</th>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA_ID1}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA_ID2}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA_ID3}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA_ID4}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA_ID5}

                                                readOnly
                                              /></td>
                                              <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={EBITDA_ID6}

                                                readOnly
                                              /></td>
                                            </tr>

                                          </tbody>
                                        </table>
                                      </div>

                                      <div style={{ marginTop: 30 }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="container-fluid pdfBody">
                                <div className="row clearfix ">
                                  <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="pdfHeader">Non Negotiables </div>
                                    <div class="table-responsive" id="Table">
                                      <table class="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>Parameters</th>
                                            <th>Financials</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>Gross Margin</td>
                                            <td>{non_negoData[0].gross_margin}</td>
                                          </tr>
                                          <tr>
                                            <td>Opportunity Size</td>
                                            <td>{non_negoData[0].opportunity_size}</td>
                                          </tr>
                                          <tr>
                                            <td>Unit Pricing</td>
                                            <td>{non_negoData[0].unit_pricing}</td>
                                          </tr>
                                          <tr>
                                            <td>Unit Margin</td>
                                            <td>{non_negoData[0].unit_margin}</td>
                                          </tr>
                                          <tr>
                                            <td>Time to Breakeven</td>
                                            <td>{non_negoData[0].time_to_breakeven}</td>
                                          </tr>
                                          <tr>
                                            <td>Fixed Cost Investment</td>
                                            <td>{non_negoData[0].fixed_cost_investment}</td>
                                          </tr>
                                          <tr>
                                            <td>Credit Terms</td>
                                            <td>{non_negoData[0].credit_terms}</td>
                                          </tr>
                                          <tr>
                                            <td>NPV</td>
                                            <td>{non_negoData[0].npv}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>

                                <div className="row clearfix " >
                                  <div className="col-md-12">
                                    <div class="table-responsive" id="Table">
                                      <table class="table table-bordered">
                                        <thead>
                                          <tr>
                                            <th>Parameters</th>
                                            <th>Operational</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>End product quality</td>
                                            <td>{non_negoData[0].end_prod_quality}</td>
                                          </tr>
                                          <tr>
                                            <td>Supplier Quality Standard</td>
                                            <td>{non_negoData[0].supplier_quality_standard}</td>
                                          </tr>
                                          <tr>
                                            <td>Customer Service</td>
                                            <td>{non_negoData[0].customer_service}</td>
                                          </tr>
                                          <tr>
                                            <td>Channels</td>
                                            <td>{non_negoData[0].channels}</td>
                                          </tr>
                                          <tr>
                                            <td>Lead time</td>
                                            <td>{non_negoData[0].lead_time}</td>
                                          </tr>
                                          <tr>
                                            <td>Fixed Cost Investment</td>
                                            <td>{non_negoData[0].fixed_cost_investment2}</td>
                                          </tr>
                                          <tr>
                                            <td>Through Put</td>
                                            <td>{non_negoData[0].through_put}</td>
                                          </tr>
                                          <tr>
                                            <td>Pricing</td>
                                            <td>{non_negoData[0].pricing}</td>
                                          </tr>
                                          <tr>
                                            <td>Product development life cycle</td>
                                            <td>{non_negoData[0].prod_dev_life_cycle}</td>
                                          </tr>
                                          <tr>
                                            <td>Brand Parameters</td>
                                            <td>{non_negoData[0].brand_parameter}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : null} */}
    </>
  );
}
