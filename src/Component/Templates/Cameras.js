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
import { Modal } from "@mui/material/Modal";

function Cameras(props) {
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const [openNest, setOpenNest] = React.useState(false);
  const [openInnerModal, setInnerModal] = React.useState(false);
  const [cameraDetail, setCamerDetail] = React.useState([]);
  const [cameraModal, setCameraModal] = React.useState([]);
  const cameras_Option = [
    "PTZ",
    "NDAA",
    "Wifi",
    "Bullets",
    "LPRS",
    "Demo",
    "Doorbells",
    'Turrrets'
  ];

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (e) => {

    setCamerDetail({ cameraType: e.target.value });

    setOpenNest(true)
  };
  console.log('camearaDetails',cameraDetail.cameraType)
  const handleNestClose = () => {
    props.addToCartHandler({cameraType:cameraDetail.cameraType});
    setOpenNest(false);
  };
  const handleNestOpen = () => {
    setOpen(true);
  };
  const handleInnerNestClose = () => {
    console.log('hello')
    setInnerModal(false);
    setOpen(false);
  };
  const handleInnerNestOpen = () => {
    setInnerModal(true);
  };
  console.log("cameraDetail", cameraDetail);

  const navigate = useNavigate();
  const navigateNextPage = () => {

    navigate("/poe_s");
  };

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
        <Dialog open={openNest} onClose={handleClose}>
          <DialogTitle> Tuesstes</DialogTitle>
          <DialogContent>
            <DialogContentText>Total Camera</DialogContentText>
            <Button color="secondary" onClick={handleNestOpen}>
              Modal 1
            </Button>
            <Button color="secondary" onClick={handleNestOpen}>
              Modal 2
            </Button>
            <Button color="secondary" onClick={handleNestOpen}>
              Modal 3
            </Button>
            <Button color="secondary" onClick={handleNestOpen}>
              Modal 4
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNestClose}>Cancel</Button>
            <Button onClick={handleNestClose}>Next</Button>
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
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button variant="contained" onClick={() => navigate("/")}>
                Edit
              </Button>
              {cameras_Option.map((types) => {
                return (
                  <Button onClick={handleOpen} value={types} name={types}>
                    {types}
                  </Button>
                );
              })}

              <Button variant="contained" onClick={navigateNextPage}>
                Next
              </Button>
            </div>
          </Paper>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle> Tuesstes</DialogTitle>
          <DialogContent>
            <DialogContentText>Total Camera</DialogContentText>
            <Button color="secondary" onClick={handleNestClose}>
              Modal 4
            </Button>
            <br />
            <TextField id="standard-basic" label="QTY" variant="standard" />
            <TextField id="standard-basic" label="WALL" variant="standard" />
            <TextField
              id="standard-basic"
              label="Junction"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInnerNestOpen}>Add</Button>
          </DialogActions>
        </Dialog>

        {/*add button Modal//nested Modal*/}
        <Dialog open={openInnerModal} onClose={handleInnerNestClose}>
          <DialogTitle> Warning </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Less button Brackets than Camera
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInnerNestClose}>Continue Anyway</Button>
            <Button onClick={handleNestOpen}>Go Back</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </React.Fragment>
  );
}

export default Cameras;
