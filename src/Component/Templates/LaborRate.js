import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
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

function LaborRate(props) {
  console.log(props.userDetail[1].cameraNumber)
  const [open, setOpen] = React.useState(false);
  const labor_rate = ['LEVEL-1', 'LEVEL-2', 'LEVEL-3', 'LEVEL-4', 'NO INSTALL', 'PRE VILLAGE']
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true)
  }

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


            <div style={{ display: 'inline-block' }}>
              <div className="spceItem" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                <TextField
                  id="outlined-basic"
                  label="Camera Number"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Number of Drops"
                  variant="outlined"
                />

                <TextField
                  id="outlined-basic"
                  label="Labor"
                  variant="outlined"
                />

              </div>
            </div>
            <Stack spacing={2} direction="row" m={2}>
              {labor_rate.map((btn_types) => {
                return (
                  <Button variant="contained" name={btn_types} onClick={handleOpen}>
                    {btn_types}
                  </Button>
                )
              }
              )}


            </Stack>


            <Button variant="contained" onClick={() => navigate("/svc_call")}>
              Next
            </Button>

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
                <Button variant="contained" style={{ marginTop: '50px' }} onClick={handleClose} >Back</Button>
              </Box>
            </Modal>

          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default LaborRate;
