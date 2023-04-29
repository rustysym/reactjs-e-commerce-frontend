import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeCartAction } from "../redux/actions/cart";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const deleteItem = (id)=>
  {
    dispatch(removeCartAction(id))
  }
  let subtotal = 0;
    cartItems.map(product => {
        subtotal += product.qty * product.price;
    })
  return (
    <div>
        <div className="fixed w-3/4 max-w-md p-4 border border-gray-500 rounded-lg shadow sm:p-8 right-2  top-24 bg-custom-white text-custom-dark dark:text-custom-white dark:bg-custom-dark overflow-y-auto h-4/6 z-20">
        <div className="flex items-center justify-between mb-4 ">
          <h5 className="text-xl font-bold leading-none select-none">Shopping Cart</h5>
          <div className="flex">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 mr-4"
            >
              View all
            </a>
            <a className="self-center cursor-pointer">
              <AiOutlineClose
                onClick={() => dispatch({ type: "DRAWER", payload: false })}
              />
            </a>
          </div>
        </div>
        
      {
        cartItems?.map((cart,i) =>(
            
        <div className="flow-root" key={i}>
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-800"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-16 h-16 bg-black"
                    src={cart?.image}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium ">{cart?.title} ({cart?.qty})</p>
                  <p className="text-sm truncate text-gray-400 ">
                    {cart?.description}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold ">
                  {cart?.price}$
                </div>
                <div className="underline text-red-500 cursor-pointer" onClick={()=> deleteItem(cart.id)}>Delete</div>
              </div>
            </li>
          </ul>
          
        </div>
      
        ))
      }
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-custom-white">
                <p>Subtotal</p>
                <p>{subtotal.toFixed(2)}$</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-custom-green px-6 py-3 text-base font-medium text-custom-dark shadow-sm hover:bg-custom-dark-green">Checkout</a>
              </div>
              <div className="mt-2 flex justify-center text-center text-sm text-gray-500 flex-col">
                <p> or</p>
                <p>
                  <button type="button" className="font-medium text-custom-dark-green hover:text-green-700 mt-2" onClick={()=>dispatch({ type: "DRAWER", payload: false })}>
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
      </div>
    </div>
  );
}

export default Cart;
