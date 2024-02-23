import ProductCard from "./ProductCard.js";
import TrendingCard from "./TrendingCard.js";

const API_URL = "./assets/api/products.json";

const navBar = document.querySelector(".header");
const navBtn = document.querySelector(".header__btn");
const circleBtn = document.querySelector(".go-down-btn");
const newContent = document.querySelector(".new__products");
const shopContent = document.querySelector(".shop__products");
const shopCategories = document.querySelectorAll(".shop__category");
const trendingContent = document.querySelector(".trending__products");
const scrollUpBtn = document.querySelector(".scroll-up");
const sections = document.querySelectorAll("section[id]");


//toggle menu
navBtn.addEventListener('click', () => {
    document.body.classList.toggle("menu-toggled");
});

//change header bg
function changeHeaderBg() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        navBar.style.backgroundColor = 'var(--white-100-opcty-212)';
    } else {
        navBar.style.backgroundColor = 'transparent';
    }
}

//circle text
let circleText = circleBtn.querySelector(".circle-text");

circleText.innerHTML = circleText.textContent
    .split("")
    .map((char, index) => `<span style="transform: rotate(${index * 28.3}deg)">${char}</span>`)
    .join("");


//scrollreveal animation
const sr = ScrollReveal({
    origin: "top",
    distance: "100px",
    duration: 2000,
    delay: 300
});
sr.reveal(".brands__logo", { interval: 100 });
sr.reveal(".subscribe", { scale: 0.75 });
sr.reveal(".footer__col", { interval: 100 });

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


//new products API
async function renderNewProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();

    data.map((product) => {
        if (product.isNew) {
            newContent.innerHTML += ProductCard(product);
        }
    });

    const productCards = newContent.querySelectorAll(".product-card");
    productCards.forEach((product) => {
        product.classList.add("new__product");
        const image = product.querySelector("img");
        product.addEventListener("mouseover", () => {
            if (product.dataset.image2 !== "undefined") {
                image.src = product.dataset.image2;
            }
        });
        product.addEventListener("mouseleave", () => {
            image.src = product.dataset.image1;
        });
    });


    //swiper new products
    const nesSwiper = new Swiper(".new__content", {
        slidesPerView: 4,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        }
    });

    //scroll reveal animation
    sr.reveal(newContent);
}

//shop products API
async function renderShopProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();

    data.map((product) => {
        shopContent.innerHTML += ProductCard(product);
    });

    const productCards = shopContent.querySelectorAll(".product-card");
    productCards.forEach((product) => {
        product.classList.add("shop__product");
        const image = product.querySelector("img");
        product.addEventListener("mouseover", () => {
            if (product.dataset.image2 !== "undefined") {
                image.src = product.dataset.image2;
            }
        });
        product.addEventListener("mouseleave", () => {
            image.src = product.dataset.image1;
        });
    });

    //scroll reveal animation
    sr.reveal(".shop__product", { interval: 100 });
}

//shop categories
shopCategories.forEach((category) => {
    category.addEventListener('click', () => {
        shopCategories.forEach((category) => category.classList.remove("selected"));
        category.classList.add("selected");

        let categoryType = category.dataset.category;
        const shopProducts = document.querySelectorAll(".shop__product");
        shopProducts.forEach((product) => {
            product.classList.add("hide");
            if (product.dataset.category === categoryType || categoryType === "all") {
                product.classList.remove('hide');
            }
        });
    });
});

//trending products API
async function renderTrendingProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();

    data.map((product) => {
        if (product.isTrending) {
            trendingContent.innerHTML += TrendingCard(product);
        }
    });

    //swiper trending products
    const trendingSectionSwiper = new Swiper(".trending__content", {
        loop: true,
        effect: "fade",
        speed: 600,
        allowTouchMove: false,
        autoplay: {
            delay: 6000
        }
    });

    //scroll reveal animation
    sr.reveal(trendingContent);
}

//scroll up button
function showScrollUpBtn() {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add("show");
    } else {
        scrollUpBtn.classList.remove("show");
    }
}
scrollUpBtn.addEventListener("click", () => window.scrollTo({ behavior: "smooth", top: 0, left: 0 }));

//active on scroll
function activeScroll() {
    const scrollY = window.scrollY;
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 16,
            sectionHeight = section.offsetHeight,
            link = document.querySelector(`.header__link a[href='#${section.id}'`);
        if (scrollY >= sectionTop && scrollY <= sectionHeight + sectionTop) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}


//onscroll
window.addEventListener("scroll", () => {
    activeScroll();
    changeHeaderBg();
    showScrollUpBtn();
});

//onload
window.addEventListener("load", () => {
    renderNewProducts();
    renderShopProducts();
    renderTrendingProducts();
    document.querySelector(".home__slide").classList.add("reveal");
});











