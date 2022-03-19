import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Table = (props) => {
  const classes = useStyles();
  var s_id = localStorage.getItem('tr_id')

  const [loading, setloading] = useState(false);

  useEffect(() => {      
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
        </tbody>
      );
    });
  }

  return loading ? (
    <div sytle={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : (
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
          </tr>
        </thead>
        {rows}
      </table>
    </div>
  );
};
export default Table;
