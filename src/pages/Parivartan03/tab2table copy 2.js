import React, { useEffect, useState } from 'react';
import SelectBox from '../components/Select'
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { ListContainer, ListItem } from "../components/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragHandle } from "../components/DragHandle";

const Table = props => {
    var s_id = localStorage.getItem('tr_id')

    const history = useHistory();

    // let formData = props.AllData;
    // console.log("All Table Data", formData)
    let rows = [];
    const [allOptions, setallOptions] = useState([]);
    const [holdValue, setholdValue] = useState([]);
    let [completeData, setcompleteData] = useState('')
    const [smShow, setSmShow] = useState(false);

    useEffect(() => {
        if (!s_id) {
            history.push("Not_support");
        }

        GetData();
    }, []);

    const GetData = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptionsget = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(`https://parivartan.transganization.com/nodejs/masters/customerTab2/user/${s_id}`, requestOptionsget)
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData.data);
                setcompleteData(resData.data);
                if (resData.status == 200) {
                    console.log("Data Added succesfully")
                }
            })
            .catch((error) => console.log("error", error))
    }

    const onChange = (newInputValue, value) => {
        holdValue.push({ "options": newInputValue, "id": value })
        console.log("Pushed data", holdValue)
        setallOptions(holdValue)
    }

    const HandleSubmit = () => {

        if (allOptions) {
            allOptions.map((item, key) => {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var requestOptionsget = {
                    method: "GET",
                    headers: myHeaders,
                    redirect: "follow",
                };
                fetch(`https://parivartan.transganization.com/nodejs/masters/customerTab2/` + `${item.id}`, requestOptionsget)
                    .then((response) => response.json())
                    .then((resData) => {
                        console.log("I am here in api", resData)
                        let data = resData.data;
                        data.map((customer, key) => {
                            console.log(customer.question_mind_journy)
                            let rawrich = JSON.stringify({
                                question_mind_journy: customer.question_mind_journy,
                                choice_made: customer.choice_made,
                                possible_answer: customer.possible_answer,
                                who_give_answer: customer.who_give_answer,
                                question_mind_of: customer.question_mind_of,
                                point_to_be_considered: item.options,
                                email_id: s_id,
                                created_by: s_id
                            })
                            var requestOptionsrichtext = {
                                method: "PUT",
                                headers: myHeaders,
                                body: rawrich,
                                redirect: "follow",
                            };
                            fetch(`https://parivartan.transganization.com/nodejs/masters/customerTab2/` + `${item.id}`, requestOptionsrichtext)
                                .then((response) => response.json())
                                .then((resData) => {
                                    if (resData.status == 200) {
                                        console.log("Data Added succesfully")
                                        setSmShow(true);
                                        setTimeout(() => {
                                            setSmShow(false);
                                        }, 1000)
                                        GetData();
                                        props.OnValidateTab2(true);

                                    } else {
                                        props.OnValidateTab2(true);

                                    }
                                })

                                .catch((error) => console.log("error", error))
                        })
                        console.log("Response Daaat", resData.data)
                    })
                    .catch((error) => console.log("error", error))
            })
        } else {
            props.OnValidateTab2(true);

        }
    }


    const updateJson = (srcID, desID) => {
        console.log(srcID)
        console.log(desID)

        // var sourceId = parseInt(srcID)
        // var destId = parseInt(desID)
        // console.log(sourceId)
        // console.log(destId)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            order_by: srcID[1],

        });
        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        fetch(
            `https://parivartan.transganization.com/nodejs/masters/customerTab2Id/${desID[0]}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData);
                // GetallRecords();

                if (resData.status == 200) {
                    // console.log("Values Submitted Succesfully==>");
                    // setMupdate(true);
                    // setTimeout(() => {
                    //   setMupdate(false);
                    // }, 1000)
                    // props.OnValidate1(true)

                    GetData();
                    // GetallRecords();
                }
            })
            .catch((error) => console.log("error", error));

        var myHeaders2 = new Headers();
        myHeaders2.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            order_by: desID[1],
        });
        var requestOptions = {
            method: "PUT",
            headers: myHeaders2,
            body: raw,
            redirect: "follow",
        };
        fetch(
            `https://parivartan.transganization.com/nodejs/masters/customerTab2Id/` + `${srcID[0]}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData);
                // GetallRecords();

                if (resData.status == 200) {
                    // console.log("Values Submitted Succesfully==>");
                    // setMupdate(true);
                    // setTimeout(() => {
                    //   setMupdate(false);
                    // }, 1000)
                    // props.OnValidate1(true)
                    GetData();


                    // GetallRecords();
                }
            })
            .catch((error) => console.log("error", error));

        GetData();


    }


    return (

        <div className="row clearfix" style={{ backgroundColor: "#F3F6F9" }}>

            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card p-4 mt-2">
                    {completeData ? (
                        <div className="body p-5" style={{ overflowX: "scroll" }}>
                            <DragDropContext
                                onDragEnd={(param) => {
                                    console.log(param)
                                    const srcI = param.source.index.split("o");;
                                    const desI = param.destination?.index.split("o");
                                    const srcIrecId = param.source.recId;
                                    const desIrecId = param.destination?.recId;
                                    // const srcIArray = srcI.split("o");
                                    // const desIIArray = desI.split("o");
                                    // console.log(srcIArray)
                                    // console.log(desIIArray)
                                    // console.log(desI)

                                    if (desI) {
                                        completeData.splice(desI, 0, completeData.splice(srcI, 1)[0]);
                                        // List.saveList(completeData);
                                        console.log(completeData)
                                        updateJson(srcI, desI);
                                    }
                                }}
                            >
                                <ListContainer>

                                    <div style={{ marginTop: 20 }}>
                                    </div>
                                    <div className="row clearfix" >
                                        <div className="col-md-2">
                                            <h2 className="card-inside-title text-center">
                                                <strong>Questions appearing in mind Journey</strong>
                                            </h2>
                                        </div>
                                        <div className="col-md-2">
                                            <h2 className="card-inside-title text-center ml-2">
                                                <strong>Question appearing in Mind of</strong>
                                            </h2>
                                        </div>
                                        <div className="col-md-2">
                                            <h2 className="card-inside-title text-center ml-5">
                                                <strong>Who Gives the answer</strong>
                                            </h2>
                                        </div>
                                        <div className="col-md-2">
                                            <h2 className="card-inside-title text-center ml-4">
                                                <strong>Possible Answer</strong>
                                            </h2>
                                        </div>
                                        <div className="col-md-2">
                                            <h2 className="card-inside-title text-center ml-4">
                                                <strong>Choice Made</strong>
                                            </h2>
                                        </div>
                                        <div className="col-md-2">
                                            <h2 className="card-inside-title text-center ml-5">
                                                <strong>Point to be Considered</strong>
                                            </h2>
                                        </div>
                                    </div>


                                    <Droppable droppableId="droppable-1">
                                        {(provided, _) => (
                                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                                {completeData.map((x, i) => {
                                                    return (
                                                        <Draggable
                                                            key={x.id}
                                                            draggableId={"draggable-" + i}
                                                            index={x.order_by + "o" + x.id}
                                                            recId={x.id}
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

                                                                        {/* <div className="col-md-2">
                                                                                        <input
                                                                                            type="text"
                                                                                            placeholder="First List"
                                                                                            className="form-control"
                                                                                            name="customer_face"
                                                                                            value={x.id}
                                                                                        // onChange={(e) => handleInputChange(e, i)}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-md-2">

                                                                                    <input
                                                                                        type="text"
                                                                                        placeholder="First List"
                                                                                        className="form-control"
                                                                                        name="customer_face"
                                                                                        value={x.order_by}
                                                                                    // onChange={(e) => handleInputChange(e, i)}
                                                                                    />                                                                                    </div> */}
                                                                        <div className="col-md-2">

                                                                            <div className="form-group"><input
                                                                                type="text"
                                                                                placeholder="First List"
                                                                                className="form-control"
                                                                                name="customer_face"
                                                                                value={x.question_mind_journy}
                                                                            // onChange={(e) => handleInputChange(e, i)}
                                                                            /></div>
                                                                        </div>
                                                                        <div className="col-md-2">

                                                                            <div className="form-group"><input
                                                                                type="text"
                                                                                placeholder="First List"
                                                                                className="form-control"
                                                                                name="customer_face"
                                                                                value={x.question_mind_of}
                                                                            // onChange={(e) => handleInputChange(e, i)}
                                                                            /></div>
                                                                        </div>
                                                                        <div className="col-md-2">

                                                                            <div className="form-group"><input
                                                                                type="text"
                                                                                placeholder="First List"
                                                                                className="form-control"
                                                                                name="customer_face"
                                                                                value={x.who_give_answer}
                                                                            // onChange={(e) => handleInputChange(e, i)}
                                                                            /></div>
                                                                        </div>
                                                                        <div className="col-md-2">

                                                                            <div className="form-group"><input
                                                                                type="text"
                                                                                placeholder="First List"
                                                                                className="form-control"
                                                                                name="customer_face"
                                                                                value={x.possible_answer}
                                                                            // onChange={(e) => handleInputChange(e, i)}
                                                                            /></div>
                                                                        </div>
                                                                        <div className="col-md-2">

                                                                            <div className="form-group"><input
                                                                                type="text"
                                                                                placeholder="First List"
                                                                                className="form-control"
                                                                                name="customer_face"
                                                                                value={x.choice_made}
                                                                            // onChange={(e) => handleInputChange(e, i)}
                                                                            /></div>
                                                                        </div>

                                                                        <div className="col-md-2">
                                                                            <div className="form-group">
                                                                                <SelectBox onChangeTag={onChange} keyValue={x.point_to_be_considered} keyid={x.id} />
                                                                            </div>

                                                                        </div>
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
                            <button type="button" class="btn finalizebtn btn-square waves-effect" onClick={HandleSubmit}>FINALIZE CMM</button>


                        </div>
                    ) : (null)}
                </div>
            </div>




            {/* <Modal
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
        </Modal> */}











        </div >




        // <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
        //     <div className="row clearfix">
        //         <div className="col-lg-12 col-md-12 col-sm-12">
        //             <div className="card p-4 mt-2">
        //                 <div className="body p-5">
        //                     <form>
        //                         <div class="table-responsive" id="Table">
        //                             <table class="table table-bordered">
        //                                 <thead>
        //                                     <tr>
        //                                         <th>Questions appearing in mind Journey</th>
        //                                         <th>Question appearing in Mind of</th>
        //                                         <th>Who Gives the answer</th>
        //                                         <th>Possible Answer</th>
        //                                         <th>Choice Made</th>
        //                                         <th>Point to be Considered</th>
        //                                     </tr>
        //                                 </thead>
        //                                 {(completeData) ? (
        //                                     completeData.map((item, key) => {
        //                                         <tbody>
        //                                             <td>{item.question_mind_journy}</td>
        //                                             <td>{item.question_mind_of}</td>
        //                                             <td>{item.who_give_answer}</td>
        //                                             <td>{item.possible_answer}</td>
        //                                             <td>{item.choice_made}</td>
        //                                             <td><SelectBox onChangeTag={onChange} keyValue={item.point_to_be_considered} keyid={item.id} /></td>
        //                                         </tbody>
        //                                     })) : null}
        //                             </table>
        //                             <button type="button" class="btn finalizebtn btn-square waves-effect" onClick={HandleSubmit}>FINALIZE CMM</button>
        //                         </div>
        //                         <div style={{ marginTop: 30 }}></div>
        //                     </form>
        //                     <div style={{ marginTop: 30 }}></div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <Modal
        //         size="sm"
        //         show={smShow}
        //         onHide={() => setSmShow(false)}
        //         aria-labelledby="example-modal-sizes-title-sm"
        //     >
        //         <Modal.Body >Form Saved Successful</Modal.Body>
        //     </Modal>
        // </div>
    )
}
export default Table;