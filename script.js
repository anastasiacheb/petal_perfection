let burgerBnt = document.querySelector(".burger-bnt");
let menu = document.querySelector(".nav__menu");
let overlay = document.querySelector(".nav__overlay");
let closeBtn = document.querySelector(".close-bth");

burgerBnt.addEventListener("click",() => {
    menu.classList.remove("invisible");
    overlay.classList.remove("invisible");
} )

closeBtn.addEventListener("click",() => {
    menu.classList.add("invisible");
    overlay.classList.add("invisible");
} )

overlay.addEventListener("click",() => {
    menu.classList.add("invisible");
    overlay.classList.add("invisible");
} )