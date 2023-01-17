import io from "socket.io-client";
import { useState } from "react";

function App() {
  const socket = io.connect("http://localhost:3008");

  function handleBtn(e) {
    e.preventDefault();
    console.log(e.target.username.value);
    console.log(e.target.email.value);
    socket.emit("add-user", 1);
  }
  return (
    <div className="App">
      <form
        onSubmit={handleBtn}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <input type="text" name="username" placeholder="Name" />
        <input type="email" name="email" placeholder="Gmail" />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default App;
