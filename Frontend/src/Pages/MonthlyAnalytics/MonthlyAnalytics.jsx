import React from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import { FaGreaterThan } from 'react-icons/fa';

const MonthlyAnalytics = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='space-y-4 h-[70vh] sm:h-[80vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden'>
          {/* {isloading ? (
            <div className='flex justify-center items-center h-screen'><FaSpinner className='text-4xl animate-[spin_1s_linear_infinite]' /></div>
          ) : ( */}
    <>

      {/* Page heading */}
      <h1 className={`${theme === 'dark' ? "text-[#5093F8]" : "text-gray-600"} text-2xl font-bold`}>Monthly Analytics</h1>
      {/* Main Analytics Content */}
      <div className="row-span-14 flex ">
        <div className="flex flex-col items-center bg-white rounded-md shadow-xl py-8 px-4 w-[90%] md:w-[80%] lg:w-[60%]">
          <h2 className="text-[#2d7ffa] font-bold text-2xl mb-4">Monthly Analytics: month</h2>
      <div className="mb-6">
        <h3 className="text-xl font-medium">Overall Summary</h3>
        <p>Total Budget: ₹000</p>
        <p>Expected Budget: ₹000</p>
        <p>Remaining: ₹000</p>
        <p>Total Spent: ₹000</p>
        <p>Status: <span className="text-red-600">
          sts
        </span></p>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-2">Category-wise Summary</h3>
        {/* {data.categories.map((cat) => ( */}
          <div  className="border p-2 mb-2 rounded shadow-sm">
            <p><strong>cat.categoryName</strong></p>
            <p>Budget: ₹</p>
            <p>Spent: ₹000</p>
            <p>Remaining: ₹000</p>
            <p>Status: <span className="text-green-600">
              sts
            </span></p>
          </div>
        {/* ))} */}
      </div>

        </div>
      </div>
    </>
          {/* )} */}
    </div>
  );
};

export default MonthlyAnalytics;
