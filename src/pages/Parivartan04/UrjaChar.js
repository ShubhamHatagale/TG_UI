import React, { useEffect, useState } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ReactExport from "react-data-export";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function UrjaChar() {
    const history = useHistory();
    var s_id = localStorage.getItem('tr_id')
    let [completeData, setcompleteData] = useState("");

    const [date, setdate] = useState();
    const [Fdate, setFdate] = useState();
    const pdfExportComponent = React.useRef(null);
    const [Upid, setUpid] = useState("");

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

    const [Madd, setMadd] = useState(false);
    const [Mupdate, setMupdate] = useState(false);
    const [Mdelete, setMdelete] = useState(false);
    const [beliverName, setbeliverName] = useState("");


    const GetallRecords = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptionsget = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(`http://localhost:9002/masters/urjaChar/user/${s_id}`, requestOptionsget)
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

        fetch(
            `http://localhost:9002/masters/parivartan_user/${s_id}`,
            requestOptionsget
        )
            .then((response) => response.json())
            .then((resData) => {
                // if (resData.data.id > 0) {
                // console.log("ttt--->", resData.data[0].bypass_email);
                // setbelEmail(resData.data[0].beliver_email);
                // settransEmail(resData.data[0].tranz_email);
                // setbypassEmail(resData.data[0].bypass_email);
                setbeliverName(resData.data[0].beliver_name);

                // }
            });
        console.log(completeData, "reso");

    }



    const percentageCal = () => {
        setEBITDApercent1(Number(EBITDA1 / TotalRevenue1 * 100));
        setEBITDApercent2(Number(EBITDA2 / TotalRevenue2 * 100));
        setEBITDApercent3(Number(EBITDA3 / TotalRevenue3 * 100));
        setEBITDApercent4(Number(EBITDA4 / TotalRevenue4 * 100));
        setEBITDApercent5(Number(EBITDA5 / TotalRevenue5 * 100));
        setEBITDApercent6(Number(EBITDA6 / TotalRevenue6 * 100));

    }

    const exportPDFWithMethod = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    const getYear = () => {
        let ddts = new Date().getFullYear();
        let ddti = ddts.toString().substr(-2);
        let ddt = parseInt(ddti);
        setdate(ddt);
        setFdate(ddts);
    };

    // function allStateUpd(){

    // }
    useEffect(() => {
        if (!s_id) {
            history.push("Not_support");
        }
        GetallRecords();
        getYear();

        let valGross1 = Number(TotalRevenue1) - Number(DirectExpences1)
        // let cal4 = (Number(revenue2Value) - Number(cal2))
        setGrossProfit1(valGross1);
        let valEbidta1 = Number(valGross1) - Number(IndirectExpences1)
        setEBITDA1(valEbidta1);
        // console.log(Number(Number(valEbidta1) / Number(TotalRevenue1) * 100));
        let valEBITDApercent1 = (Number(Number(valEbidta1) / Number(TotalRevenue1) * 100));
        console.log(valEBITDApercent1);
        setEBITDApercent1(valEBITDApercent1);


        let valGross2 = Number(TotalRevenue2) - Number(DirectExpences2)
        // let cal4 = (Number(revenue2Value) - Number(cal2))
        setGrossProfit2(valGross2);
        let valEbidta2 = Number(valGross2) - Number(IndirectExpences2)
        setEBITDA2(valEbidta2);
        // console.log(Number(Number(valEbidta2) / Number(TotalRevenue2) * 200));
        let valEBITDApercent2 = (Number(Number(valEbidta2) / Number(TotalRevenue2) * 100));
        console.log(valEBITDApercent2);
        setEBITDApercent2(valEBITDApercent2);

        let valGross3 = Number(TotalRevenue3) - Number(DirectExpences3)
        // let cal4 = (Number(revenue3Value) - Number(cal3))
        setGrossProfit3(valGross3);
        let valEbidta3 = Number(valGross3) - Number(IndirectExpences3)
        setEBITDA3(valEbidta3);
        // console.log(Number(Number(valEbidta3) / Number(TotalRevenue3) * 300));
        let valEBITDApercent3 = (Number(Number(valEbidta3) / Number(TotalRevenue3) * 100));
        console.log(valEBITDApercent3);
        if (valEBITDApercent3 != "" || valEBITDApercent3 == NaN) {
            setEBITDApercent3("0");
        }
        // setEBITDApercent3(valEBITDApercent3);


        let valGross4 = Number(TotalRevenue4) - Number(DirectExpences4)
        // let cal4 = (Number(revenue4Value) - Number(cal4))
        setGrossProfit4(valGross4);
        let valEbidta4 = Number(valGross4) - Number(IndirectExpences4)
        setEBITDA4(valEbidta4);
        // console.log(Number(Number(valEbidta4) / Number(TotalRevenue4) * 400));
        let valEBITDApercent4 = (Number(Number(valEbidta4) / Number(TotalRevenue4) * 100));
        console.log(valEBITDApercent4);
        // setEBITDApercent4(valEBITDApercent4);
        if (valEBITDApercent4 != "" || valEBITDApercent4 == NaN) {
            setEBITDApercent4("0");
        }

        let valGross5 = Number(TotalRevenue5) - Number(DirectExpences5)
        // let cal4 = (Number(revenue5Value) - Number(cal5))
        setGrossProfit5(valGross5);
        let valEbidta5 = Number(valGross5) - Number(IndirectExpences5)
        setEBITDA5(valEbidta5);
        // console.log(Number(Number(valEbidta5) / Number(TotalRevenue5) * 500));
        let valEBITDApercent5 = (Number(Number(valEbidta5) / Number(TotalRevenue5) * 100));
        console.log(valEBITDApercent5);
        // setEBITDApercent5(valEBITDApercent5);
        if (valEBITDApercent5 != "" || valEBITDApercent5 == NaN) {
            setEBITDApercent5("0");
        }


        let valGross6 = Number(TotalRevenue6) - Number(DirectExpences6)
        // let cal4 = (Number(revenue6Value) - Number(cal6))
        setGrossProfit6(valGross6);
        let valEbidta6 = Number(valGross6) - Number(IndirectExpences6)
        setEBITDA6(valEbidta6);
        // console.log(Number(Number(valEbidta6) / Number(TotalRevenue6) * 600));
        let valEBITDApercent6 = (Number(Number(valEbidta6) / Number(TotalRevenue6) * 100));
        console.log(valEBITDApercent6);
        // setEBITDApercent6(valEBITDApercent6);
        if (valEBITDApercent6 != "" || valEBITDApercent6 == NaN) {
            setEBITDApercent6("0");
        }
        // setGrossProfit2(TotalRevenue2 - DirectExpences2);
        // setEBITDA2(GrossProfit2 - IndirectExpences2);

        // setGrossProfit3(TotalRevenue3 - DirectExpences3);
        // setEBITDA3(GrossProfit3 - IndirectExpences3);

        // setGrossProfit4(TotalRevenue4 - DirectExpences4);
        // setEBITDA4(GrossProfit4 - IndirectExpences4);

        // setGrossProfit5(TotalRevenue5 - DirectExpences5);
        // setEBITDA5(GrossProfit5 - IndirectExpences5);

        // setGrossProfit6(TotalRevenue6 - DirectExpences6);
        // setEBITDA6(GrossProfit6 - IndirectExpences6);


        // GetallRecords();
        // percentageCal();
        GetallRecords();

    }, []);



    const handleInputChangeTotalRevenue1 = (e) => {
        // setTotalRevenue1(e.target.value);
        // let value = Number(e.target.value);
        // let valTotalRevenue = value - Number(DirectExpences1)
        // setGrossProfit1(valTotalRevenue);
        // percentageCal();
        // setEBITDA1(valTotalRevenue - Number(IndirectExpences1));

        setTotalRevenue1(e.target.value);
        let value = Number(e.target.value);
        let valTotalRevenue = value - Number(DirectExpences1)
        setGrossProfit1(valTotalRevenue);
        // percentageCal();
        let h1valEBITDA1 = (valTotalRevenue - Number(IndirectExpences1));
        setEBITDA1(h1valEBITDA1);

        let h1valEBITDApercent1 = Number(h1valEBITDA1) / Number(TotalRevenue1) * 100;
        setEBITDApercent1(Number(EBITDA1 / TotalRevenue1 * 100));

        console.log(h1valEBITDApercent1);
        setEBITDApercent1(h1valEBITDApercent1);


    }

    const handleInputChangeDirectExpences1 = (e) => {
        // alert(IndirectExpences1)
        setDirectExpences1(e.target.value);
        let value = Number(e.target.value);
        let grossProfitVal = Number(TotalRevenue1 - value);
        setGrossProfit1(grossProfitVal);
        let EBITDAVal = Number(TotalRevenue1 - value);
        setEBITDA1(EBITDAVal);
        // let EBITDAVal = grossProfitVal - IndirectExpences1
        // percentageCal();
    }


    const handleInputChangeIndirectExpences1 = (e) => {
        setIndirectExpences1(e.target.value);
        let value = Number(e.target.value);
        let ebidtaVal = Number(GrossProfit1 - value)
        setEBITDA1(ebidtaVal);
        // percentageCal();
        let EBITDApercent1Val = (Number(ebidtaVal / TotalRevenue1) * 100);
        setEBITDApercent1(EBITDApercent1Val);

    }

    // for column 2
    const handleInputChangeTotalRevenue2 = (e) => {
        // setTotalRevenue2(e.target.value);
        // let value = Number(e.target.value);
        // setGrossProfit2(value - DirectExpences2);
        // percentageCal();
        // setEBITDA2(GrossProfit2 - IndirectExpences2);

        setTotalRevenue2(e.target.value);
        let value = Number(e.target.value);
        let valTotalRevenue = value - Number(DirectExpences2)
        setGrossProfit2(valTotalRevenue);
        // percentageCal();
        let h2valEBITDA2 = (valTotalRevenue - Number(IndirectExpences2));
        setEBITDA2(h2valEBITDA2);

        let h2valEBITDApercent2 = Number(h2valEBITDA2) / Number(TotalRevenue2) * 100;
        setEBITDApercent2(Number(EBITDA2 / TotalRevenue2 * 100));

        console.log(h2valEBITDApercent2);
        setEBITDApercent2(h2valEBITDApercent2);


    }

    const handleInputChangeDirectExpences2 = (e) => {
        setDirectExpences2(e.target.value);
        let value = Number(e.target.value);
        setGrossProfit2(TotalRevenue2 - value);
        setEBITDA2(GrossProfit2 - IndirectExpences2);
        console.log(GrossProfit2);
        console.log(IndirectExpences2);
        percentageCal();
    }


    const handleInputChangeIndirectExpences2 = (e) => {
        setIndirectExpences2(e.target.value);
        let value = Number(e.target.value);
        let ebidtaVal = Number(GrossProfit2 - value)
        setEBITDA2(ebidtaVal);
        // percentageCal();
        let EBITDApercent2Val = (Number(ebidtaVal / TotalRevenue2) * 100);
        setEBITDApercent2(EBITDApercent2Val);

    }



    // for column 3
    const handleInputChangeTotalRevenue3 = (e) => {
        // setTotalRevenue3(e.target.value);
        // let value = Number(e.target.value);
        // setGrossProfit3(value - DirectExpences3);
        // percentageCal();
        // setEBITDA3(GrossProfit3 - IndirectExpences3);


        setTotalRevenue3(e.target.value);
        let value = Number(e.target.value);
        let valTotalRevenue = value - Number(DirectExpences3)
        setGrossProfit3(valTotalRevenue);
        // percentageCal();
        let h3valEBITDA3 = (valTotalRevenue - Number(IndirectExpences3));
        setEBITDA3(h3valEBITDA3);

        let h3valEBITDApercent3 = Number(h3valEBITDA3) / Number(TotalRevenue3) * 100;
        setEBITDApercent3(Number(EBITDA3 / TotalRevenue3 * 100));

        console.log(h3valEBITDApercent3);
        setEBITDApercent3(h3valEBITDApercent3);

    }

    const handleInputChangeDirectExpences3 = (e) => {
        setDirectExpences3(e.target.value);
        let value = Number(e.target.value);
        setGrossProfit3(TotalRevenue3 - value);
        setEBITDA3(GrossProfit3 - IndirectExpences3);
        console.log(GrossProfit3);
        console.log(IndirectExpences3);
        percentageCal();
    }


    const handleInputChangeIndirectExpences3 = (e) => {
        setIndirectExpences3(e.target.value);
        let value = Number(e.target.value);
        let ebidtaVal = Number(GrossProfit3 - value)
        setEBITDA3(ebidtaVal);
        // percentageCal();
        let EBITDApercent3Val = (Number(ebidtaVal / TotalRevenue3) * 100);
        setEBITDApercent3(EBITDApercent3Val);



    }



    // for column 4
    const handleInputChangeTotalRevenue4 = (e) => {
        // setTotalRevenue4(e.target.value);
        // let value = Number(e.target.value);
        // setGrossProfit4(value - DirectExpences4);
        // percentageCal();
        // setEBITDA4(GrossProfit4 - IndirectExpences4);

        setTotalRevenue4(e.target.value);
        let value = Number(e.target.value);
        let valTotalRevenue = value - Number(DirectExpences4)
        setGrossProfit4(valTotalRevenue);
        // percentageCal();
        let h4valEBITDA4 = (valTotalRevenue - Number(IndirectExpences4));
        setEBITDA4(h4valEBITDA4);

        let h4valEBITDApercent4 = Number(h4valEBITDA4) / Number(TotalRevenue4) * 100;
        setEBITDApercent4(Number(EBITDA4 / TotalRevenue4 * 100));

        console.log(h4valEBITDApercent4);
        setEBITDApercent4(h4valEBITDApercent4);


    }

    const handleInputChangeDirectExpences4 = (e) => {
        setDirectExpences4(e.target.value);
        let value = Number(e.target.value);
        setGrossProfit4(TotalRevenue4 - value);
        setEBITDA4(GrossProfit4 - IndirectExpences4);
        console.log(GrossProfit4);
        console.log(IndirectExpences4);
        percentageCal();
    }


    const handleInputChangeIndirectExpences4 = (e) => {
        setIndirectExpences4(e.target.value);
        let value = Number(e.target.value);
        let ebidtaVal = Number(GrossProfit4 - value)
        setEBITDA4(ebidtaVal);
        // percentageCal();
        let EBITDApercent4Val = (Number(ebidtaVal / TotalRevenue4) * 100);
        setEBITDApercent4(EBITDApercent4Val);


    }


    // for column 5
    const handleInputChangeTotalRevenue5 = (e) => {
        // setTotalRevenue5(e.target.value);
        // let value = Number(e.target.value);
        // setGrossProfit5(value - DirectExpences5);
        // percentageCal();
        // setEBITDA5(GrossProfit5 - IndirectExpences5);

        setTotalRevenue5(e.target.value);
        let value = Number(e.target.value);
        let valTotalRevenue = value - Number(DirectExpences5)
        setGrossProfit5(valTotalRevenue);
        // percentageCal();
        let h5valEBITDA5 = (valTotalRevenue - Number(IndirectExpences5));
        setEBITDA5(h5valEBITDA5);

        let h5valEBITDApercent5 = Number(h5valEBITDA5) / Number(TotalRevenue5) * 100;
        setEBITDApercent5(Number(EBITDA5 / TotalRevenue5 * 100));

        console.log(h5valEBITDApercent5);
        setEBITDApercent5(h5valEBITDApercent5);

    }

    const handleInputChangeDirectExpences5 = (e) => {
        setDirectExpences5(e.target.value);
        let value = Number(e.target.value);
        setGrossProfit5(TotalRevenue5 - value);
        setEBITDA5(GrossProfit5 - IndirectExpences5);
        console.log(GrossProfit5);
        console.log(IndirectExpences5);
        percentageCal();
    }


    const handleInputChangeIndirectExpences5 = (e) => {
        setIndirectExpences5(e.target.value);
        let value = Number(e.target.value);
        let ebidtaVal = Number(GrossProfit5 - value)
        setEBITDA5(ebidtaVal);
        // percentageCal();
        let EBITDApercent5Val = (Number(ebidtaVal / TotalRevenue5) * 100);
        setEBITDApercent5(EBITDApercent5Val);


    }


    // for column 6
    const handleInputChangeTotalRevenue6 = (e) => {
        // setTotalRevenue6(e.target.value);
        // let value = Number(e.target.value);
        // setGrossProfit6(value - DirectExpences6);
        // percentageCal();
        // setEBITDA6(GrossProfit6 - IndirectExpences6);

        setTotalRevenue6(e.target.value);
        let value = Number(e.target.value);
        let valTotalRevenue = value - Number(DirectExpences6)
        setGrossProfit6(valTotalRevenue);
        // percentageCal();
        let h6valEBITDA6 = (valTotalRevenue - Number(IndirectExpences6));
        setEBITDA6(h6valEBITDA6);

        let h6valEBITDApercent6 = Number(h6valEBITDA6) / Number(TotalRevenue6) * 100;
        setEBITDApercent6(Number(EBITDA6 / TotalRevenue6 * 100));

        console.log(h6valEBITDApercent6);
        setEBITDApercent6(h6valEBITDApercent6);

    }

    const handleInputChangeDirectExpences6 = (e) => {
        setDirectExpences6(e.target.value);
        let value = Number(e.target.value);
        setGrossProfit6(TotalRevenue6 - value);
        setEBITDA6(GrossProfit6 - IndirectExpences6);
        console.log(GrossProfit6);
        console.log(IndirectExpences6);
        percentageCal();
    }


    const handleInputChangeIndirectExpences6 = (e) => {
        setIndirectExpences6(e.target.value);
        let value = Number(e.target.value);
        let ebidtaVal = Number(GrossProfit6 - value)
        setEBITDA6(ebidtaVal);
        // percentageCal();
        let EBITDApercent6Val = (Number(ebidtaVal / TotalRevenue6) * 100);
        setEBITDApercent6(EBITDApercent6Val);


    }


    const OnSubmitForm = () => {
        // console.log(totalRevenue)
        // var st = eval([totalRevenue]);
        // console.log(st);
        // alert(completeData.length)
        if (completeData.length === 0) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var rawrich = JSON.stringify({
                TotalRevenue1: TotalRevenue1,
                RevenueReadOnly1: RevenueReadOnly1,
                DirectExpences1: DirectExpences1,
                DirectExpencesReadOnly1: DirectExpencesReadOnly1,
                GrossProfit1: GrossProfit1,
                GrossProfitID1: GrossProfitID1,
                IndirectExpences1: IndirectExpences1,
                IndirectExpencesID1: IndirectExpencesID1,
                EBITDA1: EBITDA1,
                EBITDApercent1: EBITDApercent1,
                EBITDA_ID1: EBITDA_ID1,

                TotalRevenue2: TotalRevenue2,
                RevenueReadOnly2: RevenueReadOnly2,
                DirectExpences2: DirectExpences2,
                DirectExpencesReadOnly2: DirectExpencesReadOnly2,
                GrossProfit2: GrossProfit2,
                GrossProfitID2: GrossProfitID2,
                IndirectExpences2: IndirectExpences2,
                IndirectExpencesID2: IndirectExpencesID2,
                EBITDA2: EBITDA2,
                EBITDApercent2: EBITDApercent2,
                EBITDA_ID2: EBITDA_ID2,

                TotalRevenue3: TotalRevenue3,
                RevenueReadOnly3: RevenueReadOnly3,
                DirectExpences3: DirectExpences3,
                DirectExpencesReadOnly3: DirectExpencesReadOnly3,
                GrossProfit3: GrossProfit3,
                GrossProfitID3: GrossProfitID3,
                IndirectExpences3: IndirectExpences3,
                IndirectExpencesID3: IndirectExpencesID3,
                EBITDA3: EBITDA3,
                EBITDApercent3: EBITDApercent3,
                EBITDA_ID3: EBITDA_ID3,



                TotalRevenue4: TotalRevenue4,
                RevenueReadOnly4: RevenueReadOnly4,
                DirectExpences4: DirectExpences4,
                DirectExpencesReadOnly4: DirectExpencesReadOnly4,
                GrossProfit4: GrossProfit4,
                GrossProfitID4: GrossProfitID4,
                IndirectExpences4: IndirectExpences4,
                IndirectExpencesID4: IndirectExpencesID4,
                EBITDA4: EBITDA4,
                EBITDApercent4: EBITDApercent4,
                EBITDA_ID4: EBITDA_ID4,


                TotalRevenue5: TotalRevenue5,
                RevenueReadOnly5: RevenueReadOnly5,
                DirectExpences5: DirectExpences5,
                DirectExpencesReadOnly5: DirectExpencesReadOnly5,
                GrossProfit5: GrossProfit5,
                GrossProfitID5: GrossProfitID5,
                IndirectExpences5: IndirectExpences5,
                IndirectExpencesID5: IndirectExpencesID5,
                EBITDA5: EBITDA5,
                EBITDApercent5: EBITDApercent5,
                EBITDA_ID5: EBITDA_ID5,



                TotalRevenue6: TotalRevenue6,
                RevenueReadOnly6: RevenueReadOnly6,
                DirectExpences6: DirectExpences6,
                DirectExpencesReadOnly6: DirectExpencesReadOnly6,
                GrossProfit6: GrossProfit6,
                GrossProfitID6: GrossProfitID6,
                IndirectExpences6: IndirectExpences6,
                IndirectExpencesID6: IndirectExpencesID6,
                EBITDA6: EBITDA6,
                EBITDApercent6: EBITDApercent6,
                EBITDA_ID6: EBITDA_ID6,

                email_id: s_id,
                created_by: s_id
            })
            var requestOptionsrichtext = {
                method: "POST",
                headers: myHeaders,
                body: rawrich,
                redirect: "follow",
            };
            fetch(`http://localhost:9002/masters/urjaChar`, requestOptionsrichtext)
                .then((response) => response.json())
                .then((resData) => {
                    // console.log(resData);
                    if (resData.status == 200) {
                        // alert("success")

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
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var rawrich = JSON.stringify({
                TotalRevenue1: TotalRevenue1,
                RevenueReadOnly1: RevenueReadOnly1,
                DirectExpences1: DirectExpences1,
                DirectExpencesReadOnly1: DirectExpencesReadOnly1,
                GrossProfit1: GrossProfit1,
                GrossProfitID1: GrossProfitID1,
                IndirectExpences1: IndirectExpences1,
                IndirectExpencesID1: IndirectExpencesID1,
                EBITDA1: EBITDA1,
                EBITDApercent1: EBITDApercent1,
                EBITDA_ID1: EBITDA_ID1,

                TotalRevenue2: TotalRevenue2,
                RevenueReadOnly2: RevenueReadOnly2,
                DirectExpences2: DirectExpences2,
                DirectExpencesReadOnly2: DirectExpencesReadOnly2,
                GrossProfit2: GrossProfit2,
                GrossProfitID2: GrossProfitID2,
                IndirectExpences2: IndirectExpences2,
                IndirectExpencesID2: IndirectExpencesID2,
                EBITDA2: EBITDA2,
                EBITDApercent2: EBITDApercent2,
                EBITDA_ID2: EBITDA_ID2,

                TotalRevenue3: TotalRevenue3,
                RevenueReadOnly3: RevenueReadOnly3,
                DirectExpences3: DirectExpences3,
                DirectExpencesReadOnly3: DirectExpencesReadOnly3,
                GrossProfit3: GrossProfit3,
                GrossProfitID3: GrossProfitID3,
                IndirectExpences3: IndirectExpences3,
                IndirectExpencesID3: IndirectExpencesID3,
                EBITDA3: EBITDA3,
                EBITDApercent3: EBITDApercent3,
                EBITDA_ID3: EBITDA_ID3,



                TotalRevenue4: TotalRevenue4,
                RevenueReadOnly4: RevenueReadOnly4,
                DirectExpences4: DirectExpences4,
                DirectExpencesReadOnly4: DirectExpencesReadOnly4,
                GrossProfit4: GrossProfit4,
                GrossProfitID4: GrossProfitID4,
                IndirectExpences4: IndirectExpences4,
                IndirectExpencesID4: IndirectExpencesID4,
                EBITDA4: EBITDA4,
                EBITDApercent4: EBITDApercent4,
                EBITDA_ID4: EBITDA_ID4,


                TotalRevenue5: TotalRevenue5,
                RevenueReadOnly5: RevenueReadOnly5,
                DirectExpences5: DirectExpences5,
                DirectExpencesReadOnly5: DirectExpencesReadOnly5,
                GrossProfit5: GrossProfit5,
                GrossProfitID5: GrossProfitID5,
                IndirectExpences5: IndirectExpences5,
                IndirectExpencesID5: IndirectExpencesID5,
                EBITDA5: EBITDA5,
                EBITDApercent5: EBITDApercent5,
                EBITDA_ID5: EBITDA_ID5,



                TotalRevenue6: TotalRevenue6,
                RevenueReadOnly6: RevenueReadOnly6,
                DirectExpences6: DirectExpences6,
                DirectExpencesReadOnly6: DirectExpencesReadOnly6,
                GrossProfit6: GrossProfit6,
                GrossProfitID6: GrossProfitID6,
                IndirectExpences6: IndirectExpences6,
                IndirectExpencesID6: IndirectExpencesID6,
                EBITDA6: EBITDA6,
                EBITDApercent6: EBITDApercent6,
                EBITDA_ID6: EBITDA_ID6,

                email_id: s_id,
                created_by: s_id
            })
            var requestOptionsrichtext = {
                method: "PUT",
                headers: myHeaders,
                body: rawrich,
                redirect: "follow",
            };
            fetch(`http://localhost:9002/masters/urjaChar/${Upid}`, requestOptionsrichtext)
                .then((response) => response.json())
                .then((resData) => {
                    // console.log(resData);
                    if (resData.status == 200) {
                        // alert("updated")
                        // console.log("Data Added succesfully")
                        setMupdate(true);
                        // setMupdate(false);
                        setTimeout(() => {
                            setMupdate(false);
                        }, 1000)

                        GetallRecords();

                    }
                    GetallRecords();
                })
                .catch((error) => console.log("error", error))

        }
    }

    return (

        <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
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
            <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card p-4 mt-2">
                        <div className="body p-5" >
                            <div >
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
                                                onChange={handleInputChangeTotalRevenue1}
                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue2}
                                                onChange={handleInputChangeTotalRevenue2}
                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue3}
                                                onChange={handleInputChangeTotalRevenue3}
                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue4}
                                                onChange={handleInputChangeTotalRevenue4}
                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue5}
                                                onChange={handleInputChangeTotalRevenue5}
                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={TotalRevenue6}
                                                onChange={handleInputChangeTotalRevenue6}
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
                                                onChange={handleInputChangeDirectExpences1}

                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences2}
                                                onChange={handleInputChangeDirectExpences2}

                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences3}
                                                onChange={handleInputChangeDirectExpences3}

                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences4}
                                                onChange={handleInputChangeDirectExpences4}

                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences5}
                                                onChange={handleInputChangeDirectExpences5}

                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpences6}
                                                onChange={handleInputChangeDirectExpences6}

                                            /></td>
                                        </tr>



                                        <tr>
                                            <th scope="row" >Direct Expenses</th>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpencesReadOnly1}
                                                onChange={handleInputChangeDirectExpences1}
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
                                                onChange={handleInputChangeDirectExpences3}
                                                readOnly
                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpencesReadOnly4}
                                                onChange={handleInputChangeDirectExpences4}
                                                readOnly
                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpencesReadOnly5}
                                                onChange={handleInputChangeDirectExpences5}
                                                readOnly
                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={DirectExpencesReadOnly6}
                                                onChange={handleInputChangeDirectExpences6}
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
                                                onChange={handleInputChangeIndirectExpences1}
                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences2}
                                                onChange={handleInputChangeIndirectExpences2}

                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences3}
                                                onChange={handleInputChangeIndirectExpences3}

                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences4}
                                                onChange={handleInputChangeIndirectExpences4}

                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences5}
                                                onChange={handleInputChangeIndirectExpences5}

                                            /></td>
                                            <td><input
                                                type="text"
                                                className="form-control"
                                                placeholder="0"
                                                value={IndirectExpences6}
                                                onChange={handleInputChangeIndirectExpences6}

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
                            <button type="submit" class="btn savebtn ml-2 waves-effect" onClick={OnSubmitForm}>SAVE    <i className="ml-1 zmdi zmdi-save " /> </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UrjaChar