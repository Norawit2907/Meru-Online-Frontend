import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser , faLock, faEye,faEyeSlash} from "@fortawesome/free-solid-svg-icons";

// const showHiddenPass = (loginPass, loginEye) =>{
//     const input = document.getElementById(loginPass),
//           iconEye = document.getElementById(loginEye)
 
//     iconEye.addEventListener('click', () =>{
//        // Change password to text
//        if(input.type === 'password'){
//           // Switch to text
//           input.type = 'text'
 
//           // Icon change
//           iconEye.classList.add('ri-eye-line')
//           iconEye.classList.remove('ri-eye-off-line')
//        } else{
//           // Change to password
//           input.type = 'password'
 
//           // Icon change
//           iconEye.classList.remove('ri-eye-line')
//           iconEye.classList.add('ri-eye-off-line')
//        }
//     })
//  }
 
//  showHiddenPass('login-pass','login-eye')

const Loginbox = ({registerlink}) => {

  const [showPassword, setShowPassword] = useState(0);

  const togglepassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <h2 className="text-center text-white">Sign in to your account</h2>
      
      <div className="my-4 w-full">
        <label for="username" className="text-white text-sm"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Username/email</label>
        <br />
        <input type="text" id="username" name="username" className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white"></input>
        <br />
      </div>

      <div className="my-4 w-full text-white">
        <label for="password" className="text-white text-sm"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password </label>
        <br/>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} id="password" name="password" className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white"></input>
          <button className="absolute top-2 right-4" onClick={togglepassword}>
          {
            showPassword ? 
            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
            :
            <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
          }
          </button>
        </div>
        <br/>
      </div>

      <button class="button" type="submit" className="w-full text-center text-white bg-[#ad957b] p-3 rounded-lg">
        Login
      </button>

      <div className="flex justify-center text-sm text-white mt-8">
      <p className="">Don't have an account?</p>
      <a className="hover:underline mx-2 text-[#ad957b]" href={`/${registerlink}`} id="register">Register</a>  
      </div>
    </div>
  );
};
export default Loginbox;