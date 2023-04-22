//function to update the cart count:
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = `${totalQuantity}`;
};

// retrieve the cart from local storage
const cart = JSON.parse(localStorage.getItem("cart")) || [];
// get the cart container element
const cartContainer = document.getElementById("cart-container");
// generate HTML code for each item in the cart and add it to the cart container
let itemText = 0;
let totalQuantity = 0;
let totalPrice = 0;
let cartTotalQuantity = 0;
let cartTotalPrice = 0;

cart.forEach((item, index) => {

  if (item.quantity === 1) {
    itemText = "item";
  } else {
    itemText = "items";
  };

  totalQuantity = item.quantity;
  totalPrice = item.quantity * item.price;
  cartContainer.innerHTML += `
  <div class="cart-item" id="cart-item">
    <div class="cart-card-top">
      <div class="cart-item__image">
        <a href="details.html?id=${item.id}" class="results-list">
          <img src="${item.coverImage}" alt="${item.itemName} ${item.platformShort}">
        </a>
      </div>
      <div class="cart-info">
        <div class="cart-item__name">${item.itemName}</div>
        <div class="cart-item__name">${item.platformShort}</div>
        <div class="cart-item__priceText">Total price:</div>
      </div>
      <div class="cart-prices">
        <div class="cart-item__price">$ ${item.price}</div>
        <div class="cart-item__quantity">${totalQuantity} ${itemText}</div>
        <div class="cart-item__total">$ ${totalPrice.toFixed(2)}</div>
      </div>
    </div>
    <div class="cart-buttons" id="cart-buttons">
      <div class="remove-item">
        <button class="remove-button" data-index="${index}">Remove</button>
      </div>
      <div class="cart-quantity">
        <div class="quantity">
          <label for="${index}" class="ourprice psnright">Quantity:</label>
          <input class="howmany" type="number" data-index="${index}" id="${index}" name="quantity" value="${ item.quantity }">
        </div>
      </div>
    </div>
  </div>
  `;
  cartTotalQuantity += item.quantity;
  cartTotalPrice += item.quantity * item.price;
});

//Update quantity
document.addEventListener('input', function(event) {
  const target = event.target;
  if (target && target.matches('.howmany')) {
    const index = parseInt(target.dataset.index);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(target.value);

    if (cart[index].quantity === 0) {
      cart.splice(index, 1); // remove the game from the cart
    };

    localStorage.setItem('cart', JSON.stringify(cart));
    // Update the quantity in the cart item element
    document.addEventListener("DOMContentLoaded", function () {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      for (let i = 0; i < cart.length; i++) {
        const cartItem = document.querySelector(`#cart-item-${i}`);
        if (cartItem) {
          // check if cartItem exists
          const quantityElement = cartItem.querySelector(".cart-item__quantity");
          quantityElement.textContent = cart[i].quantity;
        };
      };
    });
    setTimeout(() => {
      location.reload();
    }, 1000);
  };
});

// calculate total price and quantity
cart.forEach((item) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  totalQuantity += item.quantity;
  totalPrice += parseFloat(item.total);
});

localStorage.setItem("cart", JSON.stringify(cart));
// add a new element at the bottom of the cart container to display the sum
cartContainer.innerHTML += `
  <div class="cart-total">
    <p class="total">A total of</p>
    <div class="cart-total__quantity">${totalQuantity} items: </div>
    <div class="cart-total__price">$${totalPrice.toFixed(2)}</div>
  </div>
`;

// update the cart total element
const cartTotal = document.querySelector('.cart-total');
const totalQuantityElement = cartTotal.querySelector('.cart-total__quantity');
const totalPriceElement = cartTotal.querySelector('.cart-total__price');
totalQuantityElement.textContent = `${cartTotalQuantity} items: `;
totalPriceElement.textContent = `$${cartTotalPrice.toFixed(2)}`;

// update the cart summary element
const cartCountElement = document.getElementById("cart-count");
cartCountElement.textContent = `A total of ${cartTotalQuantity} ${itemText} and $ ${cartTotalPrice.toFixed(2)}`;

const freight = 4.95;
const toPayPrice = freight + cartTotalPrice;
const cartsummary = document.getElementById("checkout__cart");
cartCountElement.textContent = `A total of ${cartTotalQuantity} ${itemText} and $ ${cartTotalPrice.toFixed(2)}`;
cartsummary.innerHTML += `
  <div class="order row1">Games:</div>
  <a href="cart.html" alt="Go To Cart">
    <div class="row1 checkout_items yellow">(${cartTotalQuantity} items)</div>
  </a>
  <div class="amount row1"><span class="yellow">$ </span>${cartTotalPrice.toFixed(2)}</div>
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
  <div class="address row5 yellow">(Profile address used):</div>
  <div class="change row5 yellow">
    <a class="change" href="profile.html">(Change)</a>
  </div>
  <div class="filler change row5"></div>
  <div class="total row6">Total:</div>
  <a href="cart.html" alt="Go To Cart">
    <div class="checkout_items yellow row6">(${cartTotalQuantity} items)</div>
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

// add event listeners to the remove buttons
const removeButtons = document.querySelectorAll(".remove-item");
removeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const index = event.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  });
});
