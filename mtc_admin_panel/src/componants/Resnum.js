import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table, Select } from "antd";
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
        console.log(result);
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
  const [choiceTwo, setChoiceTwo] = useState("RESNUM");
  const handlerBtnOne = (value) => {
    setChoiceOne(value);
  };
  const handlerBtnTwo = (value) => {
    setChoiceTwo(value);
  };

  const onSearch = (value) => {
    let result;
    if (choiceOne && choiceTwo && value) {
      console.log("three");
    } else if (choiceOne === "all") {
      console.log("post");
    } else if (choiceOne === "R") {
      console.log("post");
    } else if (choiceOne === "E") {
      console.log("post");
    } else if (choiceTwo === "RESNUM") {
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

  // const onSearch = (value) => {
  //   let result;
  //   if (choiceOne === "E") {
  //     console.log(choiceOne);
  //     console.log(choiceTwo);
  //   }
  //   if (choiceTwo === "RESNUM") {
  //     result = data.filter((subject) =>
  //       subject.RESNUM.toString().toLowerCase().includes(value)
  //     );
  //     if (result.length > 0) {
  //       setData(result);
  //     } else {
  //       fetch(`http://localhost:3001/v1/resnum?number=${value}`)
  //         .then((response) => response.json())
  //         .then((result) => {
  //           setData(result.data);
  //         })
  //         .catch((error) => console.log("error", error));
  //     }
  //   } else if (choiceTwo === "PID") {
  //     result = data.filter((subject) =>
  //       subject.PID.toLowerCase().includes(value)
  //     );
  //     setData(result);
  //   } else if (choiceTwo === "EMAIL") {
  //     result = data.filter((subject) =>
  //       subject.EMAIL.toLowerCase().includes(value)
  //     );
  //     setData(result);
  //   }
  // };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Select
          defaultValue={{
            value: "all",
            label: "Бүгд",
          }}
          style={{
            width: 200,
          }}
          onChange={handlerBtnOne}
          options={[
            {
              value: "all",
              label: "Бүгд",
            },
            {
              value: "E",
              label: "Захиалга хугацаа дууссан",
            },
            {
              value: "R",
              label: "Захиалга идэвхитэй",
            },
          ]}
        />
        <Select
          defaultValue={{
            value: "RESNUM",
            label: "Утасны дугаар",
          }}
          style={{
            width: 200,
            margin: "0 5px 0 5px",
          }}
          onChange={handlerBtnTwo}
          options={[
            {
              value: "RESNUM",
              label: "Утасны дугаар",
            },
            {
              value: "PID",
              label: "Регистерийн дугаар",
            },
            {
              value: "EMAIL",
              label: "емайл хаягаар",
            },
          ]}
        />

        <Search onSearch={onSearch} />
      </div>
      <Table columns={columns} dataSource={data} className="news_table" />
    </div>
  );
}

export default Resnum;
