export const cartAction = (id,quantity) => async (dispatch,getState) =>{
    const data = await fetch (`https://fakestoreapi.com/products/${id}`).then(res=>res.json())
    dispatch({type: 'ADD_CART',payload:{
    id: data.id,
    image: data.image,
    title: data.title,
    description: data.description,
    price: data.price,
    qty: quantity
    }})
    const {cart:{cartItems}}= getState();
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
}

export const removeCartAction= (productId) => (dispatch,getState) =>{
    
    dispatch({type: 'REMOVE_CART',payload:productId})
    const {cart:{cartItems}}= getState();
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
}