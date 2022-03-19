import React, { useState, useEffect } from 'react';
import ReactExport from 'react-data-export';
import { getReflectionData } from "../apiServices/reflectionapi";
import { useHistory } from "react-router-dom";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


const Downloadexcel = () => {
    const history=useHistory();

    useEffect(() => {      var s_id = localStorage.getItem('tr_id')
    if (!s_id) {
      history.push("Not_support");
    }

        HandleReflectionDownload();
    }, [])

    let [reflectiondata, setreflectiondata] = useState([]);

    let [childhood, setchildhood] = useState('');
    let [postEducation, setpostEducation] = useState('')
    let [postMarriage, setpostMarriage] = useState('')
    const HandleReflectionDownload = async () => {
        const data = await getReflectionData();
        data.map((item, key) => {
            let childdata;
            let posteductaion;
            let postmarriage;
            childdata = item.child_hood;
            posteductaion = item.post_education;
            postmarriage = item.post_marriage;
            const regEx = /(<([^>]+)>)/ig;
            setchildhood(childdata.replace(regEx, ''));
            setpostEducation(posteductaion.replace(regEx, ''));
            setpostMarriage(postmarriage.replace(regEx, ''));
        })
        setreflectiondata(data);
    }
    let data = "Childhood life is the best life we evere had "
    const multiDataSet = [
        {
            columns: [
                { title: "Childhood ", width: { wch: 50 }, style: { alignment: { wrapText: true, horizontal: 'center', vertical: 'top' } } },//pixels width 
                { title: "Post Education", width: { wch: 50 }, style: { alignment: { wrapText: true, horizontal: 'center', vertical: 'top' } } },//char width 
                { title: "Post Marriage", width: { wch: 50 }, style: { alignment: { wrapText: true, horizontal: 'center', vertical: 'top' } } },
            ],
            data: [
                [
                    { value: childhood, style: { font: { bold: true } } },
                    { value: postEducation, style: { font: { bold: true } } },
                    { value: postMarriage, style: { font: { bold: true } } },
                ],

            ]
        }
    ];


    return (
        <section class="content">
            <div class="body_scroll">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Believers Concept Excel</h2>
                            <button className="btn btn-primary btn-icon mobile_menu" type="button"><i className="zmdi zmdi-sort-amount-desc"></i></button>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <button className="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i className="zmdi zmdi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="header">
                                    <ExcelFile element={<button type="button" class="btn btn-warning  waves-effect">Download Data With Styles</button>}>
                                        <ExcelSheet dataSet={multiDataSet} name="Reflection" />
                                        <ExcelSheet dataSet={multiDataSet} name="Rebirth" />
                                        <ExcelSheet dataSet={multiDataSet} name="Discovery" />
                                    </ExcelFile>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Downloadexcel;
