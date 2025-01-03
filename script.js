let onLoadElem = document.querySelectorAll(".onload");
let onScrollElem = document.querySelectorAll(".onscroll");

window.addEventListener("load", () => {
    for (let i = 0; i < onLoadElem.length; i++) {
        onLoadElem[i].classList.remove("fadeup");
        onLoadElem[i].classList.remove("zoomin");
        onLoadElem[i].classList.remove("fadein");
    }
})

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('fadeup');
            entry.target.classList.remove('zoom');
        }

    })
},
   {threshold: 0.5
});

  for (let i = 0; i < onScrollElem.length; i++) {
   const elements = onScrollElem[i];

    observer.observe(elements);
  }


//mobile navigation menu
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

//shopping cart visibility
let cartBtn = document.querySelector(".nav__cart");
let cart = document.querySelector(".cart__wrap");
let cartCloseBtn = document.querySelector(".cart__close");
let cartOverlay = document.querySelector(".cart__overlay");
let cartHead = document.querySelector(".cart__head");


cartBtn.addEventListener("click",() => {
    cart.classList.remove("invisible");
    cartOverlay.classList.remove("invisible");
    //cartHead.style.position = "fixed";
} )

cartCloseBtn.addEventListener("click",() => {
    cart.classList.add("invisible");
    cartOverlay.classList.add("invisible");
    //cartHead.style.position = "relative";
} )

cartOverlay.addEventListener("click",() => {
    cart.classList.add("invisible");
    cartOverlay.classList.add("invisible");
    //cartHead.style.position = "relative";
} )


//disabling scroll while menu or cart is open
burgerBnt.addEventListener("click", disableScroll);
closeBtn.addEventListener("click", enableScroll);
overlay.addEventListener("click", enableScroll);
cartBtn.addEventListener("click", disableScroll);
cartCloseBtn.addEventListener("click", enableScroll);
cartOverlay.addEventListener("click", enableScroll);

function disableScroll() {
    let scrollTop = document.documentElement.scrollTop;
    let scrollLeft = document.documentElement.scrollLeft;
    
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function () { };
}

//shopping cart functionality


/*this part is only for github pages*/
const setItem = localStorage.setItem;
localStorage.constructor.prototype.setItem = (key, value) => setItem.apply(localStorage, ['/' + location.pathname.split("/")[1] + '/' + ':' + key, value])


const getItem = localStorage.getItem;
localStorage.constructor.prototype.getItem = (key) => getItem.apply(localStorage, ['/' + location.pathname.split("/")[1] + '/' + ':' + key]);

let itemList;
itemList = JSON.parse(localStorage.getItem("itemList"));
if (itemList == null) {
    let itemList = [];
    localStorage.setItem("itemList", JSON.stringify(itemList));
};

let total = 0;

document.addEventListener("DOMContentLoaded", loadCart);

/*function saveStorage() {
    localStorage.setItem("itemList", JSON.stringify(itemList));
}*/

/*function loadStorage() {
    itemList = JSON.parse(localStorage.getItem("itemList"));
}*/

cartBtn.addEventListener("click", loadContent);

function loadContent() {
    let removeBtns = document.querySelectorAll(".remove_btn");

    for (let i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener("click", removeItem)
}
}

let addCartBtns = document.querySelectorAll(".button_add-to-cart");

for (let i = 0; i < addCartBtns.length; i++) {
    addCartBtns[i].addEventListener("click", addCart)
}

function loadCart() {
    /*loadStorage();*/
    itemList = JSON.parse(localStorage.getItem("itemList"));

    updateTotal();

    if (itemList.length > 0) {
        let cartWrap = document.querySelector(".cart__content");
        cartWrap.innerHTML =  createCart(total);
    }

    for (let i = 0; i < itemList.length; i++) {
        let imgSrc = itemList[i].imgSrc;
        let title = itemList[i].title;
        let quantity = itemList[i].quantity;
        let price = itemList[i].price;
        let newProductElement = document.createElement('div');
        newProductElement.classList.add('cart__item');
        newProductElement.innerHTML = createCartElement(imgSrc, title, quantity, price);
        let cart = document.querySelector(".cart__holder");
        cart.append(newProductElement);
    }
}

