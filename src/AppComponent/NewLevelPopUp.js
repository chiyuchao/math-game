import * as React from "react";
import {
  Box,
  Button,
  Modal,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

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

export default function NextLevelPopUp({ component }) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
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
            未完待續...
          </Typography>
          <Typography
            align="center"
            id="modal-modal-description"
            sx={{ mt: 2, mb: 2 }}
          >
            新的關卡正在開發中!
          </Typography>
          <Button sx={{ mt: 2 }} align="center" onClick={handleClose}>
            關閉
          </Button>
          <Button sx={{ mt: 2 }} align="center">
            <Link to={`/level-select/`}></Link>
          </Button>
        </Grid>
      </Modal>
    </div>
  );
}
