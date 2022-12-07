import { useState } from "react";
import TextEditor from "./componants/TextEditor";

function App() {
  const [data, setDate] = useState();

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:3001/v1/news", requestOptions)
    .then((response) => response.text())
    .then((result) => setDate(JSON.parse(result).data))
    .catch((error) => console.log("error", error));
  return (
    <div className="App">
      <TextEditor />
    </div>
  );
}

export default App;
