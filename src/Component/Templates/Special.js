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
import Stack from "@mui/material/Stack";

function Special(props) {
  console.log(props)
  const [open, setOpen] = React.useState(false);
  const special_Types = ['VCA', 'CMS', 'LPR', 'TVS', 'HDMI/USB', 'CMS', 'RACKS', 'Cable Management & Conduct']

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (e) => {
    let namess = e.target.name
   props.addToCartHandler({special_Types:namess})
    console.log(namess)
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

          <DialogContent>
            <DialogContentText>{2+2}</DialogContentText>
            <Button onClick={handleClose}>PTP</Button>
            <Button onClick={handleClose}>PTMP</Button>
            <Button onClick={handleClose}>BACK</Button>
          </DialogContent>

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
            <h1>Special</h1>
            
            <Stack spacing={2} direction="row" m={2}>
              {special_Types.map((btn_types) => {
                return (
                  <Button variant="contained" name={btn_types} onClick={handleOpen}>
                    {btn_types}
                  </Button>
                )
              }
              )}


            </Stack>

            <Button variant="contained" onClick={() => navigate("/labor_rate")}>
              Next
            </Button>
          </Paper>
        </Box>


      </Container>
    </React.Fragment>
  );
}

export default Special;
