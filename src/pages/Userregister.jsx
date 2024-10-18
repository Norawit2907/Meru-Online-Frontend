import React, { useState } from 'react';
import '../styles/Register.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faUser , faLock, faEye,faEyeSlash,faEnvelope,faPhone, faIdBadge} from "@fortawesome/free-solid-svg-icons";
import { UploadImage } from '../services/imageupload';
import { UserLogin, UserRegister } from '../services/auth';
// import Userregisterbox from '../components/loginbox';

const Userregister = () => {
  
  const [showPassword, setShowPassword] = useState(0);
  const [showConfirmPassword, setShowConfirmPassword] = useState(0);
  const [profileImage, setProfileImage] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [formValue, setFormValue] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
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
    const profile_link = await UploadImage(profileImage);
    if(formValue.password === confirmpassword){
      const response = await UserRegister(formValue.firstname, formValue.lastname, formValue.phoneNumber, profile_link, formValue.email, formValue.password);
      if(response){
        const loginresponse = await UserLogin(formValue.email, formValue.password)
        if(loginresponse){
          window.location.href = '/'
        }
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
                  <p className="text-6xl font-semibold text-[#ad957b]">Register Now!</p>
                  <p className="m-2 text-xl">Create your account</p>
              </div>

              {profileImage && (
              <div className='flex flex-col items-center'>
                {/* Display the selected image */}
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(profileImage)}
                  className='rounded-full'
                />
                {/* Button to remove the selected image */}
                <button className="text-center text-white bg-[#ad957b] p-3 rounded-lg my-4 mt-10" onClick={() => setProfileImage(null)}>Remove</button>
              </div>
              )}

                <p><FontAwesomeIcon icon={faIdBadge} /> Upload Profile Picture</p>
                <label for="file-input" className="sr-only">Choose file</label>
                <input type="file" name="profile_img" id="file-input" onChange={(e) => {setProfileImage(e.target.files[0])}} className="w-full border border-slate-600 shadow-sm rounded-lg text-sm focus:z-10 focus:border-[#ad957b]
                  file:bg-[#2d2d2e] file:border-0
                  file:me-4
                  file:py-3 file:px-4 file:text-white"/>
             

              <form onSubmit={handleSubmit} className='flex flex-col mt-2 gap-y-4'>
                <div className="flex flex-col">
                  <label for="firstname"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Firstname</label>
                  <input type="text" id="firstname" name="firstname" value={formValue.firstname} onChange={handleFormChange} className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white" required></input>
                </div>

                <div className="flex flex-col">
                  <label for="lastname"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Lastname</label>
                  <input type="text" id="lastname" name="lastname" value={formValue.lastname} onChange={handleFormChange} className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white" required></input>
                </div>
                
                <div>
                  <label for="email"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> Email</label>
                  <input type="email" id="email" name='email' value={formValue.email} onChange={handleFormChange} className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white" required/>              
                </div>
                
                <div>
                  <label for="phoneNumber"><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> Telephine No.</label>
                  <input type="tel" id="phoneNumber" name="phoneNumber" value={formValue.phoneNumber} onChange={handleFormChange} className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white" required></input>
                </div>

                <div>
                  <label for="password"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password </label>
                  <div className="relative">
                  <input type={showPassword ? "text" : "password" } id="password" name="password" value={formValue.password} onChange={handleFormChange} className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white" required></input>
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
                    <input type={showConfirmPassword ? "text" : "password"} id="confirmpassword" name="confirmpassword" value={confirmpassword} onChange={handleConfirmPasswordChange} className="w-full bg-[#2d2d2e] p-2 rounded-xl border border-slate-600 text-white" required></input>
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
                
                <div className="flex justify-center">
                <button class="submitbutton" type="submit" className="w-full text-center text-white bg-[#ad957b] p-3 rounded-lg my-4 mt-10">Get start</button>
                </div>

                <p className="text-center">Already have an account? 
                  <a href="/login" id="login" className="hover:underline mx-2 text-[#ad957b]">Login</a>
                </p>
              </form>

            </div>
        
      </div>
  )
}
  
  export default Userregister;