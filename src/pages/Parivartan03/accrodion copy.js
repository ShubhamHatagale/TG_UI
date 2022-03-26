import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Editor from "../../components/SunEditor"
import * as moment from "moment"
import Modal from "react-bootstrap/Modal";

const AccrodionTabs = (props) => {
  let formData = props.AllData;
  let rows = [];
  let [Briefblock, setBriefblock] = useState('')
  let [ownership, setownership] = useState(' ');
  let [startDate, setstartDate] = useState('')
  let [expectedDate, setexpectedDate] = useState('')
  let [days, setdays] = useState('')
  let [weaks, setweaks] = useState('')
  let [postorupdate, setpostorupdate] = useState('')
  const [completeData, setcompleteData] = useState('')
  const [open, setOpen] = useState(false);
  const [Accrodianid, setAccrodianid] = useState('');
  const [CMMid, setCMMid] = useState('');
  const [smShow, setSmShow] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setAccrodianid('')
  };

  const handleChangeEditorBrief = (newContent) => {
    setBriefblock(newContent);
  }
  const handleChangeOwner = (event) => {
    console.log(event.target.value)
    setownership(event.target.value);
  }


  const handleChangestartDate = (event) => {
    console.log(event.target.value)
    setstartDate(event.target.value);
  }

  const handleChangeExpectedDate = (event) => {
    setexpectedDate(event.target.value);
    let expected = event.target.value;
    var date1 = startDate;
    var date2 = expected;
    // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
    date1 = date1.split('-');
    date2 = date2.split('-');
    // Now we convert the array to a Date object, which has several helpful methods
    var dt1 = new Date(date1[0], date1[1], date1[2]);
    var dt2 = new Date(date2[0], date2[1], date2[2]);
    setweaks(diff_weeks(dt1, dt2));
    setdays(Math.floor((dt2.getTime() - dt1.getTime()) / (1000 * 60 * 60 * 24)));
  }
  const handleChangeWeaks = (event) => {
    setweaks(event.target.value);
  }
  const handleChangeDays = (event) => {
    setdays(event.target.value);
  }

  const GetFormattedDate = (datepara) => {
    var todayTime = new Date(datepara);
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return month + "/" + day + "/" + year;
  }

  const AddBriefBlock = (id) => {
    console.log(id)
    setBriefblock("")
    setdays("");
    setownership("");
    setstartDate("");
    setexpectedDate("");
    setweaks("");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptionsget = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://parivartan.transganization.com/nodejs/masters/CMMT3/` + `${id}`, requestOptionsget)
      .then((response) => response.json())
      .then((resData) => {
        setCMMid(id);
        console.log("Fetched dthe api", resData.data);
        let response = resData.data;
        setcompleteData(resData.data);
        if (response.length !== 0) {
          response.map((item) => {
            console.log("Total Welaks", item.weeks)
            console.log(item.ownership)
            console.log(item.brief_building_blocks)
            setBriefblock(item.brief_building_blocks)
            setdays(item.days);
            setownership(item.ownership);
            let dateMDY = moment(item.start_date).format("L");
            setstartDate(item.start_date);
            let Expecteddtae = moment(item.expected_closure_date).format("L")
            setexpectedDate(item.expected_closure_date);
            setweaks(item.weeks);
            setOpen(true);
            setAccrodianid(item.id);
          })
        }
        else {
          setOpen(true);
        }
      })
      .catch((error) => console.log("error", error))
  }

  const diff_weeks = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7);
    return Math.abs(Math.round(diff));
  }

  const HandleSubmit = () => {
    setOpen(false);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var rawrich = JSON.stringify({
      brief_building_blocks: Briefblock,
      ownership: ownership,
      start_date: startDate,
      expected_closure_date: expectedDate,
      weeks: weaks,
      days: days,
      cmmid: CMMid,
      email_id: "1",
      created_by: "2"
    })
    // var myHeadersGet = new Headers();
    // myHeadersGet.append("Content-Type", "application/json");
    // var requestOptionsget = {
    //   method: "GET",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };
    // fetch(`https://parivartan.transganization.com/nodejs/masters/CMMT3/` + `${Accrodianid}`, requestOptionsget)
    //   .then((response) => response.json())
    //   .then((resData) => {
    //     console.log("all Get fetched ", resData.data)
    //     setpostorupdate(resData.data)
    //   })
    if (completeData.length === 0) {
      var requestOptionsget = {
        method: "POST",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(`https://parivartan.transganization.com/nodejs/masters/CMMT3`, requestOptionsget)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData.data);
          if (resData.status == 200) {
            setSmShow(true);
            setTimeout(() => {
              setSmShow(false);
            }, 1000)
            console.log("Data Added succesfully POSt")
          }
        })
        .catch((error) => console.log("error", error))
    } else {
      var requestOptionsget = {
        method: "PUT",
        headers: myHeaders,
        body: rawrich,
        redirect: "follow",
      };
      fetch(`https://parivartan.transganization.com/nodejs/masters/CMMT3/` + `${Accrodianid}`, requestOptionsget)
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData.data);
          if (resData.status == 200) {
            setSmShow(true);
            setTimeout(() => {
              setSmShow(false);
            }, 1000)
            console.log("Data Added succesfully Update")
          }
        })
        .catch((error) => console.log("error", error))
    }
  } 
  if (formData) {
    formData.map((item, key) => {
      if (item.tag0 == "Undefined") {
        rows.push(
          <div className="row clearfix">
            <div className="col-md-10">
              <div style={{ marginTop: 10 }}>
              </div>
              <Accordion key={key}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  {/* <Typography >Undefined</Typography> */}
                  <Typography >Questions appearing in mind Journey:{item.value0}</Typography>

                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="row clearfix">
                      <div className=" col-md-12">
                        <h2 className="card-inside-title">
                          <strong>
                            Questions appearing in mind Journey:{item.value0}
                          </strong>
                        </h2>
                      </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Question appearing in Mind of:{item.value1}</strong>
                        </h2>
                      </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Who Gives the answer:{item.value2}</strong>
                        </h2>
                      </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Possible Answer:{item.value3}</strong>
                        </h2>
                      </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                    </div>
                    <div className="row clearfix">
                      <div className="col-md-12">
                        <h2 className="card-inside-title">
                          <strong>Choice Made:{item.value4}</strong>
                        </h2>
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <div style={{ marginTop: 10 }}>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
            </div>
            <div className="col-md-2">
              <button type="button" class="btn addbtndark waves-effect" onClick={() => AddBriefBlock(key)}>ADD </button>
            </div>
            <div style={{ marginTop: 20 }}>
            </div>
          </div>
        );
      }
    })
  }
  return (
    <div className="card">
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body >Form Saved Successful</Modal.Body>
      </Modal>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="lg">
         <DialogTitle id="form-dialog-title">Customer Mind Map</DialogTitle>
        <DialogTitle className='text-center text-danger' id="form-dialog-title">{Error}</DialogTitle>

        <DialogContent>
          <h6 className="card-inside-title">
            <strong>Brief Building Blocks</strong>
          </h6>
          <Editor contents={Briefblock} getValue={handleChangeEditorBrief} />
          <div style={{ marginTop: 10 }}>
          </div>
          <h6 className="card-inside-title">
            <strong>Ownership</strong>
          </h6>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={handleChangeOwner}
              Value={ownership}
            />
          </div>
          <div style={{ marginTop: 10 }}>
          </div>
          <h6 className="card-inside-title">
            <strong>Start Date</strong>
          </h6>
          <input
            type="date"
            className="form-control"
            Value={startDate}
            onChange={e => handleChangestartDate(e)}
          />
          <div style={{ marginTop: 10 }}>
          </div>
          <h6 className="card-inside-title">
            <strong>Expected Closure Date</strong>
          </h6>
          <input
            type="date"
            className="form-control"
            Value={expectedDate}
            onChange={handleChangeExpectedDate}
          />
          <div style={{ marginTop: 10 }}>
          </div>
          <h6 className="card-inside-title">
            <strong>Days</strong>
          </h6>
          <input
            type="text"
            className="form-control"
            Value={days}
            onChange={handleChangeDays}
            disabled
          />
          <div style={{ marginTop: 10 }}>
          </div>
          <h6 className="card-inside-title">
            <strong>Weeks</strong>
          </h6>
          <input
            type="text"
            className="form-control"
            Value={weaks}
            onChange={handleChangeWeaks}
            disabled
          />
          <div style={{ marginTop: 10 }}>
          </div>
        </DialogContent>
        <DialogActions>
          <button type="button" class="btn btn-success  waves-effect" onClick={HandleSubmit}>SAVE CHANGES</button>
          <button type="button" class="btn btn-danger waves-effect" onClick={handleClose}>CLOSE</button>
        </DialogActions>
      </Dialog>
      {rows}
    </div>
  )
}
export default AccrodionTabs;