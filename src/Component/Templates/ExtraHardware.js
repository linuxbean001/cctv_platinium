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
import {useNavigate} from "react-router-dom"

function ExtraHardware() {
     const [open, setOpen] = React.useState(false);
     
     const handleClose = () => {
       setOpen(false);
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
           <DialogContentText>Total Camera</DialogContentText>
           <TextField
             autoFocus
             margin="dense"
             id="name"
             label="Camera Quantity"
             type="number"
             fullWidth
             variant="standard"
           />
         </DialogContent>
         <DialogActions>
           <Button onClick={handleClose}>Cancel</Button>
           <Button onClick={handleClose}>Next</Button>
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
         <Button variant="contained" onClick={()=>navigate("/templates")}>Power</Button>  
         <h1>Extra Hardware</h1>
           <TextField id="outlined-basic" label="Mounts" variant="outlined" />
           <TextField id="outlined-basic" label="Connecters" variant="outlined" /><br/>
           <TextField id="outlined-basic" label="Extends" variant="outlined" />
           <TextField id="outlined-basic" label="Adapter" variant="outlined" /> <br/>
           <Button variant="contained" onClick={()=>navigate("/special")}>Next</Button>
         </Paper>
       </Box>
     </Container>
   </React.Fragment>
  )
}

export default ExtraHardware