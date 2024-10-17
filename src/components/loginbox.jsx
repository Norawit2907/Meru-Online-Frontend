import React from "react";
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

const Loginbox = () => {
  return (
    <div>
      <h2>Sign in to your account</h2>
      
      <label for="username"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Username/email</label>
      <br />
      <input type="text" id="username" name="username"></input>
      <br />
      <label for="password"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password </label>
      <FontAwesomeIcon icon={faEye}></FontAwesomeIcon><FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
      <br></br>
      <input type="password" id="password" name="password"></input>
      <br></br>
      <label class="container">
        <p>remember me</p>
        <input type="checkbox"></input>
        <span class="checkmark"></span>
      
      </label>
      <button class="button" type="submit">
        Login
      </button>
      <p>Don't have an account? <a href="#" id="register">Register</a></p>
    </div>
  );
};
export default Loginbox;