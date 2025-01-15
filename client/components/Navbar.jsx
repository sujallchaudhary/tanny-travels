import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClipboard } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faClockRotateLeft,
  faCircleExclamation,
  faArrowLeft,
  faBars, faX
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const backToMenu = () => {
    setShowNotifications(false);
  };


  return (
    <div className="relative">
      <nav className="bg-black px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="hidden lg:flex space-x-8 text-white">
            <li className="hover:text-gray-300 cursor-pointer">Home</li>
            <li className="hover:text-gray-300 cursor-pointer">Book Now</li>
            <li className="hover:text-gray-300 cursor-pointer">Contact</li>
            <li className="hover:text-gray-300 cursor-pointer">Popular Places</li>
          </ul>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faBars}  />
            </button>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {!showNotifications ? (
          <div className="p-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="text-xl">
                  <span>Hi ,</span>
                  <span className="text-red-500 "> Satvik</span>
                </div>
                <button
                  onClick={toggleSidebar}
                  className="text-white hover:text-gray-300"
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>

              <ul className="space-y-6">
                <li
                  className="flex items-center space-x-3 cursor-pointer hover:text-gray-300"
                  onClick={toggleNotifications}
                >
                  <FontAwesomeIcon icon={faBell} className="text-red-500" />
                  <span>Notifications</span>
                </li>
                <li className="flex items-center space-x-3 cursor-pointer hover:text-gray-300">
                  <Link href="/Profile">
                    <FontAwesomeIcon icon={faUser} className="text-red-500" />
                    <span className="ml-2">Your Profile</span>
                  </Link>
                </li>
                <li className="flex items-center space-x-3 cursor-pointer hover:text-gray-300">
                  <FontAwesomeIcon icon={faClipboard} className="text-red-500" />
                  <span>Your Bookings</span>
                </li>
                <li className="flex items-center space-x-3 cursor-pointer hover:text-gray-300">
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    className="text-red-500"
                  />
                  <span>History</span>
                </li>
                <li className="flex items-center space-x-3 cursor-pointer hover:text-gray-300">
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className="text-red-500"
                  />
                  <span>Help</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6">
              <button
                onClick={backToMenu}
                className="text-white hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <div className="flex flex-col items-center space-x-2 mt-8">
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-red-500 h-7 mb-1 "
                />
                <span className="text-lg">My Notifications</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-zinc-900 rounded-lg p-4 text-sm text-white cursor-pointer hover:bg-zinc-950 transition-colors">
                Avail amazing offers on hotel bookings on axy.com
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
