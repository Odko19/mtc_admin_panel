import React, { Component, useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { DatePicker } from "antd";
import { Pagination } from "antd";
import axios from "axios";
import "../App.css";

function Content() {
  const [data, setData] = useState();
  console.log(data);
  useEffect(() => {
    fetch("http://localhost:3001/v1/news/all?page=1&limit=2")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }, []);

  function handleChange(page) {
    fetch(`http://localhost:3001/v1/news/all?page=${page}&limit=2`)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }
  return (
    <>
      {/* http://localhost:3001/uploads/ */}
      {data?.data.map((d, key) => {
        return (
          <div key={key} className="flex">
            <div>{d.id}</div>
            <div>{d.title}</div>
            <div>{d.type}</div>
            <div>{d.created_by}</div>
          </div>
        );
      })}

      <Pagination
        pageSize={1}
        current={data?.currentPageNumber}
        total={data?.totalPages}
        onChange={(page) => handleChange(page)}
        style={{ bottom: "0px" }}
      />
    </>
  );
}

export default Content;
