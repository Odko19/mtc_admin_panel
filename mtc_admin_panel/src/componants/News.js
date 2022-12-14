import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table } from "antd";
import EditorUpdate from "./Editor/EditorUpdate";
import moment from "moment";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../styles/news.css";

function Content() {
  const [data, setData] = useState();
  const [select, setSelect] = useState();
  const [page, setPage] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/news/?page=1&limit=6`)
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
            customer_type: row.customer_type,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  let navigate = useNavigate();
  function handleBtnEdit(record) {
    setSelect(record);
  }

  function handleBtnCreate() {
    navigate("/editor", {
      state: "news",
    });
  }

  function handlePageChange(page) {
    fetch(`${process.env.REACT_APP_BASE_URL}/news/?page=${page}&limit=6`)
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
            customer_type: row.customer_type,
            key: i,
          }))
        );
        setPage(result);
      })
      .catch((error) => console.log("error", error));
  }

  function handlerBtnDlt(id) {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/news/?id=${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function handleBtnSearch(e) {
    e.preventDefault();
    const result = data.filter((subject) =>
      subject.title.toLowerCase().includes(e.target.value)
    );
    if (result.length === 0) {
      console.log("?????????? ????????");
    } else {
      setData(result);
    }
  }

  const columns = [
    {
      title: "????????????",
      dataIndex: "title",
      key: "key",
    },
    {
      title: "??????????",
      dataIndex: "created_at",
      key: "key",
    },
    {
      title: "??????????",
      dataIndex: "type",
      key: "key",
    },
    {
      title: "??????????",
      key: "key",
      dataIndex: "key",
      render: (text, record) => (
        <button className="btnEdit" onClick={() => handleBtnEdit(record)}>
          <EditOutlined />
        </button>
      ),
    },
    {
      title: "????????????",
      key: "key",
      dataIndex: "key",
      render: (text, record) => (
        <button className="btnDlt" onClick={() => handlerBtnDlt(record.id)}>
          <DeleteOutlined />
        </button>
      ),
    },
  ];

  return (
    <div className="news">
      {select ? (
        <EditorUpdate data={select} type={"news"} className="width" />
      ) : (
        <div>
          <div className="news_content">
            <Button onClick={handleBtnCreate}>?????????? ??????????</Button>
            <Input
              placeholder="??????"
              className="news_search"
              suffix={<SearchOutlined />}
              onClick={handleBtnSearch}
            />
          </div>
          <Table
            columns={columns}
            dataSource={data}
            className="news_table"
            onRow={(record) => ({
              onClick: () => {
                window.location.href = `http://10.0.10.126:3000/promos/${record.id}`;
              },
            })}
            pagination={{
              position: ["bottomCenter"],
              pageSize: page?.currentPageSize,
              current: page?.currentPage,
              total: page?.totalDatas,
              onChange: (page) => handlePageChange(page),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Content;
