import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
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

function Hardware(props) {
  console.log(props)
  const [open, setOpen] = React.useState(false);
  const [hardwarelevel, SetHardwareLevel] = React.useState([])
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (e) => {
    const modalName = e.target.name;
    SetHardwareLevel({modalName:modalName ,})
    setOpen(true);
  };

  const naviGateButtn=(e)=>{
  //  const value = e.target.value
    props.gethardWareDetails(hardwarelevel)
    navigate("/cabling")
  }
  console.log(hardwarelevel)
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
            <h1>Hardware</h1>
            <Button onClick={handleOpen} name ='level_1'>Level 1</Button>
            <Button onClick={handleOpen} name ='level_2'>Level 2</Button>
            <Button onClick={handleOpen} name ='level_3'>Level 3</Button>
            <Button onClick={handleOpen} name ='level_4'>Level 4</Button>
          </Paper>
        </Box>

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
                name ="amount"
                // value={hardwarelevel.modalName||""}
                onChange={handleOpen}
              />
              <p>/camera</p>
            </Typography>
            <Box>
              <Button
                variant="contained"
                style={{ margin: "0 5px" }}
                onClick={naviGateButtn}
              >
                ADD
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </React.Fragment>
  );
}

export default Hardware;
