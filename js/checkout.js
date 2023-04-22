const paymentForm = document.querySelector("#creditcard__visa");
const cardNumber = document.querySelector("#cardnumber");
const cardNumberError = document.querySelector("#cardNumberError");
const expirationDate = document.querySelector("#exp_date");
const expirationDateError = document.querySelector("#expirationDateError");
const expirationDateToHighError = document.querySelector("#expirationDateToHighError");
const cvc = document.querySelector("#cvc");
const cvcError = document.querySelector("#cvcError");
const payNowButton = document.querySelector("#paynow-button");
const confirmSuccess = document.querySelector(".payment-complete");
let formSubmitted = false;

function formatCreditCardNumber(cardNumber) {
  // Remove all non-numeric characters
  cardNumber = cardNumber.replace(/\D/g, "");

  // Add a space after every 4 digits
  cardNumber = cardNumber.replace(/(\d{4})/g, "$1 ");

  // Trim any extra spaces
  cardNumber = cardNumber.trim();

  // Limit the input to 19 characters (16 digits + 3 spaces)
  cardNumber = cardNumber.slice(0, 19);

  return cardNumber;
};

cardNumber.addEventListener("input", function () {
  var formattedInput = formatCreditCardNumber(cardNumber.value);
  cardNumber.value = formattedInput;
});

function formatExpirationDate(expirationDate) {

  // Remove all non-numeric characters
  expirationDate = expirationDate.replace(/\D/g, "");

  // Add a slash after the first 2 digits
  expirationDate = expirationDate.replace(/(\d{2})(\d{0,2})/, "$1/$2");

  // Limit the expirationDate to 5 characters (MM/YY)
  expirationDate = expirationDate.slice(0, 5);

  // Check if the year is lower than 2023
  var toLowYear = expirationDate.slice(-2);
  if (parseInt(toLowYear) > 33) {
    expirationDate = expirationDate.slice(0, 3) + "23";
    expirationDateToHighError.style.display = "block";
  }

  // Check if the month is greater than 12
  var month = expirationDate.slice(0, 2);
  if (parseInt(month) > 12) {
    expirationDate = "12/" + expirationDate.slice(-2);
    expirationDateToHighError.style.display = "block";
  }

  // Define the year variable
  var year = expirationDate.slice(-2);

  // Hide the error message if both month and year are valid
  if (parseInt(year) <= 30 && parseInt(month) <= 12) {
    expirationDateToHighError.style.display = "none";
  }

  return expirationDate;
};

expirationDate.addEventListener("input", function () {
  var formattedInput = formatExpirationDate(expirationDate.value);
  expirationDate.value = formattedInput;
});

// CHANGE PLACEHOLDERS TO INPUT TIPS ON FOCUS
cardNumber.addEventListener("focus", function () {
  cardNumber.placeholder = "16 Digits (No spaces needed)";
});
cardNumber.addEventListener("blur", function () {
  cardNumber.placeholder = "Card Number";
});

expirationDate.addEventListener("focus", function () {
  expirationDate.placeholder = "MM/YY (Just the 4 digits)";
});
expirationDate.addEventListener("blur", function () {
  expirationDate.placeholder = "Expiration Date";
});

cvc.addEventListener("focus", function () {
  cvc.placeholder = "3 digit number on back of card";
});
cvc.addEventListener("blur", function () {
  cvc.placeholder = "Expiration Date";
});

// THE VALIDATION FUNCTION TO BE RUN ON SUBMIT
function validateForm(event) {
  event.preventDefault(); // Needed so the forms dont reset
  if (formSubmitted) {
    if (checkLength(cardNumber.value, 18)) {
      cardNumberError.style.display = "none";
      cardNumber.style.backgroundColor = "#8fff98";
      cardNumber.style.color = "#000000";
    } else {
      cardNumberError.style.display = "block";
      cardNumber.style.backgroundColor = "#fafad2";
      cardNumber.style.color = "#000000";
    }
    if (checkLength(expirationDate.value, 4)) {
      expirationDateError.style.display = "none";
      expirationDate.style.backgroundColor = "#8fff98";
      expirationDate.style.color = "#000000";
    } else {
      expirationDateError.style.display = "block";
      expirationDate.style.backgroundColor = "#fafad2";
      expirationDate.style.color = "#FF0000";
    }
    if (checkLength(cvc.value, 2)) {
      cvcError.style.display = "none";
      cvc.style.backgroundColor = "#8fff98";
      cvc.style.color = "#000000";
    } else {
      cvcError.style.display = "block";
      cvc.style.backgroundColor = "#fafad2";
      cvc.style.color = "#FF0000";
    }
    if (
      checkLength(cardNumber.value, 18) &&
      checkLength(expirationDate.value, 4) &&
      checkLength(cvc.value, 2)
    ) {
      payNowButton.setAttribute("type", "submit");
      payNowButton.innerText = "Pay Now";
      payNowButton.className = "paynow-button buttonSuccess";
      payNowButton.addEventListener("click", successMessage);
    } else {
      payNowButton.setAttribute("type", "button");
      payNowButton.innerText = "Form Error";
      payNowButton.className = "buttonNotReady";
    };
  };
};

