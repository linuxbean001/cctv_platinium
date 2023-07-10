import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
function POEs() {
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
            
            <h1>POEs</h1>
          
            <Grid item  container spacing={1}>
            <Grid item xs={6} md={8}>
            <TextField
              id="standard-basic"
              label="Total Cameras"
              variant="standard"
            />
            </Grid>
            <TextField
              id="standard-basic"
              label="Total Ports"
              variant="standard"
            />
           
            </Grid>
            <Stack spacing={2} direction="row" m={2}>
             <Button> 4 Port </Button>
             <Button> 8 Port </Button>
             <Button> 16 Port </Button>
             <Button> 24 Port </Button>
             </Stack>
            <Button variant="contained" onClick={() => navigate("/hardware")}>
              Next
            </Button>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default POEs;
