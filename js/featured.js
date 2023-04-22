// FEATURED API
const featuredApiUrl = "https://wordpress.runeunhjem.no/wp-json/wc/store/products?featured=true";
const featured = [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Send a GET request to the API endpoint
fetch(featuredApiUrl)
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
      featured.push(game);
    };

    if (wishlist.length > 0) {
      // Loop through each item in the wishlist
      wishlist.forEach((game) => {
        // Check if the game is already in the games array
        const index = featured.findIndex((g) => g.id === game.id);

        // If the game is not in the games array, add it
        if (index === -1) {
          // featured.push(game);
        }
        // If the game is already in the games array, replace it
        else {
          featured[index] = game;
        }
      });
    }
  })
  .catch((error) => {
    // Log any errors to the console
    console.error("Error:", error);
  });

export { featured };
