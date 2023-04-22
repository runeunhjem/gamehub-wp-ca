// VARIABLES
const sellGamesForm = document.querySelector("#sellgames-form");
const sellGamesButton = document.querySelector("#sellGames-button");
const titleSellGames = document.querySelector("#title");
const titleSellGamesError = document.querySelector("#titleSellGamesError");
const passwordsellGames = document.querySelector("#confirm");
const passwordsellGamesError = document.querySelector("#password_sellGamesError");
const typeSellGames = document.querySelector("#type");
const typeSellGamesError = document.querySelector("#typeSellGamesError");
const paypalSellGames = document.querySelector("#paypal");
const paypalSellGamesError = document.querySelector("#paypalSellGamesError");
let formSubmitted = false;

// CHANGE PLACEHOLDERS TO INPUT TIPS ON FOCUS
titleSellGames.addEventListener("focus", function () {
  titleSellGames.placeholder = "Min 1 character";
});
titleSellGames.addEventListener("blur", function () {
  titleSellGames.placeholder = "Game Title";
});
passwordsellGames.addEventListener("focus", function () {
  passwordsellGames.placeholder = "Min 4 characters";
});
passwordsellGames.addEventListener("blur", function () {
  passwordsellGames.placeholder = "Password";
});
typeSellGames.addEventListener("focus", function () {
  typeSellGames.placeholder = "Min 3 letters";
});
typeSellGames.addEventListener("blur", function () {
  typeSellGames.placeholder = "Key or Disc";
});
paypalSellGames.addEventListener("focus", function () {
  paypalSellGames.placeholder = "Enter a valid email address";
});
paypalSellGames.addEventListener("blur", function () {
  paypalSellGames.placeholder = "Email Address";
});

// THE VALIDATION FUNCTION TO BE RUN ON SUBMIT
function validateForm(event) {
  event.preventDefault(); // Needed so the forms dont reset
  if (formSubmitted) {
    if (checkLength(titleSellGames.value, 0)) {
      titleSellGamesError.style.display = "none";
      titleSellGames.style.backgroundColor = "#8fff98";
      titleSellGames.style.color = "#000000";
    } else {
      titleSellGamesError.style.display = "block";
      titleSellGames.style.backgroundColor = "#fafad2";
      titleSellGames.style.color = "#FF0000";
    }
    if (checkLength(passwordsellGames.value, 3)) {
      passwordsellGamesError.style.display = "none";
      passwordsellGames.style.backgroundColor = "#8fff98";
      passwordsellGames.style.color = "#000000";
    } else {
      passwordsellGamesError.style.display = "block";
      passwordsellGames.style.backgroundColor = "#fafad2";
      passwordsellGames.style.color = "#FF0000";
    }
    if (checkLength(typeSellGames.value, 2)) {
      typeSellGamesError.style.display = "none";
      typeSellGames.style.backgroundColor = "#8fff98";
      typeSellGames.style.color = "#000000";
    } else {
      typeSellGamesError.style.display = "block";
      typeSellGames.style.backgroundColor = "#fafad2";
      typeSellGames.style.color = "#FF0000";
    }
    if (validateEmail(paypalSellGames.value)) {
      paypalSellGamesError.style.display = "none";
      paypalSellGames.style.backgroundColor = "#8fff98";
      paypalSellGames.style.color = "#000000";
    } else {
      paypalSellGamesError.style.display = "block";
      paypalSellGames.style.backgroundColor = "#fafad2";
      paypalSellGames.style.color = "#FF0000";
    }
    if (
      checkLength(titleSellGames.value, 0) &&
      checkLength(typeSellGames.value, 2) &&
      validateEmail(paypalSellGames.value) &&
      checkLength(passwordsellGames.value, 3)
    ) {
      sellGamesButton.setAttribute("type", "submit");
      sellGamesButton.innerText = "Sell My Game";
      sellGamesButton.addEventListener("click", successMessage);
    } else {
      sellGamesButton.innerText = "Form Error";
    }
  }
}

// EVENTLISTENER TO CHECK IF FORM IS SUBMITTED
sellGamesForm.addEventListener("submit", function (event) {
  formSubmitted = true; // Set flag to true on form submit
  validateForm(event);
});

// Add event listeners to each input for typing events
titleSellGames.addEventListener("input", validateForm);
passwordsellGames.addEventListener("input", validateForm);
typeSellGames.addEventListener("input", validateForm);
paypalSellGames.addEventListener("input", validateForm);

// VALIDATE THE LENGTH OF USERNAME & PASSWORD
function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

// SHOW SUCCESS MESSAGE WHEN FORM IS SUBMITTED
function successMessage() {
  const confirmSuccess = document.querySelector("#sellGames-sold");
  confirmSuccess.style.display = "block";
  confirmSuccess.innerHTML = `
    <p class="successful">Thank you!</p>
    <p class="successful">We will send you an email</p>
    <p class="successful">when the game is approved</p>
    <p class="successful">Taking you to games...</p>
  `;
  setTimeout(function () {
    window.location.assign("psn-list.html");
  }, 5000);
}

// VALIDATE EMAILADDRESS PATTERN
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S/; // The \S+ means one or more non-whitespace characters
  const patternMatches = regEx.test(email);
  return patternMatches;
}
