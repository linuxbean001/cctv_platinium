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
import { useNavigate } from "react-router-dom"
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

function Cabling(props) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [cable, setCableName] = React.useState({})

  const navigate = useNavigate();
  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cableName = (e) => {
    const name = e.target.name
    // setCableName({cable:name})
  }
  {/* Modal Open*/ }
  const handleOpen = (e) => {
    e.preventDefault();

    setOpen2(true);

  };

  const nextPage = () => {
    props.addToCartHandler(cable)
    navigate("/extra_hardware")
  }

  const handleClose2 = () => setOpen2(false);
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
            <Button name='cable' onClick={cableName}>Cable</Button>
            <Button name='crt 5' onClick={cableName}>CET-5</Button>
            <Button name='cet 6' onClick={cableName}>CET-6</Button>
            <Button name='CMP' onClick={cableName}>CMP</Button>
            <Button name='CMX' onClick={cableName}>CMX</Button>
            <br />

            <Button variant="contained" onClick={handleOpen}>Next</Button>
          </Paper>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle> Total Camera</DialogTitle>
          <DialogContent>
            <DialogContentText>Are You Sure</DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => navigate("/extra_hardware")}>Yes</Button>
            <Button onClick={handleClose}>No</Button>
          </DialogActions>
        </Dialog>

        {/* If cables is less than camera*/}
        <Modal
          open={open2}
          onClose={handleClose2}
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
              Are You Sure ?
            </Typography>
            <Box>
              <Button variant="contained" style={{ margin: "0 5px" }} onClick={() => navigate("/extra_hardware")}>
                Yes
              </Button>
              <Button
                variant="contained"
                style={{ margin: "0 5px", background: "red" }}
                onClick={handleClose2}
              >
                No
              </Button>
            </Box>
          </Box>
        </Modal>
        {/* If cables is less than camera ends*/}
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
                onClick={nextPage()}
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