import React, { useEffect, useState } from 'react';

const Dropdown = ({ Labelname, options = [], placeholder, Error, onChange, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selected) {
      const selectedOpt = options.find(option => option.value === selected);
      setSelectedOption(selectedOpt || null);
    }
  }, [selected, options]);
  
  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[100%] mt-7">
      <label className="absolute text-sm -top-6 font-poppins font-bold text-gray-600">{Labelname}</label>

      <div
        className={`px-5 text-sm rounded-md h-10 w-full max-w-lg outline-[#5093F8] placeholder:text-gray-500 flex items-center justify-between cursor-pointer transition-all
          ${isOpen ? 'border-2 border-[#5093F8] shadow-md' : 'border border-black'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700">
        {selectedOption ? selectedOption.label : placeholder || 'Select an option'}
        </span>

        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute z-10 w-full max-w-lg mt-1 bg-white border border-gray-300 rounded-md shadow-md text-sm">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-5 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      <p className="text-sm text-red-500 mt-1">{Error}</p>
    </div>
  );
};

export default Dropdown;
