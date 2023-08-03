
import RoutesMiddleware from "./Component/Routes/RoutesMiddleware";
import React from "react";
import HomeContainer from "./Redux/Container/HomeContainer";

import LandingPage from "./Design/LandingPage";
import FinalCart from "./Design/finalcart/FinalCart";



function App() {

  return (

  <div className="App">
    {/*     
    <HomeContainer.CheckCart/>
*/}
  <FinalCart/>

  </div>
  );
}

export default App;
