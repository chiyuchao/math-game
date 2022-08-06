import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import questionBase from "../questionBase";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { Box } from "@mui/system";
import { v4 as uuid } from "uuid";
import { Cookies, useCookies } from "react-cookie";

function LevelSelect() {
  const [cookies, setCookie, removeCookie] = useCookies(["level"], ["userId"]);
  console.log(questionBase);

  const unique_id = uuid();

  return (
    <div>
      <Box height="100vh" sx={{ backgroundColor: "white" }}>
        <Button
          align="center"
          size="big"
          sx={{ borderColor: "#509993", color: "#57555E", mt: 5 }}
          href={`#/level-select/${cookies.level ? cookies.level : 1}/${
            cookies.userId ? cookies.userId : unique_id
          }`}
          variant="outlined"
          startIcon={<LocalFloristIcon sx={{ color: "#FF7070" }} />}
        >
          start
        </Button>
        {/* <Grid
          style={{ minwidth: "80%" }}
          container
          alignItems="center"
          justifyContent="flex-start"
          sx={{ py: 4, px: 2 }}
        >
          {questionBase.data.map((question) => {
            return (
              <grid
                alignItems="center"
                item
                style={{ height: "50px", width: "110px" }}
              >
                <Button
                  size="small"
                  sx={{ borderColor: "#509993", color: "#57555E" }}
                  href={`#/level-select/${question.id}/${unique_id}`}
                  variant="outlined"
                  startIcon={<LocalFloristIcon sx={{ color: "#FF7070" }} />}
                  key={question.id}
                >
                  {question.id}
                </Button>
              </grid>
            );
          })}
        </Grid> */}
      </Box>
    </div>
  );
}

export default LevelSelect;
