import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "@mui/material/Modal";

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

function CheckCart(props) {
  console.log(props);
  const [show, setShow] = React.useState(false);
  const [userDetail, setUserDetails] = React.useState([]);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  React.useEffect(() => {
    setUserDetails({
      customer_Information: props.userDetail[0],
      camera_location: props.camera_Location[0],
      camera_Type: props.camera_Type[0],
      nvr_type: props.nvr_type[0],
      ports_Detail: props.ports_Detail[0],
      hardware_Type: props.hardware_Type[0],
      cable_Name: props.cable_Name[0],
      camera_number: props.camera_number[0],
    });
  }, []);
  console.log(userDetail);
  // userDetail.camera_location.map((item)=>{
  //   console.log("userDetail State", item);
  // })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Billing
          </Typography>
          <Button color="inherit" onClick={handleShow}>
            Check Cart Item
          </Button>
        </Toolbar>

        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Check Cart Item
            </Typography>

            <Typography id="modal-modal-description">
              {props.userDetail.map((item, index) => {
                if (index == props.userDetail.length - 1)
                  return (
                    <Typography>
                      <div className="cardItemModal_name">
                        <label>Name</label>
                        <p className="cardItemModal_para">{item.name}</p>
                      </div>
                      <div className="cardItemModal_name">
                        <label>email</label>
                        <p className="cardItemModal_para">{item.email}</p>
                      </div>
                      <div className="cardItemModal_name">
                        <label>phone</label>
                        <p className="cardItemModal_para">{item.phone}</p>
                      </div>
                      <div className="cardItemModal_name">
                        <label>address</label>
                        <p className="cardItemModal_para">{item.address}</p>
                      </div>{" "}
                      <div className="cardItemModal_name">
                        <label>Business</label>
                        <p className="cardItemModal_para">{item.business}</p>
                      </div>
                    </Typography>
                  );
              })}
              <div className="cardItemModal_name">
                <label>Camera Location</label>
                <p className="cardItemModal_para">userDetail.camera_location.temp_bt</p>
              </div>
              <div className="cardItemModal_name">
                <label>Camera Number</label>
                <p className="cardItemModal_para">userDetail.</p>
              </div>
            </Typography>
          </Box>
        </Modal>
      </AppBar>
    </Box>
  );
}

export default CheckCart;
