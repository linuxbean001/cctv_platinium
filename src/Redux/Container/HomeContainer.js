import { connect } from "react-redux";
import Home from "../../Component/Templates/Home";
import AddCart from "../../Component/Templates/AddCart";
import Cameras from "../../Component/Templates/Cameras";
import { addToCart } from "../../Services/Actions/actions";
import Recorder from "../../Component/Templates/Recorder";
import NVRINFO from "../../Component/Templates/NVRINFO";
import POEs from "../../Component/Templates/POEs";
import Hardware from "../../Component/Templates/Hardware";
import Cabling from "../../Component/Templates/Cabling";
import CheckCart from "../../Component/CheckItem/CheckCart";
import ExtraHardware from "../../Component/Templates/ExtraHardware";
import Special from "../../Component/Templates/Special";
import LaborRate from "../../Component/Templates/LaborRate";

const mapStateToProps = (state) => ({
  userDetail: state.cardItem,
});

const mapDispatchToProps = (dispatch) => ({
  addToCartHandler: (userDetail) => dispatch(addToCart(userDetail)),
});

export default {
  AddCart: connect(mapStateToProps, mapDispatchToProps)(AddCart),
  Home: connect(mapStateToProps, mapDispatchToProps)(Home),
  Recorder: connect(mapStateToProps, mapDispatchToProps)(Recorder),
  NVRINFO: connect(mapStateToProps, mapDispatchToProps)(NVRINFO),
  Cameras: connect(mapStateToProps, mapDispatchToProps)(Cameras),
  POEs: connect(mapStateToProps, mapDispatchToProps)(POEs),
  Hardware: connect(mapStateToProps, mapDispatchToProps)(Hardware),
  Cabling: connect(mapStateToProps, mapDispatchToProps)(Cabling),
  CheckCart: connect(mapStateToProps, mapDispatchToProps)(CheckCart),
  ExtraHardware: connect(mapStateToProps, mapDispatchToProps)(ExtraHardware),
  Special: connect(mapStateToProps, mapDispatchToProps)(Special),
  LaborRate: connect(mapStateToProps, mapDispatchToProps)(LaborRate),
};


