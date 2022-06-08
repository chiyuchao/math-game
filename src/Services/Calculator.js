const Calculator = {
  calculatorMethod: function(gd, inputA, inputB) {
    const indexA = gd.indexOf("A");
    const indexB = gd.indexOf("B");
    let a;
    let b = gd.slice(indexA + 1, indexB).join("");
    let constant;
    if (indexA === 0) {
      a = "1";
    } else {
      a = gd.slice(0, indexA).join("");
    }
    if ((b === "+") | (b === "-")) {
      b = b + "1";
      console.log(b);
    }

    if (indexB + 1 === gd.length) {
      constant = "0";
    } else {
      constant = gd.slice(indexB + 1, gd.length).join("");
    }

    const answer =
      parseInt(a) * parseInt(inputA) +
      parseInt(b) * parseInt(inputB) +
      parseInt(constant);
    console.log(b);
    return answer;
  },
};
export default Calculator;
