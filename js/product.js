import { productArray } from "./constants/productList.js";
const detailContainer = document.querySelector(".product-grid");
const extraContainer = document.querySelector(".grid_container")
const cart = document.querySelector(".cart")
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");
let cartArray = [];


const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const product = productArray[id - 1];

console.log(product);

let starRating = '';
for (let i = 0; i < product.rating; i++) {

    starRating += `
        <i class="fa fa-star"></i>`;

}

for (let i = 0; i < 5 - product.rating; i++) {

    starRating += `
        <i class="far fa-star"></i>`;

}


detailContainer.innerHTML =

    `
        <div class="thumbnail-column">
        <div>
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div>
        <img src="${product.image}" alt="${product.name}">
        </div>
        <div>
        <img src="${product.image}" alt="${product.name}">
        </div>
        <div>
        <img src="${product.image}" alt="${product.name}">
        </div>
      </div>
      <div class="product-image">
      <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <div class="price-star-inline">
          <p>${product.price} Kr</p>
          <div class="star-rating">
          ${starRating}
          </div>
        </div>
        <div class="color-container">
          <p><span class="light-orange">color:</span> light orange</p>
          <div class="color-picker">
            <div class="color-box pick-orange"></div>
            <div class="color-box pick-black"></div>
            <div class="color-box pick-blue"></div>
          </div>
        </div>
        <div class="size-container">
          <p><span class="m">size:</span> m</p>
          <div class="size-picker">
            <div class="size-box size-s">
              <p>S</p>
            </div>
            <div class="size-box size-m">
              <p>M</p>
            </div>
            <div class="size-box size-l">
              <p>L</p>
            </div>
            <div class="size-box size-xl">
              <p>XL</p>
            </div>
          </div>
        </div>
        <button class="cta cta_large cta_green cta_cart" data-product="${product.id}"><a href="#confirmation"><i class="fas fa-shopping-cart"></i>
          add to cart</a></button>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum velit vel ipsum sollicitudin
          accumsan.
          Aliquam quis dictum orci, ac pellentesque libero. Fusce nec sem neque. Donec ac justo magna.
          Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
      </div>
        
        `

for (let i = 0; i < 4; i++) {

}

const button = document.querySelector("button");
button.onclick = function (event) {
    const itemToAdd = productArray.find(item => item.id === event.target.dataset.product);
    cartArray.push(itemToAdd);
    showCart(cartArray);
    localStorage.setItem("cartList", JSON.stringify(cartArray));
}

function showCart(cartItems) {
    cart.style.display = "block";
    cartList.innerHTML = "";
    let total = 0;
    cartItems.forEach(function (cartElement) {
        total += cartElement.price;
        cartList.innerHTML +=
            `<div class="cart-item">
                   <h4>${cartElement.name}</h4>
                   <div style="background-image: url(${cartElement.image})" class="cart-image"</div>
                </div>
                `
    })
    totalContainer.innerHTML = `Total: ${total}`;
}









