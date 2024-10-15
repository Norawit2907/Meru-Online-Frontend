import React from 'react';
import '../styles/login.css'
import Loginbox from '../components/loginbox';

const Login = () => (
      <div className="App">
        <header className="App-header">
          <div class="flex-container">
            <div class="flex-item-left">
              <h1>Hello User!</h1>
              <Loginbox></Loginbox>
            </div>
            <div class="vertical-line"></div>
            <div class="flex-item-right">
              <h1>Hello Wat!</h1>
              <Loginbox></Loginbox>
            </div>
          </div>
        </header>
      </div>
  )
  
  export default Login;
  