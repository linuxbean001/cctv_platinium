import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom"
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";

const style = {
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

function Cabling() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <React.Fragment>
    <Container
      maxWidth="xl"
      style={{
        background: "rgba(181, 225, 243, 0.28)",
        height: "100vh",
        padding: "30px",
      }}
    >
      
      <Box
        sx={{
          marginLeft: 20,
          display: "flex",
          "& > :not(style)": {
            m: 1,
            width: "125vh",
            height: 600,
          },
        }}
      >
        <Paper variant="outlined" square={true} color="red">
          <h1>Cabling</h1>
          <Button onClick={handleClickOpen}>Cameras</Button>
          <Button>Cable</Button>
          <Button>CET-5</Button>
          <Button>CET-6</Button>
          <Button>CMP</Button>
          <Button>CMX</Button>
          <br/>
         
          <Button variant="contained" onClick={()=>navigate("/extra_hardware")}>Next</Button>
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Total Camera</DialogTitle>
        <DialogContent>
          <DialogContentText>Are You Sure</DialogContentText>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>navigate("/extra_hardware")}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>

      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          color={"red"}
        >
          <InputLabel htmlFor="standard-adornment-amount">
            Amount
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            startAdornment={
              <InputAdornment position="start">$</InputAdornment>
            }
          />
          <p>/camera</p>
        </Typography>
        <Box>
          <Button
            variant="contained"
            style={{ margin: "0 5px" }}
            onClick={() => navigate("/cabling")}
          >
            ADD
          </Button>
        </Box>
      </Box>
    </Modal>
    </Container>
  </React.Fragment>
  )
}

export default Cabling