import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Editor from "../../components/SunEditor";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const Table = (props) => {
  const history = useHistory();
  var s_id = localStorage.getItem('tr_id')

  const [loading, setloading] = useState(false);
  const [date, setdate] = useState();
  const [Fdate, setFdate] = useState();
  let [completeData, setcompleteData] = useState("");

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
  const [Mdelete, setMdelete] = useState(false);
  const [vilakParaE, setvilakParaE] = useState("");



  // const classes = useStyles();
  // const verticleclasses = useStylesVerticle();
  const [value, setValue] = React.useState(0);


  const changeInpts = (event) => {
    setvilakParaE(event.target.value);
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

    setfyE1("FYE " + ddts + "-" + ddt1);
    setfyE2("FYE " + ddtF1 + "-" + ddt2);
    setfyE3("FYE " + ddtF2 + "-" + ddt3);
    setfyE4("FYE " + ddtF3 + "-" + ddt4);
    setfyE5("FYE " + ddtF4 + "-" + ddt5);
  };

  function TabPanel(props) {
    // const classes = useStyles();
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

  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    getYear();

    GetallRecored();
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

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
        GetallRecored();
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
          GetallRecored();
        }
      })
      .catch((error) => console.log("error", error));

    setShow(false);
    seteditModal(false);
    GetallRecored();
  };

  const deletefn = (edit_id) => {
    // alert(edit_id);
    setdelId(edit_id);
    setShow(true);
  };

  const GetallRecored = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/drishti/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setcompleteData(resData.data);
      })
      .catch((error) => console.log("error", error));
  };

  // let formData = props.AllData;
  let rows = [];
  if (completeData) {
    completeData.map((item, key) => {
      rows.push(
        <tbody>
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
        </tbody>
      );
    });
  }

  return loading ? (
    <div sytle={{ display: "flex", justifyEContent: "center" }}>
      <CircularProgress />
    </div>
  ) : (
    <>



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
        show={Mupdate}
        onHide={() => setMupdate(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Update Successful</Modal.Body>
      </Modal>
      <div class="table-responsive" id="Table">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Vilakshan and Associated Parameters</th>
              <th>FYE 2021-22</th>
              <th>FYE 2022-23 </th>
              <th>FYE 2023-24 </th>
              <th>FYE 2024-25 </th>
              <th>FYE 2025-26 </th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          {rows}
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure You Want To Delete!</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Are You Sure You Want To Delete!</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cance
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
                    <h2 className="card-inside-title">
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
                    <h2 className="card-inside-title">
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
                    <h2 className="card-inside-title">
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
                    <h2 className="card-inside-title">
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
                    <h2 className="card-inside-title">
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

                    <h2 className="card-inside-title">
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
                      class="btn btn-success btn-square waves-effect"
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
};
export default Table;
