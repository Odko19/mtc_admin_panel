import React, { Component, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function App() {

  const [data , setData] = useState([])
  console.log(data)
  
  function handleCKeditorState(event, editor){
    const data = editor.getData();
    setData(data)
  }
  function uploadAdapter (loader){
   return {
    upload:()=>{
      return new Promise((resolve, reject)=>{
        const body = new FormData();
        loader.file.then((file)=>{
          body.append("cover_img", file);
          fetch("http://localhost:3001/v1/ckeImage",{
            method:"post",
            body:body
          }).then((res)=>res.json())
          .then((res)=>{
            // console.log(...res.data)
            resolve({...res.data})
           
          })
          .catch((err)=>{
             reject(err)
          })
        })
    })
  }}}

    function uploadPlugin(editor){
      editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
        return new uploadAdapter(loader)
      }
    }

  
    const custom_config = {
      extraPlugins: [ uploadPlugin ],
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'blockQuote',
          'insertTable',
          '|',
          'imageUpload',
          'undo',
          'redo'
        ]
      },
      table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      }
    }


  return (
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={ClassicEditor}
        // config={{
        //   ckfinder:{
        //     uploadUrl:"/ckeImage"
        //   },
        //   extraPlugins: [uploadPlugin]
        // }}
        config={custom_config}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor ) => handleCKeditorState(event, editor)}
      />
    </div>
  );
}

export default App;
