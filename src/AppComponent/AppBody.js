import React, { useEffect, useState, useRef, useCallback } from "react";

import {
  Alert,
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
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import CheckIcon from "@mui/icons-material/Check";
import KeyIcon from "@mui/icons-material/Key";
import Calculator from "../Services/Calculator";
import Rest from "../Services/Rest";
import CorrectSound from "../Assets/correctSound.wav";
import FailureSound from "../Assets/failureSound.wav";
import HintSound from "../Assets/hintSound.wav";
import GameClearanceSound from "../Assets/gameClearanceSound.wav";
import { Link, animateScroll as scroll } from "react-scroll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Paper from "@mui/material/Paper";
import { useParams, useNavigate } from "react-router-dom";
import questionBase from "../questionBase";
import "intro.js/introjs.css";
import { Steps, Hints } from "intro.js-react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { positions } from "@mui/system";
import { Cookies, useCookies } from "react-cookie";
import { width } from "@mui/system";
import axios from "axios";
import { convertLength } from "@mui/material/styles/cssUtils";
import HelpIcon from "@mui/icons-material/Help";
import ButtonAppBar from "./ButtonAppBar";

const submittedRecordShow = new Set();
const submittedRecord = new Set();

let answerMap = new Map();
let indexValue = -1;
let rank = 0;
const Appbody = () => {
  const { id } = useParams();
  const { userid } = useParams();

  const [existingData, setExistingData] = useState([]);
  const [existingScore, setExistingScore] = useState(0);

  console.log(existingScore);

  const levelCreated = questionBase.data.length - 1;
  const level = questionBase.data.find((level) => level.id === id);

  const { difficulty, question } = level;
  const gd = question;
  const [ansList, setAnsList] = useState(Array(gd.length).fill(" "));

  const [count, setCount] = useState(0);
  const [inputIndex, setInputIndex] = useState("");
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [inputC, setInputC] = useState("");
  const [leaderBoardScore, setLeaderBoardScore] = useState(100);
  const [userRank, setUserRank] = useState(0);
  console.log(userRank);
  const [flaseAlert, setFalseAlertOpen] = useState(false);
  const [textfieldColorA, setTextfieldColorA] = useState("");
  const [textfieldColorB, setTextfieldColorB] = useState("");
  const [textfieldColorC, setTextfieldColorC] = useState("");
  const [keyIconColor, setKeyIconColor] = useState("Gray");
  // const [hintIconColor, setHintIconColor] = useState("Gray");
  const [submittedRecordTableRows, setSubmittedRecordTableRows] = useState([]);
  const [newLevelDialogueOpen, setnewLevelDialogueOpen] = useState(false);
  const [levelcompletedOpen, setLevelcompletedOpen] = useState(false);
  const [levelcompletedwithHintOpen, setLevelcompletedwithHintOpen] = useState(
    false
  );
  const [selectIndexModalOpen, setSelectIndexModalOpen] = useState(false);
  const [stepEnable, setStepEnable] = useState(true);

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
  const [hintButtondisabled, sethintButtondisabled] = useState(false);

  const [hintDialogOpen, setHintDialogOpen] = useState(false);
  const [hintButtonCount, setHintButtonCount] = useState(0);
  const [hintABCount, setHintABCount] = useState(0);
  const [hintAnyCount, setHintAnyCount] = useState(0);
  const [hintOneSetCount, setHintOneSetCount] = useState(0);
  const [hintABDisabled, setHintABDisabled] = useState(false);
  const [nameInputOpen, setNameInputOpen] = useState(false);
  const [nickName, setNickName] = useState("");
  const [nicknameBar, setNickNameBarOpen] = useState(false);
  const [restartOpen, setRestartOpen] = useState(false);
  //let rank = 0;

  const [cookies, setCookie, removeCookie] = useCookies(
    ["level"],
    ["userId"],
    ["hintAB"],
    ["hintAny"],
    ["hintOneSet"]
  );
  useEffect(() => {
    // const getLeaderBoard = async () => {
    //   const data = await axios
    //     .get("https://game.ntustmeg.tw/getMathGameLeaderBoard")
    //     .then((res) => {
    //       return res.data;
    //     })
    //     .catch((err) => console.log(err));
    //   setExistingData(data);
    //   // if (data.find((data) => data.userId === userid)) {
    //   //   setExistingScore(data.find((data) => data.userId === userid).userscore);
    //   // }
    // };
    const getLeaderBoard = async () => {
      const data = await axios
        .get("https://game.ntustmeg.tw/getMathGameLeaderBoard")
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));
      setExistingData(data);
    };
    getLeaderBoard();

    //setExistingScore(existingData.find((data) => data.userId === userid));

    setCookie("level", id, { path: "/" });
    setCookie("userId", userid, { path: "/" });
    if (cookies.hintAB === undefined) {
      setCookie("hintAB", 3, { path: "/" });
      setHintABCount(3);
      console.log(cookies.hintAB);
    } else {
      setHintABCount(cookies.hintAB);
      console.log(cookies.hintAB);
      if (cookies.hintAB <= 0) {
        setHintABDisabled(true);
      }
    }
    if (cookies.hintAny === undefined) {
      setCookie("hintAny", 3, { path: "/" });
      setHintAnyCount(3);
    } else {
      setHintAnyCount(cookies.hintAny);
    }
    if (cookies.hintOneSet === undefined) {
      setCookie("hintOneSet", 5, { path: "/" });
      setHintOneSetCount(5);
    } else {
      setHintOneSetCount(cookies.hintOneSet);
    }

    // setHintAnyCount(cookies.hintAny);
    // setHintOneSetCount(cookies.hintOneSet);
    answerMap = new Map(
      gd.map((value, index) => {
        return [index, value];
      })
    );
  }, []);

  useEffect(() => {
    if (existingData.length > 0) {
      if (existingData.find((data) => data.userId === userid)) {
        console.log("got it!");

        setExistingScore(
          existingData.find((data) => data.userId === userid).userScore
        );
        setUserRank(
          existingData
            .sort((a, b) => {
              return b.userScore - a.userScore;
            })
            .findIndex((data) => data.userId === userid)
        );
      }
    }
  }, [JSON.stringify(existingData)]);

  const steps = [
    {
      title: "Guess My Rule",
      intro: "Hello👋</br>這是一個需要你幫忙<b>破解密碼</b>的益智遊戲。",
    },
    {
      title: "遊戲目標",
      intro: "每一關的破關密碼都是一串有A,B,C三個未知數的方程式💁‍♀️",
    },

    {
      title: "遊戲目標",
      intro:
        "每輸入一組可以帶入這個方程式中成立的組合，就可以解開一格密碼，</br>將所有密碼格解開就可以進入下一關⏩",
    },
    {
      title: "遊戲目標",
      intro:
        "你可能可以從已經輸入過的答案中找出一些規律，去推測破關密碼的方程式👁‍🗨</br>挑戰用<b>最少組的正確解答</b>過關吧🎉",
    },
    {
      title: "遊戲導覽",
      element: "#password",
      intro:
        "這邊是我們要解的密碼串，C在等號的左邊，A和B則隱藏在等號的右邊，其他密碼格可能是<b>常數、括號或是平方</b>",
    },

    {
      title: "遊戲導覽",
      element: "#answerArea",
      intro: "這邊可以輸入你想試試看的ABC組合，按提交就可以送出答案",
    },
    {
      title: "遊戲導覽",
      element: "#key",
      intro: "如果輸入的答案帶入方程式成立，鑰匙會亮起來，並打開一格密碼。",
    },
    {
      title: "遊戲導覽",
      element: "#score",
      intro: "如果輸入的答案帶入方程式錯誤，會從總分100開始，答錯一次會扣5分。",
    },
    {
      title: "遊戲導覽",
      element: "#submittedRecord",
      intro: "按鈕可以下滑頁面看到你之前提交過的答案組合📜",
    },
    {
      title: "遊戲導覽",
      element: "#hintButton",
      intro:
        "如果需要一點提示，可以點選這邊，但整輪遊戲中可使用的次數有限制喔!",
    },
    {
      title: "遊戲導覽",
      element: "#menuButton",
      intro: "點擊左上角打開選單有排行榜，可以看看自己表現得如何。",
    },
    {
      title: "遊戲導覽",

      intro:
        "如果遊戲中有不清楚，點擊右上角的❔，打開遊戲說明</br>結束導覽，輸入你的暱稱後開始遊戲吧~",
    },
  ];

  const textfieldOnClick = (inputInd) => {
    if (inputInd === inputIndex) {
      setInputIndex("");
    }
    setInputIndex(inputInd);
    switch (inputInd) {
      case "A":
        setTextfieldColorA("#BEBEBE");
        setTextfieldColorB("");
        setTextfieldColorC("");
        break;
      case "B":
        setTextfieldColorA("");
        setTextfieldColorB("#BEBEBE");
        setTextfieldColorC("");
        break;
      case "C":
        setTextfieldColorA("");
        setTextfieldColorB("");
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
  //console.log(existingUserScore);
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
    console.log(existingScore);
    console.log(submittedRecord);
    console.log(submittedRecordTableRows);

    if (
      inputA.length === 0 ||
      inputA === "-" ||
      inputB.length === 0 ||
      inputB === "-" ||
      inputC.length === 0 ||
      inputC === "-"
    ) {
      return;
    }
    let data = [...ansList];
    let currentSubmittedAnswer =
      String(inputA) + "," + String(inputB) + "," + String(inputC);

    if (submittedRecord.has(currentSubmittedAnswer)) {
      setduplicateSnackbarOpen(true);
      return;
    }

    if (Calculator.calculatorMethod(gd, inputA, inputB) === parseInt(inputC)) {
      console.log(answerMap);
      Rest.userSubmit(
        userid,
        id,
        currentSubmittedAnswer,
        "correct",
        answerMap.keys().next().value
      );
      submittedRecord.add(currentSubmittedAnswer);
      submittedRecordShow.add(currentSubmittedAnswer + ",正確");
      //data[count] = gd[count];
      data[answerMap.keys().next().value] = gd[answerMap.keys().next().value];
      setCount(count + 1);
      setAnsList(data);
      setKeyIconColor("Gold");
      indexValue = answerMap.keys().next().value;
      answerMap.delete(answerMap.keys().next().value);

      console.log(answerMap);
      new Audio(CorrectSound).play();

      if (answerMap.size === 0) {
        let localLeaderBoard = existingData;
        const index = localLeaderBoard.findIndex(
          (data) => data.userId === userid
        );
        console.log(index);
        console.log(localLeaderBoard[index]);
        if (localLeaderBoard[index] === undefined) {
          localLeaderBoard.push({
            userId: userid,
            userScore: leaderBoardScore + existingScore,
          });
        } else {
          localLeaderBoard[index].userScore = leaderBoardScore + existingScore;
        }
        //console.log(localLeaderBoard[index].userScore);
        console.log(existingScore);
        console.log(leaderBoardScore);
        console.log(localLeaderBoard[index]);
        let leaderBoard = localLeaderBoard.sort((a, b) => {
          return b.userScore - a.userScore;
        });

        rank = leaderBoard.findIndex((data) => data.userId === userid);
        console.log(rank);

        setCookie("level", parseInt(id) + 1, { path: "/" });
        setTimeout(() => {}, 1000);
        new Audio(GameClearanceSound).play();
        setLevelcompletedOpen(true);
        Rest.postLeaderBoard(userid, id, leaderBoardScore + existingScore);

        return;
      }
    } else {
      let correctAnswer = Calculator.calculatorMethod(gd, inputA, inputB);
      submittedRecord.add(inputA + "," + inputB + "," + correctAnswer);
      submittedRecord.add(currentSubmittedAnswer);
      //console.log(submittedRecord);

      Rest.userSubmit(
        userid,
        id,
        currentSubmittedAnswer,
        "incorrect",
        answerMap.keys().next().value
      );
      submittedRecordShow.add(
        currentSubmittedAnswer + ",錯誤 " + " C = " + correctAnswer
      );
      setKeyIconColor("Gray");

      new Audio(FailureSound).play();
      setLeaderBoardScore(leaderBoardScore - 5);
      setFalseAlertOpen(true);
    }
    //console.log(submittedRecordShow);
    setInputA("");
    setInputB("");
    setInputC("");
    let no = 1;
    for (let item of submittedRecordShow) {
      item = item.split(",");
      setSubmittedRecordTableRows(
        submittedRecordTableRows.concat([
          createSubmittedRecordTable(no, item[0], item[1], item[2], item[3]),
        ])
      );

      no += 1;
    }
    // console.log(count);
    // console.log(submittedRecordTableRows);
  };
  const openABButtonOnclick = () => {
    const count = hintABCount - 1;
    setHintABCount(count);
    setCookie("hintAB", count, { path: "/" });
    Rest.userUseHint(userid, id, "openABHint", 0);
    console.log(hintABCount);
    let data = [...ansList];

    //data[count] = gd[count];
    let _keyA = -1;
    let _keyB = -1;

    answerMap.forEach((value, key) => {
      if (value === "A") _keyA = key;
      if (value === "B") _keyB = key;
    });
    console.log("keyA" + _keyA + "keyB" + _keyB);
    data[_keyA] = gd[_keyA];
    data[_keyB] = gd[_keyB];
    answerMap.delete(_keyA);
    answerMap.delete(_keyB);
    console.log(submittedRecordTableRows);

    setCount(count + 1);
    setAnsList(data);

    //sethintButtondisabled(true);
    new Audio(HintSound).play();
    setHintDialogOpen(false);
    // setHintIconColor("yellow");
    console.log(answerMap.keys().next().value);
    console.log("使用提示1");
    if (answerMap.size === 0) {
      setTimeout(() => {}, 1000);
      new Audio(GameClearanceSound).play();
      setCookie("level", parseInt(id) + 1, { path: "/" });
      setLevelcompletedwithHintOpen(true);

      return;
    }
    setHintABDisabled(true);
  };

  const openAnyButtonOnclick = (key) => {
    const count = hintAnyCount - 1;
    setHintAnyCount(count);
    setCookie("hintAny", count, { path: "/" });
    let data = [...ansList];
    data[key] = gd[key];
    setAnsList(data);
    answerMap.delete(key);
    Rest.userUseHint(userid, id, "openAnyHint", key);
    new Audio(HintSound).play();
    setSelectIndexModalOpen(false);
    setHintDialogOpen(false);
    // setHintIconColor("yellow");
    if (answerMap.size === 0) {
      setTimeout(() => {}, 1000);
      new Audio(GameClearanceSound).play();
      setCookie("level", parseInt(id) + 1, { path: "/" });
      setLevelcompletedwithHintOpen(true);

      return;
    }
  };

  const oneSetButtonOnclick = () => {
    new Audio(HintSound).play();
    const count = hintOneSetCount - 1;
    setHintOneSetCount(count);
    setCookie("hintOneSet", count, { path: "/" });
    Rest.userUseHint(userid, id, "oneSetHint", 0);
    setHintButtonCount(hintButtonCount + 1);
    setHintDialogOpen(false);
    // setHintIconColor("yellow");
    let randomA = Math.floor(Math.random() * 10);
    let randomB = Math.floor(Math.random() * 10);
    while (
      submittedRecord.has(
        randomA,
        randomB,
        Calculator.calculatorMethod(gd, randomA, randomB)
      )
    ) {
      randomA = Math.floor(Math.random() * 10);
      randomB = Math.floor(Math.random() * 10);
    }
    submittedRecord.add(
      randomA +
        "," +
        randomB +
        "," +
        Calculator.calculatorMethod(gd, randomA, randomB)
    );
    setSubmittedRecordTableRows(
      submittedRecordTableRows.concat([
        createSubmittedRecordTable(
          "提示",
          randomA,
          randomB,
          Calculator.calculatorMethod(gd, randomA, randomB),
          "-"
        ),
      ])
    );
  };

  const createSubmittedRecordTable = (no, A, B, C, results) => {
    return { no, A, B, C, results };
  };

  const NextLevelButton = () => {
    if (id === String(levelCreated)) {
      setnewLevelDialogueOpen(true);
      return;
    } else {
      window.location.href = `#/level-select/${parseInt(id) + 1}/${userid}`;
      window.location.reload();
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={flaseAlert}
        onClose={() => {
          setFalseAlertOpen(false);
        }}
        //message=""
        autoHideDuration="2000"
      >
        <Alert severity="error">這組答案錯誤，分數-5 </Alert>
      </Snackbar>
      <Dialog
        open={newLevelDialogueOpen}
        //TransitionComponent={Transition}

        onClose={handleNewLevelDialogueClose}
      >
        <DialogTitle>{"未完待續..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            新的關卡正在開發中!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewLevelDialogueClose}></Button>
          <Button
            onClick={() => {
              window.location.href = "/level-select/";
            }}
          >
            回首頁
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={levelcompletedOpen}
        keepMounted
        onClose={() => {
          setLevelcompletedOpen(false);
          NextLevelButton();
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="center">{"🎉恭喜過關🎉"}</DialogTitle>
        <DialogContent align="center">
          <DialogContentText id="alert-dialog-slide-description">
            總共嘗試了{" "}
            <b>{submittedRecordTableRows.length + 1 - hintButtonCount}</b> 次
            <br />
            本關得到 <b>{leaderBoardScore} </b>分
            <br />
            累積有 <b>{existingScore}</b>分，是第
            <b>{rank + 1}</b>名
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container alignItems="center" justifyContent="center">
            {/* <Button
            variant="outlined"
            onClick={() => {
              window.location.reload();
            }}
          >
            <AutorenewIcon />
          </Button>
            <Button
              
              variant="outlined"
              onClick={() => {
                window.location.href = "/level-select/";
              }}
            >
              回首頁
            </Button> */}
            <Button
              sx={{ alignContent: "center", width: "150px" }}
              variant="outlined"
              onClick={NextLevelButton}
            >
              下一關
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        open={levelcompletedwithHintOpen}
        keepMounted
        onClose={() => {
          setLevelcompletedOpen(false);
          NextLevelButton();
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="center">{"🎉恭喜過關🎉"}</DialogTitle>
        <DialogContent align="center">
          <DialogContentText id="alert-dialog-slide-description">
            總共嘗試了{" "}
            <b>{submittedRecordTableRows.length - hintButtonCount}</b> 次
            <br></br>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container alignItems="center" justifyContent="center">
            <Button
              sx={{ alignContent: "center", width: "150px" }}
              variant="outlined"
              onClick={NextLevelButton}
            >
              下一關
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog open={selectIndexModalOpen} sx={{ mt: 8 }}>
        <DialogTitle>{"你想打開第幾格?"}</DialogTitle>
        <DialogActions>
          <DialogActions>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              {Array.from(answerMap.keys()).map((key) => {
                return (
                  <Button
                    sx={{ mb: 1, width: "200px" }}
                    onClick={() => openAnyButtonOnclick(key)}
                    variant="outlined"
                    autoFocus
                  >
                    {key + 1}
                  </Button>
                );
              })}
              <Button
                sx={{ mb: 1, color: "gray" }}
                onClick={() => {
                  setSelectIndexModalOpen(false);
                }}
              >
                取消
              </Button>
            </Grid>
          </DialogActions>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={duplicateSnackbarOpen}
        onClose={handleduplicateSnackbarClose}
        message="這組答案已經輸入過了!"
        autoHideDuration="2000"
      />
      <Box sx={{ mt: 1.5 }}>
        <Typography sx={{ color: "#E0E0FF", fontSize: 2 }}>
          <lighter>
            ©copyright 2022 by{" "}
            <a
              href="https://sites.google.com/view/hthou/meg%E5%9C%98%E9%9A%8A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <font color="#E0E0FF">NTUSTMEG</font>
            </a>
          </lighter>
        </Typography>
      </Box>
      <section style={{ height: "90vh" }} id="step1">
        <h1
          style={{
            color: "rgba(52, 52, 52, 0.5)",
            height: "4px",
            color: "#FFFF30",
          }}
        >
          Level 50-{id}
        </h1>

        <Grid
          id="password"
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "15vh" }}
        >
          <Typography
            id="cElement"
            className="hexagon"
            variant="h5"
            color="#523D42"
          >
            C
          </Typography>
          <Typography className="hexagon" variant="h5" color="#523D42">
            =
          </Typography>

          {ansList.map((value, index) => {
            return (
              <Typography
                className={index === indexValue ? "instantFeedback" : "hexagon"}
                variant="h5"
              >
                {value}
              </Typography>
            );
          })}
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "20vh" }}
        >
          <Grid id="answerArea">
            <Grid container item alignItems="center" justifyContent="center">
              <Typography
                bgcolor={textfieldColorA}
                className="hexagonIpuntLeft1"
              >
                A
              </Typography>
              <TextField
                sx={{ bgcolor: textfieldColorA }}
                disabled
                className="hexagonIpuntRight1"
                variant="standard"
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
              <Typography
                bgcolor={textfieldColorB}
                className="hexagonIpuntLeft2"
              >
                B
              </Typography>
              <TextField
                sx={{ bgcolor: textfieldColorB }}
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
              <Typography
                className="hexagonIpuntLeft3"
                bgcolor={textfieldColorC}
              >
                C
              </Typography>
              <TextField
                disabled
                variant="standard"
                className="hexagonIpuntRight3"
                value={inputC}
                InputProps={{ disableUnderline: true }}
                sx={{ bgcolor: textfieldColorC }}
                onClick={() => {
                  textfieldOnClick("C");
                }}
              />

              <KeyIcon
                id="key"
                alignItems="flex-end"
                sx={{ color: keyIconColor }}
              />
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "60px" }}
        >
          <Button
            className="submitBtn"
            sx={{ color: "#523D42", ml: 5.5 }}
            //sx={{ color: "#523D42" }}
            onClick={submitButtonOnclick}
          >
            Submit
          </Button>

          <Dialog
            open={hintDialogOpen}
            onClose={() => {
              setHintDialogOpen(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{ sx: { width: "280px", mt: 10 } }}
          >
            <DialogTitle id="alert-dialog-title" align="center">
              {"想使用哪一種提示?"}
            </DialogTitle>

            <DialogActions>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Button
                  onClick={openABButtonOnclick}
                  disabled={hintABDisabled}
                  sx={{ mb: 1, width: "200px" }}
                  variant="outlined"
                  autoFocus
                >
                  揭曉密碼中A跟B的位置 <br />
                  (一關限用1次)
                  <br />
                  (整輪遊戲中剩餘:{hintABCount}次)
                </Button>
                <Button
                  sx={{ mb: 1, width: "200px" }}
                  onClick={oneSetButtonOnclick}
                  disabled={hintOneSetCount <= 0}
                  variant="outlined"
                  autoFocus
                >
                  提供一組正解
                  <br /> (整輪遊戲中剩餘:{hintOneSetCount}次)
                </Button>
                <Button
                  sx={{ mb: 1, width: "200px" }}
                  onClick={() => {
                    setHintDialogOpen(false);
                    setSelectIndexModalOpen(true);
                  }}
                  disabled={hintAnyCount <= 0}
                  variant="outlined"
                  autoFocus
                >
                  打開其中一格
                  <br /> (整輪遊戲中剩餘:{hintAnyCount}次)
                </Button>
                <Button
                  sx={{ mb: 1, color: "gray" }}
                  onClick={() => {
                    setHintDialogOpen(false);
                  }}
                >
                  先不用提示
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>
          <IconButton
            id="hintButton"
            // disabled={hintButtondisabled}
            size="large"
            onClick={() => {
              setHintDialogOpen(true);
            }}
          >
            <Tooltip title="使用提示">
              <LightbulbIcon
                sx={{
                  color: "yellow",
                  mb: 1,
                }}
              />
            </Tooltip>
          </IconButton>
        </Grid>
        <Box id="score" sx={{ mb: 2 }}>
          本關計分 : {leaderBoardScore}
        </Box>
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
              sx={{ color: "#523D42" }}
              onClick={() => {
                numberButtonOnClick(1);
              }}
            >
              1
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: "#523D42" }}
              onClick={() => {
                numberButtonOnClick(2);
              }}
            >
              2
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: "#523D42" }}
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
              sx={{ color: "#523D42" }}
              onClick={() => {
                numberButtonOnClick(4);
              }}
            >
              4
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: "#523D42" }}
              onClick={() => {
                numberButtonOnClick(5);
              }}
            >
              5
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: "#523D42" }}
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
              sx={{ color: "#523D42" }}
              onClick={() => {
                numberButtonOnClick(7);
              }}
            >
              7
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: "#523D42" }}
              onClick={() => {
                numberButtonOnClick(8);
              }}
            >
              8
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: "#523D42" }}
              onClick={() => {
                numberButtonOnClick(9);
              }}
            >
              9
            </Button>
          </Grid>
          <Grid item justifyContent="center">
            <Button
              className="hexagonBtn"
              sx={{ color: "#523D42" }}
              onClick={backspaceButtonOnClick}
            >
              <BackspaceIcon />
            </Button>
            <Button
              className="hexagonBtn"
              sx={{ color: "#523D42" }}
              onClick={() => {
                numberButtonOnClick(0);
              }}
            >
              0
            </Button>

            <Button
              className="hexagonBtn"
              sx={{ color: "#523D42" }}
              onClick={minusButtonOnclick}
            >
              (-)
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "50px" }}
          mt={1}
        >
          <Link
            activeClass="active"
            to="submittedRecord"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Button sx={{ color: "white" }} className="recordBtn">
              <ArrowDownwardIcon />
              Record
            </Button>
          </Link>
        </Grid>
      </section>
      <br />
      <section id="submittedRecord">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 4.5, mb: 4 }}
        >
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
                {submittedRecordTableRows.map((row) => (
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
        <Box height="10vh">
          <Button
            align="center"
            size="big"
            sx={{ borderColor: "#509993", color: "#57555E", mt: 5 }}
            onClick={() => {
              setRestartOpen(true);
            }}
            // href="/"
            variant="outlined"
            // startIcon={<LocalFloristIcon sx={{ color: "#FF7070" }} />}
          >
            重新開始
          </Button>
        </Box>
      </section>
      <Dialog
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        open={restartOpen}
        onclose={() => {
          setRestartOpen(false);
        }}
      >
        <DialogTitle>
          <b>重新開始</b>
        </DialogTitle>
        <DialogContent>確定要重新開始嗎?</DialogContent>
        <DialogActions alignItems="center">
          <Button
            href="/guessmyrule/"
            onClick={() => {
              removeCookie("level", { path: "/" });
              removeCookie("userId", { path: "/" });
              removeCookie("hintAB", { path: "/" });
              removeCookie("hintAny", { path: "/" });
              removeCookie("hintOneSet", { path: "/" });
            }}
          >
            確定
          </Button>
          <Button
            onClick={() => {
              setRestartOpen(false);
            }}
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        open={nameInputOpen}
        onclose={() => {
          setNameInputOpen(false);
        }}
      >
        <DialogTitle>請輸入你的暱稱...</DialogTitle>
        <DialogContent>
          <TextField
            inputProps={{ maxLength: 10 }}
            // error={nickname.length === 0}
            // helperText={!nickname.length ? "請輸入暱稱" : ""}
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (nickName) {
                Rest.postNickName(userid, nickName);
                setNameInputOpen(false);
              } else {
                setNickNameBarOpen(true);
              }
            }}
          >
            確定
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={nicknameBar}
        onClose={() => {
          setNickNameBarOpen(false);
        }}
        message="請輸入暱稱!"
        autoHideDuration="1000"
      />
      <Steps
        onComplete={() => {
          setStepEnable(false);
          setNameInputOpen(true);
        }}
        enabled={stepEnable && id === "1"}
        steps={steps}
        initialStep={0}
        onExit={() => {
          setNameInputOpen(true);
          setStepEnable(false);
        }}
        // onStart={() => {
        //   setStepEnable(false);
        // }}
        options={{
          nextLabel: "下一步",
          prevLabel: "上一步",
          doneLabel: "完成",
        }}
      />
    </div>
  );
};

export default Appbody;
