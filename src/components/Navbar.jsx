import React, { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { searchAction } from "../redux/actions/search";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const colorTheme = theme === "light" ? "dark" : "light";
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const changeTheme = () => {
    setTheme(colorTheme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    changeTheme();
  }, []);

  const searchPost = (e) => {
    if (e.key === "Enter") {
      dispatch(searchAction(search));
    }
  };
  const dispatchHandler = () => {
    if (!isOpen) {
      dispatch({ type: "DRAWER", payload: true });
      setIsOpen(true);
    } else {
      dispatch({ type: "DRAWER", payload: false });
      setIsOpen(false);
    }
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/", { replace: true });
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="overflow-x-hidden">
      <section className="relative mx-auto my-12">
        <nav className="flex justify-between  w-screen fixed z-50 top-0 bg-custom-white dark:bg-custom-dark ">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <a className="font-ibmplex text-lg" href="#">
              RUSTYSHOP
            </a>

            <ul className="hidden md:flex px-4 mr-auto ml-12 font-poppins space-x-8 mt-1">
              <li>
                <a className="hover:text-green-600" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-gray-600" href="#">
                  Category
                </a>
              </li>
              <li>
                <a className="hover:text-gray-600" href="#">
                  Collections
                </a>
              </li>
              <li>
                <a className="hover:text-gray-600" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
            {/* Search */}
            <div className="md:flex mr-4 ml-12">
              <AiOutlineSearch className="absolute mt-2 ml-2" />
              <input
                value={search}
                onKeyDown={searchPost}
                onChange={(e) => setSearch(e.target.value)}
                className="shadow appearance-none border border-gray-400 dark:border-gray-500 rounded-lg w-full py-[5px] px-3 leading-tight focus:outline-none focus:shadow-outline bg-custom-white dark:bg-custom-dark dark:shadow-gray-700 pl-8 "
                type="text"
                placeholder="Search"
              />
            </div>

            <div className="hidden xl:flex items-center space-x-5 ">
              <a className="hover:text-gray-600" onClick={changeTheme}>
                {theme === "dark" ? <BsSun size={18} /> : <BsMoon size={18} />}
              </a>
              {/* Heart */}
              <a className="hover:text-red-600" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </a>
              {/* Shopping Cart */}
              <a
                className="flex items-center hover:text-gray-600 cursor-pointer"
                onClick={() => dispatchHandler()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems && cartItems?.length <= 0 ? (
                  <span className="flex absolute -mt-5 ml-4"></span>
                ) : (
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 justify-center">
                      <span className="text-white self-center text-[8px]">
                        {cartItems?.length}
                      </span>
                    </span>
                  </span>
                )}
              </a>
              {/* User */}
              {user ? (
                <div>
                  <div className="items-center">
                    <button className="peer relative block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 hover:text-gray-600 dark:hover:text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <div className="hidden peer-hover:flex hover:flex absolute right-0 bg-white dark:bg-custom-dark-second min-w-[160px] shadow-xl z-10 rounded-lg ">
                      <div className="flex flex-col text-center w-full">
                        <div className="my-2">
                          <h1 className="text-center">{user?.email}</h1>
                        </div>
                        <NavLink
                          to="/user"
                          className={"hover:bg-gray-200 dark:hover:bg-gray-400"}
                        >
                          <button className=" py-4 rounded-lg">Settings</button>
                        </NavLink>
                        <button
                          className="py-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-400"
                          onClick={handleLogout}
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="items-center">
                    <button className="peer relative block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 hover:text-gray-600 dark:hover:text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <div className="hidden peer-hover:flex hover:flex absolute right-0 bg-white dark:bg-gray-700 min-w-[160px] shadow-xl z-10 rounded-lg ">
                      <h1>{user ? user.email : ""}</h1>
                      <div className="flex flex-col text-center w-full">
                        <NavLink
                          to="/login"
                          className={"hover:bg-gray-200 dark:hover:bg-gray-400"}
                        >
                          <button className=" py-4 rounded-lg">Sign In</button>
                        </NavLink>
                        <NavLink
                          to="/signup"
                          className={"hover:bg-gray-200 dark:hover:bg-gray-400"}
                        >
                          <button className="py-4 rounded-lg ">Sign Up</button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/*Shopping Cart Responsive*/}
          <a
            className="xl:hidden flex mr-6 items-center cursor-pointer"
            onClick={() => dispatchHandler()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItems && cartItems?.length <= 0 ? (
              <span className="flex absolute -mt-5 ml-4"></span>
            ) : (
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 justify-center">
                  <span className="text-white self-center text-[8px]">
                    {cartItems?.length}
                  </span>
                </span>
              </span>
            )}
          </a>
          {/*Responsive Menu Icon*/}
          <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </a>
        </nav>
      </section>
    </div>
  );
}

export default Navbar;
