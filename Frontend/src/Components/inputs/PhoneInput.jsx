import React from 'react'
import Stylecss from './Text.module.css'

const PhoneInput = ({ Labelname, placeholders, Error, onChange, size,value }) => {
    // Custom input handler to allow only digits
    const handleInput = (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    };
  
    return (
      <div className="relative mt-7" style={{ width: size }}>
        <label className="absolute text-sm -top-6 font-poppins font-bold text-gray-600">{Labelname}</label>
        <input
          type="number"
          onInput={handleInput}
          onChange={onChange}
          className="px-5 text-sm border-1 rounded-md h-10 w-full max-w-lg outline-[#5093F8] placeholder:text-gray-500"
          placeholder={placeholders}
          id={Stylecss.nospinner}
          value={value}
        />
        <p className="text-sm text-red-500">{Error}</p>
      </div>
    );
  };

export default PhoneInput