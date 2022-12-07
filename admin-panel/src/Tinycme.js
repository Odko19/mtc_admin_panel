import React, { Component, useState, useRef, useEffect } from "react";
import parse from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import "./App.css";

function Tinycme() {
  const [data, setData] = useState([]);
  const [news, setNews] = useState([]);
  const [image, setImage] = useState([]);
  console.log(news);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setData(editorRef.current.getContent());
    }
  };

  function handleBtn(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("title", "title");
    formdata.append("body", data);
    formdata.append("created_by", "1");
    formdata.append("type", "bonus");
    formdata.append("cover_img", e.target.image.files[0]);

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

  useEffect(() => {
    fetch("http://localhost:3001/v1/news")
      .then((response) => response.text())
      .then((result) => setNews(JSON.parse(result).data))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="content">
      {news?.map((news, index) => {
        return <div key={index}>{parse(news.body)}</div>;
      })}

      <form onSubmit={handleBtn}>
        <div>
          <div>
            <label className="text">Title</label>
            <input type="text" name="files" className="coverImg" multiple />
          </div>
          <div>
            <label>Cover image</label>
            <input type="file" name="image" className="coverImg" multiple />
          </div>
        </div>

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            selector: "div.tinymce",
            plugins: "quickbars image",
            quickbars_image_toolbar:
              "alignleft aligncenter alignright | rotateleft rotateright ",
            toolbar:
              "undo redo | bold italic underline | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | image | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile  media template link anchor codesample | ltr rtl",
            toolbar_sticky: true,
            automatic_uploads: true,

            file_picker_types: "image",
            file_picker_callback: function (cb, value, meta) {
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
        <button onClick={log} className="btn">
          submit
        </button>
      </form>
    </div>
  );
}

export default Tinycme;
