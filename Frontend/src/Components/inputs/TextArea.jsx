import React from 'react'

const TextArea = ({ Labelname, placeholders, Error, onChange, value,}) => {
    return (
      <div className='relative w-[100%] mt-7'>
        <label className='absolute text-sm -top-6 font-poppins font-bold text-gray-600'>{Labelname}</label>
        <textarea
          className='px-5 py-2 text-sm border-1 rounded-md w-full max-w-lg outline-[#5093F8] placeholder:text-gray-500 resize-none'
          rows={2}
          placeholder={placeholders}
          onChange={onChange}
          value={value}
        />
        <p className='text-sm text-red-500'>{Error}</p>
      </div>
    );
  };
  

export default TextArea