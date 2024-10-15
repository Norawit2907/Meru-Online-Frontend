import React from 'react';
import '../styles/Register.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faUser , faLock, faEye,faEyeSlash,faEnvelope,faPhone} from "@fortawesome/free-solid-svg-icons";
// import Userregisterbox from '../components/loginbox';

const Userregister = () => (
      <div className="App">
        <header className="App-header">
            <div class="registerbox">
              <h1>SignUp as WAT!</h1>
              <form action="#" method="POST">
              
              <label for="username"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Username/email</label>
                <input type="text" id="username" name="username" required></input>
                
                <label for="email"><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> Username/email</label>
                <input type="email" id="email" name='email' required/>              
                

                <label for="phone"><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> Username/email</label>
                <input type="tel" id="phone" name="phone" required></input>

                <label for="password"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password </label>
                <input type="password" id="password" name="password" required></input>
                <label for="password"><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Password </label>
                <input type="password" id="confirmpassword" name="confirmpassword" ></input>
                
                
                <button class="submitbutton" type="submit">Get start</button>

                <p>Already have an account? <a href="#" id="login">Login</a></p>
            </form>

            </div>
        </header>
      </div>
  )
  
  export default Userregister;