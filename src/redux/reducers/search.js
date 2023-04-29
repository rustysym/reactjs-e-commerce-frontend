export const searchReducer = (state={search:[]},action) => {
    switch(action.type){
        case "SEARCH":
            return{
                search: action.payload
            }
        default: 
        return state
    }
    }