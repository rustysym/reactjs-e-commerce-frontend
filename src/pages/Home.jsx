import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsAction } from '../redux/actions/products';
import ProductItems from '../components/ProductItems';
import { searchAction } from '../redux/actions/search';
import Slider from '../components/Slider';


function Home() {
  const dispatch = useDispatch();
  const{products} = useSelector(state=> state.products);
  const{search} = useSelector(state=> state.search);
  useEffect(()=>{
    dispatch(productsAction())
    dispatch(searchAction())
  },[dispatch])
  
  return (
    <div>
      <Slider/>
      <div className='flex flex-wrap justify-center'>    
      {
      search.length > 0 ? ( 
        search.map((val,i)=>(
        <ProductItems key={i} val={val}/>
      ))):
      products && products.map((val,i)=>(
        <ProductItems key={i} val={val}/>
      ))}
       </div>
    </div>
  )
}

export default Home