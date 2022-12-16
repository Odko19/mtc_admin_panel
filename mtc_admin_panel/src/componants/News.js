import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, Button, Input, Table, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "../styles/news.css";
import TextEditor from "./TextEditor";

function Content() {
  const [data, setData] = useState();
  const [select, setSelect] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/v1/news/?page=1&limit=10")
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            title: row.title,
            created_by: row.created_by,
            created_at: moment(row.created_at).format("L"),
            cover_img: row.cover_img,
            expires_at: row.expires_at,
            type: row.type,
            id: row.id,
            body: row.body,
            key: i,
          }))
        );
      })
      .catch((error) => console.log("error", error));
  }, []);

  function handleChange(page) {
    fetch(`http://localhost:3001/v1/news/?page=${page}&limit=10`)
      .then((response) => response.json())
      .then((result) => {
        // setData(
        //   result.data.map((row) => (
        //     {
        //     title: row.title,
        //     createdBy: row.created_by,
        //     updatedAt: row.updated_at,
        //     body: row.body,
        //   }
        //   ))
        // );
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }

  let navigate = useNavigate();
  function handlerID(record) {
    setSelect(record);
  }
  function handleBtnEditor() {
    navigate("/test", {
      state: {
        url: "create",
      },
    });
  }

  const columns = [
    {
      title: "Гарчиг",
      dataIndex: "title",
      key: "key",
    },
    {
      title: "Нийтлэл",
      dataIndex: "createdBy",
      key: "key",
    },
    {
      title: "Огноо",
      dataIndex: "created_at",
      key: "key",
    },
    {
      title: "Төрөл",
      dataIndex: "type",
      key: "key",
    },
    {
      title: "Засах",
      key: "key",
      dataIndex: "key",
      render: (text, record) => (
        <button className="btnEdit" onClick={() => handlerID(record)}>
          <EditOutlined />
        </button>
      ),
    },
    {
      title: "Устгах",
      key: "key",
      dataIndex: "key",
      render: (text, record) => (
        <button className="btnDlt" onClick={() => console.log(record)}>
          <DeleteOutlined />
        </button>
      ),
    },
  ];

  return (
    // <div>
    //   <Pagination
    //     pageSize={1}
    //     current={data?.currentPageNumber}
    //     total={data?.totalPages}
    //     onChange={(page) => handleChange(page)}
    //     style={{ bottom: "0px" }}
    //   />
    // </div>

    <div className="news">
      {select ? (
        <TextEditor data={select} type={"news"} />
      ) : (
        <>
          <div className="news_content">
            <Button onClick={handleBtnEditor}>Мэдээ нэмэх</Button>
            {/* <TextEditor /> */}
            <Input
              placeholder="Нэр"
              className="news_search"
              suffix={<SearchOutlined />}
            />
          </div>
          <Table columns={columns} dataSource={data}></Table>
        </>
      )}
    </div>
  );
}

export default Content;
