import React, { Component, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw} from "draft-js";
import draftToHtml from 'draftjs-to-html';


function uploadImageCallBack(file) {
    console.log(file)
//   return new Promise(
//     (resolve, reject) => {
//       const data = new FormData();
//       data.append("cover_img", file);
//       fetch("http://localhost:3001/v1/image", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((res) => {
//         //   resolve({ ...res.data });
//         console.log(...res.data)
//         })
//         .catch((err) => {
//           reject(err);
//         });


//     }
//   );
}

const Draft = () => {
    const [editorState, setEditorState] = useState(()=> EditorState.createEmpty())
    return (
      <div>
        <Editor editorState={editorState} onChange={setEditorState}/>
      </div>
    )
  } 

  export default Draft