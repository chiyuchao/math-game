import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CheckIcon from "@mui/icons-material/Check";
import KeyIcon from "@mui/icons-material/Key";
import Calculator from "../Services/Calculator";
import CorrectSound from "../Assets/correctSound.wav";
import FailureSound from "../Assets/failureSound.wav";
import { Link, animateScroll as scroll } from "react-scroll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Paper from "@mui/material/Paper";
import ScrollIntoView from "react-scroll-into-view";
import Stages from "../questionBase";
import { useParams } from "react-router-dom";
import { ProductionQuantityLimits } from "@mui/icons-material";
import questionBase from "../questionBase";
import toast from "react-hot-toast";

const summittedRecordShow = new Set();
const summittedRecord = new Set();
const Appbody = () => {
  const { id } = useParams();
  const levelCreated = questionBase.data.length;
  if (id > levelCreated) {
    return (window.location.href = "/NewLevelPage");
  }
  const level = questionBase.data.find((level) => level.id === id);
  const { difficulty, question } = level;
  //console.log(question);
  const gd = question;

  const [ansList, setAnsList] = useState(Array(gd.length).fill(" "));
  const [count, setCount] = useState(0);
  const [inputIndex, setInputIndex] = useState("");
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [inputC, setInputC] = useState("");
  const [textfieldColorA, setTextfieldColorA] = useState("white");
  const [textfieldColorB, setTextfieldColorB] = useState("white");
  const [textfieldColorC, setTextfieldColorC] = useState("white");
  const [keyIconColor, setKeyIconColor] = useState("Gray");
  const [sumittedRecordTableRows, setSumittedRecordTableRows] = useState([]);

  const textfieldOnClick = (inputInd) => {
    if (inputInd === inputIndex) {
      setInputIndex("");
    }
    setInputIndex(inputInd);
    switch (inputInd) {
      case "A":
        setTextfieldColorA("#BEBEBE");
        setTextfieldColorB("white");
        setTextfieldColorC("white");
        break;
      case "B":
        setTextfieldColorA("white");
        setTextfieldColorB("#BEBEBE");
        setTextfieldColorC("white");
        break;
      case "C":
        setTextfieldColorA("white");
        setTextfieldColorB("white");
        setTextfieldColorC("#BEBEBE");
        break;
    }
  };
  const numberButtonOnClick = (inputNumber) => {
    if (!inputIndex) {
      return;
    }
    if (inputIndex === "A") {
      if (inputA === "") {
        const newValue = inputNumber;
        setInputA(newValue);
      } else {
        const newValue = String(inputA) + String(inputNumber);
        setInputA(parseInt(newValue, 10));
      }
    }
    if (inputIndex === "B") {
      if (inputA === "") {
        const newValue = inputNumber;
        setInputB(parseInt(newValue, 10));
      } else {
        const newValue = String(inputB) + String(inputNumber);
        setInputB(parseInt(newValue, 10));
      }
    }
    if (inputIndex === "C") {
      if (inputA === "") {
        const newValue = inputNumber;
        setInputC(parseInt(newValue, 10));
      } else {
        const newValue = String(inputC) + String(inputNumber);
        setInputC(parseInt(newValue, 10));
      }
    }
  };
  const backspaceButtonOnClick = () => {
    if (!inputIndex) {
      return;
    }
    if (inputIndex === "A") {
      setInputA(parseInt(inputA / 10) ? parseInt(inputA / 10) : "");
    }
    if (inputIndex === "B") {
      setInputB(parseInt(inputB / 10) ? parseInt(inputB / 10) : "");
    }
    if (inputIndex === "C") {
      setInputC(parseInt(inputC / 10) ? parseInt(inputC / 10) : "");
    }
  };
  const minusButtonOnclick = () => {
    if (!inputIndex) {
      return;
    }
    if (inputIndex === "A") {
      if (inputA === "") {
        setInputA("-");
      }
    }

    if (inputIndex === "B") {
      if (inputB === "") {
        setInputB("-");
      }
    }
    if (inputIndex === "C") {
      if (inputC === "") {
        setInputC("-");
      }
    }
  };

  const submitButtonOnclick = () => {
    if (!inputA && !inputB && !inputC) {
      return;
    }
    let data = [...ansList];
    let currentSummittedAnswer =
      String(inputA) + "," + String(inputB) + "," + String(inputC);

    if (summittedRecord.has(currentSummittedAnswer)) {
      alert("重複");
      return;
    }

    if (Calculator.calculatorMethod(gd, inputA, inputB) === parseInt(inputC)) {
      summittedRecord.add(currentSummittedAnswer);
      summittedRecordShow.add(currentSummittedAnswer + ",O");
      data[count] = gd[count];
      setCount(count + 1);
      setAnsList(data);
      setKeyIconColor("Gold");
      new Audio(CorrectSound).play();
      console.log(count);
      console.log(gd.length);

      if (count + 1 === gd.length) {
        alert("過關");
        window.location.href = `/level-select/${parseInt(id) + 1}`;
        return;
      }
    } else {
      let correctAnswer = Calculator.calculatorMethod(gd, inputA, inputB);
      summittedRecord.add(inputA + "," + inputB + "," + correctAnswer);
      summittedRecord.add(currentSummittedAnswer);
      console.log(summittedRecord);
      summittedRecordShow.add(
        currentSummittedAnswer + ",X " + " C = " + correctAnswer
      );
      setKeyIconColor("Gray");
      new Audio(FailureSound).play();
    }
    //console.log(summittedRecordShow);
    setInputA("");
    setInputB("");
    setInputC("");
    let no = 1;
    for (let item of summittedRecordShow) {
      item = item.split(",");
      setSumittedRecordTableRows(
        sumittedRecordTableRows.concat([
          createSubmittedRecordTable(no, item[0], item[1], item[2], item[3]),
        ])
      );
      no += 1;
    }
  };

  const createSubmittedRecordTable = (no, A, B, C, results) => {
    return { no, A, B, C, results };
  };

  return (
    <div>
      <section style={{ height: "90vh" }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "15vh" }}
        >
          <Typography variant="h5">C =</Typography>
          {ansList.map((value) => {
            return (
              <Box
                sx={{
                  border: 1,
                  borderColor: "grey.500",
                  width: "30px",
                  height: "40px",
                }}
              >
                <Typography variant="h5">{value}</Typography>
              </Box>
            );
          })}
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "20vh" }}
        >
          <Grid>
            <Grid container item alignItems="center" justifyContent="center">
              <Typography>A</Typography>
              <TextField
                disabled
                style={{ width: "100px", backgroundColor: textfieldColorA }}
                variant="standard"
                value={inputA}
                onClick={() => {
                  textfieldOnClick("A");
                }}
              />
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              justifyContent="center"
              sx={{ py: 1.5 }}
            >
              <Typography>B</Typography>
              <TextField
                disabled
                style={{ width: "100px", backgroundColor: textfieldColorB }}
                variant="standard"
                value={inputB}
                onClick={() => {
                  textfieldOnClick("B");
                }}
              />
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              justifyContent="center"
              sx={{ ml: 1.5 }}
            >
              <Typography>C</Typography>
              <TextField
                disabled
                style={{ width: "100px", backgroundColor: textfieldColorC }}
                variant="standard"
                value={inputC}
                onClick={() => {
                  textfieldOnClick("C");
                }}
              />

              <KeyIcon alignItems="flex-end" sx={{ color: keyIconColor }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "80px" }}
        >
          <Button variant="outlined" onClick={submitButtonOnclick}>
            <CheckIcon />
            Summit
          </Button>
        </Grid>

        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: "150px" }}
        >
          <Grid item justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => {
                numberButtonOnClick(1);
              }}
            >
              1
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                numberButtonOnClick(2);
              }}
            >
              2
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                numberButtonOnClick(3);
              }}
            >
              3
            </Button>
          </Grid>
          <Grid item justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => {
                numberButtonOnClick(4);
              }}
            >
              4
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                numberButtonOnClick(5);
              }}
            >
              5
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                numberButtonOnClick(6);
              }}
            >
              6
            </Button>
          </Grid>
          <Grid item justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => {
                numberButtonOnClick(7);
              }}
            >
              7
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                numberButtonOnClick(8);
              }}
            >
              8
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                numberButtonOnClick(9);
              }}
            >
              9
            </Button>
          </Grid>
          <Grid item justifyContent="center">
            <Button variant="outlined" onClick={backspaceButtonOnClick}>
              <BackspaceIcon />
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                numberButtonOnClick(0);
              }}
            >
              0
            </Button>

            <Button variant="outlined" onClick={minusButtonOnclick}>
              (-)
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "10vh" }}
          mt={2}
        >
          <Link
            activeClass="active"
            to="summittedRecord"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Button variant="outlined">
              <ArrowDownwardIcon />
              Sumitted Record
            </Button>
          </Link>
        </Grid>
      </section>
      <section id="summittedRecord">
        <Grid container alignItems="center" justifyContent="center">
          <TableContainer style={{ width: "350px" }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "30px" }} align="center">
                    No.
                  </TableCell>
                  <TableCell align="center">A</TableCell>
                  <TableCell align="center">B</TableCell>
                  <TableCell align="center">C</TableCell>
                  <TableCell align="center">Results</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sumittedRecordTableRows.map((row) => (
                  <TableRow
                    key={row.no}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.no}
                    </TableCell>
                    <TableCell align="center">{row.A}</TableCell>
                    <TableCell align="center">{row.B}</TableCell>
                    <TableCell align="center">{row.C}</TableCell>
                    <TableCell align="center">{row.results}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </section>
    </div>
  );
};

export default Appbody;
