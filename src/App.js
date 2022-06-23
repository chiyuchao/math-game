import React from "react";
import "./App.css";
import ButtonAppBar from "./AppComponent/ButtonAppBar";
import Appbody from "./AppComponent/AppBody";
import LevelSelect from "./AppComponent/LevelSelect";
import ErrorPage from "./AppComponent/ErrorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { KeyboardReturnSharp } from "@mui/icons-material";
import NewLevelPage from "./AppComponent/NewLevelPopUp";
const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <ButtonAppBar />
        <Routes>
          <Route exact path="/" element={<LevelSelect />}></Route>
          <Route path="/level-select/:id" element={<Appbody />}></Route>
          <Route path="/NewLevelPage" element={<NewLevelPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
