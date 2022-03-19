import React, { useState, useEffect } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
export default function Form(props) {
  const [inputListFeature, setInputListFeature] = useState([{ featues: "" }]);
  const [inputList, setInputList] = useState([{ competition: "" }]);
  const [customerList, setCustomerList] = useState([{}]);
  const [allList, setallList] = useState("");
  const [EditList, setEditList] = useState([{}]);
  const [edituser, setedituser] = useState(false);
  const [PossibleCombination, setPossibleCombination] = useState(0);
  const [total, settotal] = useState(0);
  const [holdValue, setholdValue] = useState([]);
  let no = holdValue.length;

  useEffect(() => {      var s_id = localStorage.getItem('tr_id')
    if (!s_id) {
      history.push("Not_support");
    }

    var myGetHeaders = new Headers();
    myGetHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myGetHeaders,
      redirect: "follow",
    };
    fetch(`http://localhost:9002/masters/valueprop/` + `${s_id}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        let MyValues = resData.data;
        console.log("In UseEffect Function", MyValues);

        let data;
        MyValues.map((item, key) => {
          let Feature = eval(item.features);
          settotal(Feature.length);
          Feature.map((item, key) => {
            // data.push([{competition:"", [`value${key}`]:""}])
            holdValue.push({});
            console.log("Pushed data", holdValue);
          });
          // setInputList(data)
          setCustomerList(holdValue);
          console.log("Dataa to get map", Feature);
          setPossibleCombination(item.possible_combination);
          setInputListFeature(Feature);
        });
      });
    fetch(
      `http://localhost:9002/masters/competionsheet/` + `${4}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {
        let MyValues = resData.data;
        if (MyValues.length > 0) {
          setedituser(true);
        }
        console.log("Edit Values", MyValues);
        MyValues.map((item, key) => {
          let Feature = eval(item.features);
          console.log("SDfjdskjfn jsdhfkjsdfn", Feature);
          setCustomerList(Feature);
          Feature.map((item, key) => {
            if (Object.keys(item).length === 1) {
              if (item.competition != "") {
                inputList.push({ competition: item.competition });
                console.log("New Input List", inputList);
              }
            }
          });
        });
      });
  }, []);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...customerList];
    console.log("Here is the Value", list);
    let no = holdValue.length;
    list[index][name] = value;
    setCustomerList(list);
  };
  const handleInputChangeCompetition = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    console.log("Here is the Value", list);
    list[index][name] = value;
    setInputList(list);
  };
  const handleRemoveClick = (index) => {
    console.log("I am here", index);
    const list = [...inputList];
    const custlist = [...customerList];

    setCustomerList(custlist);

    setInputList(list);
    list.splice(index, 1);
    custlist.splice(index, 1);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    let no = holdValue.length;
    inputListFeature.map((item, key) => {
      holdValue.push({ [`value${no + key}`]: "" });
    });
    console.log("Customer List hjhj", customerList);
    console.log("Customer List data", holdValue);
    setCustomerList(holdValue);

    setInputList([...inputList, { competition: "" }]);
  };
  const OnSubmitHandle = () => {
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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // inputList.map((item,key)=>{
    var raw = JSON.stringify({
      features: allObject,
      created_by: "2",
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `http://localhost:9002/masters/competionsheet/` + `${4}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        if (resData.status == 200) {
          console.log("Values Submitted Succesfully");
        }
      })
      .catch((error) => console.log("error", error));
  };
  if (edituser) {
    return (
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              {inputListFeature && inputList ? (
                <div className="body">
                  <div className="header">
                    {/* <h2>
                  <strong>Possible Combination  :{PossibleCombination}
                  
                  </strong>
                  </h2> */}
                  </div>
                  <div style={{ marginTop: 20 }}></div>

                  <div className="row clearfix">
                    <div className="col-md-2"></div>
                    {inputListFeature.map((x, i) => {
                      return (
                        <div className="col-md-2">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Features"
                              name="featue"
                              value={x.featues}
                              onChange={(e) => handleInputChange(e, i)}
                              disabled
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {inputList.map((x, i) => {
                    return (
                      <div className="row clearfix">
                        <div className="col-md-2">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Competition"
                              name="competition"
                              value={x.competition}
                              onChange={(e) =>
                                handleInputChangeCompetition(e, i)
                              }
                            />
                          </div>
                        </div>

                        {
                          //  Array.from({length: total}, (item, index) => {
                          // customerList.apply(null, { length: 5 }).map((x, i) => {
                          customerList.map((item, key) => {
                            return (
                              <div className="col-md-2">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="value"
                                    name={`value${no + key}`}
                                    // value={item[`value${key + no}`]}
                                    onChange={(e) => handleInputChange(e, i)}
                                  />
                                </div>
                              </div>
                            );
                          })
                        }
                        <div className="col-md-2">
                          {inputList.length !== 1 && (
                            <button
                              type="button"
                              className="btn btn-raised btn-danger btn-square waves-effect m-l-40"
                              onClick={() => handleRemoveClick(i)}
                            >
                              <strong>REMOVE</strong>
                            </button>
                          )}
                          {inputList.length - 1 === i && (
                            <button
                              type="button"
                              className="btn btn-raised btn-success btn-square waves-effect m-l-40 "
                              onClick={handleAddClick}
                            >
                              <strong>ADD</strong>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div style={{ marginTop: 30 }}></div>
                  <button
                    type="submit"
                    class="btn btn-success  waves-effect"
                    onClick={OnSubmitHandle}
                  >
                    SAVE{" "}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              {inputListFeature ? (
                <div className="body">
                  <div className="header">
                    {/* <h2>
                  <strong>Possible Combination  :{PossibleCombination}
                  
                  </strong>
                  </h2> */}
                  </div>
                  <div style={{ marginTop: 20 }}></div>

                  <div className="row clearfix">
                    <div className="col-md-2"></div>
                    {inputListFeature.map((x, i) => {
                      return (
                        <div className="col-md-2">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Features"
                              name="featue"
                              value={x.featues}
                              onChange={(e) => handleInputChange(e, i)}
                              disabled
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {inputList.map((x, i) => {
                    return (
                      <div className="row clearfix">
                        <div className="col-md-2">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Competition"
                              name="competition"
                              // value={"competitionA"}
                              onChange={(e) =>
                                handleInputChangeCompetition(e, i)
                              }
                            />
                          </div>
                        </div>

                        {Array.from({ length: total }, (item, index) => {
                          // customerList.apply(null, { length: 5 }).map((x, i) => {
                          return (
                            <div className="col-md-2">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="value"
                                  name={`value${no + i}`}
                                  // value={item[`value${5}`]}
                                  onChange={(e) => handleInputChange(e, i)}
                                />
                              </div>
                            </div>
                          );
                        })}
                        <div className="col-md-2">
                          {inputList.length !== 1 && (
                            <button
                              type="button"
                              className="btn btn-raised btn-danger btn-square waves-effect m-l-40"
                              onClick={() => handleRemoveClick(i)}
                            >
                              <strong>REMOVE</strong>
                            </button>
                          )}
                          {inputList.length - 1 === i && (
                            <button
                              type="button"
                              className="btn btn-raised btn-success btn-square waves-effect m-l-40 "
                              onClick={handleAddClick}
                            >
                              <strong>ADD</strong>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div style={{ marginTop: 30 }}></div>
                  <button
                    type="submit"
                    class="btn btn-success  waves-effect"
                    onClick={OnSubmitHandle}
                  >
                    SAVE{" "}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
