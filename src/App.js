
import RoutesMiddleware from "./Component/Routes/RoutesMiddleware";
import React from "react";

import HomeContainer from "./Redux/Container/HomeContainer";



function App() {

  return (

  <div className="App">
    <HomeContainer.CheckCart/>
    <RoutesMiddleware/>

  </div>
  );
}

export default App;
