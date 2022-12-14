import React, { useState, useEffect } from "react";
import { Input, Select, Pagination, DatePicker, Space } from "antd";
import moment from "moment";
import "../styles/resnum.css";

function Resnum() {
  const [data, setData] = useState();
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
  console.log(dates);

  const handlerBtnOne = (value) => {
    setChoiceOne(value);
  };
  const handlerBtnTwo = (value) => {
    setChoiceTwo(value);
  };

  /****  Search  ****/
  // const onSearch = (value) => {
  //   let result;
  //   if (
  //     (choiceOne === "A" && choiceTwo === "RESNUM") ||
  //     (choiceOne === "R" && choiceTwo === "RESNUM") ||
  //     (choiceOne === "E" && choiceTwo === "RESNUM") ||
  //     (choiceOne === "T" && choiceTwo === "RESNUM")
  //   ) {
  //     fetch(
  //       `${process.env.REACT_APP_BASE_URL}/resnum?choiceOne=${choiceOne}&choiceTwo=${choiceTwo}`
  //     )
  //       .then((response) => response.json())
  //       .then((result) => setData(result.data))
  //       .catch((error) => console.log("error", error));
  //   }
  //   if (
  //     (choiceOne === "A" && value) ||
  //     (choiceOne === "T" && value) ||
  //     (choiceOne === "R" && value) ||
  //     (choiceOne === "E" && value)
  //   ) {
  //     fetch(
  //       `${process.env.REACT_APP_BASE_URL}/resnum?choiceOne=${choiceOne}&value=${value}`
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         if (result.data.length > 0) {
  //           setData(result.data);
  //         } else {
  //           fetch(`${process.env.REACT_APP_BASE_URL}/resnum?number=${value}`)
  //             .then((response) => response.json())
  //             .then((result) => {
  //               setData(result.data);
  //             })
  //             .catch((error) => console.log("error", error));
  //         }
  //       })
  //       .catch((error) => console.log("error", error));
  //   }
  //   if (dates && value) {
  //     fetch(
  //       `${process.env.REACT_APP_BASE_URL}/resnum?date1=${dates[0]}&date2=${dates[1]}&value=${value}`
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setData(result.data);
  //       })
  //       .catch((error) => console.log("error", error));
  //   } else if (dates) {
  //     fetch(
  //       `${process.env.REACT_APP_BASE_URL}/resnum?date1=${dates[0]}&date2=${dates[1]}`
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setData(result.data);
  //       })
  //       .catch((error) => console.log("error", error));
  //   }

  //   // if (choiceTwo === "RESNUM") {
  //   //   result = allData.filter((subject) =>
  //   //     subject.RESNUM.toString().toLowerCase().includes(value)
  //   //   );
  //   //   if (result.length > 0) {
  //   //     setData(result);
  //   //   } else {
  //   //     fetch(`${process.env.REACT_APP_BASE_URL}/resnum?number=${value}`)
  //   //       .then((response) => response.json())
  //   //       .then((result) => {
  //   //         setData(result.data);
  //   //       })
  //   //       .catch((error) => console.log("error", error));
  //   //   }
  //   // } else if (choiceTwo === "PID" || choiceTwo === "EMAIL") {
  //   //   fetch(
  //   //     `${process.env.REACT_APP_BASE_URL}/resnum?choiceTwo=${choiceTwo}&value=${value}`
  //   //   )
  //   //     .then((response) => response.json())
  //   //     .then((result) => {
  //   //       setData(result.data);
  //   //     })
  //   //     .catch((error) => console.log("error", error));
  //   // }
  // };

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
            value: "all",
            label: "????????",
          }}
          style={{
            width: 300,
            margin: "0 0 0 5px",
          }}
          onChange={handlerBtnOne}
          options={[
            {
              value: "all",
              label: "????????",
            },
            {
              value: "A",
              label: "?????????????? ????????????",
            },
            {
              value: "R",
              label: "???????????????? ??????????",
            },
            // {
            //   value: "T",
            //   label: "???????????????????? ??????????",
            // },
            // {
            //   value: "E",
            //   label: "E",
            // },
          ]}
        />
        <Select
          defaultValue={{
            value: "RESNUM",
            label: "???????????? ????????????",
          }}
          style={{
            width: 200,
            margin: "0 5px 0 5px",
          }}
          onChange={handlerBtnTwo}
          options={[
            {
              value: "RESNUM",
              label: "???????????? ????????????",
            },
            {
              value: "PID",
              label: "?????????????????????? ????????????",
            },
            {
              value: "EMAIL",
              label: "?????????? ??????????????",
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
            {data && data[0].EXPIRES_AT ? (
              <th>
                <span className="b1">expires_at</span>
              </th>
            ) : (
              ""
            )}

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
          {data?.map((e, i) => {
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
                    ? "?????????????? ????????????"
                    : e.STATUS === "R"
                    ? "???????????????? ??????????"
                    : e.STATUS === "T"
                    ? "???????????????????? ??????????"
                    : "???????????? E"}
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

export default Resnum;
