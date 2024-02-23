import ProductCard from "./ProductCard.js";

const API_URL = "./assets/api/products.json";

const navBar = document.querySelector(".header");
const navBtn = document.querySelector(".header__btn");
const circleBtn = document.querySelector(".go-down-btn");
const newContent = document.querySelector(".new__products");

//toggle menu
navBtn.addEventListener('click', () => {
    document.body.classList.toggle("menu-toggled");
});

//circle text
let circleText = circleBtn.querySelector(".circle-text");

circleText.innerHTML = circleText.textContent
    .split("")
    .map((char, index) => `<span style="transform: rotate(${index * 28.3}deg)">${char}</span>`)
    .join("");


//cwiper slider
const homeSwiper = new Swiper(".home__content", {
    loop: true,
    effect: "fade",
    speed: 2000,
    allowTouchMove: false,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
});

homeSwiper.on("slideChange", () => {
    const activeSlide = homeSwiper.slides[homeSwiper.activeIndex];
    activeSlide.classList.add("reveal");
});

homeSwiper.on("slideChangeTransitionEnd", () => {
    const prevSlide = homeSwiper.slides[homeSwiper.previousIndex];
    prevSlide.classList.remove("reveal");
});


//products API
async function renderShopProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();

    data.map((product) => {
        if (product.isNew) {
            newContent.innerHTML += ProductCard(product);
        }
    });
}


//onload
window.addEventListener("load", () => {
    renderShopProducts();
    document.querySelector(".home__slide").classList.add("reveal");
});








