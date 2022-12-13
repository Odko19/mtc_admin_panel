import React, { Component, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Button, Space, Table, Tag } from "antd";

function Content() {
  const [data, setData] = useState();
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "createdBy",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];
  useEffect(() => {
    fetch("http://localhost:3001/v1/news/all?page=1&limit=10")
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            title: row.title,
            createdBy: row.created_by,
            updatedAt: row.updated_at,
            key: i,
          }))
        );
      })
      .catch((error) => console.log("error", error));
  }, []);

  function handleChange(page) {
    fetch(`http://localhost:3001/v1/news/all?page=${page}&limit=10`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row) => ({
            title: row.title,
            createdBy: row.created_by,
            updatedAt: row.updated_at,
          }))
        );
      })
      .catch((error) => console.log("error", error));
  }
  let navigate = useNavigate();
  function handlerID(id) {
    navigate("editor", { state: id });
  }

  return (
    // <div>
    //   {data?.data.map((d, key) => {
    //     return (
    //       <div
    //         key={key}
    //         style={{
    //           backgroundColor: "gray",
    //           padding: "10px",
    //           display: "flex",
    //           justifyContent: "space-between",
    //           borderBottom: "1px solid black",
    //         }}
    //       >
    //         <div>{d.id}</div>
    //         <div>{d.title}</div>
    //         <div>{d.type}</div>
    //         <div>{d.created_by}</div>
    //         <div>{d.created_at}</div>
    //         <Button onClick={() => handlerID(d.id)} type="primary">
    //           Edit
    //         </Button>
    //         <Button onClick={() => handlerID(d.id)} type="primary">
    //           Delete
    //         </Button>
    //       </div>
    //     );
    //   })}

    //   <Pagination
    //     pageSize={1}
    //     current={data?.currentPageNumber}
    //     total={data?.totalPages}
    //     onChange={(page) => handleChange(page)}
    //     style={{ bottom: "0px" }}
    //   />
    // </div>
    <Table columns={columns} dataSource={data} />
  );
}

export default Content;
