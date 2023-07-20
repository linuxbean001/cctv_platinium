import { HARDWARE_REDUCER } from "../constant";

const  initialState ={
   hardWarDeatil:[]
}

export default function hardWareDetail(state=initialState.hardWarDeatil, action){
     switch (action.type) {
          case HARDWARE_REDUCER:
               return [...state, action.data ];

               break;
             default:
               return state;
           }
}