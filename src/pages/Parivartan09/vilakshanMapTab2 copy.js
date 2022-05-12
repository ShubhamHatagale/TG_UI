import React, { useState, useEffect } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import List from "./data";
import { ListContainer, ListItem } from "../components/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragHandle } from "../components/DragHandle";

export default function Form(props) {

  const list = List.getList();

  const history = useHistory();
  var s_id = localStorage.getItem('tr_id')
  const [inputListFeature, setInputListFeature] = useState([{ featues: "" }]);
  const [inputListFeature2, setInputListFeature2] = useState([{ featues2: "" }]);

  const [inputList, setInputList] = useState([{ competition: "" }]);
  const [inputListFinal, setInputListFinal] = useState([{ competition: "" }]);
  const [inputListFinal2, setInputListFinal2] = useState([{}]);

  const [customerList, setCustomerList] = useState([{}]);
  const [allList, setallList] = useState("");
  const [EditList, setEditList] = useState([{}]);
  const [edituser, setedituser] = useState(false);
  const [PossibleCombination, setPossibleCombination] = useState(0);
  const [total, settotal] = useState(0);
  const [holdValue, setholdValue] = useState([]);
  const [org_name, setorg_name] = useState("");
  const [completeData, setcompleteData] = useState('')
  const [Upid, setUpid] = useState("");
  const [ShowHideErr, setShowHideErr] = useState(false);
  const [Madd, setMadd] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [errorshow, seterrorshow] = useState(false);

  const [DrpValues, setDrpValues] = useState("");

  let no = holdValue.length;
  const inputs = [];
  useEffect(() => {
    GetallRecords();

  }, []);


  const GetallRecords = () => {
    // alert("ok")
    if (!s_id) {
      history.push("Not_support");
    }
    setShowHideErr(false)
    var myGetHeaders = new Headers();
    myGetHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myGetHeaders,
      redirect: "follow",
    };
    // fetch(`https://parivartan.transganization.com/nodejs/masters/valueprop/` + `${1}`, requestOptions)
    fetch(`https://parivartan.transganization.com/nodejs/masters/valueprop/user/` + `${s_id}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        let MyValues = resData.data;
        console.log("In UseEffect Function", MyValues);
        let data;
        MyValues.map((item, key) => {
          let Feature = eval(item.features);
          let Feature2 = eval(item.features2);

          settotal(Feature.length);
          Feature.map((item, key) => {
            // data.push([{competition:"", [`value${key}`]:""}])
            holdValue.push({});
            console.log("Pushed data", holdValue);
          });



          // setInputList(data)
          setCustomerList(holdValue);
          console.log("Dataa to get map", Feature);
          console.log("Dataa to get map2", Feature2);

          setPossibleCombination(item.possible_combination);
          setInputListFeature(Feature);
          setInputListFeature2(Feature2);
          // props.OnValidateTab1(true);

        });
      });
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/vilakshanMapTab2/user/` + `${s_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {

        setcompleteData(resData.data);
        console.log("---resDAta--->", resData.data[0]);
        let MyValues1 = resData.data;

        let MyValues = resData.data;
        if (MyValues.length > 0) {
          setedituser(true);
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

        // MyValues1.map((i, key) => {
        //   console.log("before Eval", i.features);
        //   let Feature2 = eval(i.features);

        //   console.log("SDfjdskjfn jsdhfkjsdfn", Feature2);

        //   setCustomerList(Feature);
        //   setInputList(Feature);
        //   setInputListFinal(Feature)
        //   setInputListFinal2(Feature2)

        // });
      });

    fetch(`https://parivartan.transganization.com/nodejs/masters/customerSegment/user/${s_id}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        // setcompleteData(resData.data)
        console.log("In Beliver Get all Reccords Function", resData.data.length);
        if (resData.data.length > 0) {
          setorg_name(resData.data[0].org_name);
          console.log(resData.data)
          let MyValues = resData.data;
          console.log("In UseEffect Function", MyValues);
          // MyValues.map((item, key) => {
          //   let customerFaceMap = eval(item.customer_face);
          //   console.log("Data customerFaceMap ", customerFaceMap);
          //   setcustomerSegmentData(customerFaceMap)
          //   setInputList(customerFaceMap);
          // });
        }
        // setShowHideErrData(true)
      });

    fetch(`https://parivartan.transganization.com/nodejs/masters/vilakshanMapTab1/user/${s_id}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        setDrpValues(resData.data[0].features);
        if (resData.status == 200) {
          console.log("Data Added succesfully");
        }
      })
      .catch((error) => console.log("error", error));
    console.log(completeData, "reso");
    console.log(DrpValues, "DrpValues");

  }



  // handle input change
  const handleInputChange = (e, index) => {
    // console.log(e.target.id)
    // console.log(index)

    if (e.target.value > 9) {
      setShowHideErr(false)
    } else {
      setShowHideErr(true);
      // alert(Show)
    }

    const { name, value, ips } = e.target;
    const list = [...inputListFinal];
    console.log("Here is the Value---1>", list);
    list[index][name] = value;
    list[index]["is_display"] = 0;

    console.log(list[index][name]);
    console.log(value + "val");

    setInputListFinal(list);
  };


  const handleInputChange2 = (e, index) => {
    if (e.target.value > 9) {
      setShowHideErr(false)
    } else {
      setShowHideErr(true);
      // alert(Show)
    }

    const { name, value } = e.target;
    const list2 = [...inputListFinal2];
    console.log("Here is the Value2", list2);
    list2[0][name] = value;
    setInputListFinal2(list2);
  };

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

  const updateJson = (featureJson) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      features: featureJson,
      email_id: s_id,
      created_by: s_id,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/vilakshanMapTab2/${s_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        GetallRecords();

        if (resData.status == 200) {
          // console.log("Values Submitted Succesfully==>");
          // setMupdate(true);
          // setTimeout(() => {
          //   setMupdate(false);
          // }, 1000)
          // props.OnValidate1(true)


          GetallRecords();

        }
        GetallRecords();

      })
      .catch((error) => console.log("error", error));
  }



  const OnSubmitHandle = () => {
    for (var i = 0; i < inputListFinal.length; i++) {
      if (inputListFinal[i].value0 == "" || !inputListFinal[i].value0) {
        seterrorshow(true);
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
        `https://parivartan.transganization.com/nodejs/masters/vilakshanMapTab2/`,
        requestOptions
      )
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          // props.OnValidate1(true)


          if (resData.status == 200) {
            console.log("Values Submitted Succesfully==>");
            setMadd(true);
            setTimeout(() => {
              setMadd(false);
            }, 1000)
            // props.OnValidate1(true)
            GetallRecords();

            //             props.OnValidate1(true)

          }
        })
        .catch((error) => console.log("error", error));
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        features: inputListFinal,
        email_id: s_id,
        created_by: s_id,
      });
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/vilakshanMapTab2/${s_id}`,
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
            // props.OnValidate1(true)


            GetallRecords();
          }
        })
        .catch((error) => console.log("error", error));
    }

  };


  return (
    <>

      <div className="container-fluid">

        <Modal
          size="sm"
          show={Madd}
          onHide={() => setMadd(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Body >Form Saved Successful</Modal.Body>
        </Modal>

        <Modal
          size="sm"
          show={Mupdate}
          onHide={() => setMupdate(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Body >Form Update Successful</Modal.Body>
        </Modal>
        {/* <div className="row clearfix " style={{ backgroundColor: "#F3F6F9",width:"100rem",overflowX:"auto",whiteSpace:"nowrap" }}> */}
        <div className="row clearfix " style={{ backgroundColor: "white", width: "80rem", backgroundColor: "#F3F6F9" }}>

          <div className="col-lg-12 col-md-12 col-sm-12" >
            <div className="card p-4 mt-2" >


              <div style={{ backgroundColor: "white", width: "80rem", overflowX: "auto", }}>
                {console.log(inputListFinal[0].value0)}

                {inputListFeature && inputListFinal ? (
                  <div className="body p-5">

                    {errorshow == true ? (<div style={{ margin: "10px", marginLeft: "30px", text: "red" }}>
                      <span className="text-danger">Please fill the parent process name</span>
                    </div>) : null}
                    <div style={{ marginTop: 20 }}></div>


                    <DragDropContext
                      onDragEnd={(param) => {
                        const srcI = param.source.index;
                        const desI = param.destination?.index;
                        if (desI) {
                          inputListFinal.splice(desI, 0, inputListFinal.splice(srcI, 1)[0]);
                          List.saveList(inputListFinal);
                          console.log(inputListFinal)
                          GetallRecords()
                          updateJson(inputListFinal);
                        }
                      }}
                    >
                      <ListContainer>

                        <div className="row clearfix flex-nowrap">
                          <div className="col-lg-2">
                            <div className="form-group text-center">
                              <strong>Select Vilakshan Journey</strong>
                            </div>
                            {/* {org_name} */}
                          </div>
                          <div className="col-lg-2">
                            <div className="form-group">
                              <strong>Parent Process Name</strong>
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <div className="form-group">
                              <strong>Parent Process Input</strong>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="form-group">
                              <strong>Parent Process Output</strong>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="form-group">
                              <strong>Parent Process Owner</strong>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="form-group text-center">
                              <strong>Strategic Support Process</strong>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="form-group">
                              <strong>Strategic Support Input</strong>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="form-group text-center">
                              <strong>Strategic Support Output</strong>
                            </div>
                          </div>
                        </div>



                        <Droppable droppableId="droppable-1">
                          {(provided, _) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>

                              {inputListFinal.map((x, i) => {
                                console.log("The competion sheet", x)
                                return (

                                  <Draggable
                                    key={i}
                                    draggableId={"draggable-" + i}
                                    index={i}
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
                                          {Array.from({ length: 1 }, (item, index) => {
                                            return (
                                              // completeData.length > 0 && DrpValues.length > 0 ? (
                                              <>
                                                {DrpValues.length > 0 ? (
                                                  <div className="col-lg-2">
                                                    <div className="form-group">
                                                      <div className="row clearfix flex-nowrap">
                                                        <DragHandle {...provided.dragHandleProps} className="mr-2" />
                                                        <select name="tag" className="form-control" name={`tag${index}`} id={x[`${index}`]} value={x[`tag${index}`]} onChange={(e) => handleInputChange(e, i)}>
                                                          <option value=""></option>
                                                          {DrpValues.map((item, key) => (
                                                            // console.log(item.vilakshan_journey)
                                                            <option value={item.value0}>{item.value0}</option>
                                                          ))}
                                                        </select>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ) : (null)}
                                              </>
                                              // ) : (null)

                                            );
                                          })
                                          }


                                          {Array.from({ length: 7 }, (item, index) => {
                                            return (
                                              <>
                                                <div className="col-lg-2">
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
                                          })

                                          }


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
                                        </div>
                                      </ListItem>
                                    )}
                                  </Draggable>
                                );
                              })}

                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </ListContainer>
                    </DragDropContext>



                    <div style={{ marginTop: 30 }}></div>
                    <button
                      type="submit"
                      class="btn savebtn waves-effect"
                      onClick={OnSubmitHandle}
                    >
                      SAVE <i className="ml-1 zmdi zmdi-save " />
                    </button>

                    {completeData.length > 0 ? (<button type="button" class="btn viewbtn waves-effect m-r-20" data-toggle="modal" data-target="#largeModal" onClick={() => props.OnValidate1(true)}>SUBMIT <i className="ml-1 zmdi zmdi-check " /> </button>
                    ) : null}

                  </div>
                ) : null}
              </div>          </div>

          </div>
        </div>
      </div>
    </>

  );

}
