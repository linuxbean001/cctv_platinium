import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SVCCall from "../Templates/SVC_Call";
import HomeContainer from "../../Redux/Container/HomeContainer";

function RoutesMiddleware() {
  const routesComponent=[
    {
      path:"/",
      element:'HomeContainer.Home ',
      exact:true
    },
    {
      path:"/",
      element:'HomeContainer.Recorder ',
      exact:true
    },
    
    {
      path:"/",
      element:'HomeContainer.NVRINFO ',
      exact:true
    },
    
    {
      path:"/",
      element:'HomeContainer.POEs ',
      exact:true
    },
    
    {
      path:"/",
      element:'HomeContainer.Hardware ',
      exact:true
    },
    {
      path:"/",
      element:'HomeContainer.Cabling ',
      exact:true
    },
    {
      path:"/",
      element:'HomeContainer.ExtraHardware ',
      exact:true
    },
    {
      path:"/",
      element:'HomeContainer.LaborRate ',
      exact:true
    },
    {
      path:"/",
      element:'HomeContainer.SVCCall ',
      exact:true
    },
    {
      path:"/",
      element:'HomeContainer.Special ',
      exact:true
    }
  ]
  const [data, setData] = React.useState({});

  const updateData = (newData) => {
    setData(newData);
  };
  return (
    <div className="Routes">
      <BrowserRouter>
        <Routes>
        {routesComponent.map((index)=>{
          // console.log(index.path,index.element,index.exact)
        })}
          <Route exact path="/" element={<HomeContainer.Home />} />
          <Route exact path="/recorder" element={<HomeContainer.Recorder/>} />
          <Route exact path="/nvr_info" element={<HomeContainer.NVRINFO />} />
          <Route exact path="/cameras" element={<HomeContainer.Cameras />} />
          <Route exact path="/poe_s" element={<HomeContainer.POEs />} />
          <Route exact path="/hardware" element={<HomeContainer.Hardware />} />
          <Route exact path="/cabling" element={<HomeContainer.Cabling />} />
          <Route exact path="/extra_hardware" element={<HomeContainer.ExtraHardware />} />
          <Route exact path="/labor_rate" element={<HomeContainer.LaborRate />} />
          <Route exact path="/special" element={<HomeContainer.Special />} />
          <Route exact path="/svc_call" element={<SVCCall />} />
          <Route
            exact
            path="/add_to_cart"
            element={<HomeContainer.CheckCart />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesMiddleware;
