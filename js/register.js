// VARIABLES
const registerForm = document.querySelector("#register");
const registerButton = document.querySelector("#register-button");
const usernameRegister = document.querySelector("#username");
const usernameRegisterError = document.querySelector("#username_registerError");
const passwordRegister = document.querySelector("#password");
const passwordRegisterError = document.querySelector("#password_registerError");
const repeatPasswordRegister = document.querySelector("#repeat-password");
const repeatPasswordRegisterError = document.querySelector("#repeat-password_registerError");
const emailRegister = document.querySelector("#email");
const emailRegisterError = document.querySelector("#email_registerError");

// CHANGE PLACEHOLDERS TO INPUT TIPS ON FOCUS
usernameRegister.addEventListener("focus", function () {
  usernameRegister.placeholder = "Min 4 characters";
});
usernameRegister.addEventListener("blur", function () {
  usernameRegister.placeholder = "Username";
});
passwordRegister.addEventListener("focus", function () {
  passwordRegister.placeholder = "Min 4 characters";
});
passwordRegister.addEventListener("blur", function () {
  passwordRegister.placeholder = "Password";
});
repeatPasswordRegister.addEventListener("focus", function () {
  repeatPasswordRegister.placeholder = "Repeat your wanted password";
});
repeatPasswordRegister.addEventListener("blur", function () {
  repeatPasswordRegister.placeholder = "Repeat Password";
});
emailRegister.addEventListener("focus", function () {
  emailRegister.placeholder = "Enter a valid email address";
});
emailRegister.addEventListener("blur", function () {
  emailRegister.placeholder = "Email Address";
});

// THE VALIDATION FUNCTION TO BE RUN ON SUBMIT
function validateForm(event) {
  event.preventDefault(); // Needed so the forms dont reset
  if (formSubmitted) {
    if (checkLength(usernameRegister.value, 3)) {
      usernameRegisterError.style.display = "none";
      usernameRegister.style.backgroundColor = "#8fff98";
      usernameRegister.style.color = "#000000";
    } else {
      usernameRegisterError.style.display = "block";
      usernameRegister.style.backgroundColor = "#fafad2";
      usernameRegister.style.color = "#FF0000";
    }
    if (checkLength(passwordRegister.value, 3)) {
      passwordRegisterError.style.display = "none";
      passwordRegister.style.backgroundColor = "#8fff98";
      passwordRegister.style.color = "#000000";
    } else {
      passwordRegisterError.style.display = "block";
      passwordRegister.style.backgroundColor = "#fafad2";
      passwordRegister.style.color = "#FF0000";
    }
    if (checkLength(repeatPasswordRegister.value, 3)) {
      repeatPasswordRegisterError.style.display = "none";
      repeatPasswordRegister.style.backgroundColor = "#8fff98";
      repeatPasswordRegister.style.color = "#000000";
    } else {
      repeatPasswordRegisterError.style.display = "block";
      repeatPasswordRegister.style.backgroundColor = "#fafad2";
      repeatPasswordRegister.style.color = "#FF0000";
    }
    if (validateEmail(emailRegister.value)) {
      emailRegisterError.style.display = "none";
      emailRegister.style.backgroundColor = "#8fff98";
      emailRegister.style.color = "#000000";
    } else {
      emailRegisterError.style.display = "block";
      emailRegister.style.backgroundColor = "#fafad2";
      emailRegister.style.color = "#FF0000";
    }
    if (
      checkLength(usernameRegister.value, 3) &&
      validateEmail(email.value) &&
      checkLength(passwordRegister.value, 3)
    ) {
      registerButton.setAttribute("type", "submit");
      registerButton.innerText = "Register";
      registerButton.addEventListener("click", successMessage);
    } else {
      registerButton.innerText = "Form Error";
    };
  };
};

// EVENTLISTENER TO CHECK IF FORM IS SUBMITTED
registerForm.addEventListener("submit", function (event) {
  formSubmitted = true; // Set flag to true on form submit
  validateForm(event);
});

// Add event listeners to each input for typing events
usernameRegister.addEventListener("input", validateForm);
passwordRegister.addEventListener("input", validateForm);
repeatPasswordRegister.addEventListener("input", validateForm);
email.addEventListener("input", validateForm);

// VALIDATE THE LENGTH OF USERNAME & PASSWORD
function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
};

// SHOW SUCCESS MESSAGE WHEN FORM IS SUBMITTED
function successMessage() {
  const confirmSuccess = document.querySelector("#registered");
  confirmSuccess.style.display = "block";
  confirmSuccess.innerHTML = `
    <p class="successful">Thank you for signing up!</p>
    <p class="successful">Taking you to games...</p>
  `;
  setTimeout(function () {
    window.location.assign("psn-list.html");
  }, 4000);
};

// VALIDATE EMAILADDRESS PATTERN
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S/; // The \S+ means one or more non-whitespace characters
  const patternMatches = regEx.test(email);
  return patternMatches;
};
