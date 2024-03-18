import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../store/UserActions.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FaPowerOff, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <nav className="bg-[#292929] h-30 md:h-20 flex justify-between items-center px-4 md:px-8">
      <a href="/" className="flex items-center">
        <img src="/navbar.png" alt="logo" className="w-40 cursor-pointer" />
      </a>

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="text-center flex flex-col items-center">
            <img
              className="rounded-[50px] h-10 w-10 self-center"
              src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.userName}`}
            ></img>
            <span className="text-yellow-400 font-semibold mt-2">
              {user?.userName}
            </span>
          </div>
        ) : (
          <div className="hidden md:flex space-x-4">
            <a
              href="/about-us"
              className="text-white hover:text-blue-500 transition duration-300"
            >
              About
            </a>
            <a
              href="/contact-us"
              className="text-white hover:text-blue-500 transition duration-300"
            >
              Contact Us
            </a>
            <a
              href="/student/SignUp"
              className="text-white hover:text-blue-500 transition duration-300"
            >
              Sign Up
            </a>
            <a
              href="/student/Login"
              className="text-white hover:text-blue-500 transition duration-300"
            >
              Login
            </a>
          </div>
        )}

        {user && (
          <Button
            colorScheme="yellow"
            onClick={() => {
              dispatch(LogoutUser());
              navigate("/");
            }}
          >
            Logout <FaPowerOff className="ml-1" />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
