// Toggle between heart and heart+ icons when clicking on the wishlist icon
function toggleWishlistedHeart(delay) {
  setTimeout(() => {
    let heartIcon;
    const wishlistIcons = document.querySelectorAll(".wishlist-icon");
    wishlistIcons.forEach(function (wishlistIcon) {
      wishlistIcon.addEventListener("click", function () {
        heartIcon = this.classList.contains("far") ? "images/ico_heart.svg" : "images/ico_heart_+.svg";
        this.src = heartIcon;
        this.classList.toggle("far");
        this.classList.toggle("fas");
      });
      wishlistIcon.addEventListener("touchstart", function () {
        heartIcon = this.classList.contains("far") ? "images/ico_heart.svg" : "images/ico_heart_+.svg";
        this.src = heartIcon;
        this.classList.toggle("far");
        this.classList.toggle("fas");
      });
    });
  }, delay);
};

export { toggleWishlistedHeart };
