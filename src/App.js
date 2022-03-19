import React from "react";
import { HashRouter } from "react-router-dom";
import CustomerRoutes from "./CustomerRoutes";
import Header from "./components/Header";
import "./pages/Parivartan.css";
function App() {
  return (

      <HashRouter>
        {/* <Header /> */}
        <CustomerRoutes />
      </HashRouter>
  );
}
export default App;



// import React, { useState } from 'react';
// import { EditorState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import { convertToHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './App.css';
// const App = () => {
//   const [editorState, setEditorState] = useState(
//     () => EditorState.createEmpty(),
//   );
//   const  [convertedContent, setConvertedContent] = useState(null);
//   const handleEditorChange = (state) => {
//     setEditorState(state);
//     convertContentToHTML();
//   }
//   const convertContentToHTML = () => {
//     let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
//     setConvertedContent(currentContentAsHTML);
//   }
//   const createMarkup = (html) => {
//     return  {
//       __html: DOMPurify.sanitize(html)
//     }
//   }
//   return (
//     <div className="App">
//       <header className="App-header">
//         Rich Text Editor Example
//       </header>
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={handleEditorChange}
//         wrapperClassName="wrapper-class"
//         editorClassName="editor-class"
//         toolbarClassName="toolbar-class"
//       />
//       <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
//     </div>
//   )
// }
// export default App;