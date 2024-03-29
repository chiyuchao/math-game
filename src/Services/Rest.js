import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

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
      method: "POST",

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
};
export default Rest;
