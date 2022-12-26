import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import Snackbar from "@mui/material/Snackbar";
import MenuItem from "@mui/material/MenuItem";
import copy from "copy-to-clipboard";
import Popup from "./Popup";
import Rest from "../Services/Rest";
import axios from "axios";

import {
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

const ButtonAppBar = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const getUrlString = window.location.href;
  const userId = getUrlString.substring(
    getUrlString.lastIndexOf("/") + 1,
    getUrlString.length
  );

  console.log(userId);
  const [stepReopen, setStepReopen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [leaderBoardOpen, setLeaderBoardOpen] = useState(false);
  const [copySuccessful, SetCopySuccessfulOpen] = useState(false);
  const [copyFailed, setCopyFailedOpen] = useState(false);
  const copyHandler = () => {
    if (copy(userId)) {
      SetCopySuccessfulOpen(true);
    } else {
      setCopyFailedOpen(true);
    }
  };
  const getLeaderBoard = () => {
    const leaderBoardData = axios
      .get("https://game.ntustmeg.tw/getMathGameLeaderBoard")
      .then((res) => {
        setLeaderBoard(
          res.data
            .sort((a, b) => {
              return b.userScore - a.userScore;
            })
            .slice(0, 5)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ bgcolor: "#509993" }}>
        <Toolbar>
          <IconButton
            id="menuButton"
            onClick={() => {
              setDrawerOpen(true);
            }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            open={drawerOpen}
            onClose={() => {
              setDrawerOpen(false);
            }}
          >
            <Box
              sx={{
                width: 400,
              }}
              role="presentation"
              onClick={() => {
                setDrawerOpen(false);
              }}
              onKeyDown={() => {
                setDrawerOpen(false);
              }}
            >
              <MenuItem
                onClick={() => {
                  getLeaderBoard();
                  setLeaderBoardOpen(true);
                }}
              >
                排行榜
              </MenuItem>
              <MenuItem onClick={copyHandler}>ID : {userId}</MenuItem>
              <MenuItem onClick={copyHandler}>
                (點擊上方字串就可以複製 ID )
              </MenuItem>
            </Box>
          </Drawer>
          <Dialog
            open={leaderBoardOpen}
            //TransitionComponent={Transition}
          >
            <DialogTitle align="center">{"排行榜"}</DialogTitle>
            <DialogContent align="center">
              <DialogContentText id="alert-dialog-slide-description">
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  sx={{ mt: 4.5, mb: 4 }}
                >
                  <TableContainer style={{ width: "350px" }} component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ width: "10px" }} align="center">
                            no.
                          </TableCell>
                          <TableCell style={{ width: "80px" }} align="center">
                            ID
                          </TableCell>
                          <TableCell style={{ width: "30px" }} align="center">
                            關卡
                          </TableCell>
                          <TableCell style={{ width: "50px" }} align="center">
                            累積分數
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {leaderBoard.map((row, index) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell align="center">
                              {row.userId.slice(0, 5)}
                            </TableCell>
                            <TableCell align="center">{row.level}</TableCell>
                            <TableCell align="center">
                              {row.userScore}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <Button
              onClick={() => {
                setLeaderBoardOpen(false);
              }}
            >
              ok
            </Button>
          </Dialog>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={copySuccessful}
            onClose={() => {
              SetCopySuccessfulOpen(false);
            }}
            message="複製成功！"
            autoHideDuration="1500"
          />
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={copyFailed}
            onClose={() => {
              setCopyFailedOpen(false);
            }}
            message="複製失敗！請手動複製！"
            autoHideDuration="1500"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Guess My Rule
            {/* <Typography sx={{ color: "#EBEBFF", fontSize: 1 }}>
              <lighter>©copyright 2022 by NTUSTMEG</lighter>
            </Typography> */}
          </Typography>

          <Popup />

          {/* <IconButton
            sx={{ color: "White" }}
            onClick={() => {
              setStepReopen(true);
            }}
          >
            <HelpIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default ButtonAppBar;
