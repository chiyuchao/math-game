const Calculator = {
  calculatorMethod: function(gd, inputA, inputB, inputC) {
    const indexA = gd.indexOf("A");
    const indexB = gd.indexOf("B");
    let a = gd.slice(0, indexA).join("");
    let b = gd.slice(indexA + 1, indexB).join("");
    let constant = gd.slice(indexB + 1, gd.length).join("");
    const answer =
      parseInt(a) * parseInt(inputA) +
      parseInt(b) * parseInt(inputB) +
      parseInt(constant);

    return answer === parseInt(inputC);
  },
};
export default Calculator;
