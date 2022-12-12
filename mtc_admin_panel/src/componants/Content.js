import React, { Component, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Button } from "antd";

function Content() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://localhost:3001/v1/news/all?page=1&limit=9")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }, []);

  function handleChange(page) {
    fetch(`http://localhost:3001/v1/news/all?page=${page}&limit=9`)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }
  let navigate = useNavigate();
  function handlerID(id) {
    navigate("editor", { state: id });
  }
  return (
    <>
      {data?.data.map((d, key) => {
        return (
          <div
            key={key}
            style={{
              backgroundColor: "gray",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
            }}
          >
            <div>{d.id}</div>
            <div>{d.title}</div>
            <div>{d.type}</div>
            <div>{d.created_by}</div>
            <Button onClick={() => handlerID(d.id)} type="primary">
              Edit
            </Button>
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
