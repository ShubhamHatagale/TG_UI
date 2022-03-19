const List = {
  list: [
    {
      id: 1,
      title: "Read some news",
    },
    {
      id: 2,
      title: "Go out for a walk",
    },
    {
      id: 3,
      title: "Do some exercise",
    },
    {
      id: 4,
      title: "Watch tutorials on YouTube",
    },
    {
      id: 5,
      title: "Netflix and chill",
    },
    {
      id: 6,
      title: "Read a book",
    },
  ],
  getList: function () {
    return (
      (localStorage.getItem("theList") &&
        JSON.parse(localStorage.getItem("theList"))) ||
      this.list
    );
  },
  saveList: (list) => {
    localStorage.setItem("theList", JSON.stringify(list));
  },
};

export default List;

















// <div className="container-fluid" style={{ backgroundColor: "#F3F6F9" }}>
// <div className="row clearfix">
//   <div className="col-lg-12 col-md-12 col-sm-12">
//     <div className="card p-4 mt-2">
//       <div className="body p-5">
//         <div className="row clearfix ml-3" >
//           <div className="col-md-2">
//             <h2 className="card-inside-title text-center">
//               <strong>Vilakshan Journey</strong>
//             </h2>
//           </div>
//           <div className="col-md-2">
//             <h2 className="card-inside-title text-center ml-2">
//               <strong>Vilakshan form</strong>
//             </h2>
//           </div>
//         </div>

//         {inputListFinal.map((x, i) => {

//           <div className="row clearfix ml-3" >
//             {Array.from({ length: 2 }, (item, index) => {
//               return (
//                 <>
//                   <div className="col-lg-2">
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="0"
//                         name={`value${index}`}
//                         value={x[`value${index}`]}
//                         onChange={(e) => handleInputChange(e, i)}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </>
//               );
//             })}

//             <div className="col-md-2">
//               {inputListFinal.length !== 1 && (
//                 <button
//                   type="button"
//                   className="btn btn-raised rembtn btn-square waves-effect m-l-40"
//                   // onClick={() => handleRemoveClick(i)}
//                 >
//                   <strong>REMOVE</strong>
//                 </button>
//               )}
//               {inputListFinal.length - 1 === i && (
//                 <button
//                   type="button"
//                   className="btn btn-raised addbtn btn-square waves-effect m-l-40 "
//                   // onClick={handleAddClick}
//                 >
//                   <strong>ADD</strong>
//                 </button>
//               )}
//             </div>

//           </div>

          
//         })}


//         <button
//           type="submit"
//           class="btn savebtn  waves-effect"
//           onClick={handleSubmit}
//         >
//           SAVE <i className="ml-1 zmdi zmdi-save"></i>
//         </button>
//         {completeData.length > 0 ? (
//           <>
//             <button type="button" class="btn downloadbtn waves-effect" onClick={exportPDFWithMethod}>Download PDF   <i class="ml-1 zmdi zmdi-cloud-download"></i></button>
//             <button type="button" class="btn viewbtn  waves-effect ml-4" data-toggle="modal" data-target="#largeModal" onClick={() => props.OnValidate(true)}>SUBMIT  <i className="ml-1 zmdi zmdi-check"></i></button>

//             <div>
//               <div
//                 style={{
//                   position: "absolute",
//                   left: "-3000px",
//                   top: 0,
//                 }}>
//                 <PDFExport paperSize="A2" margin="1cm" ref={pdfExportComponent} fileName={`${beliverName}-${history.location.pathname}`} forcePageBreak=".page-break">
//                   <Modal.Header style={{ padding: "10px" }}>
//                     <div className="col-md-12 row" >
//                       <div className="col-md-6">
//                         <img src="../../assets/images/transaganization.png" width="135" alt="Transganization" />
//                       </div>
//                       <div className="col-md-6 pageHeading" >
//                         System & Process
//                       </div>
//                     </div>
//                     <Modal.Title id="example-modal-sizes-title-lg">

//                     </Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>
//                     {/* step process model */}
//                     <div >
//                       <div id="divToPrint" className="mt4 pdfBody" >

