import React, { Component, useState } from "react";
import News from "./news/News";
import Tinycme from "./Tinycme";
import Draft from "./Draft";

function App() {
  return (
    <div className="App">
      <News />
      <Tinycme />
    </div>
  );
}

export default App;
