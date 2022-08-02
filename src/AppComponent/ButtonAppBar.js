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

const ButtonAppBar = () => {
  const getUrlString = window.location.href;
  const userId = getUrlString.substring(
    getUrlString.lastIndexOf("/") + 1,
    getUrlString.length
  );

  console.log(userId);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copySuccessful, SetCopySuccessfulOpen] = useState(false);
  const [copyFailed, setCopyFailedOpen] = useState(false);
  const copyHandler = () => {
    if (copy(userId)) {
      SetCopySuccessfulOpen(true);
    } else {
      setCopyFailedOpen(true);
    }
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
              <MenuItem onClick={copyHandler}>ID : {userId}</MenuItem>
              <MenuItem onClick={copyHandler}>
                (點擊上方字串就可以複製 ID )
              </MenuItem>
            </Box>
          </Drawer>
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
          </Typography>

          <Popup />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default ButtonAppBar;
