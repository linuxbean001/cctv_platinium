import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SVCCall from "../Templates/SVC_Call";
import NVRINFO from "../Templates/NVRINFO";
import ExtraHardware from "../Templates/ExtraHardware";
import Special from "../Templates/Special";
import LaborRate from "../Templates/LaborRate";
import Home from "../Templates/Home";
import FinalCart from "../CheckItem/finalcart/FinalCart";
import PoeSwitches from "../Templates/PoeSwitches";
import Test from "../Templates/Test";
import Nvr from "../Templates/nvrrecorder/Nvr";
import Cameras from "../Templates/Cameras";
import Cabling from "../Templates/Cabling";
import Hardware from "../Templates/Hardware";
import NoFound from "../Templates/NoFound";
import Pdf from "../Templates/Pdf";
function RoutesMiddleware() {
  return (
    <div className="Routes">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/nvr" element={<Nvr />} />
          <Route exact path="/nvr_info" element={<NVRINFO />} />
          <Route exact path="/cameras" element={<Cameras />} />
          <Route exact path="/hardware" element={<Hardware />} />
          <Route exact path="/cabling" element={<Cabling />} />
          <Route exact path="/extra_hardware" element={<ExtraHardware />} />
          <Route exact path="/labor_rate" element={<LaborRate />} />
          <Route exact path="/special" element={<Special />} />
          <Route exact path="/svc_call" element={<SVCCall />} />
          <Route exact path="/add_to_cart" element={<FinalCart />} />
          <Route exact path="/poe-switch" element={<PoeSwitches />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/add_to_cart" element={<FinalCart />} />
          <Route exact path="/pdf" element={<Pdf />} />


          {/* Add the 404 route at the end */}
          <Route path="*" element={<NoFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesMiddleware;
