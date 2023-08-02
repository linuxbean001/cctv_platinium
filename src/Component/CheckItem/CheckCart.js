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
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
  width: '70%'
};
const modalStyle1 = {
  margin: 'auto',
  display: "block",
};

// Table Code Starts Here

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Camera Location', 159, 6.0, 24, 4.0),
  createData('Camera Number', 237, 9.0, 37, 4.3),
  createData('NVR Types', 262, 16.0, 24, 6.0),
  createData('NVR License', 305, 3.7, 67, 4.3),
  createData('Camera Types', 356, 16.0, 49, 3.9),
  createData('Ports Name', 356, 16.0, 49, 3.9),
  createData('Total Camera', 356, 16.0, 49, 3.9),

  
];
// Table Code Ends Here

function CheckCart(props) {
  console.log("check cart Item", props.userDetail);
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState([]);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  let cameraDetails = {};
  let cameraItems = []
  for (let i = 0; i <= props.userDetail.length; i++) {
    Object.assign(cameraDetails, props.userDetail[i])
  }



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
    ], Object.keys(cameraDetails).length > 1 ?
      [cameraDetails.customerDetails.name, cameraDetails.customerDetails.email, cameraDetails.customerDetails.business,
      cameraDetails.customerDetails.phone, cameraDetails.temp_btn,
      cameraDetails.cameraType, cameraDetails.nvrType, cameraDetails.license, cameraDetails.portsName,
      cameraDetails.special_Types
      ] : [],
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
              Check Cart Item :
            </Typography>
{/* 1 */}


            <Grid container sx={{ backgroundColor: '',margin:'10px 0' }}>

              <Grid xs={6} items sx={{ backgroundColor: '' }} >
                <Box sx={{display:'flex', justifyContent:'space-around',border:'1px solid black'}}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ backgroundColor: '' }}>
                    Name
                  </Typography>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ backgroundColor: '' }}>
                    Ravi Rathore
                  </Typography>
                </Box>
              </Grid>

              <Grid xs={6} items sx={{ backgroundColor: '' }} >
                <Box sx={{display:'flex', justifyContent:'space-around',border:'1px solid black'}}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ backgroundColor: '' }}>
                    Email
                  </Typography>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ backgroundColor: '' }}>
                    ravi@r.com
                  </Typography>
                </Box>
              </Grid>
         </Grid>

{/* 2 */}
         <Grid container sx={{ backgroundColor: '',margin:'10px 0' }}>

              <Grid xs={6} items sx={{ backgroundColor: '' }} >
                <Box sx={{display:'flex', justifyContent:'space-around',border:'1px solid black'}}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ backgroundColor: '' }}>
                    Phone
                  </Typography>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ backgroundColor: '' }}>
                    +919685131337
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={6} items sx={{ backgroundColor: '' }} >
                <Box sx={{display:'flex', justifyContent:'space-around',border:'1px solid black'}}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ backgroundColor: '' }}>
                    Address
                  </Typography>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ backgroundColor: '' }}>
                    Indore
                  </Typography>
                </Box>
              </Grid>
        </Grid>

{/* Part 2 */}

<Grid container sx={{ backgroundColor: '',margin:'10px 0' }}>

<Grid xs={12} items sx={{ backgroundColor: '' }} >
  <Box sx={{display:'flex', justifyContent:'space-around',border:'1px solid black'}}>
    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ backgroundColor: '' }}>
      Business
    </Typography>
    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ backgroundColor: '' }}>
     Web Dev Company
    </Typography>
  </Box>
</Grid>

</Grid>

{/* Table */}
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Items Details :</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>

            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">

                <Box>
                  <Grid container sx={{backgroundColor:''}}>

                    <Grid xs={3} items sx={{backgroundColor:''}}>
                      <AddIcon className="common_icon"/>
                    </Grid>
                    <Grid xs={3} items sx={{backgroundColor:''}}>
                      <RemoveIcon className="common_icon"/>
                    </Grid>
                  </Grid>
                </Box>
              </TableCell>

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

          </Box>

        </Modal>
      </AppBar>
    </Box>
  );
}

export default CheckCart;
