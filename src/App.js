import RoutesMiddleware from "./Component/Routes/RoutesMiddleware";
import React from "react";
import HomeContainer from "./Redux/Container/HomeContainer";

import LandingPage from "./Design/LandingPage";
import FinalCart from "./Component/CheckItem/finalcart/FinalCart";

import SideBar from "./Component/SideBar/SideBar";
import NavBar from "./Component/Header/NavBaR";

import Nvr from "./Component/Templates/nvrrecorder/Nvr";

function App() {
  return (
    <div className="App">
      <NavBar />
      <RoutesMiddleware />
      <SideBar />
    </div>
  );
}

export default App;
