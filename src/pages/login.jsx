import React from 'react';
import Loginbox from '../components/loginbox';

const Login = () => (
      <div>
        
          <div class="flex-container flex flex-row items-center text-[30px] text-left w-full h-fit">
            <div class="flex-item-left bg-[#242425] p-[2.5vw] flex-[50%] m-[10%] text-[16px] rounded-[30px]">
              <h1 className='text-center font-semibold text-[rgb(173,149,123)] text-[40px]'>Hello User!</h1>
              <Loginbox registerlink="userregister" userchoice='user'></Loginbox>
            </div>
            <div class="vertical-line border-[2px] h-[500px] border-[#9A9A9A]"></div>
            <div class="flex-item-right bg-[#242425] p-[2.5vw] flex-[50%] m-[10%] text-[16px] rounded-[30px]">
              <h1 className='text-center font-semibold text-[rgb(173,149,123)] text-[40px]'>Hello Wat!</h1>
              <Loginbox registerlink="watregister" userchoice='wat'></Loginbox>
            </div>
          </div>
        
      </div>
  )
  
  export default Login;
  