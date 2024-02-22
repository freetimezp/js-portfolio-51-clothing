const navBar = document.querySelector(".header");
const navBtn = document.querySelector(".header__btn");

navBtn.addEventListener('click', () => {
    document.body.classList.toggle("menu-toggled");
});