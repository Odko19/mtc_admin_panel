import { useState } from "react";
import TextEditor from "./componants/TextEditor";
import Main from "./componants/Main";

function App() {
  const [data, setDate] = useState();

  return (
    <div className="main">
      {/* <Content />
      <TextEditor /> */}
      <Main />
    </div>
  );
}

export default App;
