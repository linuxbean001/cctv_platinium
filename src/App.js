import AddCart from "./Component/Templates/AddCart";
import RoutesMiddleware from "./Component/Routes/RoutesMiddleware";
import React from "react";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";



function App() {
  const [cartPaper, setCartPaper] = React.useState(false);

  const showPaper = () => {
    if (cartPaper == true) {
      setCartPaper(false);
    } else {
      setCartPaper(true);
    }
  };
  return (

  <div className="App">
  
    <RoutesMiddleware/>  
    
  </div>
  );
}

export default App;
