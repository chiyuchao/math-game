const Calculator = {
  calculatorMethod: function(gd, inputA, inputB) {
    const indexA = gd.indexOf("A");
    const indexB = gd.indexOf("B");
    if (gd.includes("(")) {
      // 目前有括號的題目，每個係數只能是一位數
      const coefficient = parseInt(gd[0]);
      let a;
      let b = gd.slice(indexA + 1, indexB).join("");
      let constant;
      if (indexA === 2) {
        a = coefficient;
      } else {
        a = coefficient * parseInt(gd[2]);
      }
      if ((b === "+") | (b === "-")) {
        b = parseInt(b + "1") * coefficient;
      } else {
        b = b * coefficient;
      }

      if (indexB + 2 === gd.length) {
        constant = "0";
      } else {
        constant = gd.slice(indexB + 2, gd.length).join("");
      }
      const answer =
        parseInt(a) * parseInt(inputA) +
        parseInt(b) * parseInt(inputB) +
        parseInt(constant);
      console.log(a);
      console.log(b);
      console.log(constant);
      return answer;
    }
    if (indexA < indexB) {
      console.log("b在後面");
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

      return answer;
    }

    if (indexA > indexB) {
      console.log("b在前面");
      let a = gd.slice(indexB + 1, indexA).join("");
      let b;
      let constant;
      if (indexB === 0) {
        b = "1";
      } else {
        b = gd.slice(0, indexB).join("");
      }
      if ((a === "+") | (a === "-")) {
        a = a + "1";
      }

      if (indexA + 1 === gd.length) {
        constant = "0";
      } else {
        constant = gd.slice(indexA + 1, gd.length).join("");
      }
      const answer =
        parseInt(a) * parseInt(inputA) +
        parseInt(b) * parseInt(inputB) +
        parseInt(constant);
      console.log(a);
      console.log(b);
      console.log(constant);
      return answer;
    }
  },
};
export default Calculator;