//                         <div className="row clearfix">
//                           <div className="col-md-12">
//                             <div className="pdfHeader">Vilakshan Map</div>
//                             <div style={{ marginTop: 30 }}>
//                               <div class="table-responsive" id="Table">
//                                 <table class="table table-bordered">
//                                   <thead>
//                                     <tr>
//                                       <th>Vilakshan Journey</th>
//                                       <th>Vilakshan Form</th>
//                                       <th>VCCs (Cost Centres)</th>
//                                       <th>Parent Process Name</th>
//                                       <th>Parent Process Input</th>
//                                       <th>Parent Process Output</th>
//                                       <th>Parent Process Owner</th>
//                                       <th>Strategic Support Process</th>
//                                       <th>Strategic Support Input</th>
//                                       <th>Strategic Support Output</th>
//                                     </tr>
//                                   </thead>
//                                   <tbody>
//                                     {completeData.map((item, key) => (
//                                       <tr>
//                                         <td>{item.vilakshan_journey}</td>
//                                         <td>{item.vilakshan_form}</td>
//                                         <td>{item.vccs}</td>
//                                         <td>{item.parent_process_name}</td>
//                                         <td>{item.parent_process_input}</td>
//                                         <td>{item.parent_process_output}</td>
//                                         <td>{item.parent_process_owner}</td>
//                                         <td>{item.strategic_support_process}</td>
//                                         <td>{item.strategic_support_input}</td>
//                                         <td>{item.strategic_support_output}</td>
//                                       </tr>
//                                     ))}
//                                   </tbody>
//                                 </table>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>


//                   </Modal.Body>
//                 </PDFExport>
//               </div>
//             </div>

//           </>

//         ) : (null)
//         }

//         <>
//           {completeData.length > 0 ? (
//             <div class="table-responsive mt-5" id="Table">
//               <table class="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>Vilakshan Journey</th>
//                     <th>Vilakshan Form</th>
//                     {/* <th>VCCs (Cost Centres)</th> */}
//                     {/* <th>Parent Process Name</th>
//                   <th>Parent Process Input</th>
//                   <th>Parent Process Output</th>
//                   <th>Parent Process Owner</th>
//                   <th>Strategic Support Process</th>
//                   <th>Strategic Support Input</th>
//                   <th>Strategic Support Output</th> */}
//                     <th style={{ textAlign: "center" }}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {completeData.map((item, key) => (
//                     <tr>
//                       <td>{item.vilakshan_journey}</td>
//                       <td>{item.vilakshan_form}</td>
//                       {/* <td>{item.vccs}</td> */}
//                       {/* <td>{item.parent_process_name}</td>
//                     <td>{item.parent_process_input}</td>
//                     <td>{item.parent_process_output}</td>
//                     <td>{item.parent_process_owner}</td>
//                     <td>{item.strategic_support_process}</td>
//                     <td>{item.strategic_support_input}</td>
//                     <td>{item.strategic_support_output}</td> */}
//                       <td className="w-25">
//                         <div style={{ marginLeft: "75px" }}>
//                           <div class="btn-group" >
//                             <button

//                               type="submit"
//                               title="edit"
//                               class="btn  zmdi zmdi-edit waves-effect"

//                               onClick={() => editfn(item.id)}
//                             ></button>
//                             <button
//                               type="submit"
//                               title="delete"
//                               class="btn btn-danger zmdi zmdi-delete waves-effect"
//                               onClick={() => deletefn(item.id)}
//                             ></button>
//                           </div>
//                         </div>

