import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetailAction } from "../redux/actions/products";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { cartAction } from "../redux/actions/cart";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetail);

  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(productDetailAction(id));
  }, [dispatch]);

  const increment = (stock) => {
    if (count <= stock) {
      setCount(count + 1);
    }
  };
  const decrement = (e) => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const addCart = () => {
    dispatch(cartAction(id, count));
    dispatch({ type: "DRAWER", payload: true });
  };

  return (
    <div className="antialiased">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Electronics
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
            <span>Headphones</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="flex justify-center">
                <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                  <img className="h-80" src={product?.image} />
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4 md:mt-0 min-[240px]:mt-24">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-2xl md:text-3xl">
                {product?.title}
              </h2>
              <p className="text-gray-500 text-sm">
                By{" "}
                <a
                  href="#"
                  className="text-custom-dark-green dark:text-custom-green hover:underline"
                >
                  ABC Company
                </a>
              </p>
              <div className="mt-4">Stock: {product?.rating?.count}</div>
              <div className="flex items-center space-x-4 my-4">
                <div>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-gray-800 mr-1 mt-1">$</span>
                    <span className="font-bold text-gray-800 text-3xl">
                      {product?.price}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-green-500 text-xl font-semibold">
                    Save 12%
                  </p>
                  <p className="text-gray-400 text-sm">
                    Inclusive of all Taxes.
                  </p>
                </div>
              </div>

              <p>{}</p>

              <div className="flex py-4 space-x-4">
                <div className="flex mx-2 space-x-2 items-center">
                  <button onClick={decrement}>
                    {" "}
                    <CgMathMinus
                      size={24}
                      className="border rounded-full p-1 cursor-pointer"
                    />
                  </button>
                  <span className="text-xl select-none">{count}</span>
                  <button onClick={() => increment(product.rating.count)}>
                    <CgMathPlus
                      size={24}
                      className="border rounded-full p-1 cursor-pointer"
                    />
                  </button>
                </div>
                <button
                  type="button"
                  className="h-14 px-6 py-2 font-semibold rounded-xl bg-custom-green hover:bg-custom-light-green text-black select-none"
                  onClick={() => addCart()}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
