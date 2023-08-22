import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

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

function LaborRate(props) {
  const [laborDetail, setLaborDetail] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [nestModal, setNestModal] = React.useState(false);
  const labor_rate = [
    "LEVEL-1",
    "LEVEL-2",
    "LEVEL-3",
    "LEVEL-4",
    "NO INSTALL",
    "PRE VILLAGE",
  ];

  let cameraDetails = {};
  for (let i = 0; i <= props.userDetail.length; i++) {
    Object.assign(cameraDetails, props.userDetail[i]);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (e) => {
    setLaborDetail({ laborDetail: e.target.name });
    setOpen(true);
  };
  const handleNestModal=()=>{
    alert('hello')
    setNestModal(true);
    
  }
  props.addToCartHandler(laborDetail)
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
            <h1>Labor Rate</h1>

            <div className="labor_input">
              <div className="spceItemA">
                <label>Number of Camera</label>
                <input
                  type="text"
                
                  value={cameraDetails.cameraNumber}
                  readOnly
                />
              </div>

              <div className="spceItemB">
                <label>No of Drops</label>
                <input
                  type="text"
                  value={
                    cameraDetails.cameraNumber + cameraDetails.specialDetails.tx
                  }
                  readOnly
                />
              </div>

              <div className="spceItemC">
                <label>Labor</label>
                <input type="text" value={30} readOnly />
              </div>
            </div>
            <Stack spacing={2} direction="row" m={3}>
              {labor_rate.map((btn_types) => {
                return (
                  <div className="changes">
                    <Button
                      variant="contained"
                      name={btn_types}
                      onClick={handleOpen}
                    >
                      {btn_types}
                    </Button>
                  </div>
                );
              })}
            </Stack>

            <Button variant="contained" onClick={ handleNestModal}>
              Next
            </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box>
                  <h3>{laborDetail.laborDetail}</h3>
                  <div className="spceItemB">
                  <label>Quantity</label>
                  <input
                    type="text"
                    value={
                      cameraDetails.cameraNumber + cameraDetails.specialDetails.tx
                    }
                    readOnly
                  />
                </div>
                  <Button
                    variant="contained"
                    style={{ margin: "0 5px" }}
                    onClick={handleClose}
                  >
                    ADD
                  </Button>
                </Box>
              
              </Box>
            </Modal>

            <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <DialogContentText>ARE YOU SURE?</DialogContentText>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={navigate("/svc_call")}>Yes</Button>
              
            </DialogContent>
          </Dialog>
  
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default LaborRate;
