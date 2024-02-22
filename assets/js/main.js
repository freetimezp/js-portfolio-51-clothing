//toggle menu
const navBar = document.querySelector(".header");
const navBtn = document.querySelector(".header__btn");

navBtn.addEventListener('click', () => {
    document.body.classList.toggle("menu-toggled");
});

//circle text
const circleBtn = document.querySelector(".go-down-btn");
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

window.addEventListener("load", () => {
    document.querySelector(".home__slide").classList.add("reveal");
});















