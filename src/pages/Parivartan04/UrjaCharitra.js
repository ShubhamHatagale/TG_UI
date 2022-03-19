import React, { useEffect, useState } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import ReactExport from "react-data-export";

export default function Form() {
  // var dd=getFullYear()
  const [date, setdate] = useState();
  const [Fdate, setFdate] = useState();
  // const [inputList, setInputList] = useState([{ Year1: "", Year2: "", Year3: "", Year4: "", Year5: "", Year6: "", Year7: "" }]);
  const pdfExportComponent = React.useRef(null);
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const [formValid, setformValid] = useState(false);
  const [inputListFinal, setInputListFinal] = useState(
    [
      { competition: "Total Revenue", disabled: 0 },
      { competition: "Total Revenue (Growth / Degrowth %)", disabled: 1 },
      { competition: "Direct Expenses", disabled: 0 },
      { competition: "Direct Expenses", disabled: 1 },
      { competition: "Gross Profit", disabled: 1 },
      { competition: "Gross Profit ( Increase / Decrease)", disabled: 1 },
      { competition: "Indirect Expenses", disabled: 0 },
      { competition: "Indirect Expenses (Increase / Decrease)", disabled: 1 },
      { competition: "EBITDA", disabled: 1 },
      { competition: "EBITDA%", disabled: 1 },
      { competition: "EBITDA (Increase / Decrease)", disabled: 1 }
    ]);

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


  let [completeData, setcompleteData] = useState("");
  useEffect(() => {      var s_id = localStorage.getItem('tr_id')
    if (!s_id) {
      history.push("Not_support");
    }

    getYear();
    GetallRecored();
  }, []);

  const GetallRecored = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/drishti`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setcompleteData(resData.data);
      })
      .catch((error) => console.log("error", error));
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListFinal];
    console.log("Here is the Value", list);
    // console.log("sel",inputListFinal);

    list[index][name] = value;
    setInputListFinal(list);
  };

  const handleSubmit = (e) => {
    console.log(inputListFinal)
  };

  return (
    <div className="container-fluid">
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="body">
              <div className="row clearfix" style={{ marginBottom: 10 }}>
                <div className="col">
                  <div><b>Particular</b></div>
                </div>
                <div className="col">
                  <div><b>FY {Fdate - 1}-{date}</b></div>
                </div>
                <div className="col">
                  <div><b>FY {Fdate - 2}-{date - 1}</b></div>
                </div>
                <div className="col">
                  <div><b>FY {Fdate - 3}-{date - 2}</b></div>
                </div>
                <div className="col">
                  <div><b>FY {Fdate - 4}-{date - 3}</b></div>
                </div>
                <div className="col">
                  <div><b>FY {Fdate - 5}-{date - 4}</b></div>
                </div>
                <div className="col">
                  <div><b>FY {Fdate - 6}-{date - 5}</b></div>
                </div>
                <div className="col">
                  <div><b>FY {Fdate - 7}-{date - 6}</b></div>
                </div>
              </div>
              {inputListFinal.map((x, i) => {
                return (
                  <div className="row clearfix">
                    <div className="col">
                      <div className="form-group">
                        <div><b>{x.competition}</b></div>
                      </div>
                    </div>
                    {Array.from({ length: 7 }, (item, index) => {
                      return (
                        <div className="col">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="0"
                              name={`value${index}`}
                              value={x[`value${index}`]}
                              onChange={(e) => handleInputChange(e, i)}
                              disabled={x.disabled}
                            />
                          </div>
                        </div>
                      );
                    })
                    }
                  </div>
                );
              })}
              <button
                type="submit"
                class="btn btn-success  waves-effect"
                onClick={handleSubmit}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
