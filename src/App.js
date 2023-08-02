
import RoutesMiddleware from "./Component/Routes/RoutesMiddleware";
import React from "react";
import HomeContainer from "./Redux/Container/HomeContainer";

import LandingPage from "./Design/LandingPage";



function App() {

  return (

  <div className="App">
    {/*     
    <HomeContainer.CheckCart/>
    <RoutesMiddleware/>
*/}
<LandingPage/>
  </div>
  );
}

export default App;
