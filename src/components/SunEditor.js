
import React, { useRef, useState, useMemo } from 'react'
// import JoditEditor from 'jodit-react'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  image,
  link
} from "suneditor/src/plugins";


const Editor = (props) => {
  //contents is the dynamic value from parent
  const { contents, getValue } = props
  const editor = useRef(null)
  const config = {}
  return useMemo(() => (
    <SunEditor
      autoFocus={true}
      setDefaultStyle="font-family:times new roman; font-size: 17px;"
      lang="en"
      setOptions={{
        showPathLabel: false,
        minHeight: "10vh",
        maxHeight: "50vh",
        placeholder: "Enter your text here!!!",
        plugins: [
          align,
          font,
          fontColor,
          fontSize,
          formatBlock,
          hiliteColor,
          horizontalRule,
          lineHeight,
          list,
          paragraphStyle,
          table,
          template,
          textStyle,

        ],
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["paragraphStyle"],
          [
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript"
          ],
          ["fontColor", "hiliteColor"],
          ["removeFormat"],
          "/", // Line break
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          ["table"]
        ],
        formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
        font: [
          "Arial",
          "Calibri",
          "Comic Sans",
          "Courier",
          "Garamond",
          "Georgia",
          "Impact",
          "Lucida Console",
          "Palatino Linotype",
          "Segoe UI",
          "Tahoma",
          "Times New Roman",
          "Trebuchet MS"
        ]
      }}
      ref={editor} setContents={contents} config={config} onChange={content => getValue(content)}
    />

  ), [])
}

export default Editor
