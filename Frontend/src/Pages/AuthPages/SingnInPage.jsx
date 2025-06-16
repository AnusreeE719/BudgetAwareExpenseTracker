import React, { useState } from 'react'
import { useTheme } from "../../Context/ThemeContext";
import { GrSun } from "react-icons/gr";
import { IoMdMoon } from "react-icons/io";
import logo from '../../assets/react.svg'
import TextInput from '../../Components/inputs/TextInput';
import SignBtns from '../../Components/Buttons/SignBtns';
import { useLogin } from '../../controller/authController';
import { Link } from 'react-router-dom';

const SingnInPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailerror, setEmailError] = useState(null);
  const [passerror, setPassError] = useState(null);

  const {
    mutate: login,
    // isLoading,
    // isError,
    // error
  } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(!email) {
      throw new setEmailError("Invalid Email");
    }
    setEmailError(null);
    if(!password) {
      throw new setPassError("Invalid Password");
    }
    setPassError(null);
   
    login({ email, password });

    
  };

  return (
    <div className={`${theme === "dark" ? "bg-[#232B35] " : "bg-[#CBE2FF]"} h-[93vh] sm:h-screen w-screen grid grid-rows-15 gap-2`}>

      <div className="row-span-1 py-3 ml-auto px-4">
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
      <div className="row-span-14 flex justify-center items-center">
        <form onSubmit={handleSubmit} className='flex flex-col items-center bg-white h-fit rounded-md shadow-xl gap-4 py-8 px-3  w-[90%] md:w-[40vw] lg:w-[30vw]'>
          <div className='flex items-center gap-2'><img src={logo} className='w-7 h-7' alt="logo" /><p className={`${theme === "dark" ? "text-gray-700" : "text-gray-700"} font-bold text-xs sm:text-base font-poppins`}>Budget Aware Expense Tracker</p></div>
          <h1 className="text-[#2d7ffa] font-bold text-2xl font-poppins">Hi, Welcome Back</h1>
          <TextInput Labelname="Email" placeholders="Enter Email or UserName..." 
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            Error={emailerror}
            size="80%"
          />
          <TextInput Labelname="Password" placeholders="Enter Password..." 
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            Error={passerror}
            size="80%"
          />
          <div className='flex justify-around w-full text-[#2d7ffa]'> <Link to={'/signup'}>SignUp</Link></div>
          <SignBtns texts="Sign In"/>

        </form>



      </div>


    </div>
  )
}

export default SingnInPage