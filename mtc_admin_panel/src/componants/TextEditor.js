import React, { Component, useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation } from "react-router";

import axios from "axios";

function TextEditor() {
  const [body, setBody] = useState();
  const [edit, setEdit] = useState();

  const { state } = useLocation();
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setBody(editorRef.current.getContent());
    }
  };

  function handleBtn(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("title", "title");
    formdata.append("cover_img", e.target.image.files[0]);
    formdata.append("body", body);
    formdata.append("created_by", "1");
    formdata.append("type", "bonus");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/news", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function handleBtnEdit(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("id", edit.id);
    formdata.append("title", edit.title);
    formdata.append("body", body);
    formdata.append("created_by", edit.created_by);
    formdata.append("type", edit.type);
    formdata.append("cover_img", e.target.image.files[0]);
    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/news", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    fetch(`http://localhost:3001/v1/news/?id=${state}`)
      .then((response) => response.json())
      .then((result) => setEdit(result))
      .catch((error) => console.log("error", error));
  }, [state]);

  return state ? (
    <div>
      <form onSubmit={handleBtnEdit}>
        <input accept="image/*" type="file" multiple name="image" />
        <Editor
          initialValue={edit?.body}
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: true,

            toolbar:
              "insertfile autolink  quickbars link undo redo | styleselect | bold italic |  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect | image ",
            selector: "textarea#drive",
            // plugins: "quickbars image link ",
            link_context_toolbar: true,
            plugins: "image media link tinydrive  autolink",
            quickbars_insert_toolbar: "quickimage quicktable ",
            quickbars_image_toolbar:
              "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
            quickbars_selection_toolbar:
              "bold italic alignleft aligncenter alignright alignjustify ",
            automatic_uploads: true,
            file_picker_types: "image ",
            file_picker_callback: function (cb, value, meta) {
              console.log(meta);
              var input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.onchange = function () {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function () {
                  var id = "blobid" + new Date().getTime();
                  var blobCache = editorRef.current.editorUpload.blobCache;
                  var base64 = reader.result.split(",")[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  let data = new FormData();
                  data.append(
                    "cover_img",
                    blobInfo.blob(),
                    blobInfo.filename()
                  );
                  axios
                    .post("http://localhost:3001/v1/image", data)
                    .then(function (res) {
                      res.data.images.map((image) => {
                        return cb(image);
                      });
                    })
                    .catch(function (err) {
                      console.log(err);
                    });
                };
                reader.readAsDataURL(file);
              };
              input.click();
            },
          }}
        />
        <button onClick={log}>submit</button>
      </form>
    </div>
  ) : (
    <div>
      <form onSubmit={handleBtn}>
        <input accept="image/*" type="file" multiple name="image" />
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            toolbar:
              "  undo redo | styleselect | bold italic |  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect | image ",
            selector: "textarea",
            plugins: "quickbars image",
            quickbars_image_toolbar:
              "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
            quickbars_selection_toolbar:
              "bold italic alignleft aligncenter alignright alignjustify ",
            automatic_uploads: true,
            file_picker_types: "image",
            file_picker_callback: function (cb, value, meta) {
              console.log(meta);
              if (meta.filetype == "image") {
                var input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.onchange = function () {
                  var file = this.files[0];
                  // console.log(file);
                  var reader = new FileReader();
                  reader.onload = function () {
                    var id = "blobid" + new Date().getTime();
                    var blobCache = editorRef.current.editorUpload.blobCache;
                    var base64 = reader.result.split(",")[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    let data = new FormData();
                    data.append(
                      "cover_img",
                      blobInfo.blob(),
                      blobInfo.filename()
                    );
                    axios
                      .post("http://localhost:3001/v1/image", data)
                      .then(function (res) {
                        res.data.images.map((image) => {
                          return cb(image);
                        });
                        // console.log(res.data);
                      })
                      .catch(function (err) {
                        console.log(err);
                      });
                  };
                  reader.readAsDataURL(file);
                };
                input.click();
              }
              if (meta.filetype == "file") {
                console.log("file");
              }
            },
          }}
        />
        <button onClick={log}>submit</button>
      </form>
    </div>
  );
}

export default TextEditor;
