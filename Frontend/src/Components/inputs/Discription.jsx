import React from 'react'


const Discription = ({Labelname, placeholders, Error, onChange, size,value}) => {
  return (
    <div className='relative mt-7' style={{width: size}}>
      <label className='absolute text-sm -top-6 font-poppins font-bold text-gray-600'>{Labelname}</label>
      <textarea 
        className={`px-5 py-2 text-sm border-1 rounded-md h-20 w-full max-w-lg 
                   outline-[#5093F8] placeholder:text-gray-500 resize-none 
                   overflow-auto whitespace-pre-wrap break-words`}
        placeholder={placeholders}
        onChange={onChange}
        value={value}
       
      />
      <p className='text-sm text-red-500'>{Error}</p>
    </div>
  )
}

export default Discription