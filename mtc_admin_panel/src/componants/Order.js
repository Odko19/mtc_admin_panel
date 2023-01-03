import React, { useState, useEffect } from "react";
import { Input, Pagination, DatePicker, Space } from "antd";
import moment from "moment";
import "../styles/resnum.css";

function Order() {
  const [data, setData] = useState();
  const [allData, setAllData] = useState();
  const [page, setPage] = useState();
  const { Search } = Input;

  console.log(allData);
  /****  Default all data  ****/
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/order?page=1&limit=6`)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        setPage(result);
      })
      .catch((error) => console.log("error", error));
    fetch(`${process.env.REACT_APP_BASE_URL}/order?all=all`)
      .then((response) => response.json())
      .then((result) => {
        setAllData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  /****  Search  filter ****/
  const onSearch = (value) => {
    console.log(value);
    const result = allData.filter((subject) => {
      let fullName =
        subject.FIRST_NAME.toLowerCase() + subject.LAST_NAME.toLowerCase();
      console.log(fullName);
    });
  };

  /****  Pagination  ****/
  function handleChange(page) {
    fetch(`${process.env.REACT_APP_BASE_URL}/order?page=${page}&limit=6`)
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
        <Search onSearch={onSearch} />
      </div>
      <table>
        <tbody>
          <tr>
            <th style={{ paddingLeft: " 16px" }}>
              LAST_NAME <br /> FIRST_NAME
            </th>
            <th>
              <span className="b1">MOBILE</span>
            </th>
            <th>
              <span className="b1">EMAIL</span>
            </th>
            <th>
              <span className="b1">CUST_TYPE</span>
            </th>
            <th>
              <span className="b1">SERVICE</span>
            </th>
            <th>
              <span className="b1">CREATED_AT</span>
            </th>

            <th>
              <span className="b1">ADDRESS</span>
            </th>
            <th>
              <span className="b1">ADDITIONAL</span>
            </th>
            <th>
              <span className="b1">RESULT</span>
            </th>
          </tr>
          {data?.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  {e.LAST_NAME} {e.FIRST_NAME}
                </td>

                <td>{e.MOBILE}</td>
                <td>{e.EMAIL}</td>
                <td>{e.CUST_TYPE}</td>
                <td>{e.SERVICE}</td>
                <td style={{ width: "150px" }}>
                  {moment(e.CREATED_AT).format("YYYY-MM-DD")}
                </td>
                <td style={{ width: "300px" }}>
                  {e.CITY} {e.DISTRICT} {e.KHOROO} {e.ENTRACE} {e.APARTMENT}
                  {e.DOOR}
                </td>
                <td>{e.ADDITIONAL}</td>
                <td style={{ width: "100px" }}>{e.RESULT}</td>
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

export default Order;
