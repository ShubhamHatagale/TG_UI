import React, { useState, useEffect } from "react";
import Editor from "../../components/SunEditor";
import "suneditor/dist/css/suneditor.min.css"; //Import Sun Editor's CSS File
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { ListContainer, ListItem } from "../components/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragHandle } from "../components/DragHandle";

export default function Form(props) {
  const history = useHistory();
  var s_id = localStorage.getItem('tr_id');
  const [inputList, setInputList] = useState([{ featues: "", noofpossiblity: "", possiblity: "", choicemade: "" }]);
  const [edituser, setedituser] = useState(false);
  const [PossibleCombination, setPossibleCombination] = useState(0);
  const [text_stmt, settext_stmt] = useState("");
  const [valPropData, setvalPropData] = useState("");
  const [Upid, setUpid] = useState("");
  const [Madd, setMadd] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [ErrorText, setErrorText] = useState("");


  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    GetallRecords();
  }, [])

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    console.log("In change handler ", list)
    list[index][name] = value;
    if (name == 'noofpossiblity') {
      let total = 1
      list.map((item, key) => {
        total = parseInt(item.noofpossiblity) * total
      })
      // console.log(list[0].noofpossiblity);
      // var sum = 1;
      // for (let i = 0; i < list.length; i++) {
      //   sum *= parseInt(list[i].noofpossiblity);
      //   console.log(parseInt(list[i].noofpossiblity))
      // }
      // console.log(sum)

      setPossibleCombination(total)
    }
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    setInputList(list);
    list.splice(index, 1);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { featues: "", noofpossiblity: "", possiblity: "", choicemade: "" }]);
    console.log(inputList);
  };
  const OnSubmitHandle = () => {
    for (var i = 0; i < inputList.length; i++) {
      if (inputList[i].choicemade == "" || inputList[i].featues == "" || inputList[i].noofpossiblity == "" || inputList[i].possiblity == "") {
        setErrorText("Please fill all the inputs and save all the data");
        return false;
      } else {
        setErrorText("");
      }
    }


    if (valPropData.length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        features: inputList,
        possible_combination: PossibleCombination,
        text_stmt: text_stmt,
        email_id: s_id,
        created_by: s_id,
      });
      var requestOptionsrichtext = {
        method: "POST",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/valueprop`,
        requestOptionsrichtext
      )
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            // console.log("Data Added succesfully");
            // setMadd(true);
            // setMadd(false);
            // setTimeout(() => {
            //   setMadd(false);
            // }, 1000)
            props.OnValidateTab3(true);

          }
        })
        .catch((error) => console.log("error", error));
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var rawrich = JSON.stringify({
        features: inputList,
        possible_combination: PossibleCombination,
        text_stmt: text_stmt,
        email_id: s_id,
        updated_by: s_id,
      });
      var requestOptionsrichtext = {
        method: "PUT",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/valueprop/${Upid}`,
        requestOptionsrichtext
      )
        .then((response) => response.json())
        .then((resData) => {
          GetallRecords();

          console.log(resData);
          if (resData.status == 200) {
            console.log(resData);
            console.log("Data Added succesfully");
            GetallRecords();

            // setMupdate(true);
            // setTimeout(() => {
            //   setMupdate(false);
            // }, 1000)
            props.OnValidateTab3(true);

            GetallRecords();
          }
        })
        .catch((error) => console.log("error", error));
      GetallRecords();
    };
  }

  const GetallRecords = () => {
    var myGetHeaders = new Headers();
    myGetHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myGetHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/valueprop/user/` + `${s_id}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {

        if (resData.data[0]) {
          setUpid(resData.data[0].id);

        }
        let MyValues = resData.data;
        console.log("In UseEffect Function", MyValues)
        if (MyValues.length > 0) {
          setedituser(true)
        }
        MyValues.map((item, key) => {
          let Feature = eval(item.features);
          console.log("Dataa to get map", Feature)
          setPossibleCombination(item.possible_combination)
          setInputList(Feature)
          settext_stmt(resData.data[0].text_stmt);

        })
        // settext_stmt(resData.data[0].text_stmt);
        // console.log(resData.data[0].text_stmt);

        setvalPropData(resData.data);
      })
  };

  const updateJson = (featureJson) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      features: featureJson,
      email_id: s_id,
      created_by: s_id
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/valueprop/${Upid}`,
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
      })
      .catch((error) => console.log("error", error));
  }

  return (
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



      <div className="row clearfix" style={{ backgroundColor: "#F3F6F9" }}>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div style={{ marginLeft: "40%" }}>
            <span ><b>{ErrorText}</b></span>

          </div>
          <div className="card p-4 mt-2" >
            {inputList ? (
              <div className="body p-5" style={{ overflowX: "scroll" }}>
                <DragDropContext
                  onDragEnd={(param) => {
                    const srcI = param.source.index;
                    const desI = param.destination?.index;
                    if (desI) {
                      inputList.splice(desI, 0, inputList.splice(srcI, 1)[0]);
                      // List.saveList(inputList);
                      console.log(inputList)
                      updateJson(inputList);
                    }
                  }}
                >
                  <ListContainer>

                    <div className="header">
                      <h2>
                        <strong>Possible Combination  :{PossibleCombination}
                        </strong>
                      </h2>
                    </div>
                    <div style={{ marginTop: 20 }}>
                    </div>
                    <div className="row clearfix" >
                      <div className="col-md-3">
                        <h2 className="card-inside-title text-center">
                          <strong>Features</strong>
                        </h2>
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title text-center">
                          <strong>No of Possiblities</strong>
                        </h2>
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title text-center">
                          <strong>Possiblities</strong>
                        </h2>
                      </div>
                      <div className="col-md-2">
                        <h2 className="card-inside-title text-center">
                          <strong>Choice Made</strong>
                        </h2>
                      </div>
                    </div>


                    <Droppable droppableId="droppable-1">
                      {(provided, _) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          {inputList.map((x, i) => {
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
                                      <DragHandle {...provided.dragHandleProps} className="mr-2" />

                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            // placeholder="Features"
                                            name="featues"
                                            value={x.featues}
                                            onChange={(e) => handleInputChange(e, i)}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <div className="form-group">
                                          <input
                                            type="number"
                                            className="form-control"
                                            // placeholder="No of Possiblities"
                                            name="noofpossiblity"
                                            value={x.noofpossiblity}
                                            onChange={(e) => handleInputChange(e, i)}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            min="0"
                                            className="form-control"
                                            // placeholder="Possiblities"
                                            name="possiblity"
                                            value={x.possiblity}
                                            onChange={(e) => handleInputChange(e, i)}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            // placeholder="Choice Made"
                                            name="choicemade"
                                            value={x.choicemade}
                                            onChange={(e) => handleInputChange(e, i)}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        {inputList.length !== 1 && <button type="button" className="btn btn-raised rembtn btn-square waves-effect m-l-40" onClick={() => handleRemoveClick(i)}><strong>REMOVE</strong></button>}
                                        {inputList.length - 1 === i && <button type="button" className="btn btn-raised addbtn btn-square waves-effect m-l-40 " onClick={handleAddClick}><strong>ADD</strong></button>}
                                      </div>
                                      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
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
                    {valPropData ? (
                      // <div className="container-fluid">
                      <div className="row clearfix">
                        {/* <div className="col-lg-12 col-md-12 col-sm-12"> */}
                        <div className="card">
                          <div className="body">
                            <div className="row clearfix">
                              <div className="col-md-12">
                                <h2 className="card-inside-title">
                                  <strong>Value Proposition</strong>

                                </h2>
                                <div>
                                  <Editor
                                    contents={text_stmt}
                                    getValue={(newContent) => {
                                      settext_stmt(newContent);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                      // </div>

                    ) : null}


                    <div style={{ marginTop: 30 }}></div>
                  </ListContainer>
                </DragDropContext>
                <button
                  type="submit"
                  class="btn savebtn  waves-effect"
                  onClick={OnSubmitHandle}
                >
                  SAVE <i className="ml-1 zmdi zmdi-save " />
                </button>
              </div>
            ) : null}
          </div>



        </div>
      </div>
    </div>
  );
}
