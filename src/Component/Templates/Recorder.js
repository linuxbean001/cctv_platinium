import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";

function Recorder(props) {
  console.log("recorder", props);
  const [open, setOpen] = React.useState(false);
  const [cameraNumbers, setCameraNumbers] = React.useState({});
  const [recorder, setRecorderType] = React.useState({});

  // console.log(data)
  React.useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    navigate("/");
  };

  const nextPage = (e) => {
    setOpen(false);
  };

  const handleRecorder = (e) => {
    const { name, value } = e.target;
    setRecorderType((prev) => {
      console.log(prev);
      return {
        ...prev,
        [name]: value,
      };
    });
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
          <DialogTitle> Total Camera</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Camera Quantity"
              type="number"
              value={cameraNumbers.value || ""}
              onChange={(e) => {
                setCameraNumbers({ value: e.target.value });
              }}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!cameraNumbers.value} onClick={nextPage}>
              Next
            </Button>
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
            <h1>NVR RECORDERS</h1>
            <FormGroup
              style={{ width: "90%", margin: "0 auto", display: "flex" }}
            >
              <div className="checkBox_Recorder">
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Micro NVR"
                  color="success"
                  name="micro_nvr"
                  value={recorder.micro_nvr || ""}
                  onChange={handleRecorder}
                />
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Mid NVR"
                  color="success"
                  name="mic_nvr"
                  value={recorder.mic_nvr || ""}
                  onChange={handleRecorder}
                />
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Platinum NVR"
                  color="success"
                  name="platinum_nvr"
                  value={recorder.platinum_nvr || ""}
                  onChange={handleRecorder}
                />
              </div>
            </FormGroup>
            <div className="btn_pad">
              <Button
                variant="contained"
                disabled={!recorder}
                onClick={() => navigate("/templates")}
              >
                Next
              </Button>
            </div>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Recorder;
