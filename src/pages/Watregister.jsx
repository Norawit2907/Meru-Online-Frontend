import React, { useState } from 'react';
import '../styles/Register.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WatRegister } from '../services/auth';
import { faLock, faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import Userregisterbox from '../components/loginbox';

const Watregister = () => {
  const [showPassword, setShowPassword] = useState(0);
  const [showConfirmPassword, setShowConfirmPassword] = useState(0);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })

  const togglepassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleconfirmpassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleConfirmPasswordChange = (event) =>{
    setConfirmPassword(event.target.value)
  }

  const handleFormChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formValue.password === confirmpassword){
      const response = await WatRegister(formValue.email, formValue.password)
      if(response){
        window.location.href = '/registerwat' 
      }
    }
    else{
      alert("password doesn't match")
    }
  }

  return (
      <div className="flex justify-center bg-[#1C1C1C] text-white">
        <div class="registerbox">
            <div className="text-center my-4">
                  <p className="text-6xl font-semibold text-[#ad957b]">SIGNUP as WAT</p>
                  <p className=" text-xl">Register your wat</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col mt-2 gap-y-4'>
              <div>
                <label for="email"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> Email</label>
                <input type="email" id="email" name='email' value={formValue.email} onChange={handleFormChange} className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white" required/>              
              </div>
              
              <div>
                <label for="password"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password </label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password" } id="password" name="password" value={formValue.password} onChange={handleFormChange}  className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white" required></input>
                  <button type="button" className="absolute top-2 right-4" onClick={togglepassword}>
                      {
                        showPassword ? 
                        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                        :
                        <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                      }
                  </button>
                </div>
              </div>

              
              <div>
                <label for="password"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Confirm Password </label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password" } id="confirmpassword" name="confirmpassword" value={confirmpassword} onChange={handleConfirmPasswordChange} className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white" required></input>
                  <button type="button" className="absolute top-2 right-4" onClick={toggleconfirmpassword}>
                      {
                        showConfirmPassword ? 
                        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                        :
                        <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                      }
                  </button>
                </div>      
              </div>
              
              
              <button class="submitbutton" type="submit" className="w-full text-center text-white bg-[#ad957b] p-3 rounded-lg my-4 mt-10">Get start</button>
            </form>
            <p className='text-center'>Already have an account? 
              <a href="/login" id="login" className='hover:underline mx-2 text-[#ad957b]'>Login</a>
            </p>
        

        </div>
      </div>
  )
}
  
export default Watregister;