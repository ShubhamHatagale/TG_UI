import React, { useEffect, forwardRef, useImperativeHandle, useState } from "react";
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

const Table = forwardRef((props, ref) => {



  const [childName, changeChildName] = useState("Iamchild")

  var s_id = localStorage.getItem('tr_id')

  const history = useHistory();
  const [loading, setloading] = useState(false);
  let [completeData, setcompleteData] = useState("");
  let [inner_id, setinner_id] = useState(props.AllData);

  // let inner_id = props.AllData;
  console.log(inner_id, "innerId");
  const [editId, seteditId] = useState("");
  const [delId, setdelId] = useState("");
  let [vilakshanData, setVilakshanData] = useState("");
  const [show, setShow] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [sr_no, setsr_no] = useState();
  const [step_decription, setstep_decription] = useState();
  const [trasaction_time, settrasaction_time] = useState();
  const [resource_allocated, setresource_allocated] = useState();
  const [resource_name, setresource_name] = useState();
  const [Mupdate, setMupdate] = useState(false);
  const [Mdelete, setMdelete] = useState(false);
  const [AddCheck, setAddCheck] = useState("");



  useImperativeHandle(ref, () => ({
    callChildFunction(pid, a) {
      // alert(pid);
      // alert(a);
      setAddCheck(a);

      // var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      // var raw = JSON.stringify({
      //   sr_no: 2,
      //   step_decription: 2,
      //   trasaction_time: 2,
      //   resource_allocated: 2,
      //   resource_name: 2,
      //   email_id: s_id,
      //   created_by: s_id
      // });
      // var requestOptions = {
      //   method: "PUT",
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: "follow",
      // };
      // fetch(`https://parivartan.transganization.com/nodejs/masters/process/1`, requestOptions)
      //   .then((response) => response.json())
      //   .then((resData) => {
      //     console.log(resData);
      //     if (resData.status == 200) {
      //       console.log("updated");
      //       setMupdate(true);
      //       // setMupdate(false);
      //       setTimeout(() => {
      //         setMupdate(false);
      //       }, 1000)
      //     }
      //     GetallRecored();
      //   })
      //   .catch((error) => console.log("error", error));

      // props.callparentfunction()

      // setinner_id("");

      // GetallRecored(pid, a);
      // GetallRecored();
      // window.location.reload(false);

      // editfn(1);


      // setTimeout(() => {
      //   alert("ok")
      //   history.push("/processes")
      //   // props.OnValidate(true);
      GetallRecored();

      // }, 1000)

    }
  }))


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



  const handleClose = () => {
    setShow(false);
    seteditModal(false);
  };

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
    fetch(`https://parivartan.transganization.com/nodejs/masters/process/${edId}`, requestOptions)
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
        GetallRecored();
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
      `https://parivartan.transganization.com/nodejs/masters/process/${delId}`,
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
        GetallRecored();
      })
      .catch((error) => console.log("error", error));
  };



  const editfn = (edit_id) => {
    GetallRecored();

    seteditModal(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/processprocessId/${edit_id}`,
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


  // const OnValidateTab1 = (e) => {
  //   alert("hi shubh");

  //   // setValue(1);
  //   // setvalidateTab1(e);
  // }

  const GetallRecored = (pid, a) => {
    // let inner_id=pid;
    // alert("hallo" + inner_id);
    // if (a=="upd") {
    //   setinner_id('1');
    //   alert("hallob" + inner_id);

    //   var myHeaders2 = new Headers();
    //   myHeaders2.append("Content-Type", "application/json");
    //   var requestOptionsget = {
    //     method: "GET",
    //     headers: myHeaders2,
    //     redirect: "follow",
    //   };
    //   fetch(`https://parivartan.transganization.com/nodejs/masters/process/` + `${inner_id}`, requestOptionsget)
    //     .then((response) => response.json())
    //     .then((res) => {
    //       // console.log(res.data);
    //       setcompleteData(res.data);
    //       if (res.status == 200) {
    //         console.log("Data Added succesfully");

    //       }
    //     })
    //     .catch((error) => console.log("error", error));
    // }
    // alert(`${inner_id}`)
    var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders2,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/process/user/` + `${s_id}`, requestOptionsget)
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
    // OnValidateTab1();
    GetallRecored();
  }, []);

  let rows = [];
  if (completeData) {

    // {GetallRecored()}
    var optionVal = completeData.filter(({ parent_process_id, created_by }) => parent_process_id === "test3" && created_by === 1 )
    console.log(inner_id);
    console.log(s_id);

    console.log(optionVal);
    console.log(completeData);

    completeData.map((item, key) => {
      rows.push(

        <tbody>
          <td>{item.sr_no}</td>
          <td>{item.step_decription}</td>
          <td>{item.trasaction_time}</td>
          <td>{item.resource_allocated}</td>
          <td>{item.resource_name}</td>
          <td colspan="8">
            <div class="btn-group">
              <button
                type="submit"
                title="edit"
                class="btn  zmdi zmdi-edit waves-effect pull-left"
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

      <div class="table-responsive" id="Table">
        <div class="col-12" >
          <button type="button" class="btn waves-effect" style={{ marginLeft: "88%" }} onClick={GetallRecored}>Get Table Data </button>
        </div>
        {/* {setTimeout(()=>{
          alert("hallo")
        }),5000} */}
        {/* <button type="button" class="btn downloadbtn waves-effect" onClick={GetallRecored}>Get Data   <i class="ml-1 zmdi zmdi-cloud-download"></i></button> */}

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
    </>
  );
})
export default Table;
