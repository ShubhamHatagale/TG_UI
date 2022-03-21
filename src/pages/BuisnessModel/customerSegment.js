import React, { useState, useEffect } from 'react';
import Editor from "../../components/SunEditor"
import Modal from "react-bootstrap/Modal";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useHistory } from "react-router-dom";
import { ListContainer, ListItem } from "../components/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragHandle } from "../components/DragHandle";

export default function Form(props) {
  var s_id = localStorage.getItem('tr_id')
  const history = useHistory();
  const [Upid, setUpid] = useState("");

  const [inputList, setInputList] = useState([{ customer_face: "" }]);
  const [problem_solving, setproblem_solving] = useState("");
  const [org_name, setorg_name] = useState("");
  const [product_service_offering_by, setproduct_service_offering_by] = useState("");
  const [customerSegmentData, setcustomerSegmentData] = useState();
  const [completeData, setcompleteData] = useState('')
  const [Madd, setMadd] = useState(false);
  const [Mupdate, setMupdate] = useState(false);
  const [Mdelete, setMdelete] = useState(false);
  const [showData, setShowData] = useState(false);

  const [viewModal, setviewModal] = useState(false);
  const [ShowPdf, setShowPdf] = useState(false);
  const pdfExportComponent = React.useRef(null);
  const [belConceptDataa, setbelConceptDataa] = useState();
  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    GetallRecords();
  }, []);


  const handleClose = () => {
    // setShowData(false);
    setviewModal(false);
  };

  const ViewModel = () => {
    setviewModal(true);
  }
  const exportPDFWithMethod = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  }
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    console.log("In customer_face change handler ", list);
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    setInputList(list);
    list.splice(index, 1);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { customer_face: "" }]);
    console.log(inputList)

  };

  // email_id: "1",
  // created_by: "2"

  const OnSubmitHandle = () => {
    // alert(customerSegmentData.length);
    if (completeData.length === 0) {
      // console.log(problem_solving);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        customer_face: inputList,
        org_name: org_name,
        product_service_offering_by: product_service_offering_by,
        problem_solving: problem_solving,
        email_id: s_id,
        created_by: s_id
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(
        `https://parivartan.transganization.com/nodejs/masters/customerSegment/`,
        requestOptions
      )
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Values Submitted Succesfully");
            setMadd(true);
            // setMadd(false);
            setTimeout(() => {
              setMadd(false);
            }, 1000)
            props.OnValidateTab1(true);
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        customer_face: inputList,
        org_name: org_name,
        product_service_offering_by: product_service_offering_by,
        problem_solving: problem_solving,
        email_id: s_id,
        created_by: s_id
      });
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`https://parivartan.transganization.com/nodejs/masters/customerSegment/` + `${Upid}`, requestOptions)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Values Submitted Succesfully");
            setMupdate(true);
            // setMupdate(false);
            setTimeout(() => {
              setMupdate(false);
            }, 1000)
            props.OnValidateTab1(true);

          }
          // GetallRecords();
        })
        .catch((error) => console.log("error", error));
    }
  }

  const GetallRecords = () => {
    var myGetHeaders = new Headers();
    myGetHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myGetHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/customerSegment/user/${s_id}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        setcompleteData(resData.data)
        console.log("In Beliver Get all Reccords Function", resData.data.length);
        if (resData.data.length > 0) {
          setorg_name(resData.data[0].org_name);
          setproduct_service_offering_by(resData.data[0].product_service_offering_by);
          setproblem_solving(resData.data[0].problem_solving);
          setUpid(resData.data[0].id);

          console.log(resData.data)
          let MyValues = resData.data;
          console.log("In UseEffect Function", MyValues);
          MyValues.map((item, key) => {
            let customerFaceMap = eval(item.customer_face);
            console.log("Data customerFaceMap ", customerFaceMap);
            setcustomerSegmentData(customerFaceMap)
            setInputList(customerFaceMap);
          });
        }
        setShowData(true)
      });
  };

  const handleChangeproblem_solving = (newContent) => {
    setproblem_solving(newContent);
  };

  const org_nameFn = (e) => {
    setorg_name(e.target.value);
  };


  const product_service_offering_byFn = (e) => {
    setproduct_service_offering_by(e.target.value);
  };

  const updateJson = (featureJson) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      customer_face: featureJson,
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
      `https://parivartan.transganization.com/nodejs/masters/customerSegment/` + `${Upid}`,
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

    <div className="row clearfix" style={{ backgroundColor: "#F3F6F9" }}>

      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="card p-4 mt-2">
          {showData ? (
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

                  <div className="row clearfix">
                    <div className="col-md-12">
                      <h2 className="card-inside-title"><strong>Your Organization Name</strong></h2>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="Organization Name"
                          onChange={org_nameFn}
                          placeholder="Organization Name"
                          value={org_name}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <h2 className="card-inside-title"><strong>Products/Services Offering by</strong></h2>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="Products/Services Offering by"
                          onChange={product_service_offering_byFn}
                          placeholder="Products/Services Offering by"
                          value={product_service_offering_by}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <h2 className="card-inside-title"><strong>Customer Face</strong></h2>
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

                                  <div className="row clearfix">
                                    <div className="col-md-10">
                                      <div className="form-group">
                                        <div className="row clearfix flex-nowrap ml-1">
                                          <DragHandle {...provided.dragHandleProps} className="mr-2" />

                                          <input
                                            type="text"
                                            placeholder="First List"
                                            className="form-control"
                                            name="customer_face"
                                            value={x.customer_face}
                                            onChange={(e) => handleInputChange(e, i)}
                                          />
                                        </div>
                                      </div>

                                    </div>
                                    <div className="col-md-2">
                                      {inputList.length !== 1 && (
                                        <button
                                          type="button"
                                          className="btn btn-raised rembtn btn-square waves-effect m-l-40"
                                          onClick={() => handleRemoveClick(i)}
                                        >REMOVE
                                          {/* <strong>REMOVE</strong> */}
                                          {/* <span style={{fontSize:"2vw"}} className='list-inline'>REMOVE</span> */}
                                        </button>
                                      )}
                                      {inputList.length - 1 === i && (
                                        <button
                                          type="button"
                                          className="btn  addbtn btn-square waves-effect m-l-40 "
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

                  <div className="row clearfix">
                    <div className="col-md-12">
                      <h2 className="card-inside-title">
                        <h2 className="card-inside-title"><strong>What is the problem you are solving?</strong></h2>
                      </h2>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-1"></div>
                    <div className="col-md-12">
                      <Editor
                        contents={problem_solving}
                        getValue={handleChangeproblem_solving}
                      />
                    </div>
                  </div>
                </ListContainer>

              </DragDropContext>



              <div style={{ marginTop: 30 }}></div>

              <button type="submit" class="btn savebtn  waves-effect" onClick={OnSubmitHandle}>SAVE    <i className="ml-1 zmdi zmdi-save " /> </button>


            </div>
          ) : (null)}
        </div>
      </div>




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



      <Modal
        size="lg"
        show={viewModal}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div>
                    <div id="divToPrint" className="mt4">
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <img
                            src="../../assets/images/transaganization.png"
                            width="135"
                            alt="Transganization"
                          />
                          <h1
                            style={{
                              alignSelf: "center",
                              alignContent: "center",
                              textAlign: "center",
                              marginTop: "20px",
                            }}
                          >
                            Business Model
                          </h1>
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <div
                            style={{
                              alignSelf: "center",
                              alignContent: "center",
                              textAlign: "center",
                              fontWeight: "bold",
                              backgroundColor: "lightgrey",
                              width: "150",
                              border: "1px solid black",
                              marginLeft: "0",
                              padding: "10px",
                              margin: "10px",
                              marginTop: "30px",
                            }}
                          >
                            Customer Segmentation
                          </div>
                          <div
                            style={{
                              alignSelf: "left",
                              alignContent: "left",
                              textAlign: "left",
                              fontWeight: "bold",
                              padding: "10px",
                              margin: "10px",
                              marginTop: "20px",
                              marginLeft: "0",
                            }}
                          >
                            1) Your Organization Name


                          </div>
                          <div
                            style={{
                              alignSelf: "center",
                              alignContent: "center",
                              textAlign: "center",
                              fontWeight: "bold",
                              backgroundColor: "lightgrey",
                              width: "150",
                              border: "2px solid black",
                              marginLeft: "0",
                              padding: "50px",
                              margin: "10px",
                              marginTop: "10px",
                            }}
                          >
                            {org_name.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <div
                            style={{
                              alignSelf: "left",
                              alignContent: "left",
                              textAlign: "left",
                              fontWeight: "bold",
                              padding: "10px",
                              margin: "10px",
                              marginTop: "20px",
                              marginLeft: "0",
                            }}
                          >
                            2) Products/Services Offering by




                          </div>
                          <div
                            style={{
                              alignSelf: "center",
                              alignContent: "center",
                              textAlign: "center",
                              fontWeight: "bold",
                              backgroundColor: "lightgrey",
                              width: "150",
                              border: "2px solid black",
                              marginLeft: "0",
                              padding: "50px",
                              margin: "10px",
                              marginTop: "10px",
                            }}
                          >
                            {product_service_offering_by.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-12">
                          <div
                            style={{
                              alignSelf: "left",
                              alignContent: "left",
                              textAlign: "left",
                              fontWeight: "bold",
                              padding: "10px",
                              margin: "10px",
                              marginTop: "20px",
                              marginLeft: "0",
                            }}
                          >
                            3) What is the problem you are solving?

                          </div>
                          <div
                            style={{
                              alignSelf: "center",
                              alignContent: "center",
                              textAlign: "center",
                              fontWeight: "bold",
                              backgroundColor: "lightgrey",
                              width: "150",
                              marginLeft: "0",
                              border: "2px solid black",
                              padding: "50px",
                              margin: "10px",
                              marginTop: "10px",
                            }}
                          >
                            {problem_solving.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
                          </div>
                        </div>
                      </div>


                      <div className="row clearfix">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <Grid
                              style={{
                                maxHeight: "400px",
                              }}
                              data={inputList.slice(0, 2)}
                            >
                              <Column
                                field="customer_face"
                                title="List of Customer Face"
                                width="420px"
                              />
                            </Grid>
                          </div>
                        </div>
                      </div>

                      {/* <div className="row clearfix">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <Grid
                              style={{
                                maxHeight: "400px",
                              }}
                              data={inputList.slice(0, 2)}
                            >
                              <Column
                                field="firstName"
                                title="List of Customer Face"
                                width="420px"
                              />
                            </Grid>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div style={{ marginTop: 30 }}></div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>








    </div >





  )
}

