import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Table, Select, Pagination } from "antd";
import "../styles/resnum.css";

function Resnum() {
  const [data, setData] = useState();
  const [page, setPage] = useState();
  const { Search } = Input;
  let navigate = useNavigate();
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
    fetch(`${process.env.REACT_APP_BASE_URL}/resnum?page=1&limit=10`)
      .then((response) => response.json())
      .then((result) => {
        // setData(
        //   result.data.map((row, i) => ({
        //     RESNUM: row.RESNUM,
        //     STATUS: row.STATUS,
        //     EMAIL: row.EMAIL,
        //     PID: row.PID,
        //     key: i,
        //   }))
        // );
        setData(result.data);
        setPage(result);
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

    if (
      (choiceOne === "A" && choiceTwo === "RESNUM") ||
      (choiceOne === "T" && choiceTwo === "RESNUM") ||
      (choiceOne === "R" && choiceTwo === "RESNUM") ||
      (choiceOne === "E" && choiceTwo === "RESNUM")
    ) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/resnum?choiceOne=${choiceOne}&choiceTwo=${choiceTwo}`
      )
        .then((response) => response.json())
        .then((result) => setData(result.data))
        .catch((error) => console.log("error", error));
    }
    if (
      (choiceOne === "A" && value) ||
      (choiceOne === "T" && value) ||
      (choiceOne === "R" && value) ||
      (choiceOne === "E" && value)
    ) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/resnum?choiceOne=${choiceOne}&value=${value}`
      )
        .then((response) => response.json())
        .then((result) => setData(result.data))
        .catch((error) => console.log("error", error));
    }
    if (choiceTwo === "RESNUM") {
      result = data.filter((subject) =>
        subject.RESNUM.toString().toLowerCase().includes(value)
      );
      if (result.length > 0) {
        setData(result);
      } else {
        fetch(`${process.env.REACT_APP_BASE_URL}/resnum?number=${value}`)
          .then((response) => response.json())
          .then((result) => {
            setData(result.data);
          })
          .catch((error) => console.log("error", error));
      }
    } else if (choiceTwo === "PID" || choiceTwo === "EMAIL") {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/resnum?choiceTwo=${choiceTwo}&value=${value}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => console.log("error", error));
    }
  };

  function handleChange(page) {
    fetch(`${process.env.REACT_APP_BASE_URL}/resnum?page=${page}&limit=10`)
      .then((response) => response.json())
      .then((result) => {
        setPage(result);
        setData(
          result.data.map((row, i) => ({
            id: i,
            RESNUM: row.RESNUM,
            STATUS: row.STATUS,
            EMAIL: row.EMAIL,
            PID: row.PID,
            key: i,
          }))
        );
      })
      .catch((error) => console.log("error", error));
  }

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
              value: "A",
              label: "Ашиглаж байгаа",
            },
            {
              value: "T",
              label: "Зарагдахад бэлэн",
            },
            {
              value: "R",
              label: "Захиалга өгсөн",
            },
            {
              value: "E",
              label: "E",
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
      {/* <Table
        columns={columns}
        dataSource={data}
        className="news_table"
        pagination={{
          position: ["bottomCenter"],
          pageSize: page?.currentPageSize,
          current: page?.currentPage,
          total: page && page?.totalPages,
          onChange: (page) => handlePageChange(page),
        }}
      /> */}
      <div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>CREATED_AT</th>
              <th>RESNUM</th>
              <th>PID</th>
              <th>EMAIL</th>
              <th>PLACE</th>
              <th>STATUS</th>
            </tr>
            {data?.map((text, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{text.CREATED_AT}</td>
                  <td>{text.RESNUM}</td>
                  <td>{text.PID}</td>
                  <td>{text.EMAIL}</td>
                  <td>{text.PLACE}</td>
                  <td>{text.STATUS}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          pageSize={1}
          current={page?.currentPageSize}
          total={page?.totalPages}
          onChange={handleChange}
          position={"bottomCenter"}
          style={{
            borderTop: " 1px solid rgba(5, 5, 5, 0.06)",
          }}
        />
      </div>
    </div>
  );
}

export default Resnum;
