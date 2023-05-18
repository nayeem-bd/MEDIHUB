/* eslint-disable no-undef */
import '@babel/polyfill';
import { showAlert } from './alerts';
// bug fixed part

//search box bug
const title = document.title;
if(title.includes('Home Page')){
    const search_box = document.querySelector('#search-box');
    //console.log(search_box);
    search_box.classList.add('search-box-bug');
}



//login part 
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

const alertMessage = document.querySelector('body').dataset.alert;
if(alertMessage) showAlert('success',alertMessage,10);