// EVENTLISTENER TO CHECK IF SUBMIT BUTTON IS CLICKED
paymentForm.addEventListener("submit", function (event) {
  formSubmitted = true; // Set flag to true on form submit
  validateForm(event);
});

// Add event listeners to each input for typing events
cardNumber.addEventListener("input", validateForm);
expirationDate.addEventListener("input", validateForm);
cvc.addEventListener("input", validateForm);

// SHOW SUCCESS MESSAGE WHEN FORM IS SUBMITTED
function successMessage() {
  const confirmSuccess = document.querySelector(".message-sent");
  confirmSuccess.style.display = "block";
  confirmSuccess.innerHTML = `
    <p>Your payment was successful</>
    <p>We are printing your receipt</p>
  `;
  setTimeout(closeSuccessMessage, 3000); //RESET CONTACT FORM AFTER 3 SECONDS
  function redirect() {
    window.location.href = "../checkout_success.html";
  };
  // set a timer to call the redirect function after 4.2 seconds
  setTimeout(redirect, 4200);
};

// RESET CONTACT FORM AFTER SET TIMOUT
function closeSuccessMessage() {
  const confirmSuccess = document.querySelector(".message-sent");
  confirmSuccess.style.display = "none";
  cardNumber.value = "";
  cardNumber.style.backgroundColor = "rgb(250, 235, 215)";
  expirationDate.value = "";
  expirationDate.style.backgroundColor = "rgb(250, 235, 215)";
  cvc.value = "";
  cvc.style.backgroundColor = "rgb(250, 235, 215)";
  payNowButton.style.backgroundColor = "#404040";
  payNowButton.style.color = "#f5c51880";
  payNowButton.innerText = "Pay Now";
  payNowButton.setAttribute("type", "button");
};

// VALIDATE THE LENGTH OF CREDIT CARD, EXPIRATION DATE & CVC
function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
};

// ORDER SUMMARY
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalQuantity = 0;
let totalPrice = 0;
cart.forEach((item) => {
  totalQuantity += item.quantity;
  totalPrice += parseFloat(item.price) * item.quantity; // updated calculation
});

const freight = 4.95;
const toPayPrice = freight + totalPrice;
const cartsummary = document.getElementById("checkout__cart");
cartsummary.innerHTML += `
  <div class="order row1">Games:</div>
  <a href="cart.html" alt="Go To Cart">
    <div class="row1 checkout_items yellow">(${parseInt(totalQuantity)} items)</div>
  </a>
  <div class="amount row1"><span class="yellow">$ </span>${totalPrice.toFixed(2)}</div>
  <div class="filler row2">.</div>
  <div class="filler row2"></div>
  <div class="amount_before row2 price__before__top yellow"></div>
  <div class="row3 vat">(VAT included if applicable)</div>
  <div class="row3 filler"></div>
  <div class="row3 filler"></div>
  <div class="freight row4">Freight:</div>
  <div class="filler row4"></div>
  <div class="amountfreight row4">
    <span class="yellow">$ </span>4.95
  </div>
  <div class="address row5 yellow">Profile address used</div>
  <div class="change row5 yellow">
    <a class="change" href="profile.html">(Change)</a>
  </div>
  <div class="filler change row5"></div>
  <div class="total row6">Total:</div>
  <a href="cart.html" alt="Go To Cart">
    <div class="checkout_items yellow row6">(${totalQuantity} items)</div>
  </a>
  <div class="totalamount row6">
    <span class="yellow">$ </span>${toPayPrice.toFixed(2)}
  </div>
  <div class="filler row7"></div>
  <div class="filler row7"></div>
  <div class="price__before__bottom yellow row7"></div>
  <div class="row8 vat">(VAT included if applicable)</div>
  <div class="row8 filler"></div>
  <div class="filler row8"></div>
`;
