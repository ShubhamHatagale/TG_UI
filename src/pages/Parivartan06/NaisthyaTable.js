import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

const Table = (props) => {
  const history = useHistory();
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
  if (formData) {
    formData.map((item, key) => {
      rows.push(
        <tbody>
          <td>{item.prayaan_category}</td>
          <td>{item.prayaan_steps}</td>
          <td>{item.executer}</td>
          <td>{item.owner}</td>
          <td>{item.start_date}</td>
          <td>{item.completion_date}</td>
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
            <th>Prayaan Category</th>
            <th>Prayaan Steps</th>
            <th>Executer</th>
            <th>Owner</th>
            <th>StartDate</th>
            <th>Date of Completion</th>
          </tr>
        </thead>
        {rows}
      </table>
    </div>
  );
};
export default Table;
