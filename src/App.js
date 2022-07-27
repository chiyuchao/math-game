import React from "react";
import "./App.css";
import ButtonAppBar from "./AppComponent/ButtonAppBar";
import Appbody from "./AppComponent/AppBody";
import LevelSelect from "./AppComponent/LevelSelect";
import ErrorPage from "./AppComponent/ErrorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <HashRouter>
      <div className="App">
        <ButtonAppBar />
        <Routes>
          <Route exact path="/" element={<LevelSelect />}></Route>
          <Route path="/level-select/:id/:userid" element={<Appbody />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
