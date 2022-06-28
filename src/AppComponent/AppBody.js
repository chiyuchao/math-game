import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Slide,
  Dialog,
  SpeedDial,
  Modal,
  Snackbar,
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
import GameClearanceSound from "../Assets/gameClearanceSound.wav";
import { Link, animateScroll as scroll } from "react-scroll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { ProductionQuantityLimits } from "@mui/icons-material";
import questionBase from "../questionBase";
import NewLevelPopUp from "./NewLevelPopUp";
import { SpeedDialIcon } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { TransitionProps } from "@mui/material/transitions";

const summittedRecordShow = new Set();
const summittedRecord = new Set();
const Appbody = () => {
  const { id } = useParams();
  const levelCreated = questionBase.data.length;
  const level = questionBase.data.find((level) => level.id === id);
  const { difficulty, question } = level;

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
  const [newLevelDialogueOpen, setnewLevelDialogueOpen] = useState(false);
  const handleClickOpen = () => {
    setnewLevelDialogueOpen(true);
  };

  const handleNewLevelDialogueClose = () => {
    setnewLevelDialogueOpen(false);
  };
  const [duplicateSnackbarOpen, setduplicateSnackbarOpen] = useState(false);
  const handleDuplicateSnackbarOpen = () => {
    setduplicateSnackbarOpen(true);
  };

  const handleduplicateSnackbarClose = () => {
    setduplicateSnackbarOpen(false);
  };
  const [hidden, setHidden] = useState(true);
  const navigate = useNavigate();
  const NextLevelButtonOnClick = useCallback(
    () => navigate(`/level-select/${parseInt(id) + 1}`, { replace: true }),
    [navigate]
  );
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>,
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
    if (inputA.length === 0 || inputB.length === 0 || inputC.length === 0) {
      return;
    }
    let data = [...ansList];
    let currentSummittedAnswer =
      String(inputA) + "," + String(inputB) + "," + String(inputC);

    if (summittedRecord.has(currentSummittedAnswer)) {
      setduplicateSnackbarOpen(true);
      return;
    }

    if (Calculator.calculatorMethod(gd, inputA, inputB) === parseInt(inputC)) {
      summittedRecord.add(currentSummittedAnswer);
      summittedRecordShow.add(currentSummittedAnswer + ",正確");
      data[count] = gd[count];
      setCount(count + 1);
      setAnsList(data);
      setKeyIconColor("Gold");
      new Audio(CorrectSound).play();
      console.log(count);
      console.log(gd.length);

      if (count + 1 === gd.length) {
        setTimeout(() => {}, 1000);
        new Audio(GameClearanceSound).play();
        setHidden(false);
        return;
      }
    } else {
      let correctAnswer = Calculator.calculatorMethod(gd, inputA, inputB);
      summittedRecord.add(inputA + "," + inputB + "," + correctAnswer);
      summittedRecord.add(currentSummittedAnswer);
      console.log(summittedRecord);
      summittedRecordShow.add(
        currentSummittedAnswer + ",錯誤 " + " C = " + correctAnswer
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

  const NextLevelButton = () => {
    if (id === String(levelCreated)) {
      setnewLevelDialogueOpen(true);
      return;
    } else {
      window.location.href = `#/level-select/${parseInt(id) + 1}`;
      window.location.reload();
    }
  };

  return (
    <div>
      <SpeedDial
        FabProps={{ size: "medium", style: { backgroundColor: "#509993" } }}
        type="reset"
        hidden={hidden}
        onClick={NextLevelButton}
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<ArrowForwardIcon />}
      ></SpeedDial>
      <Dialog
        open={newLevelDialogueOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleNewLevelDialogueClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"未完待續..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            新的關卡正在開發中!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewLevelDialogueClose}>確定</Button>
          <Button
            onClick={() => {
              window.location.href = "/level-select/";
            }}
          >
            回首頁
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={duplicateSnackbarOpen}
        onClose={handleduplicateSnackbarClose}
        message="這組答案已經輸入過了!"
        autoHideDuration="2000"
      />
      <section style={{ height: "90vh",}}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "15vh" }}
        >
          <Typography  className="hexagon" variant="h5" color="#523D42">
            C
          </Typography>
          <Typography className="hexagon" variant="h5" color="#523D42">
            =
          </Typography>
          {ansList.map((value) => {
            return (
                <Typography className="hexagon" variant="h5">{value}</Typography>
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
              <Typography color="#523D42" className="hexagonIpuntLeft1">
                A
              </Typography>
              <TextField
                disabled
                className="hexagonIpuntRight1"
                variant='standard'
                value={inputA}
                InputProps={{ disableUnderline: true }}
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
              <Typography color="#523D42" className="hexagonIpuntLeft2">
                B
              </Typography>
              <TextField
                disabled
                className="hexagonIpuntRight2"
                variant="standard"
                value={inputB}
                InputProps={{ disableUnderline: true }}
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
              <Typography className="hexagonIpuntLeft3" color="#523D42" >
                C
              </Typography>
              <TextField
                disabled
                variant="standard"
                className="hexagonIpuntRight3"
                value={inputC}
                InputProps={{ disableUnderline: true }}
                onClick={() => {
                  textfieldOnClick("C");
                }}
              />

              <KeyIcon alignItems="flex-end" sx={{ color: keyIconColor }} />
            </Grid>
          </Grid>
        </Grid>
        <br/>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "80px" }}
        >
          <Button
            className="submitBtn"
            sx={{ color: '#523D42' }}
            onClick={submitButtonOnclick}
          >
            Submit
          </Button>
        </Grid>

        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: "200px" }}
        >
          <Grid item justifyContent="center">
            <Button
              className="hexagonBtn"
              sx={{ color: '#523D42' }}
              onClick={() => {
                numberButtonOnClick(1);
              }}
            >
              1
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: '#523D42' }}
              onClick={() => {
                numberButtonOnClick(2);
              }}
            >
              2
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: '#523D42' }}
              onClick={() => {
                numberButtonOnClick(3);
              }}
            >
              3
            </Button>
          </Grid>
          <Grid item justifyContent="center">
            <Button
              className="hexagonBtn"
              sx={{ color: '#523D42' }}
              onClick={() => {
                numberButtonOnClick(4);
              }}
            >
              4
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: '#523D42' }}
              onClick={() => {
                numberButtonOnClick(5);
              }}
            >
              5
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: '#523D42' }}
              onClick={() => {
                numberButtonOnClick(6);
              }}
            >
              6
            </Button>
          </Grid>
          <Grid item justifyContent="center">
            <Button
              className="hexagonBtn"
              sx={{ color: '#523D42' }}
              onClick={() => {
                numberButtonOnClick(7);
              }}
            >
              7
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: '#523D42' }}
              onClick={() => {
                numberButtonOnClick(8);
              }}
            >
              8
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: '#523D42' }}
              onClick={() => {
                numberButtonOnClick(9);
              }}
            >
              9
            </Button>
          </Grid>
          <Grid item justifyContent="center">
            <Button className="hexagonBtn" sx={{ color: '#523D42' }} onClick={backspaceButtonOnClick}>
              <BackspaceIcon />
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: '#523D42' }}
              onClick={() => {
                numberButtonOnClick(0);
              }}
            >
              0
            </Button>

            <Button className="hexagonBtn" sx={{ color: '#523D42' }} onClick={minusButtonOnclick}>
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
            <Button
              sx={{  color: "white" }}
              className="recordBtn"
            >
              <ArrowDownwardIcon />
             Record
            </Button>
          </Link>
        </Grid>
      </section>
      <br/>
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
      <Popup showPopup={id === "1"}></Popup>
    </div>
  );
};

export default Appbody;
