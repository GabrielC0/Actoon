import React, { useState } from "react";
import "./App.css";
import AlgoMowers from "./AlgoMowers";

function App() {
  return (
    <div className="App">
        <AlgoMowers />
      <div className="Jardin" id="Jardin">
      </div>
    </div>
  );
}

export default App;
