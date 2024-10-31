import React from 'react';
import '../styles/login.css'
import Loginbox from '../components/loginbox';

const Login = () => (
      <div>
        
          <div class="flex-container">
            <div class="flex-item-left">
              <h1 className='text-center font-semibold text-[rgb(173,149,123)] text-[40px]'>Hello User!</h1>
              <Loginbox registerlink="userregister" userchoice='user'></Loginbox>
            </div>
            <div class="vertical-line"></div>
            <div class="flex-item-right">
              <h1 className='text-center font-semibold text-[rgb(173,149,123)] text-[40px]'>Hello Wat!</h1>
              <Loginbox registerlink="watregister" userchoice='wat'></Loginbox>
            </div>
          </div>
        
      </div>
  )
  
  export default Login;
  