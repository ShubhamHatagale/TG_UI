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
  const history = useHistory();
  var s_id = localStorage.getItem('tr_id')

  const [loading, setloading] = useState(false);
  let [completeData, setcompleteData] = useState("");
  let inner_id = props.AllData;
  console.log(inner_id);

  const GetallRecored = () => {
    var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders2,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/process/` + `${inner_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((res) => {
        // console.log(res.data);
        setcompleteData(res.data);
        if (res.status == 200) {
          console.log("Data Added succesfully");
        }
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    GetallRecored();
  }, []);

  let rows = [];
  if (completeData) {
    completeData.map((item, key) => {
      rows.push(
        <tbody>
          <td>{item.sr_no}</td>
          <td>{item.step_decription}</td>
          <td>{item.trasaction_time}</td>
          <td>{item.resource_allocated}</td>
          <td>{item.resource_name}</td>
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
              <th>Sr. No.</th>
              <th>Step Description</th>
              <th>Transaction Time (Days / Hours)</th>
              <th>Resource Allocated (Departments)</th>
              <th>Name of Resources (Individuals)</th>
            </tr>
          </thead>
          {rows}
        </table>
      </div>
    </>
  );
};
export default Table;
