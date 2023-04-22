import { toggleWishlistedHeart } from "./functions/toggleWishlistedHeart.js";
import { games } from "./games.js";
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const gamesContainer = document.getElementById("games-container");
const featuredContainer = document.getElementById("featured-container");

// DROPDOWN MENU
const burger1 = document.querySelector("#burger1");
const burger2 = document.querySelector("#burger2");
const menuFlyin = document.querySelector(".menu-flyin");

burger1.addEventListener("click", function () {
  menuFlyin.classList.toggle("show");
});

burger1.addEventListener("keydown", function (event) {
  if (event.code === "Enter" || event.code === "Space") {
    menuFlyin.classList.toggle("show");
  }
});
burger2.addEventListener("keydown", function (event) {
  if (event.code === "Enter" || event.code === "Space") {
    menuFlyin.classList.toggle("show");
  }
});

burger2.addEventListener("click", function () {
  menuFlyin.classList.toggle("show");
});

// BACK BUTTON
let backLinks = document.querySelectorAll(".back-link");
backLinks.forEach(function (backLink) {
  backLink.addEventListener("click", function (event) {
    event.preventDefault();
    window.history.go(-1);
  });
});

//SEARCH
const form = document.getElementById("search-form");
const input = form.querySelector("input[name='query']");

input.addEventListener("focus", function () {
  document.querySelector("#search").style.backgroundColor = "#fafad2";
  document.querySelector("#search").style.color = "#000";
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const query = input.value;
  const url = `search-results.html?query=${query}`;
  form.action = url;
  form.submit();
});

function resetBackgroundColor() {
  var searchInput = document.querySelector('input[type="text"]');
  searchInput.style.backgroundColor = "#00000099";
};

document.addEventListener("click", function (event) {
  var searchForm = document.querySelector("form");
  var isClickInside = searchForm.contains(event.target);
  if (!isClickInside) {
    resetBackgroundColor();
  };
});

