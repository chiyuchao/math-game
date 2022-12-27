const Calculator = {
  calculatorMethod: function(gd, inputA, inputB) {
    const indexA = gd.indexOf("A");
    const indexB = gd.indexOf("B");

    if (gd.includes("²")) {
      const index2 = gd.indexOf("²");
      //有平方
      let a = gd.slice(0, indexA);
      let b;
      let constant;
      if (indexA === 0) {
        a = "1";
      } else {
        if (gd.slice(0, indexA).join("") === "-") {
          a = "-1";
        } else {
          a = gd.slice(0, indexA).join("");
        }
      }

      switch (index2 - 1) {
        case indexA:
          //A有平方
          b = gd.slice(indexA + 2, indexB).join("");
          if ((b === "+") | (b === "-")) {
            b = b + "1";
          }

          if (gd.indexOf("²", index2 + 1) > 0) {
            const indexB2 = gd.indexOf("²", index2 + 1);
            console.log(indexB2);
            if (indexB2 + 1 === gd.length) {
              constant = "0";
            } else {
              constant = gd.slice(indexB + 2, gd.length).join("");
            }
            const answer =
              parseInt(a) * parseInt(inputA) ** 2 +
              parseInt(b) * parseInt(inputB) ** 2 +
              parseInt(constant);
            console.log(parseInt(a), parseInt(b), parseInt(constant), answer);
            return answer;
          } else {
            if (indexB + 1 === gd.length) {
              constant = "0";
            } else {
              constant = gd.slice(indexB + 1, gd.length).join("");
            }
            const answer =
              parseInt(a) * parseInt(inputA) ** 2 +
              parseInt(b) * parseInt(inputB) +
              parseInt(constant);
            console.log(parseInt(a), parseInt(b), parseInt(constant), answer);
            return answer;
          }

          break;
        case indexB:
          //b有平方
          b = gd.slice(indexA + 1, indexB).join("");
          if ((b === "+") | (b === "-")) {
            b = b + "1";
          }
          if (indexB + 2 === gd.length) {
            constant = "0";
          } else {
            constant = gd.slice(indexB + 2, gd.length).join("");
          }
          const answerB =
            parseInt(a) * parseInt(inputA) +
            parseInt(b) * parseInt(inputB) ** 2 +
            parseInt(constant);

          console.log(a, b, constant);

          return answerB;
          break;
      }
    }

    if (gd.includes("(")) {
      if (gd.indexOf("(") === 1) {
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
          b = parseInt(b) * coefficient;
        }

        if (indexB + 2 === gd.length) {
          constant = "0";
        } else {
          constant = gd.slice(indexB + 2, gd.length).join("");
        }
        const answerA =
          parseInt(a) * parseInt(inputA) +
          parseInt(b) * parseInt(inputB) +
          parseInt(constant);
        console.log(a);
        console.log(b);
        console.log(constant);
        return answerA;
      } else {
        const coefficient = gd.slice(indexA + 1, gd.indexOf("(")).join("");
        let a;
        let b = gd[indexB - 1];
        let constant;
        if (indexA === 0) {
          a = "1";
        } else {
          a = gd.slice(0, indexA).join("");
        }
        if (b === "(") {
          b = coefficient;
        } else {
          b = b * coefficient;
        }

        constant =
          parseInt(gd.slice(indexB + 1, gd.indexOf(")")).join("")) *
          coefficient;

        const answer =
          parseInt(a) * parseInt(inputA) +
          parseInt(b) * parseInt(inputB) +
          parseInt(constant);

        console.log(coefficient);
        console.log(a);
        console.log(b);
        console.log(constant);
        return answer;
      }
    }
    if (indexA < indexB) {
      console.log("b在後面");
      let a;
      let b = gd.slice(indexA + 1, indexB).join("");
      let constant;

      if (indexA === 0) {
        a = "1";
      } else {
        if (gd.slice(0, indexA).join("") === "-") {
          a = "-1";
        } else {
          a = gd.slice(0, indexA).join("");
        }
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
