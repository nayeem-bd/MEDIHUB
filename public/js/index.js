/* eslint-disable no-undef */
//login part 
import '@babel/polyfill';

import {login,logout} from './login';

const logInBtn = document.querySelector('.logInBtn');

if(logInBtn){
  logInBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const phone = document.querySelector('#phoneId').value;
    const password = document.querySelector('#passwordId').value;
    if(phone && password){
      console.log(phone,password);
      login(phone,password);
    }
  });
}

const logOutBtn = document.querySelector('.logOutBtn');
if(logOutBtn){
  logOutBtn.addEventListener('click',e=>{
    e.preventDefault();
    logout();
  })
}