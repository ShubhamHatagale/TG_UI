import React, { useState, useEffect } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Editor from "../../components/SunEditor";
import { useHistory } from "react-router-dom";

export default function Vilakshan(props) {
  const history = useHistory();
  var s_id = localStorage.getItem('tr_id')

  const pdfExportComponent = React.useRef(null);
  let [completeData, setcompleteData] = useState("");
  const [formValid, setformValid] = useState(false);
  const [vilakshan_journey, setvilakshan_journey] = useState();
  const [vilakshan_form, setvilakshan_form] = useState();
  // const [vccs, setvccs] = useState();
  const [parent_process_name, setparent_process_name] = useState();
  const [parent_process_input, setparent_process_input] = useState();
  const [parent_process_output, setparent_process_output] = useState();
  const [parent_process_owner, setparent_process_owner] = useState();
  const [strategic_support_process, setstrategic_support_process] = useState();
  const [strategic_support_input, setstrategic_support_input] = useState();
  const [strategic_support_output, setstrategic_support_output] = useState();


  const [editId, seteditId] = useState("");
  const [delId, setdelId] = useState("");
  const [show, setShow] = useState(false);
  const [editModal, seteditModal] = useState(false);

  const [editvilakshan_journey, seteditvilakshan_journey] = useState();
  const [editvilakshan_form, seteditvilakshan_form] = useState();
  // const [editvccs, seteditvccs] = useState();
  const [editparent_process_name, seteditparent_process_name] = useState();
  const [editparent_process_input, seteditparent_process_input] = useState();
  const [editparent_process_output, seteditparent_process_output] = useState();
  const [editparent_process_owner, seteditparent_process_owner] = useState();
  const [editstrategic_support_process, seteditstrategic_support_process] = useState();
  const [editstrategic_support_input, seteditstrategic_support_input] = useState();
  const [editstrategic_support_output, seteditstrategic_support_output] = useState();
  const [Madd, setMadd] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [Mdelete, setMdelete] = useState(false);
  const [beliverName, setbeliverName] = useState("");

  const changevilakshan_journey = (event) => {
    setvilakshan_journey(event.target.value);
  };

  const changevilakshan_form = (event) => {
    setvilakshan_form(event.target.value);
  };

  // const changevccs = (event) => {
  //   setvccs(event.target.value);
  // };

  const changeparent_process_name = (event) => {
    setparent_process_name(event.target.value);
  };

  const changeparent_process_input = (event) => {
    setparent_process_input(event.target.value);
  };

  const changeparent_process_output = (event) => {
    setparent_process_output(event.target.value);
  };

  const changeparent_process_owner = (event) => {
    setparent_process_owner(event.target.value);
  };

  const changestrategic_support_process = (event) => {
    setstrategic_support_process(event.target.value);
  };

  const changestrategic_support_input = (event) => {
    setstrategic_support_input(event.target.value);
  };

  const changestrategic_support_output = (event) => {
    setstrategic_support_output(event.target.value);
  };



  // handle input change
  const exportPDFWithMethod = () => {
    GetallRecored();
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

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
    fetch(`http://localhost:9002/masters/vilakshanMapTab1/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setcompleteData(resData.data);
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
    console.log(completeData, "reso");

  }

  const handleSubmit = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var rawrich = JSON.stringify({
      vilakshan_journey: vilakshan_journey,
      vilakshan_form: vilakshan_form,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptionsrichtext = {
      method: "POST",
      headers: myHeaders,
      body: rawrich,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/vilakshanMapTab1`, requestOptionsrichtext)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        if (resData.status == 200) {
          console.log(completeData, "completeData");
          if (completeData.length == 0) {
            // window.location.reload();
          } else {
            GetallRecored();

            console.log("Data Added succesfully");
            setMadd(true);
            // setMadd(false);
            setTimeout(() => {
              setMadd(false);
            }, 1000)
            // props.OnValidate(true)
            GetallRecored();

            // props.getDataOff(true);
          }
        }
        GetallRecored();
      })
      .catch((error) => console.log("error", error));
    setformValid(true);
  };

  const changeeditvilakshan_journey = (event) => {
    seteditvilakshan_journey(event.target.value);
  };

  const changeeditvilakshan_form = (event) => {
    seteditvilakshan_form(event.target.value);
  };

  // const changeeditvccs = (event) => {
  //   seteditvccs(event.target.value);
  // };

  const changeeditparent_process_name = (event) => {
    seteditparent_process_name(event.target.value);
  };

  const changeeditparent_process_input = (event) => {
    seteditparent_process_input(event.target.value);
  };

  const changeeditparent_process_output = (event) => {
    seteditparent_process_output(event.target.value);
  };

  const changeeditparent_process_owner = (event) => {
    seteditparent_process_owner(event.target.value);
  };

  const changeeditstrategic_support_process = (event) => {
    seteditstrategic_support_process(event.target.value);
  };

  const changeeditstrategic_support_input = (event) => {
    seteditstrategic_support_input(event.target.value);
  };

  const changeeditstrategic_support_output = (event) => {
    seteditstrategic_support_output(event.target.value);
  };


  const handleClose = () => {
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
    fetch(
      `http://localhost:9002/masters/vilakshanMapTab1/${delId}`,
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
        GetallRecored();
      })
      .catch((error) => console.log("error", error));
  };
  // const handleShow = () => setShow(true);

  const OnSubmitUpdate = (edId) => {
    // alert(edId)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      vilakshan_journey: editvilakshan_journey,
      vilakshan_form: editvilakshan_form,
      // vccs: editvccs,
      // parent_process_name: editparent_process_name,
      // parent_process_input: editparent_process_input,
      // parent_process_output: editparent_process_output,
      // parent_process_owner: editparent_process_owner,
      // strategic_support_process: editstrategic_support_process,
      // strategic_support_input: editstrategic_support_input,
      // strategic_support_output: editstrategic_support_output,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/vilakshanMapTab1/${edId}`, requestOptions)
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
          props.OnValidateTab1(true);

        }
        GetallRecored();
      })
      .catch((error) => console.log("error", error));
    setShow(false);
    seteditModal(false);
    // GetallRecored();
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
      `http://localhost:9002/masters/vilakshanMapTab1/${edit_id}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data[0].id);
        seteditId(resData.data[0].id);
        seteditvilakshan_journey(resData.data[0].vilakshan_journey);
        seteditvilakshan_form(resData.data[0].vilakshan_form);
        seteditparent_process_name(resData.data[0].parent_process_name);
        seteditparent_process_input(resData.data[0].parent_process_input);
        seteditparent_process_output(resData.data[0].parent_process_output);
        seteditparent_process_owner(resData.data[0].parent_process_owner);
        seteditstrategic_support_process(resData.data[0].strategic_support_process);
        // seteditvccs(resData.data[0].vccs);
        seteditstrategic_support_input(resData.data[0].strategic_support_input);
        seteditstrategic_support_output(resData.data[0].strategic_support_output);
      })
      .catch((error) => console.log("error", error));
  };
  const deletefn = (edit_id) => {
    setdelId(edit_id);
    setShow(true);
  };




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

      <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card p-4 mt-2">
              <div className="body p-5">
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Vilakshan Journey</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Vilakshan Journey"
                        name="vilakshan_journey"
                        onChange={changevilakshan_journey}
                        value={vilakshan_journey}
                      />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Vilakshan form</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Vilakshan form"
                        name="vilakshan_form"
                        onChange={changevilakshan_form}
                        value={vilakshan_form}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>VCCs (Cost Centres)</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="VCCs (Cost Centres)"
                        name="vccs"
                        onChange={changevccs}
                        value={vccs}
                      />
                    </div>
                  </div>
                </div> */}
                {/* <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Parent Process Name</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Parent Process Name"
                        name="parent_process_name"
                        onChange={changeparent_process_name}
                        value={parent_process_name}
                      />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Parent Process Input</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Parent Process Input"
                        name="parent_process_input"
                        onChange={changeparent_process_input}
                        value={parent_process_input}
                      />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Parent Process Output</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Parent Process Output"
                        name="parent_process_output"
                        onChange={changeparent_process_output}
                        value={parent_process_output}
                      />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Parent Process Owner</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Parent Process Owner"
                        name="parent_process_owner"
                        onChange={changeparent_process_owner}
                        value={parent_process_owner}
                      />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Strategic Support Process</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Strategic Support Process"
                        name="strategic_support_process"
                        onChange={changestrategic_support_process}
                        value={strategic_support_process}
                      />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Strategic Support Input</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Strategic Support Input"
                        name="strategic_support_input"
                        onChange={changestrategic_support_input}
                        value={strategic_support_input}
                      />
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-md-12">
                    <h2 className="card-inside-title">
                      <strong>Strategic Support Output</strong>
                    </h2>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Strategic Support Output"
                        name="strategic_support_output"
                        onChange={changestrategic_support_output}
                        value={strategic_support_output}
                      />
                    </div>
                  </div>
                </div> */}
                <button
                  type="submit"
                  class="btn savebtn  waves-effect"
                  onClick={handleSubmit}
                >
                  SAVE <i className="ml-1 zmdi zmdi-save"></i>
                </button>
                {completeData.length > 0 ? (
                  <>
                    <button type="button" class="btn downloadbtn waves-effect" onClick={exportPDFWithMethod}>Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i></button>
                    <button type="button" class="btn viewbtn  waves-effect ml-4" data-toggle="modal" data-target="#largeModal" onClick={() => props.OnValidate(true)}>SUBMIT  <i className="ml-1 zmdi zmdi-check"></i></button>

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


                          </Modal.Body>
                        </PDFExport>
                      </div>
                    </div>

                  </>

                ) : (null)
                }

                <>
                  {completeData.length > 0 ? (
                    <div class="table-responsive mt-5" id="Table">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>Vilakshan Journey</th>
                            <th>Vilakshan Form</th>
                            {/* <th>VCCs (Cost Centres)</th> */}
                            {/* <th>Parent Process Name</th>
                          <th>Parent Process Input</th>
                          <th>Parent Process Output</th>
                          <th>Parent Process Owner</th>
                          <th>Strategic Support Process</th>
                          <th>Strategic Support Input</th>
                          <th>Strategic Support Output</th> */}
                            <th style={{ textAlign: "center" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {completeData.map((item, key) => (
                            <tr>
                              <td>{item.vilakshan_journey}</td>
                              <td>{item.vilakshan_form}</td>
                              {/* <td>{item.vccs}</td> */}
                              {/* <td>{item.parent_process_name}</td>
                            <td>{item.parent_process_input}</td>
                            <td>{item.parent_process_output}</td>
                            <td>{item.parent_process_owner}</td>
                            <td>{item.strategic_support_process}</td>
                            <td>{item.strategic_support_input}</td>
                            <td>{item.strategic_support_output}</td> */}
                              <td className="w-25">
                                <div style={{ marginLeft: "75px" }}>
                                  <div class="btn-group" >
                                    <button

                                      type="submit"
                                      title="edit"
                                      class="btn  zmdi zmdi-edit waves-effect"

                                      onClick={() => editfn(item.id)}
                                    ></button>
                                    <button
                                      type="submit"
                                      title="delete"
                                      class="btn btn-danger zmdi zmdi-delete waves-effect"
                                      onClick={() => deletefn(item.id)}
                                    ></button>
                                  </div>
                                </div>

                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (null)}
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
                  {/* For Edit */}
                  <Modal
                    size="lg"
                    show={editModal}
                    onHide={handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Edit vilakshan Map
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="container-fluid">
                        <div className="row clearfix">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                              <div className="body">
                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <h2 className="card-inside-title">
                                      <strong>Vilakshan Journey</strong>
                                    </h2>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Vilakshan Journey"
                                        name="vilakshan_journey"
                                        onChange={changeeditvilakshan_journey}
                                        value={editvilakshan_journey}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <h2 className="card-inside-title">
                                      <strong>Vilakshan form</strong>
                                    </h2>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Vilakshan form"
                                        name="vilakshan_form"
                                        onChange={changeeditvilakshan_form}
                                        value={editvilakshan_form}
                                      />
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="row clearfix">
                                <div className="col-md-12">
                                  <h2 className="card-inside-title">
                                    <strong>VCCs (Cost Centres)</strong>
                                  </h2>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="VCCs (Cost Centres)"
                                      name="vccs"
                                      onChange={changeeditvccs}
                                      value={editvccs}
                                    />
                                  </div>
                                </div>
                              </div> */}
                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <h2 className="card-inside-title">
                                      <strong>Parent Process Name</strong>
                                    </h2>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Parent Process Name"
                                        name="parent_process_name"
                                        onChange={changeeditparent_process_name}
                                        value={editparent_process_name}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <h2 className="card-inside-title">
                                      <strong>Parent Process Input</strong>
                                    </h2>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Parent Process Input"
                                        name="parent_process_input"
                                        onChange={changeeditparent_process_input}
                                        value={editparent_process_input}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <h2 className="card-inside-title">
                                      <strong>Parent Process Output</strong>
                                    </h2>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Parent Process Output"
                                        name="parent_process_output"
                                        onChange={changeeditparent_process_output}
                                        value={editparent_process_output}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <h2 className="card-inside-title">
                                      <strong>Parent Process Owner</strong>
                                    </h2>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Parent Process Owner"
                                        name="parent_process_owner"
                                        onChange={changeeditparent_process_owner}
                                        value={editparent_process_owner}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <h2 className="card-inside-title">
                                      <strong>Strategic Support Process</strong>
                                    </h2>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Strategic Support Process"
                                        name="strategic_support_process"
                                        onChange={changeeditstrategic_support_process}
                                        value={editstrategic_support_process}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <h2 className="card-inside-title">
                                      <strong>Strategic Support Input</strong>
                                    </h2>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Strategic Support Input"
                                        name="strategic_support_input"
                                        onChange={changeeditstrategic_support_input}
                                        value={editstrategic_support_input}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row clearfix">
                                  <div className="col-md-12">
                                    <h2 className="card-inside-title">
                                      <strong>Strategic Support Output</strong>
                                    </h2>
                                  </div>
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Strategic Support Output"
                                        name="strategic_support_output"
                                        onChange={changeeditstrategic_support_output}
                                        value={editstrategic_support_output}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="submit"
                                  class="btn savebtn waves-effect"
                                  onClick={() => OnSubmitUpdate(editId)}
                                >
                                  Update
                                </button>
                              </div>
                              <div style={{ marginTop: 30 }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </>
              </div>


              <div style={{ marginTop: 30 }}></div>
              {/* {renderTable()} */}

            </div>
          </div>
        </div >
      </div >
    </>
  );
}
