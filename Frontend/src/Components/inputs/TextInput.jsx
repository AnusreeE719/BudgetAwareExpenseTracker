import React from 'react'
import Stylecss from './Text.module.css'



const TextInput = ({Labelname,placeholders,Error,onChange,size,types,value }) => {
  return (
    <div className='relative mt-7' style={{width:size}}>
      <label className='absolute text-sm -top-6 font-poppins font-bold text-gray-600'>{Labelname}</label>
      <input value={value} type={types||"text"} className='px-5 text-sm border-1 rounded-md h-10 w-full max-w-lg outline-[#5093F8] placeholder:text-gray-500' placeholder={placeholders} onChange={onChange} id={Stylecss.nospinner}/>

      <p className='text-sm text-red-500'>{Error}</p>
    </div>
  )
}

export default TextInput