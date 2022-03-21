import React, { useState, useEffect } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default function Form(props) {

  const history = useHistory();
  var s_id = localStorage.getItem('tr_id')
  const [inputListFeature, setInputListFeature] = useState([{ featues: "" }]);
  const [inputListFeature2, setInputListFeature2] = useState([{ featues2: "" }]);

  const [inputList, setInputList] = useState([{ competition: "" }]);
  const [inputListFinal, setInputListFinal] = useState([]);

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

  let no = holdValue.length;
  const inputs = [];
  useEffect(() => {

    if (!s_id) {
      history.push("Not_support");
    }

    GetallRecords();

  }, []);

  // handle input change



  const GetallRecords = () => {
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

        });
      });
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/competionsheet/user/` + `${s_id}`,
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

        MyValues.map((item, key) => {
          console.log("before Eval", item);
          let Feature = eval(item.features);
          let FeatureG = eval(item.features);

          let Feature2 = eval(item.features2);

          console.log("SDfjdskjfn jsdhfkjsdfn", Feature);
          console.log("SDfjdskjfn jsdhfkjsdfn22", Feature2);

          setCustomerList(Feature);
          setInputList(Feature);
          setInputListFinal(Feature)

        });

        console.log("Edit Values", MyValues);




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
  }

  const OnSubmitHandle = () => {
    GetallRecords();
    props.OnValidateStrategy(true);

  }





  const checkFinalize = (e) => {
    console.log(e.target.value);
    let updValue = e.target.value;
    let checked_value = `1`;
    console.log(inputListFinal);

    for (var i = 0; i < inputListFinal.length; i++) {
      if (inputListFinal[i].competition === updValue) {
        if (inputListFinal[i].is_display == 0) {
          inputListFinal[i].is_display = 1;
          GetallRecords();

        } else {
          inputListFinal[i].is_display = 0;
          GetallRecords();

        }
        console.log(inputListFinal);

        break;
      }
    }
    console.log(inputListFinal);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      features: inputListFinal,
    });
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      `https://parivartan.transganization.com/nodejs/masters/competionsheetCheck/${Upid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData);
        if (resData.status == 200) {
          GetallRecords()
          // props.OnValidateStrategy(true);
        }
        GetallRecords();

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
      {/* <div className="row clearfix " style={{ backgroundColor: "#F3F6F9",width:"100rem",overflowX:"auto",whiteSpace:"nowrap" }}> */}
      <div className="row clearfix " style={{ backgroundColor: "white", width: "80rem", overflowX: "auto", backgroundColor: "#F3F6F9" }} >

        <div className="col-lg-12 col-md-12 col-sm-12" >
          <div className="card p-4 mt-2" >
            {/* {!ShowHideErr ? (
              <div style={{ margin: 5, text: "red" }}><b>Please Enter The Value Lessthan Or Equal To 9</b></div>
            ) : (null)} */}
            <div >

              {inputListFeature && inputListFinal ? (
                <div className="body p-5">

                  <div style={{ marginTop: 20 }}></div>

                  <div className="row clearfix flex-nowrap">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <strong>Organization Name</strong>
                      </div>
                      {/* {org_name} */}
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <strong>Select</strong>
                      </div>
                      {/* {org_name} */}
                    </div>

                    <div className="col-md-2" ></div>
                  </div>

                  <div className="row clearfix flex-nowrap">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <span>{org_name}</span>
                        {/* <input
                          type="text"
                          className="form-control"
                          placeholder="Features"
                          name="featue"
                          value={org_name}
                          // onChange={(e) => handleInputChange(e, i)}
                          disabled
                        /> */}
                      </div>
                    </div>


                    <div className="col-md-2" ></div>
                  </div>
                  {console.log("The ------ffff", inputListFinal)
                  }
                  {inputListFinal.map((x, i) => {
                    return (
                      <div className="row clearfix flex-nowrap">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <span>{x.competition}</span>
                            {/* <span>{x.is_display}</span> */}

                          </div>
                        </div>
                        <div className="col-lg-6 ml-4">
                          <div className="form-group">
                            <input type="checkbox" class="form-check-input" checked={(x.is_display == 0 ? x.is_display = 1 : x.is_display = 0)} value={x.competition} id="exampleCheck1" onChange={checkFinalize} />
                          </div>
                        </div>


                      </div>
                    );
                  })}
                  <div style={{ marginTop: 30 }}></div>
                  <button
                    type="submit"
                    class="btn savebtn waves-effect"
                    onClick={OnSubmitHandle}

                  >
                    SAVE <i className="ml-1 zmdi zmdi-save " />
                  </button>
                </div>
              ) : null}
            </div>          </div>

        </div>
      </div>
    </div>
  );

}
