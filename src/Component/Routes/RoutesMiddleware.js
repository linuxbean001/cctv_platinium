import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";


import ExtraHardware from "../Templates/ExtraHardware";
import Special from "../Templates/Special";
import LaborRate from "./../Templates/LaborRate";
import SVCCall from "../Templates/SVC_Call";
import HomeContainer from "../../Redux/Container/HomeContainer";

function RoutesMiddleware() {
  const [data, setData] = React.useState({});

  const updateData = (newData) => {
    setData(newData);
  };
  return (
    <div className="Routes">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeContainer.Home />} />
          <Route exact path="/recorder" element={<HomeContainer.Recorder/>} />
          <Route exact path="/nvr_info" element={<HomeContainer.NVRINFO />} />
          <Route exact path="/cameras" element={<HomeContainer.Cameras />} />
          <Route exact path="/poe_s" element={<HomeContainer.POEs />} />
          <Route exact path="/hardware" element={<HomeContainer.Hardware />} />
          <Route exact path="/cabling" element={<HomeContainer.Cabling />} />
          <Route exact path="/extra_hardware" element={<ExtraHardware />} />
          <Route exact path="/labor_rate" element={<LaborRate />} />
          <Route exact path="/special" element={<Special />} />
          <Route exact path="/svc_call" element={<SVCCall />} />
          <Route
            exact
            path="/add_to_cart"
            element={<HomeContainer.AddCart />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesMiddleware;
