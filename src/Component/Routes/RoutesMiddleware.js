import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Recorder from "./../Templates/Recorder";
import Templates from "./../Templates/Templates";
import Cameras from "./../Templates/Cameras";
import POEs from "./../Templates/POEs";
import Hardware from "./../Templates/Hardware";
import Cabling from "../Templates/Cabling";
import ExtraHardware from "../Templates/ExtraHardware";
import Special from "../Templates/Special";
import LaborRate from "./../Templates/LaborRate";
import SVCCall from "../Templates/SVC_Call";
import Home from "./../Templates/Home";

import FinalBill from "../Bill/FinalBill";
import HomeContainer from '../../Container/HomeContainer'

function RoutesMiddleware() {
  const [data, setData] = React.useState({});

  const updateData = (newData) => {
    setData(newData);
  };
  return (
    <div className="Routes">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeContainer/>} />
          <Route exact path="/recorder" element={<Recorder data={data}/>} />
          <Route exact path="/templates" element={<Templates />} />
          <Route exact path="/cameras" element={<Cameras />} />
          <Route exact path="/poe_s" element={<POEs />} />
          <Route exact path="/hardware" element={<Hardware />} />
          <Route exact path="/cabling" element={<Cabling />} />
          <Route exact path="/extra_hardware" element={<ExtraHardware />} />
          <Route exact path="/labor_rate" element={<LaborRate />} />
          <Route exact path="/special" element={<Special />} />
          <Route exact path="/svc_call" element={<SVCCall />} />
          <Route exact path="/final_bill" element={<FinalBill data={data} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesMiddleware;
