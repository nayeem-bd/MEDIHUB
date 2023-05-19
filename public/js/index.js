/* eslint-disable no-undef */
import '@babel/polyfill';
import { showAlert } from './alerts';
// bug fixed part

//search box bug
const title = document.title;
if (title.includes('Home Page')) {
  const search_box = document.querySelector('#search-box');
  //console.log(search_box);
  search_box.classList.add('search-box-bug');
}



//login part 
import { login, logout, signUp } from './login';

const logInBtn = document.querySelector('.logInBtn');

if (logInBtn) {
  logInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const phone = document.querySelector('#phoneId').value;
    const password = document.querySelector('#passwordId').value;
    if (phone && password) {
      console.log(phone, password);
      login(phone, password);
    }
  });
}

const logOutBtn = document.querySelector('.logOutBtn');
if (logOutBtn) {
  logOutBtn.addEventListener('click', e => {
    e.preventDefault();
    logout();
  })
}

const signUpBtn = document.querySelector('.signUpBtn');
if (signUpBtn) {
  signUpBtn.addEventListener('click', e => {
    e.preventDefault();
    const name = document.querySelector('#nameId').value;
    const phone = document.querySelector('#phoneId').value;
    const password = document.querySelector('#passwordId').value;
    const passwordConfirm = document.querySelector('#passwordConfirmId').value;
    const selectBox = document.querySelector('.select');
    //console.log(selectBox.value);
    if (name && phone && password && passwordConfirm) {
      signUp(name, phone, password, passwordConfirm, selectBox.value);
    }
    else {
      showAlert('error', 'All fields must be filled.', 4)
    }
  });
}


const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 10);
