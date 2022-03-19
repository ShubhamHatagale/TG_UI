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
  const history = useHistory();
  const classes = useStyles();
  const [formValid, setformValid] = useState(false);
  const [quesJourny, setquesJourny] = useState("");
  const [quesMind, setquesMind] = useState("");
  const [whoAnswer, setwhoAnswer] = useState("");
  const [possibleAnswer, setpossibleAnswer] = useState("");
  const [choiceMade, setchoiceMade] = useState("");
  const [value, setValue] = React.useState(0);
  let [completeData, setcompleteData] = useState('')
  const [IncID, setIncID] = useState()

  const [loading, setloading] = useState(false);
  const [verticlevalue, setverticleValue] = React.useState(3);
  const [editId, seteditId] = useState("");
  const [delId, setdelId] = useState("");
  let [vilakshanData, setVilakshanData] = useState("");
  const [show, setShow] = useState(false);
  const [editModal, seteditModal] = useState(false);

  const [addquesJourny, setaddquesJourny] = useState("");
  const [addquesMind, setaddquesMind] = useState("");
  const [addwhoAnswer, setaddwhoAnswer] = useState("");
  const [addpossibleAnswer, setaddpossibleAnswer] = useState("");
  const [addchoiceMade, setaddchoiceMade] = useState("");

  const [smShow, setSmShow] = useState(false);
  const [Mdelete, setMdelete] = useState(false);

  const changeAddQuestionJourny = (event) => {
    setaddquesJourny(event.target.value);
  };

  const changeAddQuestionMind = (event) => {
    setaddquesMind(event.target.value);
  };
  const changeAddPossibleAnswer = (event) => {
    setaddpossibleAnswer(event.target.value);
  };

  const changeAddChoiceMade = (event) => {
    setaddchoiceMade(event.target.value);
  };
  const changeAddWhoGiveAnswer = (event) => {
    setaddwhoAnswer(event.target.value);
  };

  const handleChange1 = (event, newValue) => {
    setverticleValue(newValue);
  };

  const changeQuestionJourny = (event) => {
    setquesJourny(event.target.value);
  };

  const changeQuestionMind = (event) => {
    setquesMind(event.target.value);
  };
  const changePossibleAnswer = (event) => {
    setpossibleAnswer(event.target.value);
  };

  const changeChoiceMade = (event) => {
    setchoiceMade(event.target.value);
  };
  const changeWhoGiveAnswer = (event) => {
    setwhoAnswer(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setShow(false);
    seteditModal(false);
  };
  const handleSubmit = (e) => {
    console.log(IncID==undefined)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var rawrich = JSON.stringify({
      question_mind_journy: addquesJourny,
      choice_made: addchoiceMade,
      possible_answer: addpossibleAnswer,
      who_give_answer: addwhoAnswer,
      question_mind_of: addquesMind,
      order_by: IncID==undefined?1:IncID,
      email_id: s_id,
      created_by: s_id,
    })
    var requestOptionsrichtext = {
      method: "POST",
      headers: myHeaders,
      body: rawrich,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/customerTab2`, requestOptionsrichtext)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        if (resData.status == 200) {
          console.log("Data Added succesfully")
          setSmShow(true);
          setTimeout(() => {
            setSmShow(false);
          }, 1000)
          GetData();
          // props.OnValidateTab1(true);

        }
      })
      .catch((error) => console.log("error", error))
    setformValid(true);
  }

  const deleteConfirm = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "delete",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `http://localhost:9002/masters/customerTab2/${delId}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log("deleted");
        setMdelete(true);
        setTimeout(() => {
          setMdelete(false);
        }, 1000)
        GetData();
        setShow(false);
      })
      .catch((error) => console.log("error", error));
  };

  const OnSubmitUpdate = (edId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      question_mind_journy: quesJourny,
      choice_made: choiceMade,
      possible_answer: possibleAnswer,
      who_give_answer: whoAnswer,
      question_mind_of: quesMind,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/customerTab2/${edId}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        if (resData.status == 200) {
          console.log("updated");
          setSmShow(true);
          setTimeout(() => {
            setSmShow(false);
          }, 1000)
          GetData();
        }
      })
      .catch((error) => console.log("error", error));
    console.log(formData);
    setShow(false);
    seteditModal(false);
  };

  const editfn = (edit_id) => {
    seteditModal(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `http://localhost:9002/masters/customerTab2/${edit_id}`,
      requestOptionsget
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data[0].id);
        console.log(resData.data[0].question_mind_journy);
        seteditId(resData.data[0].id);
        setquesJourny(resData.data[0].question_mind_journy);
        setquesMind(resData.data[0].question_mind_of);
        setwhoAnswer(resData.data[0].who_give_answer);
        setpossibleAnswer(resData.data[0].possible_answer);
        setchoiceMade(resData.data[0].choice_made);
      })
      .catch((error) => console.log("error", error));
  };
  const deletefn = (edit_id) => {
    setdelId(edit_id);
    setShow(true);
  };

  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    GetData();
  }, []);

  let formData = props.AllData;
  let rows = [];
  const GetData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/customerTab2/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setcompleteData(resData.data);
        formData = resData.data;
        if (resData.status == 200) {
          console.log("Data Added succesfully")
        }
      })
      .catch((error) => console.log("error", error))

    fetch(`http://localhost:9002/masters/customerTab2`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        var lastItem = resData.data.pop();
        console.log(lastItem.id)
        setIncID(lastItem.id + 1);
        // formData = resData.data;
        if (resData.status == 200) {
          console.log("Data Added succesfully")
        }
      })
      .catch((error) => console.log("error", error))



  };
  if (completeData) {
    completeData.map((item, key) => {
      rows.push(
        <tbody>
          <td>{item.question_mind_journy}</td>
          <td>{item.question_mind_of}</td>
          <td>{item.who_give_answer}</td>
          <td>{item.possible_answer}</td>
          <td>{item.choice_made}</td>
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
      <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card p-4 mt-2">
              <div className="body p-5">
                <form>
                  <h2 className="card-inside-title">
                    <strong>
                      Questions appearing in mind Journey
                    </strong>
                  </h2>
                  <input
                    type="text"
                    className="form-control"
                    name="questionjourny"
                    onChange={changeAddQuestionJourny}
                    value={addquesJourny}
                  />
                  <h2 className="card-inside-title">
                    <strong>Question appearing in Mind of</strong>
                  </h2>
                  <input
                    type="text"
                    className="form-control"
                    name="questionmind"
                    onChange={changeAddQuestionMind}
                    value={addquesMind}
                  />
                  <h2 className="card-inside-title">
                    <strong>Who Gives the answer</strong>
                  </h2>
                  <input
                    type="text"
                    className="form-control"
                    name="whogiveanswer"
                    onChange={changeAddWhoGiveAnswer}
                    value={addwhoAnswer}
                  />
                  <h2 className="card-inside-title">
                    <strong>Possible Answer</strong>
                  </h2>
                  <input
                    type="text"
                    className="form-control"
                    name="possibleanswer"
                    onChange={changeAddPossibleAnswer}
                    value={addpossibleAnswer}
                  />
                  <h2 className="card-inside-title">
                    <strong>Choice Made</strong>
                  </h2>
                  <input
                    type="text"
                    className="form-control"
                    name="choicemade"
                    onChange={changeAddChoiceMade}
                    value={addchoiceMade}
                  />
                  <div style={{ marginTop: 20 }}>
                  </div>
                  <button type="button" onClick={handleSubmit} class="btn savebtn btn-square waves-effect">SAVE    <i className="ml-1 zmdi zmdi-save " /></button>
                  <button
                    type="button"
                    class="btn viewbtn waves-effect"
                    onClick={() => props.OnValidateTab1(true)}
                  >
                    Submit  <i className="ml-1 zmdi zmdi-check " />                          </button>

                </form>
                <div style={{ marginTop: 30 }}></div>
                <div class="table-responsive" id="Table">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Questions appearing in mind Journey</th>
                        <th>Question appearing in Mind of</th>
                        <th>Who Gives the answer</th>
                        <th>Possible Answer</th>
                        <th>Choice Made</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    {rows}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure You Want To Delete!</Modal.Title>
        </Modal.Header>
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
            Edit Customer Tab
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div className="body">
                    <form>
                      <h2 className="card-inside-title">
                        <strong>
                          Questions appearing in mind Journey
                        </strong>
                      </h2>
                      <input
                        type="text"
                        className="form-control"
                        name="questionjourny"
                        onChange={changeQuestionJourny}
                        value={quesJourny}
                      />
                      <h2 className="card-inside-title">
                        <strong>Question appearing in Mind of</strong>
                      </h2>
                      <input
                        type="text"
                        className="form-control"
                        name="questionmind"
                        onChange={changeQuestionMind}
                        value={quesMind}
                      />
                      <h2 className="card-inside-title">
                        <strong>Who Gives the answer</strong>
                      </h2>
                      <input
                        type="text"
                        className="form-control"
                        name="whogiveanswer"
                        onChange={changeWhoGiveAnswer}
                        value={whoAnswer}
                      />
                      <h2 className="card-inside-title">
                        <strong>Possible Answer</strong>
                      </h2>
                      <input
                        type="text"
                        className="form-control"
                        name="possibleanswer"
                        onChange={changePossibleAnswer}
                        value={possibleAnswer}
                      />
                      <h2 className="card-inside-title">
                        <strong>Choice Made</strong>
                      </h2>
                      <input
                        type="text"
                        className="form-control"
                        name="choicemade"
                        onChange={changeChoiceMade}
                        value={choiceMade}
                      />
                      <div style={{ marginTop: 20 }}>
                      </div>
                      <button type="button" onClick={() => OnSubmitUpdate(editId)} class="btn savebtn btn-square waves-effect">Update</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Saved Successful</Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={Mdelete}
        onHide={() => setMdelete(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Row Deleted Successfully</Modal.Body>
      </Modal>

    </>
  );
};
export default Table;
