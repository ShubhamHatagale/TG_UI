import React, { useState, useEffect } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Editor from "../../components/SunEditor";
import { useHistory } from "react-router-dom";
import { ListContainer, ListItem } from "../components/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragHandle } from "../components/DragHandle";
import List from "./data";

export default function Vilakshan(props) {
  const history = useHistory();
  var s_id = localStorage.getItem('tr_id')
  const [total, settotal] = useState(0);

  const pdfExportComponent = React.useRef(null);
  const [completeData, setcompleteData] = useState('');
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
  const [Upid, setUpid] = useState("");
  const [Madd, setMadd] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [Mdelete, setMdelete] = useState(false);
  const [beliverName, setbeliverName] = useState("");
  const [inputListFinal, setInputListFinal] = useState([{ competition: "" }]);
  const [inputList, setInputList] = useState([{ competition: "" }]);
  const [customerList, setCustomerList] = useState([{}]);
  const [inputListFinal2, setInputListFinal2] = useState([{}]);


  const handleInputChange = (e, index) => {
    console.log(e.target.id)
    console.log(e.target.name)
    console.log(e.target.value)
    // console.log(e.target.ips)

    // console.log(index)

    // if (e.target.value > 9) {
    //   setShowHideErr(false)
    // } else {
    //   setShowHideErr(true);
    //   // alert(Show)
    // }

    const { name, value, ips } = e.target;
    const list = [...inputListFinal];
    console.log("Here is the Value---1>", list);
    list[index][name] = value;
    list[index]["is_display"] = 0;

    console.log(list[index][name]);
    console.log(value + "val");


    setInputListFinal(list);
    // setcompleteData(list);

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
    fetch(`https://parivartan.transganization.com/nodejs/masters/vilakshanMapTab1/user/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        // setcompleteData(resData.data);
        if (resData.status == 200) {
          console.log("Data Added succesfully");
        }

        setcompleteData(resData.data);
        console.log("---resDAta--->", resData.data[0]);
        let MyValues1 = resData.data;

        let MyValues = resData.data;
        if (MyValues.length > 0) {
          // setedituser(true);
          setUpid(resData.data[0].id);

        }
        console.log("Edit Values", MyValues);

        MyValues.map((item, key) => {
          console.log("before Eval", item.features);
          let Feature = eval(item.features);
          let Feature2 = eval(item.features2);

          console.log("SDfjdskjfn jsdhfkjsdfn", Feature);
          console.log("SDfjdskjfn jsdhfkjsdfn22", Feature2);

          setCustomerList(Feature);
          setInputList(Feature);
          setInputListFinal(Feature)
          setInputListFinal2(Feature2)

        });

        console.log("Edit Values", MyValues1);
      })
      .catch((error) => console.log("error", error));

    fetch(
      `https://parivartan.transganization.com/nodejs/masters/parivartan_user/${s_id}`,
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

  const handleClose = () => {
    setShow(false);
    seteditModal(false);
  };

  const updateJson = (featureJson) => {
    console.log(featureJson)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      features: featureJson,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/vilakshanMapTab1/${s_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        GetallRecored();

        if (resData.status == 200) {
          // console.log("Values Submitted Succesfully==>");
          // setMupdate(true);
          // setTimeout(() => {
          //   setMupdate(false);
          // }, 1000)
          // props.OnValidate1(true)


          GetallRecored();

        }
        GetallRecored();

      })
      .catch((error) => console.log("error", error));
  }

  const handleRemoveClick = (index) => {
    const list = [...inputListFinal];
    setInputListFinal(list);
    list.splice(index, 1);
  };

  const handleAddClick = () => {
    let value = [];
    let key = [];
    value.push('competition');
    for (let i = 1; i <= total; i++) {
      value.push(`value${i}`)
    }
    for (let i = 1; i <= total; i++) {
      key.push([`${i}`])
    }
    var pack = function (arr) {
      var length = arr.length,
        result = {},
        i;
      for (i = 0; i < length; i++) {
        result[(i < 10 ? '0' : '') + (i + 1)] = arr[i];
      }
      return result;
    };
    const finalobject = pack(value); //{01: "one", 02: "two", 03: "three"}      
    console.log("object is", finalobject)
    setInputListFinal([...inputListFinal, finalobject]);
    console.log(inputList);
  };


  const OnSubmitHandle = () => {
    GetallRecored();
    console.log(completeData)

    for (var i = 0; i < inputListFinal.length; i++) {
      if (inputListFinal[i].value0 == "" || !inputListFinal[i].value0) {
        // seterrorshow(true);
        return false;
      }
    }
    setCustomerList([...customerList], inputList);
    let competition = [];
    let Values = [];
    // allObject.push(inputList);
    inputList.map((comp, key) => {
      competition.push(comp);
    });

    customerList.map((item, key) => {
      if (Object.keys(item).length === 3) {
        Values.push(item);
        for (var key in item) {
          console.log("Key Value is", item);
          console.log("Key Value is", item[key]);
          console.log("Key Value is", allObject);
        }
      }
    });

    var allObject = [...competition, ...Values];
    console.log("all datra", allObject);
    console.log("all data inputlist", inputListFinal);
    console.log("all data inputlist2", inputListFinal2);

    console.log(completeData.length)
    if (completeData.length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        features: inputListFinal,
        email_id: s_id,
        created_by: s_id,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/vilakshanMapTab1`,
        requestOptions
      )
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);

          if (resData.status == 200) {
            console.log("Values Submitted Succesfully==>");
            setMadd(true);
            setTimeout(() => {
              setMadd(false);
            }, 1000)
            GetallRecored();

            // props.OnValidate(true)



            //             props.OnValidate1(true)

          }
        })
        .catch((error) => console.log("error", error));
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        updated_by: s_id,
        features: inputListFinal
      });
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/vilakshanMapTab1/${s_id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);


          if (resData.status == 200) {
            console.log("Values Submitted Succesfully==>");
            setMupdate(true);
            setTimeout(() => {
              setMupdate(false);
            }, 1000)

            GetallRecored()
            // props.OnValidate(true)



            // GetallRecored();
          }
        })
        .catch((error) => console.log("error", error));
    }

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


      <div className="row clearfix" style={{ backgroundColor: "#F3F6F9" }}>

        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card p-4 mt-2">
            {completeData ? (
              <div className="body p-5" style={{ overflowX: "scroll" }}>
                <DragDropContext
                  onDragEnd={(param) => {
                    const srcI = param.source.index;
                    const desI = param.destination?.index;
                    if (desI) {
                      inputListFinal.splice(desI, 0, inputListFinal.splice(srcI, 1)[0]);
                      List.saveList(inputListFinal);
                      console.log(inputListFinal)
                      updateJson(inputListFinal);
                    }
                  }}
                >
                  <ListContainer>

                    <div style={{ marginTop: 20 }}>
                    </div>
                   
                    <div className="row clearfix flex-nowrap">
                      <div className="col-md-2 ml-4">
                        <div className="form-group text-center font-weight-bold">
                          <span>Vilakshan Journey</span>

                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="form-group text-center font-weight-bold">
                          <span>Vilakshan Form</span>

                        </div>
                      </div> <div className="col-md-2">
                        <div className="form-group text-center font-weight-bold">
                          <span>Parent Process Name</span>

                        </div>
                      </div> <div className="col-md-2">
                        <div className="form-group text-center font-weight-bold">
                          <span>Parent Process Input</span>

                        </div>
                      </div> <div className="col-md-2">
                        <div className="form-group text-center font-weight-bold">
                          <span>Parent Process Output</span>

                        </div>
                      </div> <div className="col-md-2">
                        <div className="form-group text-center font-weight-bold">
                          <span>Parent Process Owner</span>

                        </div>
                      </div> <div className="col-md-2">
                        <div className="form-group text-center font-weight-bold">
                          <span>Strategic Support Process</span>

                        </div>
                      </div> <div className="col-md-2">
                        <div className="form-group text-center font-weight-bold">
                          <span>Strategic Support Input</span>

                        </div>
                      </div> <div className="col-md-2">
                        <div className="form-group text-center font-weight-bold">
                          <span>Strategic Support Output</span>

                        </div>
                     
                       
                      </div>

                    </div>




                    <Droppable droppableId="droppable-1">
                      {(provided, _) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          {inputListFinal.map((x, i) => {
                            console.log("The competion sheet", x)

                            return (
                              <>
                                <Draggable
                                  key={x.id}
                                  draggableId={"draggable-" + i}
                                  index={i}
                                // recId={x.id}
                                >
                                  {(provided, snapshot) => (
                                    <ListItem
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                        boxShadow: snapshot.isDragging
                                          ? "0 0 .4rem #666"
                                          : "none",
                                      }}
                                    >


                                      <div className="row clearfix flex-nowrap">
                                        <DragHandle {...provided.dragHandleProps} className="mr-2" />

                                        {Array.from({ length: 9 }, (item, index) => {
                                          return (
                                            <>
                                              <div className="col-md-2">
                                                <div className="form-group">
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0"
                                                    maxLength={500}
                                                    max={500}
                                                    name={`value${index}`}
                                                    value={x[`value${index}`]}
                                                    onChange={(e) => handleInputChange(e, i)}
                                                    required
                                                  />

                                                </div>
                                              </div>


                                            </>
                                          );
                                        })}


                                        <div className="col-md-2">
                                          {inputListFinal.length !== 1 && (
                                            <button
                                              type="button"
                                              className="btn btn-raised rembtn btn-square waves-effect m-l-40"
                                              onClick={() => handleRemoveClick(i)}
                                            >
                                              <strong>REMOVE</strong>
                                            </button>
                                          )}
                                          {inputListFinal.length - 1 === i && (
                                            <button
                                              type="button"
                                              className="btn btn-raised addbtn btn-square waves-effect m-l-40 "
                                              onClick={handleAddClick}
                                            >
                                              <strong>ADD</strong>
                                            </button>
                                          )}
                                        </div>
                                        {/* <div className="col-md-2">
                                                                <div className="form-group">
                                                                    <SelectBox onChangeTag={onChange} keyValue={x.point_to_be_considered} keyid={x.id} />
                                                                </div>

                                                            </div> */}
                                      </div>


                                      {/* <div className="col-md-2">
                                                                {completeData.length !== 1 && (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-raised rembtn btn-square waves-effect m-l-40 "
                                                                        onClick={() => handleRemoveClick(i)}
                                                                    >
                                                                        <strong>REMOVE</strong>
                                                                    </button>
                                                                )}
                                                                {completeData.length - 1 === i && (
                                                                    <button
                                                                        type="button"
                                                                        className="btn  addbtn btn-square waves-effect m-l-40 "
                                                                        onClick={handleAddClick}
                                                                    >
                                                                        <strong>ADD</strong>
                                                                    </button>
                                                                )}
                                                            </div> */}

                                    </ListItem>
                                  )}
                                </Draggable>

                              </>
                            );

                          })}
                          {provided.placeholder}

                        </div>
                      )}
                    </Droppable>


                  </ListContainer>

                </DragDropContext>



                <div style={{ marginTop: 30 }}></div>

                {/* <button type="submit" class="btn savebtn  waves-effect" onClick={OnSubmitHandle}>SAVE    <i className="ml-1 zmdi zmdi-save " /> </button> */}
                <button type="button" class="btn savebtn waves-effect"
                  onClick={OnSubmitHandle}>SAVE</button>

                {completeData.length > 0 ? (<button type="button" class="btn viewbtn waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={() => props.OnValidate1(true)}>SUBMIT <i className="ml-1 zmdi zmdi-check " /> </button>
                ) : null}

              </div>
            ) : (null)}
          </div>
        </div>
      </div >

    </>
  );
}
