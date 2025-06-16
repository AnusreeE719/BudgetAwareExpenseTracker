import React from 'react';
import { IoMdSettings } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SettingComponent = ({ 
  toggleSettings, 
  showSettings, 
  theme, 
  setShowSettings, 
  location, 
  handleLogout 
}) => {
  return (
    <>
        {/* Settings Dropdown */}
        <div className="relative ml-auto">
            <button
              onClick={toggleSettings}
              className={`flex items-center gap-2 p-2 rounded-md ${showSettings ? 
                (theme === "dark" ? "bg-[#5093F8] text-[#E3F0FF]" : "bg-[#5093F8] text-[#E3F0FF]") : 
                (theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700")} 
                hover:bg-[#5093F8] hover:text-[#E3F0FF] transition-colors duration-200`}
            >
              <IoMdSettings className="text-xl" />
              <span className="font-semibold hidden md:block">Settings</span>
              <FaChevronDown className={`transition-transform duration-200 ${showSettings ? 'rotate-180' : ''} hidden md:block`} />
            </button>
            
            {showSettings && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${theme === "dark" ? "bg-[#304363]" : "bg-white"} ring-1 ring-black ring-opacity-5 z-50`}>
                <div className="py-1">
                  <Link
                    to="/update-password"
                    className={`block px-4 py-2 text-sm ${location.pathname === "/update-password" ? 
                      "text-[#5093F8] font-bold" : 
                      (theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700")} 
                      hover:bg-[#5093F8] hover:text-[#E3F0FF]`}
                    onClick={() => setShowSettings(false)}
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-sm ${theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700"} hover:bg-[#5093F8] hover:text-[#E3F0FF]`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
    </>
  )
}

export default SettingComponent;