import { IoClose } from "react-icons/io5";
import { useSidebar } from "../Context/SidebarContext";
import { useTheme } from "../Context/ThemeContext";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import logo from '../assets/react.svg'
import StyleCss from './sidebar.module.css'
import { BiCategory, BiSolidAnalyse } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaRegMoneyBill1 } from "react-icons/fa6";

export default function Sidebar() {
  const { theme } = useTheme();
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [openMenus, setOpenMenus] = useState({
    category: false,
    budget: false,
    expense: false,
  });
  const location = useLocation();


  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };



  return (
    <div
      className={`
        ${theme === "dark" ? "bg-[#304363]" : "bg-[#F8FBFF]"}
        rounded-md
        fixed left-0 top-0 h-[93vh] w-72 p-3
        transform transition-transform duration-300 ease-in-out
        sm:relative sm:translate-x-0 sm:h-auto sm:w-[20vw]
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        sm:block
        z-20 
      `}
      id={StyleCss.sidebarContainer}
    >
      <div className="flex justify-between items-center mb-4">
        <div id={StyleCss.divLogo} className="flex gap-2 items-center">
          <img id={StyleCss.logoImage} className="w-12" src={logo} alt="logo" />

          {/* tab device */}
          <div id={StyleCss.headingSmall}>
            <p id={StyleCss.logoHeading1} className={`${theme === "dark" ? "text-[#5093F8]" : "text-gray-700"} font-bold font-poppins uppercase`}>Budget Aware</p>
            <p id={StyleCss.logoHeading2} className={`${theme === "dark" ? "text-[#5093F8]" : "text-gray-700"} font-bold`}>Expense Tracker</p>

          </div>
          <div id={StyleCss.logoHeading}>
            <p className={`${theme === "dark" ? "text-[#5093F8]" : "text-gray-700"} text-xl font-bold font-roboto uppercase`}>Budget Aware</p>
            <p className={`${theme === "dark" ? "text-[#5093F8]" : "text-gray-700"} text-base font-bold`}>Expense Tracker</p>

          </div>
        </div>

        <button
          onClick={closeSidebar}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 sm:hidden"
        >
          <IoClose className={`text-xl ${theme === "dark" ? "text-white" : "text-black"}`} />
        </button>
      </div>

      <nav className="space-y-2 flex flex-col justify-between h-[87%] ">

        <ul className="flex flex-col gap-4 h-[80vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          {/* analytics */}
          <li className={`${location.pathname === '/' ? "bg-[#5093F8] text-[#E3F0FF]" : "text-[#5093F8]"} hover:bg-[#5093F8] delay-50 duration-300 ease-in-out hover:text-[#E3F0FF] text-[#5093F8] rounded-md py-2 px-1 cursor-pointer select-none`}>
            <Link to="/" className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-3">
                <BiSolidAnalyse className="text-xl" />
                <p className={`${theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700"} font-semibold`}>Analytics</p>
              </div>
              <FaChevronDown className={`${theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700"}`} />
            </Link>
          </li>
            {/* Budget */}
            <li
            onClick={() => toggleMenu('budget')}
            className={`hover:bg-[#5093F8] delay-50 duration-300 ease-in-out hover:text-[#E3F0FF] rounded-md py-2 px-1 cursor-pointer select-none 
              ${location.pathname === '/create-budget' || location.pathname === '/view-budget'
                ? 'bg-[#5093F8] text-[#E3F0FF]'
                : 'text-[#5093F8]'
              }`}
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-3">
                <MdOutlineProductionQuantityLimits className="text-xl" />
                <p className={`${theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700"} font-semibold select-none`}>
                Budget
                </p>
              </div>
              <FaChevronDown className={`${theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700"}`} />
            </div>
          </li>
          {openMenus.budget && (
            <ul className="flex flex-col gap-4">
              <li className="flex justify-center">
                <Link to="/create-budget">
                  <p className={`${location.pathname === '/create-budget'
                      ? 'text-[#5093F8] font-bold'
                      : theme === "dark"
                        ? "text-[#E3F0FF]"
                        : "text-gray-700"
                    } hover:text-[#5093F8] delay-50 duration-300 ease-in-out font-semibold`}>
                    Create Budget
                  </p>
                </Link>
              </li>
              <li className="flex justify-center">
                <Link to="/view-budget">
                  <p className={`${location.pathname === '/view-budget'

                      ? 'text-[#5093F8] font-bold'
                      : theme === "dark"
                        ? "text-[#E3F0FF]"
                        : "text-gray-700"

                    } hover:text-[#5093F8] delay-50 duration-300 ease-in-out font-semibold`}>
                    View Budget
                  </p>
                </Link>
              </li>
            </ul>
             )}
             {/* Expense */}
            <li
            onClick={() => toggleMenu('expense')}
            className={`hover:bg-[#5093F8] delay-50 duration-300 ease-in-out hover:text-[#E3F0FF] rounded-md py-2 px-1 cursor-pointer select-none 
              ${location.pathname === '/create-expense' || location.pathname === '/view-expense'
                ? 'bg-[#5093F8] text-[#E3F0FF]'
                : 'text-[#5093F8]'
              }`}
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-3">
                <FaRegMoneyBill1 className="text-xl" />
                <p className={`${theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700"} font-semibold select-none`}>
                Expense
                </p>
              </div>
              <FaChevronDown className={`${theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700"}`} />
            </div>
          </li>
          {openMenus.expense && (
            <ul className="flex flex-col gap-4">
              <li className="flex justify-center">
                <Link to="/create-expense">
                  <p className={`${location.pathname === '/create-expense'
                      ? 'text-[#5093F8] font-bold'
                      : theme === "dark"
                        ? "text-[#E3F0FF]"
                        : "text-gray-700"
                    } hover:text-[#5093F8] delay-50 duration-300 ease-in-out font-semibold`}>
                    Create Expense
                  </p>
                </Link>
              </li>
              <li className="flex justify-center">
                <Link to="/view-expense">
                  <p className={`${location.pathname === '/view-expense'

                      ? 'text-[#5093F8] font-bold'
                      : theme === "dark"
                        ? "text-[#E3F0FF]"
                        : "text-gray-700"

                    } hover:text-[#5093F8] delay-50 duration-300 ease-in-out font-semibold`}>
                    View Expense
                  </p>
                </Link>
              </li>
            </ul>
             )}
          {/* Category */}
          <li
            onClick={() => toggleMenu('category')}
            className={`hover:bg-[#5093F8] delay-50 duration-300 ease-in-out hover:text-[#E3F0FF] rounded-md py-2 px-1 cursor-pointer select-none 
              ${location.pathname === '/create-category' || location.pathname === '/view-category'
                ? 'bg-[#5093F8] text-[#E3F0FF]'
                : 'text-[#5093F8]'
              }`}
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-3">
                <BiCategory className="text-xl" />
                <p className={`${theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700"} font-semibold select-none`}>
                Category
                </p>
              </div>
              <FaChevronDown className={`${theme === "dark" ? "text-[#E3F0FF]" : "text-gray-700"}`} />
            </div>
          </li>
          {openMenus.category && (
            <ul className="flex flex-col gap-4">
              <li className="flex justify-center">
                <Link to="/create-category">
                  <p className={`${location.pathname === '/create-category'
                      ? 'text-[#5093F8] font-bold'
                      : theme === "dark"
                        ? "text-[#E3F0FF]"
                        : "text-gray-700"
                    } hover:text-[#5093F8] delay-50 duration-300 ease-in-out font-semibold`}>
                    Create Category
                  </p>
                </Link>
              </li>
              <li className="flex justify-center">
                <Link to="/view-category">
                  <p className={`${location.pathname === '/view-category'

                      ? 'text-[#5093F8] font-bold'
                      : theme === "dark"
                        ? "text-[#E3F0FF]"
                        : "text-gray-700"

                    } hover:text-[#5093F8] delay-50 duration-300 ease-in-out font-semibold`}>
                    View Category
                  </p>
                </Link>
              </li>
            </ul>
             )}

        </ul>
      </nav>
    </div>
  );
}