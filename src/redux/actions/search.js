export const searchAction = (keyword) => async (dispatch) =>{
    const data = await fetch ('https://fakestoreapi.com/products').then(res=>res.json())
    dispatch({type: 'SEARCH',payload:data.filter(dt=> dt.title.includes(keyword) || dt.description.includes(keyword) || dt.category.includes(keyword))})
}
