import { games } from "./games.js";
document.addEventListener("DOMContentLoaded", () => {
  const gamesContainer = document.getElementById("games-container");

  // Save the updated wishlist to localStorage
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  setTimeout(() => {
    // Iterate over the wishlisted games array and create a new HTML element for each game
    wishlist.forEach((e, index) => {
      const gameID = parseInt(e.id);
      let game = games.find((e) => parseInt(e.id, 10) === gameID, 10);

      const coverImage = e.coverImage;
      const heartIcon = parseInt(e.isWishlisted) === 1 ? "images/ico_heart.svg" : "images/ico_heart_+.svg";
      const typeIcon = e.type === "Key" ? "images/ico_key.svg" : "images/ico_disc.svg";

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

      const itemName = e.itemName;
      const price = parseFloat(e.currentPrice);
      const beforePrice = parseFloat(e.beforePrice);
      const platformShort = e.platformShort;
      const platform = e.platform;
      const type = e.type;
      const region = e.region;
      const gamespotRating = e.gamespotRating;;
      const releaseDate = e.releaseDate;
      const total = parseFloat(price);
      const formattedTotal = total.toFixed(2);
      const isWishlisted = parseInt(e.isWishlisted);
      const product = {
        id: parseInt(gameID),
        name: itemName,
        coverImage: coverImage,
        isWishlisted: isWishlisted,
        releaseDate: releaseDate,
        platform: platform,
        type: type,
        region: region,
        gamespotRating: gamespotRating,
        quantity: 1,
        price: price,
        beforePrice: beforePrice,
        total: formattedTotal,
        platformShort: platformShort,
      };

      gamesContainer.innerHTML += `
      <div class="container game-cards" data-filter="${platform}-${type}">
        <div class="items ${itemName}">
          <div class="psnleft game-title">
            <h2 class="h4 type">${itemName}</h2><span class="gametitle-info">${platformShort} | ${type} Version</span>
          </div>
          <div class="game-cover">
            <a href="details.html?id=${gameID}" class="results-list">
              <img class="game-img" src=${coverImage} alt="${itemName} ${platform} | ${type} Version">
            </a>
          </div>
          <div class="small psnleft release-date">Release Date:</div>
          <div class="small psnleft reldate">${releaseDate}</div>
          <div class="small psnleft">Type:</div>
          <div class="small psncenter type-ico">
            <img src="${typeIcon}" alt="${type}">
          </div>
          <div class="small psnleft type-text">${type}</div>
          <div class="small psnleft region">Region:</div>
          <div class="small psncenter region-ico">
            <img src="images/ico_europe.svg" alt="Region | Europe">
          </div>
          <div class="small psnleft region-text">${region}</div>
          <div class="small psnleft platform">Platform:</div>
          <div class="small psncenter platform-ico">
            <img src="${platformIcon}" alt="${game.platform}">
          </div>
          <div class="small psnleft platform-text">${platform}</div>
          <div class="psnleft gsrating">Gamespot Rating:</div>
          <div class="psnright rating">${gamespotRating}</div>
          <div class="small psnleft readreview">
            <a href="https://www.gamespot.com/games/reviews/">Read review</a>
          </div>
          <div class="togglewishlist add-to-wishlist">
            <span class="small psnright">
              <img class="remove small psnright add-to-wishlist wishlist-icon ${ parseInt(isWishlisted) === 1 ? "fas" : "far" }" src="${heartIcon}" alt="Add to wishlist" data-id="${parseInt(game.id)}">
            </span>
          </div>
          <div class="price psnright">
            <span class="dollar yellow">.</span>
            <span class="price currentPrice">${price}</span>
          </div>
          <div class="price__before psnright">
            <span class="dollar yellow">.</span>${beforePrice}
          </div>
        </div>
        <div class="psn__buttons">
          <div class="cta add-to-cart" data-id="${gameID}">Add to cart</div>
          <a href="details.html?id=${gameID}" class="results-list" role="button">
            <div class="cta">View Details</div>
          </a>
        </div>
      </div>
      `;
    });
  }, 1000);
});