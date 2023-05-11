import { toggleWishlistedHeart } from "./functions/toggleWishlistedHeart.js";

const gamesContainer = document.getElementById("games-container");
const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wc/store/products?per_page=50";
const games = [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Send a GET request to the API endpoint
fetch(apiUrl)
  .then((response) => {
    // If the response is successful, parse the JSON data
    if (response.ok) {
      return response.json();
    }
    // If the response is not successful, throw an error
    throw new Error("Network response was not ok");
  })
  .then((data) => {
    // Loop through each object in the data array and extract attributes
    for (const item of data) {
      const attributes = item.attributes.map((attr) => ({ [attr.name]: attr.terms[0].name }));
      const game = {
        productId: item.id, // The actual product WP/WC ID
        id: parseInt(attributes[0].gameId),
        itemName: attributes[1].itemName,
        platform: attributes[2].platform,
        platformShort: attributes[3].platformShort,
        type: attributes[4].type,
        region: attributes[5].region,
        releaseDate: attributes[6].releaseDate,
        currentPrice: parseFloat(attributes[7].currentPrice),
        beforePrice: parseFloat(attributes[8].beforePrice),
        gamespotRating: attributes[9].gamespotRating,
        isWishlisted: parseInt(attributes[10].isWishlisted),
        coverImage: attributes[11].coverImage,
        productOverview: attributes[12].productOverview,
        productDescription: attributes[13].productDescription,
        productPlot: attributes[14].productPlot,
        productGameplay: attributes[15].productGameplay,
        productKeyFeatures: attributes[16].productKeyFeatures,
        featured: parseInt(attributes[17].featured),
      };
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      const gameID = parseInt(params.get("id"));
      if (parseInt(game.id) === gameID) {
        games.push(game);
        if (wishlist.length > 0) {
          // Loop through each item in the wishlist
          wishlist.forEach((game) => {
            // Check if the game is already in the games array
            const index = games.findIndex((g) => g.id === game.id);

            // If the game is not in the games array, add it
            if (index === -1) {
              games.push(game);
            }
            // If the game is already in the games array, replace it
            else {
              games[index] = game;
            }
          });
        };
      };
    };

    // CREATE HTML WITH DEATILS FROM API
    function createDetails() {
      if (games.length === 0) {
        // As per Abi's advice in last class session to get functional code first, not optimized.
        location.reload();
      }
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      const gameID = parseInt(params.get("id"));

      // Find the game object with the matching ID
      const game = games.find((game) => parseInt(game.id) === gameID);

      let heartIcon = game.isWishlisted === 1 ? "images/ico_heart.svg" : "images/ico_heart_+.svg";
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

      // Set the game title as the page title
      document.title = game.itemName;

      toggleWishlistedHeart(1000);

      gamesContainer.innerHTML = `
        <div class="main__wrapper">
          <section class="product_details" aria-label="Product Details | Main Section">
            <h1>${game.itemName}</h1>
            <div class="details">
              <div class="image-mockup psn__wrapper psn__wrapper_wide">
                <div class="container game-cards" data-filter="${game.platform}-${game.type}">
                  <div class="game-details">
                    <div class="psnleft game-title">
                      <h4 class="yellow type">${game.platformShort} | ${game.type} Version</h4>
                    </div>
                    <div class="game-cover">
                      <a href=${
                        game.coverImage
                      } target="_blank" alt="Click to open image in new window" aria-label="Click to open image in new window">
                        <img src=${game.coverImage} alt="${game.itemName} ${game.platform} | ${game.type} Version">
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
                      <span class="small psnright">
                        <img class="remove small psnright add-to-wishlist wishlist-icon ${
                          game.isWishlisted === 1 ? "fas" : "far"
                        }" src="${heartIcon}" alt="Add to wishlist" data-id="${parseInt(game.id)}">
                      </span>
                    </div>
                    <label for="quantity" class="ourprice psnright">Quantity:</label>
                    <div class="number psnleft">
                      <input class="howmany" type="number" id="quantity" name="quantity" value="1">
                    </div>
                    <div class="price psnright">
                    <span class="dollar yellow">.</span>${game.currentPrice}
                    </div>
                    <a href="checkout.html" role="button" class="checkout-event psnright">Checkout</a>
                    <div class="price__before psnright">
                      <span class="dollar yellow">.</span>${game.beforePrice}
                    </div>
                  </div>
                  <div class="psn__buttons">
                    <div class="cta add-to-cart">Add to cart</div>
                    <a href="cart.html" role="button">
                      <div class="cta">Go to cart</div>
                    </a>
                  </div>
                </div>
                <div class="summary__wrapper">
                  <p class="summary">
                    ${game.productOverview}
                  </p>
                  <a href="images/gamedetails/forgelegenddetails2.jpg" aria-label="Click to see high resolution version">
                    <span class="detail-image" role="img" aria-label="Glowing mushroms under big tree"></span>
                  </a>
                </div>
              </div>
            </div>
            <div class="description">
              <h2 class="h4">Product Description</h2>
              <div class="divider"></div>
              <p>
                ${game.productDescription}
              </p>
              <div class="details-img">
                <a href="images/gamedetails/forgelegenddetails1.jpg" aria-label="Click to see high resolution version" target="_new">
                  <img src="images/gamedetails/forgelegenddetails1_small.jpg" alt="Beautiful boat on a beach in Forge Legend">
                </a>
                <div class="plot">
                  <h3 class="h6">Plot</h3>
                  <p>
                    ${game.productPlot}
                  </p>
                </div>
              </div>
              <div class="gameplay">
                <h3 class="h6">Gameplay</h3>
                <p>
                  ${game.productGameplay}
                </p>
              </div>
              <div class="features">
                <h3 class="h6">Key Features</h3>
                <p>
                  ${game.productKeyFeatures}
                </p>
              </div>
            </div>
          </section>
        </div>
        `;

      // Calculate Price
      const quantityInput = document.getElementById("quantity");
      const price = parseFloat(game.currentPrice);
      quantityInput.addEventListener("input", () => {
        const quantity = parseInt(quantityInput.value);
        const total = price * quantity;
        const formattedTotal = total.toFixed(2);
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

        const quantity = parseInt(quantityInput.value);
        const coverImage = game.coverImage;
        const itemName = game.itemName;
        const currentPrice = parseFloat(game.currentPrice);
        const beforePrice = parseFloat(game.beforePrice);
        const platformShort = game.platformShort;
        const type = game.type;
        const releaseDate = game.releaseDate;
        const isWishlisted = parseInt(game.isWishlisted);
        const region = game.region;
        const platform = game.platform;
        const gamespotRating = game.gamespotRating;
        const total = currentPrice * quantity;
        const formattedTotal = total.toFixed(2);
        const product = {
          id: parseInt(game.id),
          itemName: itemName,
          coverImage: coverImage,
          isWishlisted: isWishlisted,
          releaseDate: releaseDate,
          type: type,
          region: region,
          platform: platform,
          gamespotRating: gamespotRating,
          currentPrice: currentPrice,
          beforePrice: beforePrice,
          platformShort: platformShort,
          name: itemName,
          coverImage: coverImage,
          quantity: quantity,
          price: currentPrice,
          platformShort: `${platformShort} | ${type} Version`,
          total: parseFloat(formattedTotal),
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex((p) => p.id === gameID);
        if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity += quantity;
          cart[existingProductIndex].total = (
            cart[existingProductIndex].quantity * cart[existingProductIndex].price
          ).toFixed(2);
        } else {
          cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      // Add event listeners to the buttons
      document.querySelector(".add-to-cart").addEventListener("click", addToCart);
    }
    createDetails();
  })
  .catch((error) => {
    // Log any errors to the console
    console.error("Error:", error);
  });

// ADD TO WISHLIST FUNCTION
function addToWishlist(event) {
  const target = event.target;
  if (!target.classList.contains("add-to-wishlist")) {
    return; // ignore clicks on non-add-to-wishlist elements
  }
  const gameID = target.dataset.id;
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const existingIndex = wishlist.findIndex((game) => parseInt(game.id) === parseInt(gameID));
  if (existingIndex >= 0) {
    // game is already in wishlist, remove it
    wishlist.splice(existingIndex, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
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
    const platform = game.platform;
    const gamespotRating = game.gamespotRating;
    const total = currentPrice;
    const formattedTotal = total.toFixed(2);
    const productOverview = game.productOverview;
    const productDescription = game.productDescription;
    const productPlot = game.productPlot;
    const productGameplay = game.productGameplay;
    const productKeyFeatures = game.productKeyFeatures;
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
      quantity: 1,
      currentPrice: currentPrice,
      beforePrice: beforePrice,
      total: parseFloat(formattedTotal),
      platformShort: platformShort,
      productOverview: productOverview,
      productDescription: productDescription,
      productPlot: productPlot,
      productGameplay: productGameplay,
      productKeyFeatures: productKeyFeatures,
    };

    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartGame = cart.find((game) => game.id === gameID);
    if (cartGame) {
      cartGame.isWishlisted = 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}

if (gamesContainer) {
  gamesContainer.addEventListener("click", addToWishlist);
}
