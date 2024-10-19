import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser , faLock, faEye,faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { UserLogin, WatLogin } from "../services/auth";

const Loginbox = ({registerlink, userchoice}) => {

  const [showPassword, setShowPassword] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) =>{
    setPassword(event.target.value);
  }

  const togglepassword = () => {
    setShowPassword(!showPassword)
  }

  const handlelogin = async () => {
    if(userchoice == 'user'){
      const res = await UserLogin(email, password);
      if(res === true){
        window.location.href = `/`
      }
    }

    else if(userchoice == 'wat'){
      const res = await WatLogin(email, password);
      if(res === true){
        window.location.href = `/`
      }
    }
  }

  return (
    <div>
      <h2 className="text-center text-white">Sign in to your account</h2>
      
      <div className="my-4 w-full">
        <label for="username" className="text-white text-sm"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Username/email</label>
        <br />
        <input type="text" id="username" name="username" onChange={handleEmailChange} className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white"></input>
        <br />
      </div>

      <div className="my-4 w-full text-white">
        <label for="password" className="text-white text-sm"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password </label>
        <br/>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} id="password" name="password" onChange={handlePasswordChange} className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white"></input>
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

      <button class="button" type="submit" onClick={handlelogin} className="w-full text-center text-white bg-[#ad957b] p-3 rounded-lg">
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