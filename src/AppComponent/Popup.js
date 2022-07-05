import * as React from "react";
import {
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
  width: 350,
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container alignItems="center" justifyContent="center" sx={style}>
          <Typography
            align="center"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            遊戲說明
          </Typography>
          <Typography
            align="center"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 2 }}
          >
            每一關的破關密碼都是一串有A,B,C三個未知數的算式。
            但有部分的密碼需要被解開， 嘗試輸入正確ABC組合來打開完整的密碼串吧!
          </Typography>
          <Typography
            align="center"
            id="modal-modal-description"
            sx={{ mb: 2 }}
          ></Typography>
          <Typography
            align="center"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            遊戲目標
          </Typography>
          <Typography
            align="center"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            每輸入一組正確的答案組合 ，可以解開一格密碼，
            將所有密碼解開就過關了!
          </Typography>
          <Button sx={{ mt: 2 }} align="center" onClick={handleClose}>
            close
          </Button>
        </Grid>
      </Modal>
    </div>
  );
}
