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

  const handleClickOpen = (e) => {
    props.addToCartHandler(numValues);
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
          <Paper variant="outlined" square={true} color="red" style={{display:'flex'}}>
            <div style={{ display: "inline-block", margin: "35px auto" ,}}>
              <div className="checkBox_Recorder">
                <Button
                  style={{ margin: "0" }}
                  onClick={handleValues}
                  variant="contained"
                  name="nvr"
                >
                NVR
                </Button>

                <Button
                  style={{margin: '14px 0' }}
                  onClick={handleValues}
                  variant="contained"
                  name="nvr1"
                >
                 NVR 1
                </Button>

                <Button
                  key="button_name"
                  style={{ margin: "0" }}
                  onClick={handleValues}
                  variant="contained"
                  name="nvr2"
                >
                 NVR 2
                </Button>
              </div>
              <div>
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
                <TextField
                  id="outlined-basic"
                  label="HDD"
                  variant="outlined"
                  required
                  name="license"
                  error={!numValues.license}
                  value={numValues.license || ""}
                  helperText="enter license no"
                  onChange={handleValues}
                />
                <TextField
                id="outlined-basic"
                label="CPM"
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
