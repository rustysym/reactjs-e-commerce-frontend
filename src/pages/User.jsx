import React, { useEffect, useState } from "react";
import { BiUserCircle, BiBasket } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { removeCartAction } from "../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";

function User() {
  const [openTab, setOpenTab] = useState(1);
  const [user, setUser] = useState(null);
  const { cartItems } = useSelector((state) => state.cart);
  const auth = getAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  const deleteItem = (id)=>
  {
    dispatch(removeCartAction(id))
  }
  return (
    <div className="overflow-x-hidden">
      <div className="py-12 px-24">
        <div className="max-w-8xl mx-auto ">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <a href="#" className="hover:underline hover:text-gray-600">
              Home
            </a>
            <span>
              <svg
                className="h-5 w-5 leading-none text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
            <a href="#" className="hover:underline hover:text-gray-600">
              User
            </a>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-medium">My Account</h1>
        </div>
        <div>
          <div className="mx-auto mt-12">
            <div className="flex flex-row">
              <ul className="flex flex-col space-y-4 w-1/6 ">
                <li>
                  <a
                    onClick={() => setOpenTab(1)}
                    className={` ${
                      openTab === 1 ? "bg-gray-200 text-custom-dark-green dark:bg-gray-800" : ""
                    } flex px-8 py-1 text-gray-600 bg-custom-white dark:bg-custom-dark dark:text-custom-dark-green rounded cursor-pointer`}
                  >
                    <BiUserCircle className="self-center mr-2" /> My Details
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setOpenTab(2)}
                    className={` ${
                      openTab === 2 ? "bg-gray-200 text-custom-dark-green dark:bg-gray-800" : ""
                    } flex px-8 py-1 text-gray-600 bg-custom-white dark:bg-custom-dark dark:text-custom-dark-green rounded cursor-pointer`}
                  >
                    <BiBasket className="self-center mr-2" />
                    Orders
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setOpenTab(3)}
                    className={` ${
                      openTab === 3 ? "bg-gray-200 text-custom-dark-green dark:bg-gray-800" : ""
                    } flex px-8 py-1 text-gray-600 bg-custom-white dark:bg-custom-dark dark:text-custom-dark-green rounded cursor-pointer`}
                  >
                    <BsGear className="self-center mr-2" />
                    Settings
                  </a>
                </li>
              </ul>
              <div className="p-3 bg-white dark:bg-custom-dark-second rounded-xl ml-12 w-4/5">
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <div className="w-full lg:w-4/12 px-4 mx-auto h-auto">
                    
                      <div className="px-6 py-24">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full px-4 flex justify-center">
                            <div>
                              <img
                                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                className="shadow-xl rounded-full h-auto align-middle border-none w-48 sm:w-36 xs:w-28 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-12">
                          <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                            {user?.email}
                          </h3>
                          <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                            Istanbul, Turkiye
                          </div>
                          
                        </div>
                      </div>
                    
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"}>
                {
        cartItems?.map((cart,i) =>(
            
        <div className="w-full px-16 py-2" key={i}>
          <ul
            role="list"
            className="divide-y divide-gray-200 bg-gray-100 dark:divide-gray-800 dark:bg-custom-dark rounded-xl"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4 px-8">
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
                </div>
                <div className={openTab === 3 ? "block" : "hidden"}>
                  Content 3 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
