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
import { useNavigate } from "react-router-dom";

function Cameras() {
  const [open, setOpen] = React.useState(false);
  const [openNest, setOpenNest] = React.useState(false);

  const cameras_Option = ["PTZ", "NDAA", "Wifi", "Bullets", "LPRS"];

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleNestClose = () => {
    setOpen(false);
  };
  const handleNestOpen = () => {
    setOpen(true);
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle> Tuesstes</DialogTitle>
          <DialogContent>
            <DialogContentText>Total Camera</DialogContentText>
            <Button color="secondary" onClick={handleNestClose}>Modal 1</Button>
            <Button color="secondary">Modal 2</Button>
            <Button color="secondary">Modal 3</Button>
            <Button color="secondary">Modal 4</Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Next</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Tuesstes</DialogTitle>
        <DialogContent>
          <DialogContentText>Total Camera</DialogContentText>
          <Button color="secondary">Modal 1</Button>
          <Button color="secondary">Modal 2</Button>
          <Button color="secondary">Modal 3</Button>
          <Button color="secondary">Modal 4</Button>
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
            <h1>Cameras</h1>
            <Button variant="contained" onClick={() => navigate("/")}>Edit</Button>
            {cameras_Option.map((types) => {
              return (
               <Button onClick={handleOpen} >{types}</Button>
              );
            })}

            <Button variant="contained" onClick={() => navigate("/poe_s")}>
              Next
            </Button>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Cameras;
