import { ADD_TO_CARD } from '../constant'
export const addToCart=(data)=>{
     // console.log('action',data)
     return {
          type: ADD_TO_CARD,
          data:data
     }
}

export const removeToCart=(data)=>{
     return{
          type: 'REMOVE_ITEM',
          data:data
}
}