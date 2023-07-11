import { connect } from "react-redux";
import Home from "../Component/Templates/Home";
import AddCart from "../Component/Templates/AddCart";
import { addToCart } from "../Services/Actions/actions";
import { cameraLocation } from "../Services/Actions/actions";
import { nvrType } from "../Services/Actions/actions";
import Recorder from "../Component/Templates/Recorder";
import Templates from "../Component/Templates/Templates";
const mapStateToProps = (state) => ({
  data: state.cardItem,
  item : state.nvrData,
 
});

const mapDispatchToProps = (dispatch) => ({
  addToCartHandler: (data) => dispatch(addToCart(data)),
  addToLocationHandler: (data) => dispatch(cameraLocation(data)),
  addNvrType:(item)=>dispatch(nvrType(item))
});

export default {
  AddCart: connect(mapStateToProps, mapDispatchToProps)(AddCart),
  Home: connect(mapStateToProps, mapDispatchToProps)(Home),
  Recorder: connect(mapStateToProps, mapDispatchToProps)(Recorder),
  Templates: connect(mapStateToProps, mapDispatchToProps)(Templates),
};
