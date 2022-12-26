import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Modal,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

const style = {
  outline: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PopUp({ showPopup }) {
  const [open, setOpen] = React.useState(showPopup);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton sx={{ color: "White" }} onClick={handleOpen}>
        <HelpIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle container alignItems="center" justifyContent="center" sx={style}></DialogTitle> */}
        <DialogTitle
          align="center"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          <b>遊戲說明</b>
          <Typography align="center" sx={{ color: "#696969", fontSize: 1 }}>
            <lighter>©copyright 2022 by NTUSTMEG</lighter>
          </Typography>
        </DialogTitle>
        <DialogContent align="left" id="modal-modal-description" sx={{ mt: 1 }}>
          嘗試輸入正確組合來打開有A,B,C三個未知數的密碼方程式!
          <br />
          <ul>
            <li>請使用頁面中的實體數字鍵輸入</li>
            <li>
              輸入的答案帶入方程式<b>成立</b>， 可以打開一格密碼。
            </li>
            <li>
              輸入的答案帶入方程式<b>不成立</b>， 會從總分 100 開始，答錯一次會
              <b>扣5分</b>。
            </li>

            <li>需要提示，可以點選黃色燈泡!</li>
            <li>下滑到底可以看到答題記錄。</li>
          </ul>
        </DialogContent>
        {/* <Typography
            align="center"
            id="modal-modal-description"
            sx={{ mb: 2 }}
          ></Typography> */}
        <DialogTitle
          align="center"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          <b>遊戲目標</b>
        </DialogTitle>
        <DialogContent>
          <Typography align="left" id="modal-modal-description" sx={{ mt: 1 }}>
            每輸入一組正確的答案組合 ，可以解開一格密碼，
            將所有密碼解開就過關了!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Grid container alignItems="center" justifyContent="center">
            <Button
              sx={{ alignContent: "center", ml: 10 }}
              onClick={handleClose}
            >
              close
            </Button>
          </Grid>
          <img
            className="center"
            src={require("../Assets/logo.png")}
            style={{
              width: "50px",
              height: "50px",
              alignSelf: "flex-end",
              padding: 10,
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
