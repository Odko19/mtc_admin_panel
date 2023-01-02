import React, { useState, useEffect } from "react";
import { Input, Select, Pagination, DatePicker, Space } from "antd";
import moment from "moment";
import "../styles/resnum.css";

function ResnumFilter() {
  const [data, setData] = useState([]);
  console.log(data);
  const [allData, setAllData] = useState();
  const [page, setPage] = useState();
  const { Search } = Input;
  const { RangePicker } = DatePicker;
  /****  Default all data  ****/
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/resnum?page=1&limit=10`)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        setPage(result);
      })
      .catch((error) => console.log("error", error));
    fetch(`${process.env.REACT_APP_BASE_URL}/resnum?all=all`)
      .then((response) => response.json())
      .then((result) => {
        setAllData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  /****  Select option 1,2  ****/
  const [choiceOne, setChoiceOne] = useState("ALL");
  const [choiceTwo, setChoiceTwo] = useState("RESNUM");
  const [dates, setDates] = useState();

  const handlerBtnOne = (value) => {
    setChoiceOne(value);
  };
  const handlerBtnTwo = (value) => {
    setChoiceTwo(value);
  };

  /****  Search  ****/
  const onSearch = (value) => {
    if (choiceOne && choiceTwo && dates && value) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/resnum?choiceOne=${choiceOne}&choiceTwo=${choiceTwo}&dateOne=${dates[0]}&dateTwo=${dates[1]}&value=${value}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => console.log("error", error));
    }
    if (choiceOne && choiceTwo && value) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/resnum?choiceOne=${choiceOne}&choiceTwo=${choiceTwo}&value=${value}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => console.log("error", error));
    } else if (choiceOne && value) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/resnum?choiceOne=${choiceOne}&value=${value}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => console.log("error", error));
    } else if (choiceOne || value) {
      fetch(`${process.env.REACT_APP_BASE_URL}/resnum?choiceOne=${choiceOne}`)
        .then((response) => response.json())
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => console.log("error", error));
    }
    if (choiceTwo && value) {
      const result = allData.filter((subject) =>
        subject.RESNUM.toString().toLowerCase().includes(value)
      );
      if (result.length > 0) {
        setData(result);
      }
    }
  };

  /****  Pagination  ****/
  function handleChange(page) {
    fetch(`${process.env.REACT_APP_BASE_URL}/resnum?page=${page}&limit=10`)
      .then((response) => response.json())
      .then((result) => {
        setPage(result);
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <Space direction="vertical" size={12}>
          <RangePicker
            style={{ width: 220 }}
            onChange={(values) => {
              setDates(
                values.map((item) => {
                  return moment(item.$d).format("YYYY-MM-DD");
                })
              );
            }}
          />
        </Space>
        <Select
          defaultValue={{
            value: "ALL",
            label: "Бүгд",
          }}
          style={{
            width: 300,
            margin: "0 0 0 5px",
          }}
          onChange={handlerBtnOne}
          options={[
            {
              value: "ALL",
              label: "Бүгд",
            },
            {
              value: "A",
              label: "Ашиглаж байгаа",
            },
            {
              value: "R",
              label: "Захиалга өгсөн",
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
      <table>
        <tbody>
          <tr>
            <th style={{ paddingLeft: " 16px" }}>Id</th>
            <th>
              <span className="b1">Created_at</span>
            </th>
            {/* {data && data[0].EXPIRES_AT ? (
              <th>
                <span className="b1">expires_at</span>
              </th>
            ) : (
              ""
            )} */}

            <th>
              <span className="b1">Resnum</span>
            </th>
            <th>
              <span className="b1">Pid</span>
            </th>
            <th>
              <span className="b1">Email</span>
            </th>
            <th>
              <span className="b1">Place</span>
            </th>
            <th>
              <span className="b1">Status</span>
            </th>
          </tr>
          {data &&
            data?.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.CREATED_AT}</td>
                  {e.EXPIRES_AT ? <td>{e.EXPIRES_AT}</td> : ""}
                  <td>{e.RESNUM}</td>
                  <td>{e.PID}</td>
                  <td>{e.EMAIL}</td>
                  <td>{e.PLACE}</td>
                  <td
                    style={
                      e.STATUS === "A"
                        ? { backgroundColor: "green" }
                        : e.STATUS === "T"
                        ? { backgroundColor: "blue" }
                        : e.STATUS === "R"
                        ? { backgroundColor: "orange" }
                        : { backgroundColor: "red" }
                    }
                  >
                    {e.STATUS === "A"
                      ? "Ашиглаж байгаа"
                      : e.STATUS === "R"
                      ? "Захиалга өгсөн"
                      : e.STATUS === "T"
                      ? "Зарагдахад бэлэн"
                      : "статус E"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        <Pagination
          pageSize={1}
          current={page?.currentPageSize}
          total={page?.totalPages}
          onChange={handleChange}
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        />
      </div>
    </div>
  );
}

export default ResnumFilter;
