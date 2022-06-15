import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import questionBase from "../questionBase";

function LevelSelect() {
  console.log(questionBase);
  return (
    <div>
      {questionBase.data.map((question) => {
        return (
          <h2 key={question.id}>
            <Link to={`/level-select/${question.id}`}>
              {question.difficulty}
            </Link>
          </h2>
        );
      })}
    </div>
  );
}

export default LevelSelect;
