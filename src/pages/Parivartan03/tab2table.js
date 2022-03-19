import React, { useEffect, useState } from 'react';
import SelectBox from '../components/Select'
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { ListContainer, ListItem } from "../components/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragHandle } from "../components/DragHandle";

const Table = props => {
    var s_id = localStorage.getItem('tr_id')
    const [inputListFinal, setInputListFinal] = useState([{ competition: "" }]);
    const [inputList, setInputList] = useState([{ competition: "" }]);
    const [inputListFinal2, setInputListFinal2] = useState([{}]);
    const [Upid, setUpid] = useState("");
    const [customerList, setCustomerList] = useState([{}]);

    const history = useHistory();

    // let formData = props.AllData;
    // console.log("All Table Data", formData)
    let rows = [];
    const [allOptions, setallOptions] = useState([]);
    const [holdValue, setholdValue] = useState([]);
    // let [completeData, setcompleteData] = useState('')
    const [completeData, setcompleteData] = useState('')
    const [smShow, setSmShow] = useState(false);
    const [total, settotal] = useState(0);
    let [DrpValues, setDrpValues] = useState("");

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
        fetch(`http://localhost:9002/masters/customerTab2/${s_id}`, requestOptionsget)
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData.data);
                // setcompleteData(resData.data);
                if (resData.status == 200) {
                    console.log("Data Added succesfully")
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
            .catch((error) => console.log("error", error))
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
            `http://localhost:9002/masters/customerTab2Id/${desID[0]}`,
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
            `http://localhost:9002/masters/customerTab2Id/` + `${srcID[0]}`,
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
                    props.OnValidateTab2(true);



                    // GetallRecords();
                }
            })
            .catch((error) => console.log("error", error));

        GetData();


    }

    // handle input change
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
        setcompleteData(list);

    };

    const onChange = (i, newInputValue, value) => {
        // holdValue.push({ "options": newInputValue, "id": value })
        // console.log("Pushed data", holdValue)
        console.log("newInputValue", newInputValue)
        console.log("newInputValue", i)
        console.log("newInputValue", value)

        // setallOptions(holdValue)

        // const { name, value, ips } = e.target;
        // const list = [...inputListFinal];
        // console.log("Here is the Value---1>", list);
        // list[index][name] = value;
        // list[index]["is_display"] = 0;

        // console.log(list[index][name]);
        // console.log(value + "val");


        // setInputListFinal(list);

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
                `http://localhost:9002/masters/customerTab2`,
                requestOptions
            )
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    props.OnValidate1(true)


                    if (resData.status == 200) {
                        console.log("Values Submitted Succesfully==>");
                        // setMadd(true);
                        // setMadd(false);
                        // setTimeout(() => {
                        //   setMadd(false);
                        // }, 1000)
                        props.OnValidateTab2(true);



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
                `http://localhost:9002/masters/customerTab2/${s_id}`,
                requestOptions
            )
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.status == 200) {
                        // console.log("Values Submitted Succesfully==>");
                        // setMupdate(true);
                        // setTimeout(() => {
                        //   setMupdate(false);
                        // }, 1000)
                        // props.OnValidate1(true)
                        props.OnValidateTab2(true);



                        // GetallRecords();
                    }
                })
                .catch((error) => console.log("error", error));
        }

    };


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
                                    <div className="row clearfix ml-3" >
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
                                                {inputListFinal.map((x, i) => {
                                                    console.log(x[`tag${0}`])
                                                    return (
                                                        <>
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

                                                                            {Array.from({ length: 5 }, (item, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <div className="col-md-2">
                                                                                            <div className="form-group">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    placeholder="0"
                                                                                                    maxLength={200}
                                                                                                    max={200}
                                                                                                    name={`value${index}`}
                                                                                                    value={x[`value${index}`]}
                                                                                                    onChange={(e) => handleInputChange(e, i)}
                                                                                                    required
                                                                                                    disabled
                                                                                                />

                                                                                            </div>
                                                                                        </div>


                                                                                    </>
                                                                                );
                                                                            })}

                                                                            {Array.from({ length: 1 }, (item, index) => {
                                                                                return (
                                                                                    <>
                                                                                        {/* {DrpValues.length > 0 ? ( */}
                                                                                        <div className="col-lg-2">
                                                                                            <div className="form-group">
                                                                                                <div className="row clearfix flex-nowrap">
                                                                                                    {/* <span>{x[`tag${index}`]}</span> */}
                                                                                                    <select className="form-control" name={`tag${index}`} id={x[`${index}`]} value={x[`tag${index}`]} onChange={(e) => handleInputChange(e, i)}>
                                                                                                        {/* {DrpValues.map((item, key) => ( */}
                                                                                                        {/* // console.log(item.vilakshan_journey) */}
                                                                                                        <option value=""></option>
                                                                                                        <option value="Undefined">Undefined</option>
                                                                                                        <option value="Current Process Improvement">Current Process Improvement</option>
                                                                                                        <option value="Innovation">Innovation</option>
                                                                                                        {/* ))} */}
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* ) : (null)} */}
                                                                                    </>
                                                                                );
                                                                            })
                                                                            }
                                                                            {/* <div className="col-md-2">
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
                                                                            </div> */}
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
                            {/* <button type="button" class="btn savebtn waves-effect"
                            onClick={OnSubmitHandle}>SAVE</button> */}

                            <button type="button" class="btn finalizebtn btn-square waves-effect" onClick={OnSubmitHandle}>FINALIZE CMM</button>



                        </div>
                    ) : (null)}
                </div>
            </div>
        </div >
    )
}
export default Table;