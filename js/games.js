const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wc/store/products?per_page=50";
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const games = [];

async function getGameData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    for (const item of data) {
      const attributes = item.attributes.map((attr) => ({ [attr.name]: attr.terms[0].name }));
      const game = {
        productId: item.id,
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
      games.push(game);
    }
    if (wishlist.length > 0) {
      wishlist.forEach((game) => {
        const index = games.findIndex((g) => g.id === game.id);
        if (index === -1) {
          games.push(game);
        } else {
          games[index] = game;
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

getGameData();

export { games };
