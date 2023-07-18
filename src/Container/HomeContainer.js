import { connect } from "react-redux";
import Home from "../Component/Templates/Home";
import AddCart from "../Component/Templates/AddCart";
import Cameras from "../Component/Templates/Cameras"
import { addToCart } from "../Services/Actions/actions";
import { cameraLocation } from "../Services/Actions/actions";
import { nvrType } from "../Services/Actions/actions";
import { cameraNumber } from "../Services/Actions/actions";
import Recorder from "../Component/Templates/Recorder";
import NVRINFO from "../Component/Templates/NVRINFO";
import { nvrDetails } from "../Services/Actions/actions";
import { cameraType } from "../Services/Actions/actions";
import { portTypes } from "../Services/Actions/actions";
import POEs from "../Component/Templates/POEs";
import { hardwareTypes } from "../Services/Actions/actions";
import Hardware from "../Component/Templates/Hardware";
const mapStateToProps = state => ({
 
  userDetail: state.cardItem,
  nvr_type : state.nvrReducer,
  nvr_details:state.nvrInfoReducer,
  camera_number: state.cameraNumber,
  camera_Location: state.cameraLocation,
  ports_Detail: state.portsReducer,
  hardware_Type: state.hardWareDetail

});

const mapDispatchToProps = dispatch => ({
  addToCartHandler: userDetail=> dispatch(addToCart(userDetail)),
  addToLocationHandler: (data) => dispatch(cameraLocation(data)),
  addNvrType:(nvr_type)=>dispatch(nvrType(nvr_type)),
  getNvrDetails:(nvr_details)=>dispatch(nvrDetails(nvr_details)),
  getCameraNumber:(camera_number)=>dispatch(cameraNumber(camera_number)),
  getCameraLocation:(camera_Location)=>dispatch(cameraLocation(camera_Location)),
  getCameraType:(camera_Type)=>dispatch(cameraType(camera_Type)),
  getPortsDetails:(ports_Detail)=>dispatch(portTypes(ports_Detail)),
  gethardWareDetails:(hardware_Type)=>dispatch(hardwareTypes(hardware_Type))
});

export default {
  AddCart: connect(mapStateToProps, mapDispatchToProps)(AddCart),
  Home: connect(mapStateToProps, mapDispatchToProps)(Home),
  Recorder: connect(mapStateToProps, mapDispatchToProps)(Recorder),
  NVRINFO: connect(mapStateToProps, mapDispatchToProps)(NVRINFO),
  Cameras:connect(mapStateToProps, mapDispatchToProps)(Cameras),
  POEs:connect(mapStateToProps, mapDispatchToProps)(POEs),
  Hardware:connect(mapStateToProps, mapDispatchToProps)(Hardware)
};
