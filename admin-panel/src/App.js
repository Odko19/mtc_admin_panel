import React, { Component, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-classic";

function App() {
  const [data, setData] = useState([]);
  console.log(data);

  function handleCKeditorState(event, editor) {
    const data = editor.getData();
    setData(data);
  }

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("cover_img", file);
            console.log(file);
            fetch("http://localhost:3001/v1/image", {
              method: "post",
              body: body,
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({ ...res.data });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    console.log(editor);
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new uploadAdapter(loader);
    };
  }

  const custom_config = {
    extraPlugins: [uploadPlugin],

    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "blockQuote",
        "insertTable",
        "|",
        "imageUpload",
      ],
    },

    image: {
      // Configure the available styles.
      styles: ["alignLeft", "alignCenter", "alignRight", "full", "side"],

      // Configure the available image resize options.
      resizeOptions: [
        {
          name: "imageResize:original",
          value: null,
          icon: "original",
        },
        {
          name: "imageResize:50",
          value: "50%",
          icon: "medium",
        },
        {
          name: "imageResize:75",
          value: "75%",
          icon: "large",
        },
      ],
      // You need to configure the image toolbar, too, so it shows the new style
      // buttons as well as the resize buttons.
      toolbar: [
        "imageResize",
        "imageResize:50",
        "imageResize:75",
        "imageResize:original",
        "linkImage",
      ],
    },

    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };

  return (
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={DecoupledEditor}
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
        onChange={(event, editor) => handleCKeditorState(event, editor)}
      />
    </div>
  );
}

export default App;
