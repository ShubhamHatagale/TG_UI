import React, { useEffect, useState } from 'react';
import SelectBox from '../components/Select'
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";

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

    if (completeData) {
        completeData.map((item, key) => {
            rows.push(
                <tbody>
                    <td>{item.question_mind_journy}</td>
                    <td>{item.question_mind_of}</td>
                    <td>{item.who_give_answer}</td>
                    <td>{item.possible_answer}</td>
                    <td>{item.choice_made}</td>
                    <td><SelectBox onChangeTag={onChange} keyValue={item.point_to_be_considered} keyid={item.id} /></td>
                </tbody>
            );
        })
    }
    return (
        <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
            <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="card p-4 mt-2">
                        <div className="body p-5">
                            <form>
                                <div class="table-responsive" id="Table">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Questions appearing in mind Journey</th>
                                                <th>Question appearing in Mind of</th>
                                                <th>Who Gives the answer</th>
                                                <th>Possible Answer</th>
                                                <th>Choice Made</th>
                                                <th>Point to be Considered</th>
                                            </tr>
                                        </thead>
                                        {rows}
                                    </table>
                                    <button type="button" class="btn finalizebtn btn-square waves-effect" onClick={HandleSubmit}>FINALIZE CMM</button>
                                </div>
                                <div style={{ marginTop: 30 }}></div>
                            </form>
                            <div style={{ marginTop: 30 }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Body >Form Saved Successful</Modal.Body>
            </Modal>
        </div>
    )
}
export default Table;



<button type="button" class="btn finalizebtn btn-square waves-effect" onClick={OnSubmitHandle}>FINALIZE CMM</button>
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
            `https://parivartan.transganization.com/nodejs/masters/customerTab2`,
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
            `https://parivartan.transganization.com/nodejs/masters/customerTab2/${s_id}`,
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