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
import { useNavigate } from "react-router-dom"
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";


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
function ExtraHardware(props) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [extraHardware, setExtraHardware] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  {/* Modal Open*/ }
  const handleOpen = (e) => {

    setOpen2(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setExtraHardware((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const onNext = (e) => {
    navigate("/special")
  }

  const handleClose2 = () => setOpen2(false);
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle> Total Camera</DialogTitle>
          <DialogContent>
            <DialogContentText>Total Camera</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Camera Quantity"
              type="number"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Next</Button>
          </DialogActions>
        </Dialog>
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
            <Button variant="contained" onClick={handleOpen}>Power</Button>
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
                  POWER
                </Typography>
                <Box>
                  <Button variant="contained" style={{ margin: "0 5px" }} onClick={() => navigate("/extra_hardware")}>
                    19V
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: "0 5px", background: "red" }}

                  >
                    20V
                  </Button>
                  <Button variant="contained" style={{ margin: "0 5px" }} onClick={() => navigate("/extra_hardware")}>
                    21V
                  </Button>
                </Box>
                <Button variant="contained" style={{ marginTop: '50px' }} onClick={handleClose2} >Back</Button>
              </Box>
            </Modal>
            {/* If cables is less than camera ends*/}
            <h1>Extra Hardware</h1>
            <TextField id="outlined-basic" label="Mounts" variant="outlined" name="mounts" value={extraHardware.mounts || ""} onChange={handleSubmit} />
            <TextField id="outlined-basic" label="Connecters" variant="outlined" name="connecters" value={extraHardware.connecters || ""} onChange={handleSubmit} /><br />
            <TextField id="outlined-basic" label="Extends" variant="outlined" name="extends" value={extraHardware.extends || ""} onChange={handleSubmit} />
            <TextField id="outlined-basic" label="Adapter" variant="outlined" name="adapter" value={extraHardware.adapter || ""} onChange={handleSubmit} /> <br />
            <Button variant="contained" onClick={onNext}>Next</Button>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default ExtraHardware