import { LuMenu } from "react-icons/lu";
import { IoMdMoon } from "react-icons/io";
import { useSidebar } from "../Context/SidebarContext";
import { useTheme } from "../Context/ThemeContext";
import { GrSun } from "react-icons/gr";
import Sidebar from "./Sidebar";
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { useAuth } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import SettingComponent from "../Components/inputs/SettingComponent";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const location = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const { logout } = useAuth();

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    Swal.fire({
      title: 'Success!',
      text: 'You have successfully logged out.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.href = '/signin';
    });
  };

  return (
    <div
      className={`${theme === "dark" ? "bg-[#232B35] " : "bg-[#CBE2FF]"
        } w-screen h-[93vh] sm:h-screen flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-2 p-2`}
    >
      {/* Mobile Navbar */}
      <div
        className={`${theme === "dark" ? "bg-[#304363] " : "bg-[#F8FBFF]"
          } rounded-md p-4  sm:hidden flex items-center`}
      >
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <LuMenu
            className={`${theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700"
              } text-2xl`}
          />
        </button>
        <SettingComponent
            toggleSettings={toggleSettings}
            showSettings={showSettings}
            theme={theme}
            setShowSettings={setShowSettings}
            location={location}
            handleLogout={handleLogout}
        />

        <button
          onClick={toggleTheme}
          className="ml-auto p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {theme === "dark" ? (
            <GrSun className="text-xl text-[#E3F0FF]" />
          ) : (
            <IoMdMoon className="text-xl text-gray-700" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Desktop Header */}
        <div className={`${theme === "dark" ? "bg-[#304363] " : "bg-[#F8FBFF]"
          } rounded-md p-4 hidden sm:flex gap-3 items-center`}>
          
          <SettingComponent
            toggleSettings={toggleSettings}
            showSettings={showSettings}
            theme={theme}
            setShowSettings={setShowSettings}
            location={location}
            handleLogout={handleLogout}
          />
          
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {theme === "dark" ? (
              <GrSun className="text-xl text-[#E3F0FF]" />
            ) : (
              <IoMdMoon className="text-xl text-gray-700" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className={`${theme === "dark" ? "bg-[#304363] " : "bg-[#F8FBFF]"
          } rounded-md flex-1 p-4`}>
          <Outlet /> 
        </div>
      </div>

      {/* Overlay for mobile */}
      <div
        className={`
        fixed inset-0 bg-black/50 z-10
        transition-opacity duration-300
        sm:hidden
        ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
        onClick={closeSidebar}
      />
    </div>
  );
}