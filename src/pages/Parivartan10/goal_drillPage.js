import React, { useState, useEffect } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Editor from "../../components/SunEditor";
// import Table from "./VilakshanMapTable";
import Table from "./RawTable";
import { useHistory } from "react-router-dom";

export default function Vilakshan(props) {
  var s_id = localStorage.getItem('tr_id')

  const history = useHistory();

  const pdfExportComponent = React.useRef(null);
  let [completeData, setcompleteData] = useState("");
  const [formValid, setformValid] = useState(false);
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
  // handle input change
  const exportPDFWithMethod = () => {
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
    fetch(`https://parivartan.transganization.com/nodejs/masters/goal_drillerRaw/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setcompleteData(resData.data);
        if (resData.status == 200) {
          console.log("Data Added succesfully");
        }
      })
      .catch((error) => console.log("error", error));
  }
  const handleSubmit = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var rawrich = JSON.stringify({
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
      created_by: s_id
    });
    var requestOptionsrichtext = {
      method: "POST",
      headers: myHeaders,
      body: rawrich,
      redirect: "follow",
    };
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/goal_drillerRaw`,
      requestOptionsrichtext
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        if (resData.status == 200) {
          console.log("Data Added succesfully");
        }
        GetallRecored();
      })
      .catch((error) => console.log("error", error));
    setformValid(true);
  };
  const renderTable = () => {
    return <Table AllData={completeData} />;
  };

  return (
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
                onClick={handleSubmit}
              >
                SAVE
              </button>
            </div>

            <div style={{ marginTop: 30 }}></div>
            {renderTable()}
          </div>
        </div>
      </div>
    </div>
  );
}
