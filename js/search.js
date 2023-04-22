import { toggleWishlistedHeart } from "./functions/toggleWishlistedHeart.js";
import { games } from "./games.js";

// VARIABLES
const gamesContainer = document.getElementById("games-container");
let searchTerm = "";
const form = document.getElementById("search-form");
const input = form.querySelector("input[name='query']");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const searchQuery = params.get("query");
let filteredGames = searchQuery
  ? games.filter((game) => game.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
  : games;

function renderGameCards(filteredGames) {
  gamesContainer.innerHTML = "";
  filteredGames.forEach((game) => {
    // Determine which heart icon to display based on isWishlisted
    let heartIcon = game.isWishlisted === 1 ? "images/ico_heart.svg" : "images/ico_heart_+.svg";
    const typeIcon = game.type === "Key" ? "images/ico_key.svg" : "images/ico_disc.svg";
    // ... (rest of the code for rendering the game cards)
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

    gamesContainer.innerHTML += `
        <div class="container game-cards" data-filter="${game.platform}-${game.type}">
          <div class="items ${game.itemName}">
            <div class="psnleft game-title">
              <h2 class="h4 type">${game.itemName}</h2>
              <span class="gametitle-info">${game.platformShort} | ${game.type} Version</span>
            </div>
            <div class="game-cover">
            <a href="details.html?id=${game.id}" class="results-list">
              <img src=${game.coverImage} alt="${game.itemName} ${game.platform} | ${game.type} Version">
            </a>
            </div>
            <div class="small psnleft release-date">Release Date:</div>
            <div class="small psnright reldate">${game.releaseDate}</div>
            <div class="small psnleft">Type:</div>
            <div class="small psncenter type-ico">
              <img src="${typeIcon}" alt="${game.type}">
            </div>
            <div class="small psnright type-text">${game.type}</div>
            <div class="small psnleft region">Region:</div>
            <div class="small psncenter region-ico">
              <img src="images/ico_europe.svg" alt="Region | Europe">
            </div>
            <div class="small psnright region-text">${game.region}</div>
            <div class="small psnleft platform">Platform:</div>
            <div class="small psncenter platform-ico">
              <img src="${platformIcon}" alt="${game.platform}">
            </div>
            <div class="small psnright platform-text">${game.platform}</div>
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
              <span class="dollar yellow">.</span><span class="currentPrice price">${game.currentPrice}</span>
            </div>
            <div class="price__before psnright">
              <span class="dollar yellow">.</span>${game.beforePrice}
            </div>
          </div>
          <div class="psn__buttons">
            <div class="cta add-to-cart" data-id="${game.id}">Add to cart</div>
            <a href="details.html?id=${game.id}" class="results-list" role="button">
            <div class="cta">View Details</div></a>
          </div>
        </div>`;
  });
  toggleWishlistedHeart(1000);
};

function updateNumberOfProducts(searchTerm, filteredGames) {
  const productsElement = document.querySelector(".number-of-products");
  if (searchTerm.length > 0) {
    productsElement.textContent = `Games with ${searchTerm} in the title: ${filteredGames.length}`;
  } else {
    productsElement.textContent = `Total number of games: ${filteredGames.length}`;
  };
};

setTimeout(() => {

  function handleSearch(useInputField = false) {
    searchTerm = useInputField ? document.querySelector("#search").value : searchQuery;
    filteredGames =
      searchTerm.length === 0
        ? games
        : games.filter((game) => game.itemName.toLowerCase().includes(searchTerm.toLowerCase()));

    renderGameCards(filteredGames);
    updateNumberOfProducts(searchTerm, filteredGames);
  };

  handleSearch();

  const searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleSearch(true);
  });

}, 1000);

// FILTER SECTION
const filterSelect = document.getElementById("filters");
filterSelect.addEventListener("change", (event) => {
  const selectedFilter = event.target.value;
  let filteredGames =
    searchQuery.length === 0
      ? games
      : games.filter((game) => game.itemName.toLowerCase().includes(searchTerm.toLowerCase()));

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
  });

// SORT SECTION
const sortSelect = document.getElementById("sort");
const sortAreOnPage = document.querySelector(".choose-sort");
if (sortAreOnPage) {
  sortSelect.addEventListener("change", (event) => {
    const selectedSort = event.target.value;
    let sortedGames =
      searchQuery.length === 0
        ? games
        : games.filter((game) => game.itemName.toLowerCase().includes(searchTerm.toLowerCase()));
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
  });
};
