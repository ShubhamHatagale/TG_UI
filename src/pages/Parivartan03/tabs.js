import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import AccrodionTabs from './accrodion';
import AccrodianProcess from './accrodianconcept'
import AccrodianInnovation from './accrodianinnovation';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import * as moment from "moment";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  var s_id = localStorage.getItem('tr_id')

  const history = useHistory();
  var s_id = localStorage.getItem('tr_id')

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [content, setContent] = useState('');
  const [completeData, setcompleteData] = useState('')
  const [completeOptionData, setcompleteOptionData] = useState('')
  const [holdValue, setholdValue] = useState([]);
  const [allOptions, setallOptions] = useState([]);
  const [beliverName, setbeliverName] = useState("");

  const regEx = /(<([^>]+)>)/ig;
  const GetFormattedDate = (datepara) => {
    var todayTime = new Date(datepara);
    console.log("Date", todayTime)
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return month + "/" + day + "/" + year;
  }

  useEffect(() => {
    if (!s_id) {
      history.push("Not_support");
    }

    GetallRecords();
  }, [])

  const GetallRecords = () => {
    // setholdValue([]);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/customerTab2/${s_id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        console.log(resData.data);
        let response = resData.data[0].features;
        console.log(response)
        setcompleteData(response);
        // response.map((item, key) => {
        //   fetch(`https://parivartan.transganization.com/nodejs/masters/CMMT3/` + `${item.id}`, requestOptionsget)
        //     .then((response) => response.json())
        //     .then((resData) => {
        //       console.log(resData.data);
        //       let tabresponse = resData.data;
        //       tabresponse.map((tab, key) => {
        //         let dateMDY = moment(item.start_date).format("L");;
        //         console.log("datae", dateMDY)
        //         let dateexpeMDY = moment(item.expected_closure_date).format("L");
        //         holdValue.push({ "Point": item.point_to_be_considered, "Briefblock": tab.brief_building_blocks.replace(regEx, ''), "Owener": tab.ownership, "Start": moment(tab.start_date).format("L"), "End": moment(tab.expected_closure_date).format("L"), "Days": tab.days, "Weekcount": tab.weeks })
        //         setallOptions(holdValue)
        //       })
        //     })
        //     .catch((error) => console.log("error", error))
        // })
      })
      .catch((error) => console.log("error", error))


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
  }

  const pdfExportComponent = React.useRef(null);
  const exportPDFWithMethod = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const handleChange = (event, newValue) => {
    console.log("Tab Value" + newValue);
    if (newValue === 3) {
      GetallRecords();
    }
    setValue(newValue);
  };

  const handleChangeEditor = (newContent) => {
    console.log(newContent)
    setContent(newContent);
  };

  const renderAccrodion = () => {
    return <AccrodionTabs AllData={completeData} Optiondata={completeOptionData} />
  }
  const renderAccrodionProcess = () => {
    return <AccrodianProcess AllData={completeData} Optiondata={completeOptionData} />
  }
  const renderAccrodionInovation = () => {
    return <AccrodianInnovation AllData={completeData} Optiondata={completeOptionData} />
  }
  return (
    <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card p-4 mt-2">
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Undefined" {...a11yProps(0)} />
                  <Tab label="Current Process Improvement" {...a11yProps(1)} />
                  <Tab label="Innovation" {...a11yProps(2)} />
                  <Tab label="All Download" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <div className="container-fluid">
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      {renderAccrodion()}
                      <div style={{ marginTop: 30 }}>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-10">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="container-fluid">
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      {renderAccrodionProcess()}
                      <div style={{ marginTop: 30 }}>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-10">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="container-fluid">
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      {renderAccrodionInovation()}
                      <div style={{ marginTop: 30 }}>
                      </div>
                      <div className="row clearfix">
                        <div className="col-md-10">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div className="container-fluid">
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      {completeData && allOptions ? (
                        <div
                          style={{
                            position: "absolute",
                            left: "-3000px",
                            top: 0,
                            color: "black"
                          }}
                        >
                          <PDFExport
                            paperSize="A4"
                            margin="1cm"
                            ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`}
                            forcePageBreak=".page-break"
                          >
                            <Modal.Header style={{ padding: "10px" }}>
                              <div className="col-md-12 row" >
                                <div className="col-md-6">
                                  <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
                                </div>
                                <div className="col-md-6 pageHeading" >
                                  Customer
                                </div>
                              </div>
                              <Modal.Title id="example-modal-sizes-title-lg">

                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div >
                                <div id="divToPrint" className="mt4 pdfBody"  >

                                  <div className="row clearfix" >
                                    <div className="col-md-12">
                                      <div className="pdfHeader" >Customer Mind Map</div>
                                      <div class="table-responsive">
                                        <table class="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th>Questions Appearing in Mind Journey</th>
                                              <th>Questions Appearing in Mind of</th>
                                              <th data-breakpoints="sm xs">who Gives Answer</th>
                                              <th data-breakpoints="sm xs">Possible Answer</th>
                                              <th data-breakpoints="sm xs md">Choice Made</th>
                                              <th data-breakpoints="sm xs md">Point to be considered</th>
                                            </tr>
                                          </thead>
                                          {completeData.map((item, i) => {
                                            return <tr>
                                              <td><h5>{item.value0}</h5></td>
                                              <td><h5>{item.value1}</h5></td>
                                              <td><h5>{item.value2}</h5></td>
                                              <td><h5>{item.value3}</h5></td>
                                              <td><h5>{item.value4}</h5></td>
                                              <td><h5>{item.tag0}</h5></td>
                                            </tr>;
                                          })}
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row clearfix" className="page-break">
                                    <div className="col-md-12">
                                      <div className="pdfHeader">Customer Mind Map</div>
                                      <div class="table-responsive">
                                        <table class="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th>Point to be Considered</th>
                                              <th>Brief Building Blocks</th>
                                              <th data-breakpoints="sm xs">Owner Ship</th>
                                            </tr>
                                          </thead>
                                          {allOptions.map((item, i) => {
                                            return <tr>
                                              <td><h5>{item.Point}</h5></td>
                                              <td><h5>{item.Briefblock}</h5></td>
                                              <td><h5>{item.Owener}</h5></td>
                                            </tr>;
                                          })}
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row clearfix" className="page-break">
                                    <div className="col-md-12">
                                      <div className="pdfHeader" >Customer Mind Map</div>
                                      <div class="table-responsive">
                                        <table class="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th data-breakpoints="sm xs">Start Date</th>
                                              <th data-breakpoints="sm xs md">Expected Closure Date</th>
                                              <th data-breakpoints="sm xs md">Days</th>
                                              <th data-breakpoints="sm xs md">Weeks</th>
                                            </tr>
                                          </thead>
                                          {allOptions.map((item, i) => {
                                            return <tr>
                                              <td><h5>{item.Start}</h5></td>
                                              <td><h5>{item.End}</h5></td>
                                              <td><h5>{item.Days}</h5></td>
                                              <td><h5>{item.Weekcount}</h5></td>
                                            </tr>;
                                          })}
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Modal.Body>
                          </PDFExport>
                        </div>





                      ) : (null)}
                      <button type="button" class="btn downloadbtn btn-square waves-effect" onClick={exportPDFWithMethod} >Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i></button>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
