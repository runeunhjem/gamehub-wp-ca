// VARIABLES
const signInForm = document.querySelector("#sign_in");
const signInButton = document.querySelector("#sign-in-button");
const usernameSignIn = document.querySelector("#username_signin");
const usernameSignInError = document.querySelector("#username_signinError");
const passwordSignin = document.querySelector("#password_signin");
const passwordSigninError = document.querySelector("#password_signinError");
let formSubmitted = false;

// CHANGE PLACEHOLDERS TO INPUT TIPS ON FOCUS
usernameSignIn.addEventListener("focus", function () {
  usernameSignIn.placeholder = "Min 4 characters";
});
usernameSignIn.addEventListener("blur", function () {
  usernameSignIn.placeholder = "Username";
});
passwordSignin.addEventListener("focus", function () {
  passwordSignin.placeholder = "Min 4 characters";
});
passwordSignin.addEventListener("blur", function () {
  passwordSignin.placeholder = "Password";
});

// THE VALIDATION FUNCTION TO BE RUN ON SUBMIT
function validateForm(event) {
  event.preventDefault(); // Needed so the forms dont reset
  if (formSubmitted) {
    if (checkLength(usernameSignIn.value, 3)) {
      usernameSignInError.style.display = "none";
      usernameSignIn.style.backgroundColor = "#8fff98";
      usernameSignIn.style.color = "#000000";
    } else {
      usernameSignInError.style.display = "block";
      usernameSignIn.style.backgroundColor = "#fafad2";
      usernameSignIn.style.color = "#FF0000";
    }
    if (checkLength(passwordSignin.value, 3)) {
      passwordSigninError.style.display = "none";
      passwordSignin.style.backgroundColor = "#8fff98";
      passwordSignin.style.color = "#000000";
    } else {
      passwordSigninError.style.display = "block";
      passwordSignin.style.backgroundColor = "#fafad2";
      passwordSignin.style.color = "#FF0000";
    }    
    if (
      checkLength(usernameSignIn.value, 3) &&
      checkLength(passwordSignin.value, 3)      
    ) {
      signInButton.setAttribute("type", "submit");
      signInButton.innerText = "Sign In";      
      signInButton.addEventListener("click", successMessage);
    } else {      
      signInButton.innerText = "Form Error";      
    };
  };
};

// EVENTLISTENER TO CHECK IF FORM IS SUBMITTED
signInForm.addEventListener("submit", function (event) {
  formSubmitted = true; // Set flag to true on form submit
  validateForm(event);
});

// Add event listeners to each input for typing events
usernameSignIn.addEventListener("input", validateForm);
passwordSignin.addEventListener("input", validateForm);

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
  const confirmSuccess = document.querySelector(".message-sent");
  confirmSuccess.style.display = "block";
  confirmSuccess.innerHTML = `
    <p class="successful">You are now logged in</p>
    <p class="successful">Taking you to games...</p>
  `;
  setTimeout(function () {
    window.location.assign("psn-list.html");
  }, 4000);
};

