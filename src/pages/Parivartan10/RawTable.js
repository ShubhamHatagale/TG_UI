import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Table = (props) => {
  var s_id = localStorage.getItem('tr_id')

  const history=useHistory();
  const classes = useStyles();
  const [loading, setloading] = useState(false)
  const [editId, seteditId] = useState("");
  const [delId, setdelId] = useState("");
  let [vilakshanData, setVilakshanData] = useState("");
  const [show, setShow] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [business_unit, setbusiness_unit] = useState();
  const [insteelObjective, setinsteelObjective] = useState();
  const [FY, setFY] = useState();
  const [goalDescription, setgoalDescription] = useState();
  const [department, setdepartment] = useState();
  const [division, setdivision] = useState();
  const [role, setrole] = useState();
  const [name, setname] = useState();
  const [exptMngmt, setexptMngmt] = useState();
  const [Weightages, setWeightages] = useState();
  const [fy_target, setfy_target] = useState();
  const [fy_actuals, setfy_actuals] = useState();
  const [achievement_till_date, setachievement_till_date] = useState();

  const changebusiness_unit = (event) => {
    setbusiness_unit(event.target.value);
  };

  const changeinsteelObjective = (event) => {
    setinsteelObjective(event.target.value);
  };

  const changeFY = (event) => {
    setFY(event.target.value);
  };

  const changegoalDescription = (event) => {
    setgoalDescription(event.target.value);
  };

  const changedepartment = (event) => {
    setdepartment(event.target.value);
  };

  const changedivision = (event) => {
    setdivision(event.target.value);
  };

  const changerole = (event) => {
    setrole(event.target.value);
  };

  const changename = (event) => {
    setname(event.target.value);
  };

  const changeexptMngmt = (event) => {
    setexptMngmt(event.target.value);
  };

  const changeWeightages = (event) => {
    setWeightages(event.target.value);
  };

  const changefy_target = (event) => {
    setfy_target(event.target.value);
  };

  const changefy_actuals = (event) => {
    setfy_actuals(event.target.value);
  };

  const changechangeachievement_till_date = (event) => {
    setachievement_till_date(event.target.value);
  };

  const handleClose = () => {
    setShow(false);
    seteditModal(false);
  };

  const OnSubmitUpdate = (edId) => {
    // alert(edId)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      business_unit: business_unit,
      insteelObjective: insteelObjective,
      FY: FY,
      goalDescription: goalDescription,
      department: department,
      division: division,
      role: role,
      name: name,
      exptMngmt: exptMngmt,
      Weightages: Weightages,
      fy_target: fy_target,
      fy_actuals: fy_actuals,
      achievement_till_date: achievement_till_date,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/goal_drillerRaw/${edId}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        if (resData.status == 200) {
          console.log("updated");
          // GetallRecored();
          window.location.reload();
        }
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
    fetch(`https://parivartan.transganization.com/nodejs/masters/goal_drillerRaw/${delId}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        // seteditId(resData.data[0].id);
        console.log("deleted");
        window.location.reload();

        setShow(false);
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
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/goal_drillerRaw/${edit_id}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data[0].id);
        console.log(resData.data);

        seteditId(resData.data[0].id);
        setbusiness_unit(resData.data[0].business_unit);

        setinsteelObjective(resData.data[0].insteelObjective);
        setFY(resData.data[0].FY);
        setgoalDescription(resData.data[0].goalDescription);
        setdepartment(resData.data[0].department);
        setdivision(resData.data[0].division);
        setrole(resData.data[0].role);
        setname(resData.data[0].name);
        setexptMngmt(resData.data[0].exptMngmt);
        setWeightages(resData.data[0].Weightages);
        setfy_target(resData.data[0].fy_target);

        setfy_actuals(resData.data[0].fy_actuals);
        setachievement_till_date(resData.data[0].achievement_till_date);
      })
      .catch((error) => console.log("error", error));
  };
  const deletefn = (edit_id) => {
    // alert(edit_id);
    setdelId(edit_id);
    setShow(true);
  };

  useEffect(() => {      var s_id = localStorage.getItem('tr_id')
    if (!s_id) {
      history.push("Not_support");
    }

    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  let formData = props.AllData;
  let rows = [];
  var srNo = 1;
  if (formData) {
    formData.map((item, key) => {
      rows.push(
        <tbody>
          <td>{srNo++}</td>
          <td>{item.business_unit}</td>
          <td>{item.insteelObjective}</td>
          <td>{item.FY}</td>
          <td>{item.goalDescription}</td>
          <td>{item.department}</td>
          <td>{item.division}</td>
          <td>{item.role}</td>
          <td>{item.name}</td>
          <td>{item.exptMngmt}</td>
          <td>{item.Weightages}</td>
          <td>{item.fy_target}</td>
          <td>{item.fy_actuals}</td>
          <td>{item.achievement_till_date}</td>
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
    <div sytle={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : (
    <>
      <div class="table-responsive" id="Table">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Business Unit</th>
              <th>Insteel Objective</th>
              <th>FY</th>
              <th>Goal Description</th>
              <th>Department</th>
              <th>Division</th>
              <th>Role</th>
              <th>Name</th>
              <th>Expectations from Management (Target)</th>
              <th>Weightages</th>
              <th>FY Target</th>
              <th>FY Actuals</th>
              <th>Achievement Till date</th>
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

      {/* For Edit */}

      <Modal
        size="lg"
        show={editModal}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Step Goal Driller Raw
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
                          <strong>Business Unit</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Business Unit"
                            name="business_unit"
                            onChange={changebusiness_unit}
                            value={business_unit}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Insteel Objective</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Insteel Objective"
                            name="insteelObjective"
                            onChange={changeinsteelObjective}
                            value={insteelObjective}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>FY</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="FY"
                            name="FY"
                            onChange={changeFY}
                            value={FY}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Goal Description</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Goal Description"
                            name="goalDescription"
                            onChange={changegoalDescription}
                            value={goalDescription}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Department</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Department"
                            name="department"
                            onChange={changedepartment}
                            value={department}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Division</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Division"
                            name="division"
                            onChange={changedivision}
                            value={division}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Role</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Role"
                            name="role"
                            onChange={changerole}
                            value={role}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Name</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="name"
                            onChange={changename}
                            value={name}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Expectations from Management (Target)</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Expectations from Management (Target)"
                            name="exptMngmt"
                            onChange={changeexptMngmt}
                            value={exptMngmt}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Weightages</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Weightages"
                            name="Weightages"
                            onChange={changeWeightages}
                            value={Weightages}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>FY Target</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="FY Target"
                            name="fy_target"
                            onChange={changefy_target}
                            value={fy_target}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>FY Actuals</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="FY Actuals"
                            name="fy_actuals"
                            onChange={changefy_actuals}
                            value={fy_actuals}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Achievement Till date</strong>
                        </h2>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Achievement Till date"
                            name="achievement_till_date"
                            onChange={changechangeachievement_till_date}
                            value={achievement_till_date}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="btn btn-success  waves-effect"
                      onClick={() => OnSubmitUpdate(editId)}
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
    </>
  );
};
export default Table;
