import RoutesMiddleware from "./Component/Routes/RoutesMiddleware";
import React from "react";
import NavBar from "./Component/Header/NavBaR";

function App() {
  return (
    <div className="App">
      <NavBar />
      <RoutesMiddleware />
    </div>
  );
}

export default App;
