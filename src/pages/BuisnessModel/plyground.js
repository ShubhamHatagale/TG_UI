import React, { useState, useEffect } from "react";
import Editor from "../../components/SunEditor";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import "suneditor/dist/css/suneditor.min.css"; //Import Sun Editor's CSS File
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

export default function NaisthyaPrayaan(props) {
  var s_id = localStorage.getItem('tr_id');
  const history = useHistory();

  const [inputList, setInputList] = useState([
    {
      Prayaan_Category: "Prayaan Category",
      Prayaan_Steps: "Prayaan Steps",
      Executor: "Executor",
      Owner: "Owner",
      Start_Date: "Start Date",
      Date_of_Completion: "Date of Completions",
    },
  ]);
  const [basisofplayground, setbasisofplayground] =
    useState("Basis of your Playground");
  const [defineplayground, setdefineplayground] = useState(
    "Time Period and No of Vilakshan Units"
  );

  let [busiPlaygrounds, setbusiPlaygrounds] = useState("");
  let [prayaanData, setPrayaanData] = useState("");
  let [Finalizationddl, setFinalizationddl] = useState("");
  let [Finalizationtext, setFinalizationtext] = useState("");
  let [drpdata, setdrpdata] = useState("");
  let [Upid, setUpid] = useState("");

  const [Madd, setMadd] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [Mdelete, setMdelete] = useState(false);

  const [viewModal, setviewModal] = useState(false);
  const [ShowPdf, setShowPdf] = useState(false);
  const pdfExportComponent = React.useRef(null);
  const [belConceptDataa, setbelConceptDataa] = useState();

  const options = ["We will be Volume Focused", "We will be Price Focused"];

  useEffect(() => {
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
  const handleClose = () => {
    // setShowData(false);
    setviewModal(false);
  };

  const ViewModel = () => {
    setviewModal(true);
  };
  const OnSubmitForm = () => {
    // alert(Finalizationtext+Finalizationddl);
    if (busiPlaygrounds.length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        basisofplayground: basisofplayground,
        defineplayground: defineplayground,
        Finalizationddl: Finalizationddl,
        Finalizationtext: Finalizationtext,
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
        `https://parivartan.transganization.com/nodejs/masters/busiPlayground2`,
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
            props.OnValidateTab2(true);

          }
        })
        .catch((error) => console.log("error", error));

    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        basisofplayground: basisofplayground,
        defineplayground: defineplayground,
        Finalizationddl: Finalizationddl,
        Finalizationtext: Finalizationtext,
        email_id: s_id,
        updated_by: s_id,
      });
      var requestOptionsrichtext = {
        method: "PUT",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/busiPlayground2/` + `${Upid}`,
        requestOptionsrichtext
      )
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log(resData);
            console.log("Data Added succesfully");
            setMupdate(true);
            // setMupdate(false);
            setTimeout(() => {
              setMupdate(false);
            }, 1000)
            GetallRecords();
            props.OnValidateTab2(true);

          }
        })
        .catch((error) => console.log("error", error));
      GetallRecords();
    }
    if (inputList.length > 0) {
      inputList.map((item, key) => {
        let get_list = item;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          basisofplayground: basisofplayground,
          defineplayground: defineplayground,
          Finalizationtext: Finalizationtext,
          Finalizationddl: Finalizationddl,
          email_id: s_id,
          created_by: s_id,
        });
        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch(`https://parivartan.transganization.com/nodejs/masters/busiPlayground2` + `${Upid}`, requestOptions)
          .then((response) => response.json())
          .then((resData) => {
            console.log(resData);
            if (resData.status == 200) {
              if (inputList.length === key + 1) {
                console.log("All Data Added succesfully");
                GetallRecords();
              }
            }
          })
          .catch((error) => console.log("error", error));
      });
    }
  };

  const ChangeFinalization = (event, value) => {
    console.log("change the value", value);
    if (value == "We will be Price Focused") {
      setFinalizationtext("We are into Customer Intimacy (CI) Model");
    }
    if (value == "We will be Volume Focused") {
      setFinalizationtext("We are into Operational Excellence (OE) Model");
    }
    if (value == null) {
      setFinalizationtext('')
    }
    setFinalizationddl(value);
  };

  const GetallRecords = () => {
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
          setFinalizationtext(item.Finalizationtext);
          setFinalizationddl(item.Finalizationddl);
          setUpid(resData.data[0].id);

          // alert(item.Finalizationddl);
          // setdefineplayground(item.defineplayground);

        });
        setbusiPlaygrounds(resData.data);
      })
      .catch((error) => console.log("error", error));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/prayaan/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setPrayaanData(resData.data);
      })
      .catch((error) => console.log("error", error));
  };
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
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

      {busiPlaygrounds ? (
        <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card p-4 mt-2">
                <div className="body p-5">
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <h2 className="card-inside-title">
                        <strong>Basis of your Playground</strong>
                      </h2>
                      <div>
                        <Editor
                          contents={basisofplayground}
                          getValue={(newContent) => {
                            setbasisofplayground(newContent);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix" style={{ marginTop: 20 }}>
                    <div className="col-md-12">
                      <h2 className="card-inside-title">
                        <strong>Define your Playground</strong>
                      </h2>
                      <div>
                        <Editor
                          contents={defineplayground}
                          getValue={(newContent) => {
                            setdefineplayground(newContent);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}></div>
                  <div className="row clearfix">
                    <div className="col-md-6">
                      <Autocomplete
                        id="controllable-states-demo"
                        defaultValue={props.keyValue}
                        options={options}
                        value={Finalizationddl}
                        // onChange={}
                        // style={{ width: 300 }}
                        onChange={(event, value) => {
                          ChangeFinalization(event, value);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </div>
                    <div className="col-md-6">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        style={{ width: 500 }}
                        value={Finalizationtext}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}></div>
                  <button
                    type="submit"
                    class="btn savebtn waves-effect"
                    onClick={OnSubmitForm}
                  >
                    SAVE <i className="ml-1 zmdi zmdi-save " />
                  </button>
                  {/* <div>
                    <button
                      type="button"
                      class="btn btn-primary  waves-effect"
                      onClick={exportPDFWithMethod}
                    >
                      Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary  waves-effect"
                      onClick={ViewModel}
                    >
                      View  <i className="ml-1 zmdi zmdi-eye " />                    </button>
                  </div> */}
                  <div style={{ marginTop: 20 }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}






      {/* View Modal-----------------------> */}
      <Modal
        size="lg"
        show={viewModal}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div>
                    <div id="divToPrint" className="mt4">
                      <div className="row clearfix">
                        <div className="col-md-12">
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
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <div
                            style={{
                              alignSelf: "center",
                              alignContent: "center",
                              textAlign: "center",
                              fontWeight: "bold",
                              backgroundColor: "lightgrey",
                              width: "150",
                              border: "1px solid black",
                              marginLeft: "0",
                              padding: "10px",
                              margin: "10px",
                              marginTop: "30px",
                            }}
                          >
                            Playground Buiseness Model

                          </div>
                          <div
                            style={{
                              alignSelf: "left",
                              alignContent: "left",
                              textAlign: "left",
                              fontWeight: "bold",
                              padding: "10px",
                              margin: "10px",
                              marginTop: "20px",
                              marginLeft: "0",
                            }}
                          >
                            1) Basis of your Playground


                          </div>
                          <div
                            style={{
                              alignSelf: "center",
                              alignContent: "center",
                              textAlign: "center",
                              fontWeight: "bold",
                              backgroundColor: "lightgrey",
                              width: "150",
                              border: "2px solid black",
                              marginLeft: "0",
                              padding: "50px",
                              margin: "10px",
                              marginTop: "10px",
                            }}
                          >
                            {basisofplayground.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <div
                            style={{
                              alignSelf: "left",
                              alignContent: "left",
                              textAlign: "left",
                              fontWeight: "bold",
                              padding: "10px",
                              margin: "10px",
                              marginTop: "20px",
                              marginLeft: "0",
                            }}
                          >
                            2) Define your Playground

                          </div>
                          <div
                            style={{
                              alignSelf: "center",
                              alignContent: "center",
                              textAlign: "center",
                              fontWeight: "bold",
                              backgroundColor: "lightgrey",
                              width: "150",
                              border: "2px solid black",
                              marginLeft: "0",
                              padding: "50px",
                              margin: "10px",
                              marginTop: "10px",
                            }}
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
        </Modal.Body>
      </Modal>






    </>
  );
}