//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (null)}
//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//               <Modal.Title>Are You Sure You Want To Delete!</Modal.Title>
//             </Modal.Header>
//             {/* <Modal.Body>Are You Sure You Want To Delete!</Modal.Body> */}
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShow(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={deleteConfirm}>
//                 Yes
//               </Button>
//             </Modal.Footer>
//           </Modal>
//           {/* For Edit */}
//           <Modal
//             size="lg"
//             show={editModal}
//             onHide={handleClose}
//             aria-labelledby="example-modal-sizes-title-lg"
//           >
//             <Modal.Header closeButton>
//               <Modal.Title id="example-modal-sizes-title-lg">
//                 Edit vilakshan Map
//               </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <div className="container-fluid">
//                 <div className="row clearfix">
//                   <div className="col-lg-12 col-md-12 col-sm-12">
//                     <div className="card">
//                       <div className="body">
//                         <div className="row clearfix">
//                           <div className="col-md-12">
//                             <h2 className="card-inside-title">
//                               <strong>Vilakshan Journey</strong>
//                             </h2>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Vilakshan Journey"
//                                 name="vilakshan_journey"
//                                 onChange={changeeditvilakshan_journey}
//                                 value={editvilakshan_journey}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row clearfix">
//                           <div className="col-md-12">
//                             <h2 className="card-inside-title">
//                               <strong>Vilakshan form</strong>
//                             </h2>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Vilakshan form"
//                                 name="vilakshan_form"
//                                 onChange={changeeditvilakshan_form}
//                                 value={editvilakshan_form}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         {/* <div className="row clearfix">
//                         <div className="col-md-12">
//                           <h2 className="card-inside-title">
//                             <strong>VCCs (Cost Centres)</strong>
//                           </h2>
//                         </div>
//                         <div className="col-md-12">
//                           <div className="form-group">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="VCCs (Cost Centres)"
//                               name="vccs"
//                               onChange={changeeditvccs}
//                               value={editvccs}
//                             />
//                           </div>
//                         </div>
//                       </div> */}
//                         <div className="row clearfix">
//                           <div className="col-md-12">
//                             <h2 className="card-inside-title">
//                               <strong>Parent Process Name</strong>
//                             </h2>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Parent Process Name"
//                                 name="parent_process_name"
//                                 onChange={changeeditparent_process_name}
//                                 value={editparent_process_name}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row clearfix">
//                           <div className="col-md-12">
//                             <h2 className="card-inside-title">
//                               <strong>Parent Process Input</strong>
//                             </h2>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Parent Process Input"
//                                 name="parent_process_input"
//                                 onChange={changeeditparent_process_input}
//                                 value={editparent_process_input}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row clearfix">
//                           <div className="col-md-12">
//                             <h2 className="card-inside-title">
//                               <strong>Parent Process Output</strong>
//                             </h2>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Parent Process Output"
//                                 name="parent_process_output"
//                                 onChange={changeeditparent_process_output}
//                                 value={editparent_process_output}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row clearfix">
//                           <div className="col-md-12">
//                             <h2 className="card-inside-title">
//                               <strong>Parent Process Owner</strong>
//                             </h2>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Parent Process Owner"
//                                 name="parent_process_owner"
//                                 onChange={changeeditparent_process_owner}
//                                 value={editparent_process_owner}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row clearfix">
//                           <div className="col-md-12">
//                             <h2 className="card-inside-title">
//                               <strong>Strategic Support Process</strong>
//                             </h2>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Strategic Support Process"
//                                 name="strategic_support_process"
//                                 onChange={changeeditstrategic_support_process}
//                                 value={editstrategic_support_process}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row clearfix">
//                           <div className="col-md-12">
//                             <h2 className="card-inside-title">
//                               <strong>Strategic Support Input</strong>
//                             </h2>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Strategic Support Input"
//                                 name="strategic_support_input"
//                                 onChange={changeeditstrategic_support_input}
//                                 value={editstrategic_support_input}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row clearfix">
//                           <div className="col-md-12">
//                             <h2 className="card-inside-title">
//                               <strong>Strategic Support Output</strong>
//                             </h2>
//                           </div>
//                           <div className="col-md-12">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Strategic Support Output"
//                                 name="strategic_support_output"
//                                 onChange={changeeditstrategic_support_output}
//                                 value={editstrategic_support_output}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <button
//                           type="submit"
//                           class="btn savebtn waves-effect"
//                           onClick={() => OnSubmitUpdate(editId)}
//                         >
//                           Update
//                         </button>
//                       </div>
//                       <div style={{ marginTop: 30 }}></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Modal.Body>
//           </Modal>
//         </>
//       </div>


//       <div style={{ marginTop: 30 }}></div>
//       {/* {renderTable()} */}

//     </div>
//   </div>
// </div >
// </div >
