import React from "react";
import "./App.css";
import ButtonAppBar from "./AppComponent/ButtonAppBar";
import Appbody from "./AppComponent/AppBody";
const App = () => {
  return (
    <div className="App">
      <div>
        <ButtonAppBar />
      </div>
      <div>
        <Appbody />
      </div>
    </div>
  );
};

export default App;
