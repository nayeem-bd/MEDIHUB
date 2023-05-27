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

import { bookAppointment,updateAppointment } from './appointment';

const bookBnt = document.querySelector('.bookbtn');
if (bookBnt) {
  bookBnt.addEventListener('click', e => {
    e.preventDefault();
    const dateInput = document.querySelector('#dateInput');
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dateR = new Date(dateInput.value);
    let Day = weekday[dateR.getDay()];
    const doctorAppointmentSection = document.querySelector('.doctorDetails');
    const datas = JSON.parse(JSON.stringify(doctorAppointmentSection.dataset));

    const fee = document.querySelector('.feeClass').textContent.slice(0, -2);
    //console.log(fee);
    const symptomsText = document.querySelector('.symptom').textContent;
    let symptom = symptomsText ? symptomsText : '';

    const timeRangeSelect = document.querySelector('#timeRangeSelect');
    let timeRange = timeRangeSelect.value.split('-');
    timeRange = timeRange.map(el => el.trim());
    const schedule = { day: Day, startTime: timeRange[0], endTime: timeRange[1] };
    if (datas.doctor && datas.user && dateInput.value)
      bookAppointment(datas.doctor, datas.user, dateInput.value, schedule, fee, symptom);
    else
      showAlert('error', 'Must Be filled');
    //console.log(janina.user);
  });
}


const paymentStatusSelectBox = document.querySelectorAll('.paymentStatus');
if (paymentStatusSelectBox) {
  paymentStatusSelectBox.forEach(el => {
    const datas = JSON.parse(JSON.stringify(el.dataset));
    //console.log(datas);
    if(datas.role==='receptionist'){
      if(el.value === '0'){
        el.addEventListener('change',els=>{
          els.preventDefault();
          updateAppointment(datas.appointmentid);
        });
      }else{
        el.disabled = true;
      }
    }else{
      el.disabled=true;
    }
  });
}


const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 10);
