import React, { useEffect, useRef, useState } from "react";
import StepTable from "../Parivartan09/StepTable";
import StepPDFTable from "../Parivartan09/StepPDFTable";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Table = (props) => {
  const ChildRef = useRef();

  let pdfdata = [];
  let rows = [];


  const history = useHistory();
  var s_id = parseInt(localStorage.getItem('tr_id'));
  // var tt_id=parseInt
  const pdfExportComponent = React.useRef(null);
  let [completeData, setcompleteData] = useState("");
  let [ProcessData, setProcessData] = useState("");

  const [loading, setloading] = useState(false);
  const [sr_no, setsr_no] = useState();
  const [step_decription, setstep_decription] = useState();
  const [trasaction_time, settrasaction_time] = useState();
  const [resource_allocated, setresource_allocated] = useState();
  const [resource_name, setresource_name] = useState();
  const [Madd, setMadd] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [Mdelete, setMdelete] = useState(false);
  const [viewModal, setviewModal] = useState(false);
  const [TbUnderData, setTbUnderData] = useState("");
  const [DataA, setDataA] = useState("");
  const [beliverName, setbeliverName] = useState("");
  const [pdfShowDes, setpdfShowDes] = useState(0);


  const [editId, seteditId] = useState("");
  const [delId, setdelId] = useState("");
  const [editModal, seteditModal] = useState(false);
  const [show, setShow] = useState(false);

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

    setviewModal(false);
    setShow(false);
    seteditModal(false);
  };

  const ViewModel = () => {
    setviewModal(true);
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
    // alert(parent_process_id);
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
          setMadd(true);
          // setMadd(false);
          setTimeout(() => {
            setMadd(false);
          }, 1000)
          // props.OnValidateTab1(true);
          // alert(parent_process_id)
          // renderTable(parent_process_id);

          setsr_no("");
          setstep_decription("");
          settrasaction_time("");
          setresource_allocated("");
          setresource_name("");

          getvilakshanMapData();

          ChildRef.current.callChildFunction(parent_process_id, "upd");
          // <StepTable AllData={parent_process_id} ref={ChildRef} />
        }
        getvilakshanMapData();
        ChildRef.current.callChildFunction(parent_process_id, "upd");

      })
      .catch((error) => console.log("error", error));

    // renderTable(parent_process_id);
  };

  const getvilakshanMapData = () => {
    // alert("ppp")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:9002/masters/process/user/` + `${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        // console.log(res.data);
        setProcessData(res.data);
        if (res.status == 200) {
          console.log("Data Added succesfully");

        }
      })
      .catch((error) => console.log("error", error));


    fetch(`http://localhost:9002/masters/vilakshanMapTab2/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        setcompleteData(resData.data[0].features);
        console.log(resData.data);

        // console.log(resData.data[0].features);
        if (resData.status == 200) {
          console.log("Data Added succesfully");
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

    for (var i = 0; i < 2; i++) {
      fetch(
        `http://localhost:9002/masters/process/${i}`,
        requestOptionsget
      )
        .then((response) => response.json())
        .then((resData) => {
          // alert(resData.data.length)
          setDataA(resData.data);

          // console.log(resData.data[i]);


          // if (resData.data.id > 0) {
          // console.log("ttt--->", resData.data[0].bypass_email);
          // setbelEmail(resData.data[0].beliver_email);
          // settransEmail(resData.data[0].tranz_email);
          // setbypassEmail(resData.data[0].bypass_email);
          // setbeliverName(resData.data[0].beliver_name);
          // }
        });
    }
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
    console.table(parent_process_id + "haklll")
    return <StepTable AllData={parent_process_id} />;

    // var myHeaders2 = new Headers();
    // myHeaders2.append("Content-Type", "application/json");
    // var requestOptionsget = {
    //   method: "GET",
    //   headers: myHeaders2,
    //   redirect: "follow",
    // };
    // fetch(`http://localhost:9002/masters/process/` + `${parent_process_id}`, requestOptionsget)
    //   .then((response) => response.json())
    //   .then((res) => {
    //     console.log(res.data,"resData");
    //     setTbUnderData(res.data);
    //     if (res.status == 200) {
    //       console.log("Data Added succesfully");
    //     }
    //   })
    //   .catch((error) => console.log("error", error));




  };
  const renderPDFTable = (parent_process_id) => {
    return <StepPDFTable AllData={parent_process_id} />;
  };



  const editfn = (edit_id) => {
    // getvilakshanMapData();

    seteditModal(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `http://localhost:9002/masters/processprocessId/${edit_id}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data[0].id);
        console.log(resData.data);
        seteditId(resData.data[0].id);
        setsr_no(resData.data[0].sr_no);
        setstep_decription(resData.data[0].step_decription);
        settrasaction_time(resData.data[0].trasaction_time);
        setresource_allocated(resData.data[0].resource_allocated);
        setresource_name(resData.data[0].resource_name);
      })
      .catch((error) => console.log("error", error));
  };


  const deletefn = (edit_id) => {
    // alert(edit_id)
    setdelId(edit_id);
    setShow(true);
  };





  // const updateState = (parent_process_id) => {
  //   getvilakshanMapData();
  // };



  // let rd = [];
  // if (DataA) {
  //   DataA.map((item, key) => {
  //     rd.push(
  //       <tbody>
  //         <td>{item.sr_no}</td>
  //         <td>{item.step_decription}</td>
  //         <td>{item.trasaction_time}</td>
  //         <td>{item.resource_allocated}</td>
  //         <td>{item.resource_name}</td>
  //         <td colspan="8">
  //           <div class="btn-group">
  //             <button
  //               type="submit"
  //               title="edit"
  //               class="btn  zmdi zmdi-edit waves-effect pull-left"
  //               style={{ float: "left" }}
  //             // onClick={() => editfn(item.id)}
  //             ></button>
  //             <button
  //               type="submit"
  //               title="delete"
  //               class="btn btn-danger zmdi zmdi-delete waves-effect"
  //             // onClick={() => deletefn(item.id)}
  //             ></button>
  //           </div>
  //         </td>
  //       </tbody>
  //     );
  //   });
  // }


  const OnSubmitUpdate = (edId) => {
    // alert(edId)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      sr_no: sr_no,
      step_decription: step_decription,
      trasaction_time: trasaction_time,
      resource_allocated: resource_allocated,
      resource_name: resource_name,
      email_id: s_id,
      created_by: s_id
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/process/${edId}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        if (resData.status == 200) {
          console.log("updated");
          setMupdate(true);
          // setMupdate(false);
          setTimeout(() => {
            setMupdate(false);
          }, 1000)
        }
        getvilakshanMapData();
      })
      .catch((error) => console.log("error", error));
    // console.log(formData);
    setShow(false);
    seteditModal(false);
    // GetallRecored();
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
    fetch(
      `http://localhost:9002/masters/process/${delId}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        // seteditId(resData.data[0].id);
        console.log("deleted");
        setShow(false);
        setMdelete(true);
        // setMdelete(false);
        setTimeout(() => {
          setMdelete(false);
        }, 1000)
        setShow(false);
        getvilakshanMapData();
      })
      .catch((error) => console.log("error", error));
  };


  if (completeData) {
    completeData.map((item, key) => {
      rows.push(
        <div class="card" >
          <Modal
            size="lg"
            show={editModal}
            onHide={handleClose}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Edit Step Process
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="card" >
                <h2 className="card-inside-title">
                  {/* <strong>Process Name : </strong> */}
                </h2>
                <div class="card-body">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-2">
                        <label>Sr.No &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
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
                      <div className="col-2">
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
                      <div className="col-2">
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
                      <div className="col-2">
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <button
                          type="submit"
                          class="btn savebtn  waves-effect mt-4"
                          onClick={() => {
                            OnSubmitUpdate(editId);
                          }}
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
                Cancel
              </Button>
              <Button variant="primary" onClick={deleteConfirm}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          <h2 className="card-inside-title">
            <strong>Process Name : {item.value0}</strong>
          </h2>
          <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card p-4 mt-2">
                  <div className="body p-5">

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
                            class="btn addbtn waves-effect mt-4"
                            onClick={() => {
                              handleSubmit(`${item.value0}`);
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
                          {ProcessData.length > 0 ? (
                            <>
                              <div class="table-responsive" id="Table">

                                <table class="table table-bordered">
                                  <thead>
                                    {/* Child Component {childName} */}

                                    <tr>
                                      <th>Sr. No.</th>
                                      <th>Step Description</th>
                                      <th>Transaction Time (Days / Hours)</th>
                                      <th>Resource Allocated (Departments)</th>
                                      <th>Name of Resources (Individuals)</th>
                                      <th style={{ textAlign: "center" }}>Action</th>
                                    </tr>
                                  </thead>
                                  {
                                    ProcessData.filter(({ parent_process_id, created_by }) => parent_process_id === item.value0 && created_by === s_id)
                                      .map((itm, keys) => (
                                        <>
                                          {/* // console.log(itm) */}
                                          <tbody>
                                            <td>{itm.sr_no}</td>
                                            <td>{itm.step_decription}</td>
                                            <td>{itm.trasaction_time}</td>
                                            <td>{itm.resource_allocated}</td>
                                            <td>{itm.resource_name}</td>
                                            <td colspan="8">
                                              <div class="btn-group">
                                                <button
                                                  type="submit"
                                                  title="edit"
                                                  class="btn  zmdi zmdi-edit waves-effect pull-left"
                                                  style={{ float: "left" }}
                                                  onClick={() => editfn(itm.id)}
                                                ></button>
                                                <button
                                                  type="submit"
                                                  title="delete"
                                                  class="btn btn-danger zmdi zmdi-delete waves-effect"
                                                  onClick={() => deletefn(itm.id)}
                                                ></button>
                                              </div>
                                            </td>
                                          </tbody>
                                        </>

                                      ))
                                  }
                                </table>




                              </div>

                            </>
                          ) : (null)
                          }
                          {/* {renderTable(item.id)} */}

                          {/* <div class="table-responsive" id="Table">
                            <table class="table table-bordered">
                              <thead>
                                <tr>
                                  <th>Sr. No.{console.log(DataA[item.id])}</th>
                                  <th>Step Description</th>
                                  <th>Transaction Time (Days / Hours)</th>
                                  <th>Resource Allocated (Departments)</th>
                                  <th>Name of Resources (Individuals)</th>
                                  <th style={{ textAlign: "center" }}>Action</th>
                                </tr>
                              </thead>
                              {rd}
                            </table>
                          </div> */}
                          {/* <button onClick={() => ChildRef.current.callChildFunction()}>Update state</button> */}
                          {/* {console.log(item.value0)} */}
                          {/* <StepTable AllData={item.vslue0} ref={ChildRef} /> */}
                          {/* <h1>`${item.value0}`</h1> */}
                        </td>
                        {/* <td>{item.id}</td> */}
                        {/* var optionVal = completeData.filter(({ parent_process_id, created_by }) => parent_process_id === "test3" && created_by === 1 ) */}

                        {/* {ProcessData.map((item, key) => {
                          { console.log(item) }
                        }).map(function (option) {
                          return (option);
                        })}

                        {options.reduce((a, o) => {
                          o.assigned && a.push({ name: o.name, newProperty: 'Foo' });
                          return a;
                        }, [])} */}

                        <td>{item.parent_process_output}</td>
                      </tbody>
                    </table>


                  </div>
                </div>
              </div>
            </div>
          </div>




        </div >
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
                  {renderPDFTable(item.id)}
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

        <div
          style={{
            position: "absolute",
            left: "-3000px",
            top: 0,
          }}>


          {/* View Modal-----------------------> */}
          <Modal
            size="lg"
            show={viewModal}
            onHide={handleClose}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header style={{ padding: "10px" }}>
              {/* <div className="col-md-12 row" >
                <div className="col-md-6">
                  <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                </div>
                <div className="col-md-6 pageHeading" >
                  System & Process
                </div>
              </div> */}

              <div className="col-md-12 row" >
                <div className="col-md-6">
                  <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                </div>
                <div className="col-md-6 pageHeading" >
                  System & Process
                </div>
              </div>

              <Modal.Title id="example-modal-sizes-title-lg">

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* step process model */}
              <div >
                <div id="divToPrint" className="mt4 pdfBody" >

                  <div className="row clearfix">
                    <div className="col-md-12">
                      <div className="pdfHeader">Vilakshan Map</div>
                      <div style={{ marginTop: 30 }}>
                        <div class="table-responsive" id="Table">
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th>Vilakshan Journey</th>
                                <th>Vilakshan Form</th>
                                <th>VCCs (Cost Centres)</th>
                                <th>Parent Process Name</th>
                                <th>Parent Process Input</th>
                                <th>Parent Process Output</th>
                                <th>Parent Process Owner</th>
                                <th>Strategic Support Process</th>
                                <th>Strategic Support Input</th>
                                <th>Strategic Support Output</th>
                              </tr>
                            </thead>
                            <tbody>
                              {completeData.map((item, key) => (
                                <tr>
                                  <td>{item.vilakshan_journey}</td>
                                  <td>{item.vilakshan_form}</td>
                                  <td>{item.vccs}</td>
                                  <td>{item.parent_process_name}</td>
                                  <td>{item.parent_process_input}</td>
                                  <td>{item.parent_process_output}</td>
                                  <td>{item.parent_process_owner}</td>
                                  <td>{item.strategic_support_process}</td>
                                  <td>{item.strategic_support_input}</td>
                                  <td>{item.strategic_support_output}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div >
                <div id="divToPrint" className="mt4 pdfBody" >

                  <div className="row clearfix">
                    <div className="col-md-12">
                      <div className="pdfHeader">Step by Step Process</div>
                      <div className="p-5">
                        {pdfdata}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>



          {/* <PDFExport paperSize="A2" margin="1cm" ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`} forcePageBreak=".page-break"> */}
          {pdfShowDes > 0 ? (
            <PDFExport
              paperSize="A3"
              margin="1cm"
              ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`}
              forcePageBreak=".page-break"
            >
              {/* <Modal.Header style={{ padding: "10px" }}>
              <div className="col-md-12 row" >
                <div className="col-md-6">
                  <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                </div>
                <div className="col-md-6 pageHeading" >
                  System & Process
                </div>
              </div>
              <Modal.Title id="example-modal-sizes-title-lg">

              </Modal.Title>
            </Modal.Header> */}

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
                {/* step process model */}
                <div >
                  <div id="divToPrint" className="mt4 pdfBody" >

                    <div className="row clearfix">
                      <div className="col-md-12">
                        <div className="pdfHeader">Vilakshan Map</div>
                        <div style={{ marginTop: 30 }}>
                          <div class="table-responsive" id="Table">
                            <table class="table table-bordered">
                              <thead>
                                <tr>
                                  <th>Vilakshan Journey</th>
                                  <th>Vilakshan Form</th>
                                  <th>VCCs (Cost Centres)</th>
                                  <th>Parent Process Name</th>
                                  <th>Parent Process Input</th>
                                  <th>Parent Process Output</th>
                                  <th>Parent Process Owner</th>
                                  <th>Strategic Support Process</th>
                                  <th>Strategic Support Input</th>
                                  <th>Strategic Support Output</th>
                                </tr>
                              </thead>
                              <tbody>
                                {completeData.map((item, key) => (
                                  <tr>
                                    <td>{item.vilakshan_journey}</td>
                                    <td>{item.vilakshan_form}</td>
                                    <td>{item.vccs}</td>
                                    <td>{item.parent_process_name}</td>
                                    <td>{item.parent_process_input}</td>
                                    <td>{item.parent_process_output}</td>
                                    <td>{item.parent_process_owner}</td>
                                    <td>{item.strategic_support_process}</td>
                                    <td>{item.strategic_support_input}</td>
                                    <td>{item.strategic_support_output}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div >
                  <div id="divToPrint" className="mt4 pdfBody" >

                    <div className="row clearfix">
                      <div className="col-md-12">
                        <div className="pdfHeader">Step by Step Process</div>
                        <div className="p-5">
                          {pdfdata}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </PDFExport>
          ) : (null)}

        </div>

      ) : (null)}
      <div class="table-responsive" id="Table">
        {rows}
        <button
          type="button"
          class="btn viewbtn  waves-effect"
          onClick={ViewModel}
        >
          View  <i className="ml-1 zmdi zmdi-eye " />        </button>
        <button type="button" class="btn downloadbtn waves-effect" onClick={exportPDFWithMethod}>Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i></button>

      </div>






    </>
  );
};
export default Table;