// ADD TO CART FUNCTION
function addToCart(event) {
  const target = event.target;
  if (!target.classList.contains("add-to-cart")) {
    return; // ignore clicks on non-add-to-cart elements
  }

  target.classList.add("add-to-cart-clicked");
  setTimeout(() => {
    target.classList.remove("add-to-cart-clicked");
  }, 1000);

  const gameID = target.dataset.id;
  const game = games.find((g) => parseInt(g.id, 10) === parseInt(gameID, 10));
  const coverImage = game.coverImage;
  let quantity = 1;
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const isWishlisted = wishlist.findIndex((game) => parseInt(game.id) === parseInt(gameID, 10)) >= 0 ? 1 : 0;
  const container = target.closest(".container");
  const itemName = container.querySelector(".game-title .type").textContent;
  const price = parseFloat(container.querySelector(".currentPrice").textContent);
  const platformShort = container.querySelector(".gametitle-info").textContent;
  const total = price * quantity;
  const featured = game.featured;
  const formattedTotal = total.toFixed(2);

  const product = {
    id: parseInt(gameID),
    itemName: itemName,
    coverImage: coverImage,
    isWishlisted: isWishlisted,
    quantity: quantity,
    price: parseFloat(price),
    total: parseFloat(formattedTotal),
    platformShort: platformShort,
    featured: featured,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex((p) => parseInt(p.id) === parseInt(gameID));
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
    cart[existingProductIndex].total = (cart[existingProductIndex].quantity * cart[existingProductIndex].price).toFixed(2);
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

// ADD TO WISHLIST FUNCTION
function addToWishlist(event) {
  const target = event.target;
  if (!target.classList.contains("add-to-wishlist")) {
    return; // ignore clicks on non-add-to-wishlist elements
  };
  const gameID = target.dataset.id;
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const existingIndex = wishlist.findIndex((game) => parseInt(game.id) === parseInt(gameID));
  if (existingIndex >= 0) {
    // game is already in wishlist, remove it
    wishlist.splice(existingIndex, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    if (window.location.pathname === "/wishlist.html") {
      const icon = document.querySelector(`.wishlist-icon[data-id="${gameID}"]`);
      icon.closest(".container").remove();
    };
  } else {
    const game = games.find((g) => parseInt(g.id, 10) === parseInt(gameID, 10));
    const coverImage = game.coverImage;
    const container = target.closest(".container");
    const itemName = game.itemName;
    const currentPrice = parseFloat(game.currentPrice);
    const beforePrice = parseFloat(game.beforePrice);
    const platformShort = game.platformShort;
    const type = game.type;
    const releaseDate = game.releaseDate;
    const region = game.region;
    const isWishlisted = 1;
    const quantity = 1;
    const platform = game.platform;
    const gamespotRating = game.gamespotRating;
    const total = parseFloat(currentPrice);
    const formattedTotal = total.toFixed(2);
    const productOverview = game.productOverview;
    const productDescription = game.productDescription;
    const productPlot = game.productPlot;
    const productGameplay = game.productGameplay;
    const productKeyFeatures = game.productKeyFeatures;
    const featured = game.featured;
    const product = {
      id: parseInt(gameID),
      itemName: itemName,
      coverImage: coverImage,
      isWishlisted: isWishlisted,
      releaseDate: releaseDate,
      type: type,
      region: region,
      platform: platform,
      gamespotRating: gamespotRating,
      quantity: quantity,
      currentPrice: currentPrice * quantity,
      beforePrice: beforePrice,
      total: formattedTotal,
      platformShort: platformShort,
      productOverview: productOverview,
      productDescription: productDescription,
      productPlot: productPlot,
      productGameplay: productGameplay,
      productKeyFeatures: productKeyFeatures,
      featured: featured,
    };
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartGame = cart.find((game) => parseInt(game.id) === parseInt(gameID));
    if (cartGame) {
      cartGame.isWishlisted = 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    };
  };
};

if (gamesContainer) {
  gamesContainer.addEventListener("click", addToWishlist);
  gamesContainer.addEventListener("click", addToCart);
};

if (featuredContainer) {
  featuredContainer.addEventListener("click", addToCart);
  featuredContainer.addEventListener("click", addToWishlist);
};

if (document.querySelector(".clear-cart")) {
  document.querySelector(".clear-cart").addEventListener("click", clearCart);
};

if (document.querySelector(".clear-wishlist")) {
  document.querySelector(".clear-wishlist").addEventListener("click", clearWishlist);
};

// clear cart function
function clearCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
  updateCartCount();
};

// clear wishlist function
function clearWishlist() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = [];
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload();
  updatewishlistCount();
};

// FILTER SECTION
const filterSelect = document.getElementById("filters");
const filtersAreOnPage = document.querySelector(".search-container");
if (filtersAreOnPage) {
  filterSelect.addEventListener("change", (event) => {
    const selectedFilter = event.target.value;
    let filteredGames = games;
    if (
      selectedFilter === "Playstation 4" ||
      selectedFilter === "Playstation 5" ||
      selectedFilter === "XBOX" ||
      selectedFilter === "Nintendo"
    ) {
      filteredGames = filteredGames.filter((game) => game.platform === selectedFilter);
    } else if (selectedFilter === "Full Disc Versions" || selectedFilter === "Key only Versions") {
      filteredGames = filteredGames.filter((game) => {
        if (selectedFilter === "Full Disc Versions" && game.type === "Disc") {
          return true;
        } else if (selectedFilter === "Key only Versions" && game.type === "Key") {
          return true;
        } else {
          return false;
        }
      });
    };

    // Regenerate the HTML for the filtered games
    const filteredHtml = filteredGames
      .map((game) => {
        // Determine which heart icon to display based on isWishlisted
        let heartIcon = parseInt(game.isWishlisted) === 1 ? "images/ico_heart.svg" : "images/ico_heart_+.svg";
        const typeIcon = game.type === "Key" ? "images/ico_key.svg" : "images/ico_disc.svg";

        const platformIcon =
          game.platform === "XBOX"
            ? "images/ico_xbox_yellow.svg"
            : game.platform === "Playstation 4"
            ? "images/ico_psn.svg"
            : game.platform === "Playstation 5"
            ? "images/ico_psn.svg"
            : game.platform === "Nintendo"
            ? "images/ico_nintendo_yellow.svg"
            : "";

        return `
        <div class="container game-cards" data-filter="${game.platform}-${game.type}">
        <div class="items ${game.itemName}">
          <div class="psnleft game-title">
            <h2 class="h4 type">${game.itemName}</h2>
            <span class="gametitle-info">${game.platformShort} | ${game.type} Version</span>
          </div>
          <div class="game-cover">
            <a href="details.html?id=${parseInt(game.id)}" class="results-list">
            <img class="game-img" src=${game.coverImage} alt="${game.itemName} ${game.platform} | ${game.type} Version">
            </a>
          </div>
          <div class="small psnleft release-date">Release Date:</div>
          <div class="small psnleft reldate">${game.releaseDate}</div>
          <div class="small psnleft">Type:</div>
          <div class="small psncenter type-ico">
            <img src="${typeIcon}" alt="${game.type}">
          </div>
          <div class="small psnleft type-text">${game.type}</div>
          <div class="small psnleft region">Region:</div>
          <div class="small psncenter region-ico">
            <img src="images/ico_europe.svg" alt="Region | Europe">
          </div>
          <div class="small psnleft region-text">${game.region}</div>
          <div class="small psnleft platform">Platform:</div>
          <div class="small psncenter platform-ico">
            <img src="${platformIcon}" alt="${game.platform}">
          </div>
          <div class="small psnleft platform-text">${game.platform}</div>
          <div class="psnleft gsrating">Gamespot Rating:</div>
          <div class="psnright rating">${game.gamespotRating}</div>
          <div class="small psnleft readreview">
            <a href="https://www.gamespot.com/games/reviews/">Read review</a>
          </div>
          <div class="togglewishlist add-to-wishlist">
            <span class="small psnright" href="wishlist.html">
              <img class="remove small psnright add-to-wishlist wishlist-icon ${
                game.isWishlisted === 1 ? "fas" : "far"
              }" src="${heartIcon}" alt="Add to wishlist" data-id="${parseInt(game.id)}">
            </span>
          </div>
          <div class="price psnright">
            <span class="dollar yellow">.</span>
            <span class="price currentPrice">${parseFloat(game.currentPrice)}</span>
          </div>
          <div class="price__before psnright">
            <span class="dollar yellow">.</span>${parseFloat(game.beforePrice)}
          </div>
        </div>
          <div class="psn__buttons">
            <div class="cta add-to-cart" data-id="${parseInt(game.id)}">Add to cart</div>
            <a href="details.html?id=${parseInt(game.id)}" class="results-list" role="button">
              <div class="cta">View Details</div>
            </a>
          </div>
        </div>
      `;
      })
      .join("");

    // Set the HTML of the gamesContainer element to the filtered HTML
    gamesContainer.innerHTML = filteredHtml;
    toggleWishlistedHeart(1000);
  });
};

// SORT SECTION
const sortSelect = document.getElementById("sort");
const sortAreOnPage = document.querySelector(".choose-sort");
if (sortAreOnPage) {
  sortSelect.addEventListener("change", (event) => {
    const selectedSort = event.target.value;
    let sortedGames = games;
    if (selectedSort === "Price (Low to High)") {
      sortedGames = sortedGames.sort((a, b) => parseFloat(a.currentPrice) - parseFloat(b.currentPrice));
    } else if (selectedSort === "Price (High to Low)") {
      sortedGames = sortedGames.sort((a, b) => parseFloat(b.currentPrice) - parseFloat(a.currentPrice));
    } else if (selectedSort === "Release Date (Newest First)") {
      sortedGames = sortedGames.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (selectedSort === "Release Date (Oldest First)") {
      sortedGames = sortedGames.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    } else if (selectedSort === "Name (A to Z)") {
      sortedGames = sortedGames.sort((a, b) => a.itemName.localeCompare(b.itemName));
    } else if (selectedSort === "Name (Z to A)") {
      sortedGames = sortedGames.sort((a, b) => b.itemName.localeCompare(a.itemName));
    };

    // Regenerate the HTML for the sorted games
    const sortedHtml = sortedGames
      .map((game) => {
        // Determine which heart icon to display based on isWishlisted
        let heartIcon = parseInt(game.isWishlisted) === 1 ? "images/ico_heart.svg" : "images/ico_heart_+.svg";
        const typeIcon = game.type === "Key" ? "images/ico_key.svg" : "images/ico_disc.svg";

        const platformIcon =
          game.platform === "XBOX"
            ? "images/ico_xbox_yellow.svg"
            : game.platform === "Playstation 4"
            ? "images/ico_psn.svg"
            : game.platform === "Playstation 5"
            ? "images/ico_psn.svg"
            : game.platform === "Nintendo"
            ? "images/ico_nintendo_yellow.svg"
            : "";

        return `
        <div class="container game-cards" data-filter="${game.platform}-${game.type}">
        <div class="items ${game.itemName}">
          <div class="psnleft game-title">
            <h2 class="h4 type">${game.itemName}</h2>
            <span class="gametitle-info">${game.platformShort} | ${game.type} Version</span>
          </div>
          <div class="game-cover">
            <a href="details.html?id=${parseInt(game.id)}" class="results-list">
              <img class="game-img" src=${game.coverImage} alt="${game.itemName} ${game.platform} | ${game.type} Version">
            </a>
          </div>
          <div class="small psnleft release-date">Release Date:</div>
          <div class="small psnleft reldate">${game.releaseDate}</div>
          <div class="small psnleft">Type:</div>
          <div class="small psncenter type-ico">
            <img src="${typeIcon}" alt="${game.type}">
          </div>
          <div class="small psnleft type-text">${game.type}</div>
          <div class="small psnleft region">Region:</div>
          <div class="small psncenter region-ico">
            <img src="images/ico_europe.svg" alt="Region | Europe">
          </div>
          <div class="small psnleft region-text">${game.region}</div>
          <div class="small psnleft platform">Platform:</div>
          <div class="small psncenter platform-ico">
            <img src="${platformIcon}" alt="${game.platform}">
          </div>
          <div class="small psnleft platform-text">${game.platform}</div>
          <div class="psnleft gsrating">Gamespot Rating:</div>
          <div class="psnright rating">${game.gamespotRating}</div>
          <div class="small psnleft readreview">
            <a href="https://www.gamespot.com/games/reviews/">Read review</a>
          </div>
          <div class="togglewishlist add-to-wishlist">
            <span class="small psnright" href="wishlist.html">
              <img class="remove small psnright add-to-wishlist wishlist-icon ${
                game.isWishlisted === 1 ? "fas" : "far"
              }" src="${heartIcon}" alt="Add to wishlist" data-id="${parseInt(game.id)}">
            </span>
          </div>
          <div class="price psnright">
            <span class="dollar yellow">.</span>
            <span class="price currentPrice">${parseFloat(game.currentPrice)}</span>
          </div>
          <div class="price__before psnright">
            <span class="dollar yellow">.</span>${parseFloat(game.beforePrice)}
          </div>
        </div>
          <div class="psn__buttons">
            <div class="cta add-to-cart" data-id="${parseInt(game.id)}">Add to cart</div>
            <a href="details.html?id=${parseInt(game.id)}" class="results-list" role="button">
              <div class="cta">View Details</div>
            </a>
          </div>
        </div>
      `;
      })
      .join("");

    // Set the HTML of the gamesContainer element to the filtered HTML
    gamesContainer.innerHTML = sortedHtml;
    toggleWishlistedHeart(1000);
  });
};
