export const cartReducer = (state={cartItems:[]},action) => {
    switch(action.type){
        case "ADD_CART":
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.id === item.payload);

            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x=> x.id === existItem.id ? item : x)
                }
            }
            else{
                return{
                    ...state,
                    cartItems: [...state.cartItems,item]
                }
            }
        case "REMOVE_CART":
                return{
                    cartItems: state.cartItems.filter(x=>x.id !== action.payload)
                }
            
        default: 
        return state
    }
    }