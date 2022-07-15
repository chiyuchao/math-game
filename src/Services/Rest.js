const Rest = {
  userSubmit: (userid, currentSubmittedAnswer, result, timestamp) => {
    var url = "";
    var data = {
      userid: userid,
      userAnswer: currentSubmittedAnswer,
      userResult: result,
      timestamp: timestamp,
    };
    console.log(data);

    //     fetch(url, {
    //       method: "POST", // or 'PUT'
    //       body: JSON.stringify(data), // data can be `string` or {object}!
    //       headers: new Headers({
    //         "Content-Type": "application/json",
    //       }),
    //     })
    //       .then((res) => res.json())
    //       .catch((error) => console.error("Error:", error))
    //       .then((response) => console.log("Success:", response));
  },
  userUseHint: (userid, result, timestamp) => {
    var url = "";
    var data = {
      userid: userid,
      userResult: result,
      timestamp: timestamp,
    };
    console.log(data);
  },
};
export default Rest;
