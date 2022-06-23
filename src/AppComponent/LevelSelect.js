import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import questionBase from "../questionBase";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { Box } from "@mui/system";

function LevelSelect() {
  console.log(questionBase);
  return (
    <div>
      <Box>
        <Grid
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
                  href={`#/level-select/${question.id}`}
                  variant="outlined"
                  startIcon={<LocalFloristIcon sx={{ color: "#FF7070" }} />}
                  key={question.id}
                >
                  {question.difficulty}
                </Button>
              </grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default LevelSelect;
