document.addEventListener('DOMContentLoaded', function() {


  // Booking Form Submit
  const notificationEl = document.querySelector('.m-notification-primary');
  const formElements = document.querySelector('.m-form-primary').elements;
  const formSubmitBtn = document.querySelector('.form-submit-btn');
  const formMinusBtn = document.querySelector('.form-minus-btn');
  const formPlusBtn = document.querySelector('.form-plus-btn');
  const customersEl = document.querySelector('.form-customers-num');
  const nameEl = document.querySelector('.name');
  const emailEl = document.querySelector('.email');
  const dayEl = document.querySelector('.day');
  const monthEl = document.querySelector('.month');
  const yearEl = document.querySelector('.year');
  const hourEl = document.querySelector('.hour');
  const minutesEl = document.querySelector('.minutes');
  let customers = 1;
  let submitValues = {};
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const currentYear = new Date().getFullYear();
  const currentTime = new Date();
  


  function addWarning(element, placeholder) {
    element.classList.add('a-text-warning');
    element.value = "";
    element.placeholder = placeholder;
  }

  function removeWarning(element, placeholder) {
    element.classList.remove('a-text-warning');
    element.placeholder = placeholder;
  }


  formMinusBtn.addEventListener('click', function(e) {
    e.preventDefault();

    if (customers > 1) {
      customers--;

      customersEl.innerHTML = customers + ' People';
    } 

  });


  formPlusBtn.addEventListener('click', function(e) {
    e.preventDefault();

    if (customers < 20) {
      customers++;

      customersEl.innerHTML = customers + ' People';
  
    }

  });


  formSubmitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    let errors = [];

    for(var i = 0 ; i < formElements.length ; i++){
        const item = formElements.item(i);

        submitValues[item.name] = item.value;
    }

    const name = submitValues['name']; 
    const email = submitValues['email'];
    let day = parseInt(submitValues['day']);
    let month = parseInt(submitValues['month']);
    let year = parseInt(submitValues['year']);
    let hour = parseInt(submitValues['hour']);
    let minutes = parseInt(submitValues['minutes']);
    let dayTime = submitValues['day-time'];
    const timeBooked = new Date(year + '-' + month + '-' + day);

    const nameRegex = new RegExp(/^([ ]{1,10})?[a-zA-Z]{3,20}([a-zA-Z]{3,20})?([ ]{1,10})?/);
    const emailRegex = new RegExp(/^([ ]{1,10})?[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$([ ]{1,10})?/);


    if (!nameRegex.test(name)) {
    
      addWarning(nameEl, 'Insert a valid name');

    } else {

      removeWarning(nameEl, 'Name');
    }

    if (!emailRegex.test(email)) {

      addWarning(emailEl, 'Insert a valid email');

    } else {

      removeWarning(emailEl, 'Email');
    }

    
    if (month && day > months[month-1] || day < 1 || !month) {
     
      if (!day) {
        day = 'DD';
      }

      addWarning(dayEl, day);

      day = false;
    } 


    if (month < 1 || month > 12 || !month) {
     
      if (!month) {
        month = 'MM';
      }

      addWarning(monthEl, month);

      month = false;
    } 


    if (!year || currentYear > year) {
     
      if (!year) {
        year = 'YYYY';
      }

      addWarning(yearEl, year);

      year = false;
    } 
  
    
    if (currentTime > timeBooked) {
      addWarning(dayEl, day);
      addWarning(monthEl, month);
      addWarning(yearEl, year);
    } 

   
    if (timeBooked && day && month && year && currentTime < timeBooked) {
      removeWarning(dayEl, day);
      removeWarning(monthEl, month);
      removeWarning(yearEl, year);
    }

  
    if (!hour || !minutes) {
      hour = '00';
      minutes = '00';

      addWarning(hourEl, hour);
      addWarning(minutesEl, minutes);

    } 


    if (hour && minutes) {
      console.log(hour, minutes);
      if (dayTime === "AM" && hour < 9 || hour >= 12 ) {
        addWarning(hourEl, hour);
        addWarning(minutesEl, minutes);

        hour = false;
      } 

      if (dayTime === "PM" && hour > 12) {
        addWarning(hourEl, hour);
        addWarning(minutesEl, minutes);

        minutes = false;
      } 

    }

    if (hour && minutes) {
      removeWarning(hourEl, hour);
      removeWarning(minutesEl, minutes);
    }

   
    for (let i=0; i < formElements.length; i++) {
      if(formElements[i].classList.contains('a-text-warning')) {
        errors.push('error');
      }
    }

    if (errors.length === 0) {
      notificationEl.classList.add('show');
      notificationEl.classList.remove('hidden');
    }
    console.log(errors);
  });
  
});


// Form Notification
const closeIconEl = document.querySelector('.a-close-icon-primary');
const notificationEl = document.querySelector('.m-notification-primary');

closeIconEl.addEventListener('click', function() {
 
  if (notificationEl.classList.contains('show')) {
    notificationEl.classList.remove('show');
    notificationEl.classList.add('hidden');

  } else {

    notificationEl.classList.remove('hidden');
    notificationEl.classList.add('show');
  }

});