import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "@mui/material/Modal";
import { CSVLink, CSVDownload } from "react-csv";
import Cameras from './../Templates/Cameras';



const style = {
  position: "absolute",
  top: "10%",
  left: "50%",
  // overflow: "scroll",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  height: '500px',
  margin: "auto",
  marginTop: '20%',
  width:'70%'
};
const modalStyle1 = {
  margin: 'auto',
  display: "block",
};

function CheckCart(props) {
  console.log("check cart Item", props);
  const [show, setShow] = React.useState(false);
 
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [cameraDetails, setCameraDetails] = React.useState({});

 React.useEffect(() => {
    // Update cameraDetails whenever props.userDetail changes
    if (props.userDetail.length > 0) {
      let cameraDetailsObj = {};
      for (let i = 0; i < props.userDetail.length; i++) {
        Object.assign(cameraDetailsObj, props.userDetail[i]);
      }
      setCameraDetails(cameraDetailsObj);
    }
  }, [props.userDetail]);

  const csvData = [
    [
      "firstname",
      "email",
      "buisnnes",
      "phone Number",
      "Camera Location",
      "cameraType",
      "nvrType",
      "license",
      "Ports Name",
      "Special Types"
    ],Object.keys(cameraDetails).length>1?
    [cameraDetails.customerDetails.name, cameraDetails.customerDetails.email, cameraDetails.customerDetails.business,
    cameraDetails.customerDetails.phone, cameraDetails.temp_btn,
    cameraDetails.cameraType, cameraDetails.nvrType, cameraDetails.license, cameraDetails.portsName,
    cameraDetails.special_Types
    ]:[],
  ];

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
          sx={modalStyle1}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Check Cart Item  {}
            </Typography>

            <Typography id="modal-modal-description" variant = 'h3'>
             
                <Typography>
                <div className="cardItemModal_name">
                  <label>Name</label>
                  <p className="cardItemModal_para">
                    {(cameraDetails.customerDetails) ? cameraDetails.customerDetails.name : ''}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>email</label>
                  <p className="cardItemModal_para">
                    {(cameraDetails.customerDetails)?cameraDetails.customerDetails.email:null}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>phone</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.customerDetails.phone}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>address</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.customerDetails.address}
                  </p>
                </div>{" "}
                <div className="cardItemModal_name">
                  <label>Business</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.customerDetails.business}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>Camera Location</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.temp_btn}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>Camera Number</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.cameraNumber}
                  </p>
                  {cameraDetails.cameraNumber * 3000}
                </div>
                <div className="cardItemModal_name">
                  <label>Nvr Types</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.nvrType}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>Nvr License</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.license}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>Camera Types</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.cameraType}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>Ports Name</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.portsName}
                  </p>
                </div>
               
                <div className="cardItemModal_name">
                  <label>Total Ports</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.portvalues.total_camera}
                  </p>
                  <p className="cardItemModal_para">
                    {cameraDetails.portvalues.total_camera === "RACKS"
                      ? 1000 + "$"
                      : 5000 + "$"}
                  </p>
                  <p className="cardItemModal_para"></p>
                </div>
                <div className="cardItemModal_name">
                  <label>HardWare Level</label>
                  <p className="cardItemModal_para">
                    {cameraDetails.hardwareLevel}
                  </p>
                </div>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Extra Hardware
                </Typography>
                <div className="cardItemModal_name">
                  <label>Adapter</label>
                  <p className="cardItemModal_para">
                    {(cameraDetails.extraHardware)?cameraDetails.extraHardware.adapter:null}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>Mounts</label>
                  <p className="cardItemModal_para">
                    {(cameraDetails.extraHardware)?cameraDetails.extraHardware.mounts:null}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>Extends</label>
                  <p className="cardItemModal_para">
                    {(cameraDetails.extraHardware)?cameraDetails.extraHardware.extends:null}
                  </p>
                </div>
                <div className="cardItemModal_name">
                  <label>Connecters</label>
                  <p className="cardItemModal_para">
                    {(cameraDetails.extraHardware)?cameraDetails.extraHardware.connecters:null}
                  </p>
                </div>
             
              </Typography>
             
            </Typography>
            
            <CSVLink data={csvData}>Export in csv</CSVLink>
          </Box>
      
        </Modal>
      </AppBar>
    </Box>
  );
}

export default CheckCart;
