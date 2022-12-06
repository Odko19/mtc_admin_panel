import React, { Component, useState,  useRef  } from "react";
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios'

function Tinycme() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
          console.log(editorRef.current.getContent());
        }
      };

  return (
     <div >
         <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         init={{
           height: 500,
           menubar: false,
           plugins:   [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste imagetools wordcount",'image'
          ]
          ,
          toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect | image",
          
            
          
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            // input.setAttribute("multiple", "multiple");
            input.onchange = function () {
              var file = this.files[0];
              var reader = new FileReader();
              reader.onload = function () {
                var id = "blobid" + new Date().getTime();
                var blobCache = editorRef.current.editorUpload.blobCache;
                var base64 = reader.result.split(",")[1];
                var blobInfo = blobCache.create(id, file, base64);
                 let data = new FormData();
                 data.append('cover_img', blobInfo.blob(), blobInfo.filename());
                 axios.post("http://localhost:3001/v1/image", data)
                 .then(function (res) {
                  res.data.data.map((image)=>{
                   return   cb(image)
                  })
                 })
                 .catch(function (err) {
                  console.log(err)
                });
              };
              reader.readAsDataURL(file);
            };
            input.click();
          },
    
         }}
       />
       <button onClick={log}>submit</button>
    </div>
  );
}

export default Tinycme;
