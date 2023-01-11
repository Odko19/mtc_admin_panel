import React, { useState, useEffect } from "react";
import { Input, Pagination, Checkbox, Modal } from "antd";
import "../styles/resnum.css";

function Order() {
  const [data, setData] = useState();
  const [allData, setAllData] = useState();
  const [page, setPage] = useState();
  const { Search } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState();
  console.log(data);
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
  const [checkValue, setCheckValue] = useState();
  const [checkState, setCheckState] = useState();

  const onChange = (e) => {
    setCheckValue(e.target.value);
    setCheckState(e.target.checked);
  };

  const handleOk = (e) => {
    if (e.RESULT === null) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        ID: e.ID,
        OPERATOR_ID: 1,
        OPERATOR_STATUS: 1,
      });
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch(`${process.env.REACT_APP_BASE_URL}/order`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function handleBtnEdit(e) {
    setDataModal(e);
    setIsModalOpen(true);
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
              <span className="b1">ADDRESS</span>
            </th>

            <th>
              <span className="b1">OPERATOR_STATUS</span>
            </th>
            <th>
              <span className="b1">EDIT</span>
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

                <td style={{ width: "300px" }}>
                  {e.CITY} {e.DISTRICT} {e.KHOROO} {e.ENTRACE} {e.APARTMENT}
                  {e.DOOR}
                </td>
                <td style={{ width: "100px" }}>{e.OPERATOR_STATUS}</td>
                <td style={{ width: "100px" }}>
                  <button onClick={() => handleBtnEdit(e)}>edit</button>
                </td>
                {/* <td>
                  <Checkbox onClick={() => onClickId(e.ID)}>Checkbox</Checkbox>
                </td> */}
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
      {dataModal ? (
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={() => handleOk(dataModal)}
          onCancel={handleCancel}
        >
          <p>FIRST_NAME : {dataModal.FIRST_NAME}</p>
          <p>LAST_NAME : {dataModal.LAST_NAME}</p>
          <p>MOBILE : {dataModal.MOBILE}</p>
          <p>EMAIL : {dataModal.EMAIL}</p>
          <p>CUST_TYPE : {dataModal.CUST_TYPE}</p>
          <p>SERVICE : {dataModal.SERVICE}</p>
          <p>RESULT : {dataModal.RESULT}</p>

          <>
            {dataModal.RESULT === null ? (
              <Checkbox
                onChange={onChange}
                checked={checkValue === dataModal.ID ? checkState : false}
                value={dataModal.ID}
              >
                {checkState === true && checkValue === dataModal.ID
                  ? "захиалага биелэсэн"
                  : "захиалага биелээгүй"}
              </Checkbox>
            ) : (
              <Checkbox checked={true}>захиалага биелэсэн</Checkbox>
            )}
          </>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default Order;
