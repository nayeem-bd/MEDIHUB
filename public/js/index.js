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

const url = document.location.pathname;
//console.log(url);
if (url === '/dashboard') {
  const hiper = document.querySelector('.fa-user');
  hiper.classList.add('active');
}

if (url === '/dashboard/appointments') {
  const hiper = document.querySelector('.fa-plus-square');
  hiper.classList.add('active');
}
if (url === '/dashboard/doctors') {
  const hiper = document.querySelector('.fa-user-md');
  hiper.classList.add('active');
}
if (url === '/dashboard/history') {
  let hiper = document.querySelector('.fa-user-plus');
  if (!hiper) hiper = document.querySelector('.fa-history');
  hiper.classList.add('active');
}
if (url === '/dashboard/schedule') {
  const hiper = document.querySelector('.fa-clock');
  hiper.classList.add('active');
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

import { bookAppointment, updateAppointment } from './appointment';

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
    if (datas.role === 'receptionist') {
      if (el.value === '0') {
        el.addEventListener('change', els => {
          els.preventDefault();
          updateAppointment(datas.appointmentid);
        });
      } else {
        el.disabled = true;
      }
    } else {
      el.disabled = true;
    }
  });
}

import { updateProfile } from './updateProfile';

const saveBtn = document.querySelector('#saveBtn');
if (saveBtn) {
  const datas = JSON.parse(JSON.stringify(saveBtn.dataset));
  const user = JSON.parse(datas.user);
  //console.log(user.role);
  saveBtn.addEventListener('click', el => {
    el.preventDefault();
    const name = document.querySelector('#nameInput').value;
    const phone = document.querySelector('#phoneInput').value;
    const address = document.querySelector('#addressInput');
    const email = document.querySelector('#emailInput').value;
    const password = document.querySelector('#passwordInput').value;
    const passwordConfirm = document.querySelector('#passwordConfirmInput').value;
    const birthDate = document.querySelector('#birthInput').value;
    const age = document.querySelector('#ageInput').value;
    const gender = document.querySelector('#genderInput').value;
    const bloodGroup = document.querySelector('#bloodInput').value;
    const photo = document.querySelector('#imgInput').files[0];
    const hospital = document.querySelector('#hospitalInput');
    const specialty = document.querySelector('#specialtyInput');
    const experience = document.querySelector('#experienceInput');
    const training = document.querySelector('#trainingInput');
    const education = document.querySelector('#educationInput');

    const form = new FormData();
    form.append('name', name);
    form.append('phone', phone);
    if (user.role === 'user')
      form.append('address', address.value);
    if (email)
      form.append('email', email);
    form.append('age', age);
    form.append('gender', gender);
    form.append('bloodGroup', bloodGroup);
    //console.log(bloodGroup);
    if (photo) {
      form.append('photo', photo);
    }

    if (user.role === 'doctor') {
      form.append('hospital', hospital.value);
      form.append('specialty', specialty.value);
      form.append('experience', experience.value);
      const edu = education.value.split('\n');
      const trainings = training.value.split('\n');
      edu.forEach(el => { if (el) form.append('education', el); });
      trainings.forEach(el => { if (el) form.append('training', el); });
    }

    updateProfile(form, 'data');
  })

}


const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 10);
