import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table, Tag, sera } from "antd";
import "../styles/news.css";

function Resnum() {
  const [data, setData] = useState();
  const { Search } = Input;

  const columns = [
    {
      title: "Гарчиг",
      dataIndex: "RESNUM",
      key: 1,
    },
    {
      title: "Огноо",
      dataIndex: "STATUS",
      key: 2,
    },
    {
      title: "EMAIL",
      dataIndex: "EMAIL",
      key: 3,
    },
    {
      title: "PID",
      dataIndex: "PID",
      key: 4,
    },
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/resnum?page=1&limit=6`)
      .then((response) => response.json())
      .then((result) => {
        setData(
          result.data.map((row, i) => ({
            RESNUM: row.RESNUM,
            STATUS: row.STATUS,
            EMAIL: row.EMAIL,
            PID: row.PID,
            key: i,
          }))
        );
      })
      .catch((error) => console.log("error", error));
  }, []);

  const [choiceOne, setChoiceOne] = useState("ALL");
  function handlerBtnOne(e) {
    setChoiceOne(e.target.value);
  }

  const [choiceTwo, setChoiceTwo] = useState("RESNUM");
  function handlerBtnTwo(e) {
    setChoiceTwo(e.target.value);
  }

  const onSearch = (value) => {
    let result;

    if (choiceTwo === "RESNUM") {
      result = data.filter((subject) =>
        subject.RESNUM.toString().toLowerCase().includes(value)
      );
      if (result.length > 0) {
        setData(result);
      } else {
        fetch(`http://localhost:3001/v1/resnum?number=${value}`)
          .then((response) => response.json())
          .then((result) => {
            setData(result.data);
          })
          .catch((error) => console.log("error", error));
      }
    } else if (choiceTwo === "PID") {
      result = data.filter((subject) =>
        subject.PID.toLowerCase().includes(value)
      );
      setData(result);
    } else if (choiceTwo === "EMAIL") {
      result = data.filter((subject) =>
        subject.EMAIL.toLowerCase().includes(value)
      );
      setData(result);
    }
  };

  return (
    <div>
      <div>
        <div>
          <select onChange={handlerBtnOne}>
            <option value="all">Бүгд</option>
            <option value="R">Захиалга идэвхитэй </option>
            <option value="E">Захиалга хугацаа дууссан</option>
          </select>
          <select onChange={handlerBtnTwo}>
            <option value="RESNUM">Утасны дугаар</option>
            <option value="PID">Регистерийн дугаараар</option>
            <option value="EMAIL">емайл хаягаар</option>
          </select>
        </div>
        <Search onSearch={onSearch} />
      </div>
      <Table columns={columns} dataSource={data} className="news_table" />
    </div>
  );
}

export default Resnum;
