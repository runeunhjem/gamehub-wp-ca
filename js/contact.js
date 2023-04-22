// VARIABLES
const validationForm = document.querySelector("#sendus-message");
const sendButton = document.querySelector("#send-msg-button");
const firstName = document.querySelector("#first");
const firstNameError = document.querySelector("#firstNameError");
const lastName = document.querySelector("#last");
const lastNameError = document.querySelector("#lastNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const confirmSuccess = document.querySelector(".message-sent");
let formSubmitted = false;

// CHANGE PLACEHOLDERS TO INPUT TIPS ON FOCUS
firstName.addEventListener("focus", function() {
  firstName.placeholder = "Min 1 letter";
});
firstName.addEventListener("blur", function() {
  firstName.placeholder = "First Name";
});
lastName.addEventListener("focus", function() {
  lastName.placeholder = "Min 4 letters";
});
lastName.addEventListener("blur", function() {
  lastName.placeholder = "Last Name";
});
email.addEventListener("focus", function() {
  email.placeholder = "Valid Email format (john.doe@mail.com)";
});
email.addEventListener("blur", function() {
  email.placeholder = "Email Address";
});
message.addEventListener("focus", function() {
  message.placeholder = "Min 10 characters";
});
message.addEventListener("blur", function() {
  message.placeholder = "What can we help you with";
});

// THE VALIDATION FUNCTION TO BE RUN ON SUBMIT
function validateForm(event) {
  event.preventDefault(); // Needed so the forms dont reset
  if (formSubmitted) {
    if (checkLength(firstName.value, 0)) {
      firstNameError.style.display = "none";
      firstName.style.backgroundColor = "#8fff98";
      firstName.style.color = "#000000";
    } else {
      firstNameError.style.display = "block";
      firstName.style.backgroundColor = "#fafad2";
      firstName.style.color = "#FF0000";
    }
    if (checkLength(lastName.value, 3)) {
      lastNameError.style.display = "none";
      lastName.style.backgroundColor = "#8fff98";
      lastName.style.color = "#000000";
    } else {
      lastNameError.style.display = "block";
      lastName.style.backgroundColor = "#fafad2";
      lastName.style.color = "#FF0000";
    }
    if (validateEmail(email.value)) {
      emailError.style.display = "none";
      email.style.backgroundColor = "#8fff98";
      email.style.color = "#000000";
    } else {
      emailError.style.display = "block";
      email.style.backgroundColor = "#fafad2";
      email.style.color = "#FF0000";
    }
    if (checkLength(message.value, 9)) {
      messageError.style.display = "none";
      message.style.backgroundColor = "#8fff98";
      message.style.color = "#000000";
    } else {
      messageError.style.display = "block";
      message.style.backgroundColor = "#fafad2";
      message.style.color = "#FF0000";
    }
    if (
      checkLength(firstName.value, 0) &&
      checkLength(lastName.value, 3) &&
      validateEmail(email.value) &&
      checkLength(message.value, 9)
      ) {
      sendButton.setAttribute("type", "submit");
      sendButton.innerText = "Send Message";
      sendButton.className = "buttonSuccess";
      sendButton.addEventListener("click", successMessage);
    } else {
      sendButton.setAttribute("type", "button");
      sendButton.innerText = "Form Error";
      sendButton.className = "send-msg-button buttonNotReady";
      confirmSuccess.style.display = "none";
    }
  }
};

// EVENTLISTENER TO CHECK IF SUBMIT BUTTON IS CLICKED
validationForm.addEventListener("submit", function (event) {
  formSubmitted = true; // Set flag to true on form submit
  validateForm(event);
});

// Add event listeners to each input for typing events
firstName.addEventListener("input", validateForm);
lastName.addEventListener("input", validateForm);
email.addEventListener("input", validateForm);
message.addEventListener("input", validateForm);

// SHOW SUCCESS MESSAGE WHEN FORM IS SUBMITTED
function successMessage() {
  const confirmSuccess = document.querySelector(".message-sent");
  confirmSuccess.style.display = "block";
  confirmSuccess.innerHTML = `
    <p>Your message was sent successfully</>
  `;
  setTimeout(closeSuccessMessage, 4000); //RESET CONTACT FORM AFTER 4 SECONDS
};

// RESET CONTACT FORM AFTER SET TIMOUT
function closeSuccessMessage() {
  const confirmSuccess = document.querySelector(".message-sent");
  confirmSuccess.style.display = "none";
  firstName.value = "";
  firstName.style.backgroundColor = "rgb(250, 235, 215)";
  lastName.value = "";
  lastName.style.backgroundColor = "rgb(250, 235, 215)";
  email.value = "";
  email.style.backgroundColor = "rgb(250, 235, 215)";
  message.value = "";
  message.style.backgroundColor = "rgb(250, 235, 215)";
  sendButton.style.backgroundColor = "#404040";
  sendButton.style.color = "#f5c51880";
  sendButton.innerText = "Send Message";
};

// VALIDATE THE LENGTH OF FIRSTNAME, LASTNAME & MESSAGE
function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
};

// VALIDATE EMAILADDRESS PATTERN
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S/; // The \S+ means one or more non-whitespace characters
  const patternMatches = regEx.test(email);
  return patternMatches;
};
