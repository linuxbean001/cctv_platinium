import React from "react";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { CSVLink, CSVDownload } from "react-csv";
import Stack from "@mui/material/Stack";
import Recorder from "./Recorder";

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

export default function Home(props) {
  console.log("propsss", props);
  const [open, setOpen] = React.useState(false);
  const [customerDetails, setCustomerDetail] = React.useState({});
  const [tempButton, setTempButton] = React.useState({});
  const handleClose = () => setOpen(false);

  const temp_Button = [
    "Home",
    "WareHouse",
    "InterNet",
    "Takers",
    "Deleas",
    "Custom",
    "Business",
    "Property Management",
    'Open Existing'
  ];

  React.useEffect(() => {
    // localStorage.setItem("userItem", JSON.stringify(customerDetails));
  }, []);

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setCustomerDetail((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    
  };
  const handleOpen = (e) => {
    e.preventDefault();
    props.addToCartHandler(customerDetails);
    setTempButton({ temp_btn: e.target.name });
    setOpen(true);
    console.log(tempButton);
    props.getCameraLocation({ temp_btn: e.target.name });
  };
  
  
  const submitButton = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Container
        maxWidth="xl"
        style={{
          background: "#f6fcff",
          height: "100vh",
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
            <h1>PLEASE CHOOSE OPTION</h1>

            <div className="MuiFormControl" style={{ display: "block" }}>
              <div className="spceItem">
                <TextField
                  id="filled-basic"
                  label="Customer Name"
                  variant="filled"
                  name="name"
                  value={customerDetails.name || ""}
                  onChange={handleSubmit}
                />
                <TextField
                  id="filled-basic"
                  label="Business"
                  variant="filled"
                  name="business"
                  value={customerDetails.business || ""}
                  onChange={handleSubmit}
                />
              </div>
              <div className="spceItem">
                <TextField
                  id="filled-basic"
                  label="Address"
                  variant="filled"
                  name="address"
                  value={customerDetails.address || ""}
                  onChange={handleSubmit}
                />
                <TextField
                  id="filled-basic"
                  label="Phone"
                  name="phone"
                  value={customerDetails.phone || ""}
                  variant="filled"
                  onChange={handleSubmit}
                />
              </div>
              <TextField
                id="filled-basic"
                label="Email"
                name="email"
                value={customerDetails.email || ""}
                variant="filled"
                onChange={handleSubmit}
              />
            </div>
            <Stack spacing={2} direction="row" m={2}>
              {temp_Button.map((button_name) => {
                return (
                  <Button
                    key={button_name}
                    style={{ margin: "0" }}
                    onClick={handleOpen}
                    variant="contained"
                    name={button_name}
                  >
                    {button_name}
                  </Button>
                );
              })}
            </Stack>
          </Paper>
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
                Do You Want Use Template ?
              </Typography>
              <Box>
                <Button variant="contained" style={{ margin: "0 5px" }}>
                  Yes
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: "0 5px", background: "red" }}
                  onClick={() => navigate("recorder")}
                >
                  No
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Container>
    </React.Fragment>
  );
}
