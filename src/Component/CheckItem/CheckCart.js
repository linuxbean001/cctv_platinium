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
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const storedData = JSON.parse(
    JSON.parse(localStorage.getItem("persist:bill_Details")).cardItem
  );
  // console.log("aded itenm", storedData);
  const nvr_type = JSON.parse(
    JSON.parse(localStorage.getItem("persist:bill_Details")).nvrReducer
  );

  const cameraLocaiton = JSON.parse(
    JSON.parse(localStorage.getItem("persist:bill_Details")).cameraLocation
  );
  const cameraNumber = JSON.parse(
    JSON.parse(localStorage.getItem("persist:bill_Details")).cameraNumber
  );
  const nvrInfo = JSON.parse(
    JSON.parse(localStorage.getItem("persist:bill_Details")).nvrInfoReducer
  );

  const cameraType = JSON.parse(
    JSON.parse(localStorage.getItem("persist:bill_Details")).cameraTypeName
  );
  const cameraLocation = JSON.parse(
    JSON.parse(localStorage.getItem("persist:bill_Details")).cameraLocation
  );
  console.log(
    cameraLocation[cameraLocation.length - 1].cameraLocation.temp_btn
  );

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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              User Detail
            </Typography>
            <Typography id="modal-modal-description">
              <div className="cardItemModal_name">
                <label>Name</label>
                <p className="cardItemModal_para">
                  {storedData[storedData.length - 1].cardData.name}
                </p>
              </div>
              <div className="cardItemModal_name">
                <label>Business</label>
                <p className="cardItemModal_para">
                  {storedData[storedData.length - 1].cardData.business}
                </p>
              </div>
              <div className="cardItemModal_name">
                <label>Address</label>
                <p className="cardItemModal_para">
                  {storedData[storedData.length - 1].cardData.address}
                </p>
              </div>
              <div className="cardItemModal_name">
                <label>Email</label>
                <p className="cardItemModal_para">
                  {storedData[storedData.length - 1].cardData.email}
                </p>
              </div>
              <div className="cardItemModal_name">
                <label>Phone</label>
                <p className="cardItemModal_para">
                  {storedData[storedData.length - 1].cardData.phone}
                </p>
              </div>
              <div className="cardItemModal_name">
                <label>Camera Location</label>
                <p className="cardItemModal_para">
                  {
                    cameraLocation[cameraLocation.length - 1].cameraLocation
                      .temp_btn
                  }
                </p>
              </div>

              <div className="cardItemModal_name">
                <label>Total Camera No</label>
                <p className="cardItemModal_para">
                  {cameraNumber[cameraNumber.length - 1].cameraNumber}*500$
                </p>
                <p className="cardItemModal_para">
                  {500 * cameraNumber[cameraNumber.length - 1].cameraNumber}
                </p>
              </div>

              <div className="cardItemModal_name">
                <label>Nvr Types</label>
                <p className="cardItemModal_para">
                  {nvr_type[nvr_type.length - 1].nvrData}
                </p>
                <p className="cardItemModal_para">
                  {cameraNumber[cameraNumber.length - 1].cameraNumber ===
                  "micro_nvr"?cameraNumber[cameraNumber.length - 1].cameraNumber ===
                  "mid_nvr"
                    ? 500
                    : 700 :600}
                </p>
              </div>

              <div className="cardItemModal_name">
                <label>NVR Information</label>
                <p className="cardItemModal_para">
                  {nvrInfo[0].nvrDetails.num}
                </p>
                <p className="cardItemModal_para">----</p>
              </div>

              <div className="cardItemModal_name">
                <label>Camera type</label>
                <p className="cardItemModal_para">
                  {cameraType[13].cameraTypeName}
                </p>
                <p className="cardItemModal_para">
                  {cameraType[13].cameraTypeName === "Turrrets" ? 5000 : 6000}
                </p>
              </div>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="cardItemModal_name">
                <label style={{ fontWeight: "bold" }}>Total</label>
                <p className="cardItemModal_para">
                  {(cameraNumber[cameraNumber.length - 1].cameraNumber ===
                  "micro_nvr"
                    ? 500
                    : 600) +
                    (cameraType[13].cameraTypeName === "Turrrets"
                      ? 5000
                      : 6000) +
                    500 * cameraNumber[cameraNumber.length - 1].cameraNumber}
                </p>
              </div>
            </Typography>
          </Box>
        </Modal>
      </AppBar>
    </Box>
  );
}

export default CheckCart;
