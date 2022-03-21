import React, { useState, useEffect } from "react";
import Editor from "../../components/SunEditor";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import Modal from "react-bootstrap/Modal";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useHistory } from "react-router-dom";

export default function Form(props) {
  var s_id = localStorage.getItem('tr_id')
  const history = useHistory();
  // var id = localStorage.getItem("tr_id");

  const [inputList, setInputList] = useState([{ firstName: "" }]);
  const [frameManan, setframeManan] = useState("");
  const [frameSadhna, setframeSadhna] = useState("");
  const [spritualFoundation, setspritualFoundation] = useState("");
  const [rebirthDataa, setrebirthDataa] = useState();
  // handle input change
  const [showData, setShowData] = useState(false);
  const [smShow, setSmShow] = useState(false);

  const [viewModal, setviewModal] = useState(false);
  const [ShowPdf, setShowPdf] = useState(false);
  const pdfExportComponent = React.useRef(null);
  const [belConceptDataa, setbelConceptDataa] = useState();
  const [Upid, setUpid] = useState("");

  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    GetallRecords();
  }, []);

  const exportPDFWithMethod = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  const handleClose = () => {
    // setShowData(false);
    setviewModal(false);
  };

  const ViewModel = () => {
    setviewModal(true);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    console.log("In belGroup change handler ", list);
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "" }]);
    console.log(inputList);
  };

  const OnSubmitHandle = () => {
    // alert(rebirthDataa);
    if (rebirthDataa.length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // inputList.map((item,key)=>{
      var raw = JSON.stringify({
        Search: inputList,
        Manan: frameManan,
        Sadhana: frameSadhna,
        Spiritual: spritualFoundation,
        email_id: s_id,
        created_by: s_id,
        updated_by: s_id,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`https://parivartan.transganization.com/nodejs/masters/rebirth/`, requestOptions)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Values Submitted Succesfully");
            setSmShow(true);
            setTimeout(() => {
              setSmShow(false);
              props.Onvalidate(true);
            }, 1000)
          }
          GetallRecords();
        })
        .catch((error) => console.log("error", error));
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // inputList.map((item,key)=>{
      var raw = JSON.stringify({
        Search: inputList,
        Manan: frameManan,
        Sadhana: frameSadhna,
        Spiritual: spritualFoundation,
        email_id: s_id,
        updated_by: s_id
      });
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`https://parivartan.transganization.com/nodejs/masters/rebirth/${Upid}`, requestOptions)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          if (resData.status == 200) {
            console.log("Values Submitted Succesfully");
            setSmShow(true);
            setTimeout(() => {
              setSmShow(false);
              props.Onvalidate(true);
            }, 1000)
          }
          GetallRecords();
        })
        .catch((error) => console.log("error", error));
    }

  };

  const GetallRecords = () => {
    var myGetHeaders = new Headers();
    myGetHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myGetHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/rebirth/user/${s_id}`, requestOptions)
      .then((response) => response.json())
      .then((resData) => {
        if (resData.data.length > 0) {
          setUpid(resData.data[0].id);

          setrebirthDataa(resData.data);
          setframeManan(resData.data[0].Manan);
          setframeSadhna(resData.data[0].Sadhana);
          setspritualFoundation(resData.data[0].Spiritual);
          // console.log(resData.data[0].Manan);
          let MyValues = resData.data;
          console.log("In UseEffect Function", MyValues);
          MyValues.map((item, key) => {
            let fnameGroup = eval(item.Search);
            console.log("Dataa to get map", fnameGroup);
            setInputList(fnameGroup);
          });
        }
        setrebirthDataa(resData.data);

        setShowData(true);
      });
  };

  const handleChangeEditorsadhna = (newContent) => {
    setframeSadhna(newContent);
  };

  const handleChangeEditorManan = (newContent) => {
    setframeManan(newContent);
  };

  const handleChangeEditorSpritual = (newContent) => {
    setspritualFoundation(newContent);
  };
  return (
    <>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Saved Successful</Modal.Body>
      </Modal>
      <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
        <div className="row clearfix"  >
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card p-3">
              <div className="header">
              </div>
              {showData ? (
                <div className="body p-5">
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <h2 className="card-inside-title">
                        <strong>
                          Search for Common Words that you can see in the story
                        </strong>
                      </h2>
                    </div>
                  </div>
                  {inputList.map((x, i) => {
                    console.log("map functtion", x);
                    return (
                      <div className="row clearfix">
                        <div className="col-md-8">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="List Down all possible Words"
                              name="firstName"
                              value={x.firstName}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </div>
                        </div>
                        <div className="col-md-2">
                          {inputList.length !== 1 && (
                            <button
                              type="button"
                              className="btn btn-raised rembtn btn-square waves-effect m-l-40"
                              onClick={() => handleRemoveClick(i)}
                            >
                              <strong>REMOVE</strong>
                            </button>
                          )}
                          {inputList.length - 1 === i && (
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
                    );
                  })}
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <h2 className="card-inside-title">
                        <strong>
                          Frame a Manan Statement with Words that resonate the
                          most with you (Summarise Bhavana of Story in One Line)
                        </strong>
                      </h2>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-1"></div>
                    <div className="col-md-12">
                      <Editor
                        contents={frameManan}
                        getValue={handleChangeEditorManan}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 30 }}></div>
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <h2 className="card-inside-title">
                        <strong>
                          Frame a Sadhana Statement on how will you deliver your
                          Manan to everyone
                        </strong>
                      </h2>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-1"></div>
                    <div className="col-md-12">
                      <Editor
                        contents={frameSadhna}
                        getValue={handleChangeEditorsadhna}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 30 }}></div>
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <h2 className="card-inside-title">
                        <strong>
                          List out Spiritual Foundations (Ref: Story, Examples
                          which you have cited already)
                        </strong>
                      </h2>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-1"></div>
                    <div className="col-md-12">
                      <Editor
                        contents={spritualFoundation}
                        getValue={handleChangeEditorSpritual}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 30 }}></div>
                  <button
                    type="submit"
                    class="btn savebtn waves-effect"
                    onClick={OnSubmitHandle}
                  >
                    SAVE  <i className="ml-1 zmdi zmdi-save " />
                  </button>

                  {/* {ShowPdf ? ( */}
                  {/* <div>
                    <button
                      type="button"
                      class="btn btn-primary  waves-effect"
                      onClick={exportPDFWithMethod}
                    >
                      Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary  waves-effect"
                      onClick={ViewModel}
                    >
                      View  <i className="ml-1 zmdi zmdi-eye " />                    </button>
                  </div> */}
                  {/* ) : null} */}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>



      {/* For Pdf -----------------------> */}
      {/* <div
        style={{
          position: "absolute",
          left: "-3000px",
          top: 0,
        }}
      >

        <PDFExport
          paperSize="A4"
          margin="1cm"
          ref={pdfExportComponent} 
          forcePageBreak=".page-break"
        >

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
                            Purpose Discovery
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
                            Rebirth
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
                            1) Frame a Manan Statement with Words that resonate the most with you (Summarise Bhavana of Story in One Line)

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
                            {frameManan.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                            2) Frame a Sadhana Statement on how will you deliver your Manan to everyone



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
                            {frameSadhna.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                            3) List out Spiritual Foundations (Ref: Story, Examples which you have cited already)
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
                            {spritualFoundation.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                                field="firstName"
                                title="List of Common Words that you can see in the story"
                                width="420px"
                              />
                            </Grid>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 30 }}></div>
                </div>
              </div>
            </div>
          </div>

        </PDFExport>
      </div> */}



      {/* View Modal-----------------------> */}
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
                            Purpose Discovery
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
                            Rebirth
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
                            1) Frame a Manan Statement with Words that resonate the most with you (Summarise Bhavana of Story in One Line)

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
                            {frameManan.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                            2) Frame a Sadhana Statement on how will you deliver your Manan to everyone



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
                            {frameSadhna.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                            3) List out Spiritual Foundations (Ref: Story, Examples which you have cited already)
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
                            {spritualFoundation.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')}
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
                                field="firstName"
                                title="List of Common Words that you can see in the story"
                                width="420px"
                              />
                            </Grid>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 30 }}></div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
