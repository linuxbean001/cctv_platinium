import { connect } from 'react-redux';
import Home from '../Component/Templates/Home';
import Recorder from '../Component/Templates/Recorder';
import {addToCart } from '../Services/Actions/actions';
import cardItem from './../Services/Reducers/reducers';

const mapStateToProps=state=>({
    data:state.cardItem
     //cardData:state.data
})

const mapDispatchToProps=dispatch=>({
     addToCartHandler:data =>dispatch(addToCart(data))
})

// export const ConnectedHomePage = connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home,Recorder);