function addCart() {
    let description = this.previousElementSibling.childNodes[3].childNodes[1].innerHTML.split(" - ");
    let imgSrc = this.parentElement.previousElementSibling.childNodes[1].src;
    let title = description[0];
    let quantity = this.previousElementSibling.childNodes[5].childNodes[3].childNodes[3].value;
    let price = description[1].slice(1);
    let newProduct = {imgSrc, title, quantity, price};

    /*loadStorage();*/
    itemList = JSON.parse(localStorage.getItem("itemList"));

    if (itemList.find((el) => el.title == newProduct.title)) {
        alert("already added");
        return;
    } else {
        itemList.push(newProduct);
    };

    /*saveStorage();*/
    localStorage.setItem("itemList", JSON.stringify(itemList));

    
    if (itemList.length == 1) {
        let cartWrap = document.querySelector(".cart__content");
        cartWrap.innerHTML =  createCart(total);
    }

    

    let newProductElement = document.createElement('div');
    newProductElement.classList.add('cart__item');
    newProductElement.innerHTML = createCartElement(imgSrc, title, quantity, price);
    let cart = document.querySelector(".cart__holder");
    cart.append(newProductElement);

    updateTotal();

    let totalValue = document.querySelector(".total");
    totalValue.innerHTML =`$${total}`;
}

function createCart(total) {
    return `
    <div class="cart__holder">
                    </div>
                    <div class="cart__total">
                        <div class="text-subtitle">Subtotal</div>
                        <div class="text-heading5 total">$${total}</div>
                    </div>
                    <textarea class="text-body cart__message" name="message" id="message" placeholder="Gift Message"></textarea>
                    <div class="cart__text">
                        <p class="text-caption">Shipping & taxes calculated at checkout</p>
                        <p class="text-caption">Free standard shipping within London</p>
                    </div>
                </div>
    `
}

function updateTotal() {
    /*loadStorage();*/
    itemList = JSON.parse(localStorage.getItem("itemList"));
    total = 0;
    for (let i = 0; i < itemList.length; i++) {
        total += Number(itemList[i].price)*Number(itemList[i].quantity);
    }
}

function createCartElement(imgSrc, title, quantity, price) {
            return `
                <div>
                    <img class="image_size-s" src="${imgSrc}" alt="flowers">
                </div>
                 <div class="cart__desc">
                    <div class="cart__info">
                        <p class="text-subtitle">${title}</p>
                        <p class="text-body">Quantity (${quantity})</p>
                        <p class="text-subtitle">$${price}</p>
                    </div>
                    <button class="text-link remove_btn">Remove</button>
                </div>
            `
}

function removeItem() {
    /*loadStorage();*/
    itemList = JSON.parse(localStorage.getItem("itemList"));
    let title = this.previousElementSibling.childNodes[1].innerHTML;
    itemList = itemList.filter(el => el.title != title);
    /*saveStorage();*/
    localStorage.setItem("itemList", JSON.stringify(itemList));
    
    let sum = this.parentElement.parentElement.parentElement.nextElementSibling;
    let message = sum.nextElementSibling;
    let text = message.nextElementSibling;

    this.parentElement.parentElement.remove();

    if (itemList.length == 0) {
        sum.remove();
        message.remove();
        text.remove();
    }

    updateTotal();
    let totalValue = document.querySelector(".total");
    totalValue.innerHTML =`$${total}`;
}

//quantity 

let plusBtn = document.querySelector(".plus_btn");
let minusBtn = document.querySelector(".minus_btn");
let quant = document.querySelector(".qty__feild");

plusBtn.addEventListener("click", () => {
    let quantValue = Number(quant.value);
    if (quantValue < 10) {
        quantValue += 1;
        quant.value = quantValue;
    }
})

minusBtn.addEventListener("click", () => {
    let quantValue = Number(quant.value);
    if (quantValue > 1) {
        quantValue -= 1;
        quant.value = quantValue;
    }
})

