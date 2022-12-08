import { useState } from "react";
import TextEditor from "./componants/TextEditor";
import Content from "./componants/Content";

function App() {
  const [data, setDate] = useState();

  return (
    <div className="App">
      <Content />
      {/* <TextEditor /> */}
    </div>
  );
}

export default App;
