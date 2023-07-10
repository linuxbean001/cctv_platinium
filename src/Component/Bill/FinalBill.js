import React from 'react'
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

function FinalBill({data}) {
     const navigate = useNavigate();

     console.log(data)

  return (
    <div>
    <Paper variant="outlined" square={true} color="red">

    <h1>Total Bill</h1>
    </Paper>
    </div>
  )
}

export default FinalBill