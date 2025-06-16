import React from 'react'

const SignBtns = ({texts}) => {
  return (
    <div className='w-[80%]'>
        <button className='bg-[#2d7ffa] cursor-pointer rounded-md h-10 w-full max-w-lg shadow-lg/30 font-bold text-white font-poppins'>{texts}</button>
    </div>
  )
}

export default SignBtns