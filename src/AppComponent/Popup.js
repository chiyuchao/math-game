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
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
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
            輸入正確ABC組合解開密碼
          </Typography>
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
            每輸入正確一次 ，可以解開一格密碼， 將所有密碼解開獲勝
          </Typography>
          <Button sx={{ mt: 2 }} align="center" onClick={handleClose}>
            close
          </Button>
        </Grid>
      </Modal>
    </div>
  );
}
