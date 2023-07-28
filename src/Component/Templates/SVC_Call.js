import React from 'react'
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

function SVCCall() {
     
     const navigate = useNavigate();
  return (
     <Paper variant="outlined" square={true} color="red">
     <Button variant="contained" onClick={() => navigate("/add_to_cart")}>Next</Button>
     </Paper>
     )
}

export default SVCCall