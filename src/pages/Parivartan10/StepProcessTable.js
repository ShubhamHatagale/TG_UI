import React, { useEffect, useState } from "react";
import StepTable from "../Parivartan09/StepTable";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import CircularProgress from "@material-ui/core/CircularProgress";

const Table = () => {
  var s_id = localStorage.getItem('tr_id')

  const pdfExportComponent = React.useRef(null);
  let [completeData, setcompleteData] = useState("");
  const [loading, setloading] = useState(false);
  const [sr_no, setsr_no] = useState();
  const [step_decription, setstep_decription] = useState();
  const [trasaction_time, settrasaction_time] = useState();
  const [resource_allocated, setresource_allocated] = useState();
  const [resource_name, setresource_name] = useState();

  const exportPDFWithMethod = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const sr_noFn = (event) => {
    setsr_no(event.target.value);
  };

  const step_decriptionFn = (event) => {
    setstep_decription(event.target.value);
  };

  const trasaction_timeFn = (event) => {
    settrasaction_time(event.target.value);
  };

  const resource_allocatedFn = (event) => {
    setresource_allocated(event.target.value);
  };

  const resource_nameFn = (event) => {
    setresource_name(event.target.value);
  };

  const handleSubmit = (parent_process_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var rawrich = JSON.stringify({
      sr_no: sr_no,
      step_decription: step_decription,
      trasaction_time: trasaction_time,
      resource_allocated: resource_allocated,
      resource_name: resource_name,
      parent_process_id: parent_process_id,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptionsrichtext = {
      method: "POST",
      headers: myHeaders,
      body: rawrich,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/process`, requestOptionsrichtext)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        if (resData.status == 200) {
          console.log("Data Added succesfully");
        }
        getvilakshanMapData();
      })
      .catch((error) => console.log("error", error));
  };

  const getvilakshanMapData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/vilakshanMap/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        setcompleteData(resData.data);
        console.log(resData);
        if (resData.status == 200) {
          console.log("Data Added succesfully");
        }
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {      
    if (!s_id) {
      history.push("Not_support");
    }

    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 2000);
    getvilakshanMapData();
  }, []);

  const renderTable = (parent_process_id) => {
    return <StepTable AllData={parent_process_id} />;
  };

  let pdfdata = [];
  let rows = [];
  if (completeData) {
    completeData.map((item, key) => {
      rows.push(
        <div class="card" >
          <h2 className="card-inside-title">
            <strong>Process Name : {item.parent_process_name}</strong>
          </h2>
          <div class="card-body">
            <div className="form-group">
              <div className="row">
                <div className="col-1">
                  <label>Sr.No</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sr.No."
                    name="sr_no"
                    onChange={sr_noFn}
                    value={sr_no}
                  />
                </div>
                <div className="col-2">
                  <label>Step Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Step Description"
                    name="step_descreption"
                    onChange={step_decriptionFn}
                    value={step_decription}
                  />
                </div>
                <div className="col-2">
                  <label>Transaction Time</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Transaction Time"
                    name="vilakshan_journey"
                    onChange={trasaction_timeFn}
                    value={trasaction_time}
                  />
                </div>
                <div className="col-3">
                  <label>Resource Allocated</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Resource Allocated (Departments)"
                    name="resource_allocated"
                    onChange={resource_allocatedFn}
                    value={resource_allocated}
                  />
                </div>
                <div className="col-3">
                  <label>Name of Resources</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name of Resources (Individuals)"
                    name="resource_name"
                    onChange={resource_nameFn}
                    value={resource_name}
                  />
                </div>
                <div className="col-1">
                  <button
                    type="submit"
                    class="btn btn-success  waves-effect mt-4"
                    onClick={() => {
                      handleSubmit(item.id);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Input</th>
                  <th>
                    <tr align="center">
                      <div style={{ marginLeft: "28rem" }}>
                        {item.parent_process_name}
                      </div>
                    </tr>
                  </th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                <td>{item.parent_process_input}</td>
                <td>
                  {renderTable(item.id)}
                </td>
                <td>{item.parent_process_output}</td>
              </tbody>
            </table>
          </div>
        </div>
      );
    });
  }

  if (completeData) {
    completeData.map((item, key) => {
      pdfdata.push(
        <>
          <div class="card">
            <h2 className="card-inside-title">
              <strong>Process Name : {item.parent_process_name}</strong>
            </h2>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Input</th>
                  <th>
                    <tr style={{ width: "70%" }}>
                      <div style={{ marginLeft: "28rem" }}>
                        {item.parent_process_name}
                      </div>
                    </tr>
                  </th>
                  <th style={{ width: "15%" }}>Output</th>
                </tr>
              </thead>
              <tbody>
                <td>{item.parent_process_input}</td>
                <td>
                  {renderTable(item.id)}
                </td>
                <td>{item.parent_process_output}</td>
              </tbody>
            </table>
          </div>
        </>
      );
    });
  }
  return loading ? (
    <div sytle={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : (
    <>
      {completeData.length > 0 ? (
        <div style={{ marginBottom: 30 }}>
          <button type="button" class="btn btn-primary  waves-effect" onClick={exportPDFWithMethod}>Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i></button>
          <div
            style={{
              position: "absolute",
              left: "-3000px",
              top: 0,
            }}>
            <PDFExport paperSize="A2" margin="1cm" ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`} forcePageBreak=".page-break">
              <div >
                <div id="divToPrint" className="mt4" >
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                      <h1 style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', marginTop: '20px' }}>PARIVARTAN</h1>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <div style={{ alignSelf: 'center', alignContent: 'center', textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightgrey', width: '150', border: '1px solid black', marginLeft: '0', padding: "10px", margin: '10px', marginTop: '30px' }}>Step by Step Process</div>
                      <div>
                        {pdfdata}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PDFExport>
          </div>
        </div>
      ) : (null)}
      <div class="table-responsive" id="Table">
        {rows}
      </div>
    </>
  );
};
export default Table;
