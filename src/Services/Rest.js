import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";

const Rest = {
  startLevel: (userid, id, result) => {
    var url = "https://game.ntustmeg.tw/mathGameRecord";
    var data = {
      userId: userid,
      questionId: id,
      userResult: result,
    };
    console.log(data);
    axios({
      url: url,
      method: "PUT",
      data: data,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  },
  userSubmit: (userid, id, currentSubmittedAnswer, result, index) => {
    var url = "https://game.ntustmeg.tw/mathGameRecord";
    var data = {
      userId: userid,
      questionId: id,
      userAnswer: currentSubmittedAnswer,
      userResult: result,
      index: index,
    };
    console.log(data);
    axios({
      url: url,
      method: "POST",

      data: data,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  },

  userUseHint: (userid, id, result, index) => {
    var url = "https://game.ntustmeg.tw/mathGameRecord";
    var data = {
      userId: userid,
      questionId: id,
      userResult: result,
      index: index,
    };
    console.log(data);
    axios({
      url: url,
      method: "POST",
      data: data,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  },

  postLeaderBoard: (userId, level, userScore) => {
    var url = "https://game.ntustmeg.tw/postMathGameLeaderBoard";
    var data = {
      userId: userId,
      level: level,
      userScore: userScore,
    };
    console.log(data);
    axios({
      url: url,
      method: "POST",
      data: data,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  },
  postNickName: (userId, nickName) => {
    var url = "https://game.ntustmeg.tw/postMathGameLeaderBoard";
    var data = {
      userId: userId,
      nickName: nickName,
    };
    console.log(data);
    axios({
      url: url,
      method: "POST",
      data: data,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
  },
  getLeaderBoard: () => {
    axios("https://game.ntustmeg.tw/getMathGameLeaderBoard")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  },
};

export default Rest;
