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

function NVRINFO(props) {
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const [numValues, setNumValues] = React.useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleValues = (e) => {
    const { name, value } = e.target;
    setNumValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    
  };
  //
  // console.log(numValues);

  const handleClickOpen = (e) => {
    props.getNvrDetails(numValues);
    if (numValues.license === "") {
      return {
        message: "Please enter the number of values",
      };
    }

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
            <div style={{ display: "inline-block", margin: "35px auto" }}>
              <div className="spceItem">
                <TextField
                  id="outlined-basic"
                  label="Num"
                  name="num"
                  variant="outlined"
                  error={!numValues.num}
                  helperText="please enter the value"
                  value={numValues.num || ""}
                  onChange={handleValues}
                />
                <TextField
                  id="outlined-basic"
                  label="Num 1"
                  name="num_1"
                  variant="outlined"
                  error={!numValues.num_1}
                  helperText="please enter the value"
                  value={numValues.num_1 || ""}
                  onChange={handleValues}
                />
                <TextField
                  id="outlined-basic"
                  label="Num 2"
                  name="num_2"
                  variant="outlined"
                  error={!numValues.num_2}
                  helperText="please enter the value"
                  value={numValues.num_2 || ""}
                  onChange={handleValues}
                />
              </div>
              <div className="spceItem">
                <TextField
                  id="outlined-basic"
                  label="HOD"
                  name="hod"
                  variant="outlined"
                  error={!numValues.hod}
                  helperText="please enter the value"
                  value={numValues.name || ""}
                  onChange={handleValues}
                />
                <TextField
                  id="outlined-basic"
                  label="CPU"
                  variant="outlined"
                  name="cpu"
                  required
                  error={!numValues.cpu}
                  value={numValues.cpu || ""}
                  helperText="enter license no"
                  onChange={handleValues}
                />
                <TextField
                  id="outlined-basic"
                  label="License"
                  variant="outlined"
                  required
                  name="license"
                  error={!numValues.license}
                  value={numValues.license || ""}
                  helperText="enter license no"
                  onChange={handleValues}
                />
              </div>
              <br />
              <br />
              <Button variant="contained" onClick={handleClickOpen}>
                Add To Cart
              </Button>
            </div>
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Do You Want More Number"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    More Numbers
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => navigate("/cameras")}>Disagree</Button>
                  <Button onClick={() => navigate("/recorder")} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default NVRINFO;
