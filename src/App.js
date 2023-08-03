
import RoutesMiddleware from "./Component/Routes/RoutesMiddleware";
import React from "react";
import HomeContainer from "./Redux/Container/HomeContainer";

import LandingPage from "./Design/LandingPage";
import FinalCart from "./Design/finalcart/FinalCart";


import SideBar from "./Component/SideBar/SideBar";
import NavBar from "./Component/Header/NavBaR";

import Nvr from "./Design/nvrrecorder/Nvr";




function App() {

  return (

  <div className="App">
    {/*     
    <HomeContainer.CheckCart/>
*/}

   <NavBar/>
  <RoutesMiddleware/>
  <SideBar/>

  <Nvr/>
 
  </div>
  );
}

export default App;
