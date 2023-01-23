import React, { Component, useState, useRef, useEffect } from "react";

function Chat() {
  const [data, setData] = useState();
  console.log(data);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3001/v1/workplace?workplace_id=20", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }, []);

  function handlerBtn(e) {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("file", e.target.file.files[0]);
    formdata.append("id", 26);
    formdata.append("firstname", "odko");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/workplace/cv`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <div>
      <form onSubmit={handlerBtn}>
        <input type="file" name="file" />
        <button type="submit">send</button>
      </form>
      <div>
        {/* {data?.map((e) => {
          return (
            <a
              href={`http://localhost:3001/v1/uploads/${e.cv_name}`}
              target="_blank"
            >
              <p>{e.cv_name}</p>
            </a>
          );
        })} */}
      </div>
    </div>
  );
}

export default Chat;
