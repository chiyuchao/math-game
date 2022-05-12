import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CheckIcon from "@mui/icons-material/Check";
import KeyIcon from "@mui/icons-material/Key";
import Calculator from "../Services/Calculator";

const gd = [3, "A", "+", 2, "B", "-", 7];
let summitRecord = new Set();

const Appbody = () => {
  const [ansList, setAnsList] = useState(Array(gd.length).fill(" "));
  const [count, setCount] = useState(0);
  const [inputIndex, setInputIndex] = useState("");
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [inputC, setInputC] = useState("");
  const [textfieldColorA, setTextfieldColorA] = useState("white");
  const [textfieldColorB, setTextfieldColorB] = useState("white");
  const [textfieldColorC, setTextfieldColorC] = useState("white");
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
      const newValue = inputA ? 10 * inputA + inputNumber : inputNumber;
      setInputA(newValue);
    }
    if (inputIndex === "B") {
      const newValue = inputB ? 10 * inputB + inputNumber : inputNumber;
      setInputB(newValue);
    }
    if (inputIndex === "C") {
      const newValue = inputC ? 10 * inputC + inputNumber : inputNumber;
      setInputC(newValue);
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
      const newValue = Math.abs(inputA);
      setInputA(newValue);
    }

    if (inputIndex === "B") {
      const newValue = Math.abs(inputB);
      setInputB(newValue);
    }
    if (inputIndex === "C") {
      const newValue = Math.abs(parseInt(inputC));
      setInputC(newValue);
    }
  };

  const submitButtonOnclick = () => {
    let data = [...ansList];

    if (Calculator.calculatorMethod(gd, inputA, inputB, inputC) === true) {
      let summitABC = { A: inputA, B: inputB, C: inputC };
      console.log(summitRecord);
      if (!summitRecord.has(summitABC)) {
        summitRecord.add(summitABC);
        console.log(summitRecord);
        data[count] = gd[count];
        if (count >= gd.length) {
          return;
        }
        setCount(count + 1);
        setAnsList(data);
        alert("correct");
      }
    } else {
      alert("false");
    }
  };

  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ height: "100px" }}
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
        style={{ height: "150px" }}
      >
        <Grid>
          <Grid container item alignItems="center" justifyContent="flex-start">
            <Typography>A</Typography>
            <TextField
              disabled
              style={{ backgroundColor: textfieldColorA }}
              variant="standard"
              value={inputA}
              onClick={() => {
                textfieldOnClick("A");
              }}
            />
          </Grid>
          <Grid container item alignItems="center" justifyContent="flex-start">
            <Typography>B</Typography>
            <TextField
              disabled
              style={{ backgroundColor: textfieldColorB }}
              variant="standard"
              value={inputB}
              onClick={() => {
                textfieldOnClick("B");
              }}
            />
          </Grid>
          <Grid container item alignItems="center" justifyContent="flex-start">
            <Typography>C</Typography>
            <TextField
              disabled
              style={{ backgroundColor: textfieldColorC }}
              variant="standard"
              value={inputC}
              onClick={() => {
                textfieldOnClick("C");
              }}
            />
            <KeyIcon />
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{ height: "50px" }}>
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
    </div>
  );
};

export default Appbody;
