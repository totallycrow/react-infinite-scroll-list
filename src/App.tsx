import React, { useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";

import InfiniteLoadList from "./components/InfiniteLoadList";
const sampleDataSet = Array.from(Array(300).keys());
function App() {
  const sampleData = useMemo(() => sampleDataSet, []);

  return (
    <div>
      <h1>Inifite Load</h1>
      <div>
        <InfiniteLoadList data={sampleData} chunkSize={100} />
      </div>
    </div>
  );
}

export default App;
