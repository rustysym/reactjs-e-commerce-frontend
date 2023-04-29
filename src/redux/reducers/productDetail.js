export const productDetailReducer = (state={product:{}},action) => {
    switch(action.type){
        case "GET_DETAILS":
            return{
                ...state,
                product: action.payload
            }
        default: 
        return state
    }
    }