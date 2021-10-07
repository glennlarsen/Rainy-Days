
const detailContainer = document.querySelector(".product-grid");
const extraContainer = document.querySelector(".grid_container")
const totalContainer = document.querySelector(".total");
const title = document.title;
const breadcrumbContainer = document.querySelector(".breadcrumb_jacket")
const popupContainer = document.querySelector(".content");
const cartButton = document.querySelector(".cart-button");
const cartList = document.querySelector(".cart-container");


const subTotal = document.querySelector(".subtotal");
const cartItems = document.querySelector(".cart-items");
const totalItemsInCart = document.querySelector(".total-items-in-cart");



const queryString = document.location.search;

console.log(queryString);

const params = new URLSearchParams(queryString);

const id = params.get("id");

//const product = productArray[id - 1];
const url = "https://rainydays.flopow.eu/wp-json/wc/store/products/" + id;

console.log(url);

async function fetchProduct() {

  try {
    const response = await fetch(url);
    const data = await response.json();
    const details = data;

    console.log(details);

    createHtml(details);


  }
  catch (error) {
    console.log(error);
    detailContainer.innerHTML = displayError("An error has occured");
  }
}


function createHtml(details) {
  document.title = `Rainy Days | ${details.name}`;



  let starRating = '';
  for (let i = 0; i < details.average_rating; i++) {

    starRating += `
    <i class="fa fa-star"></i>`;

  }

  for (let i = 0; i < 5 - details.average_rating; i++) {

    starRating += `
    <i class="far fa-star"></i>`;

  }

  breadcrumbContainer.innerHTML = `<p class="breadcrumbs__link breadcrumbs__link--active">${details.name}</p>`;



  detailContainer.innerHTML =

    `
        <div class="thumbnail-column">
        <div>
          <img src="${details.images[0].src}" alt="${details.name}">
        </div>
        <div>
        <img src="${details.images[0].src}" alt="${details.name}">
        </div>
        <div>
        <img src="${details.images[0].src}" alt="${details.name}">
        </div>
        <div>
        <img src="${details.images[0].src}" alt="${details.name}">
        </div>
      </div>
      <div class="product-image">
      <img src="${details.images[0].src}" alt="${details.name}">
      </div>
      <div class="product-info">
        <h1>${details.name}</h1>
        <div class="price-star-inline">
          <p>${details.price_html} Kr</p>
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
        <button class="cta cta_large cta_green cta_cart" data-product="${details.id}"><i class="fas fa-shopping-cart"></i>
          add to cart</button> <div class="added-hide">Added to Cart!</div>
        <p>${details.description}</p>
      </div>
        
        `
  popupContainer.innerHTML =
    ` <div class="content">
        <h2>item successfully added to cart!</h2>
        <p class="item-count">1 item</p>
        <span class="line"></span>
        <div class="item">
          <div class="image">
            <img src="${details.images[0].src}">
          </div>
          <div class="info-jacket">
            <h4>${details.name}</h4>
            <p><span>color:</span> light orange</p>
            <p><span>size:</span> m</p>
            <p>${details.price_html}</p>
          </div>
        </div>
        <span class="line"></span>
        <div class="popup-button">
          <a href="shop.html" class="cta cta_green cta_large">continue shopping</a>
        </div>
        <div class="popup-button">
          <a href="checkout.html" class="cta cta_green cta_large">checkout</a>
        </div>
      </div>
      `

  //Cart array
  let cart = JSON.parse(localStorage.getItem("CART")) || [];
  updateCart();

  const addConfirmation = document.querySelector(".added-hide");
  const addToCartButton = document.querySelector(".cta_cart");
  addToCartButton.onclick = function () {
    // check if product already exist in cart 
    //check if product exist in cart
    if (cart.some((item) => item.id === details.id)) {
      changeNumberOfUnits("plus", details.id);
      addConfirmation.style.opacity = "1";
      setTimeout(function() {
        addConfirmation.style.opacity = "0";
      },2000)
    } else {
      const item = details;

      console.log(event.target.dataset.product);
      console.log(item);
      console.log(item.id);

      cart.push({
        ...item,
        numberOfUnits: 1,
      });
    }
    updateCart();
  }
  console.log(cart);
  //Update cart
  function updateCart() {
    renderCartItems();
    renderSubTotal();

    // Save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));

  }

  //Calculate and render subtotal
  function renderSubTotal() {
    let totalPrice = 0,
      totalItems = 0;


    cart.forEach((item) => {
      let price = item.price_html.replace(/^\D+/g, '');
      price = price.substring(11, 17)

      totalPrice += price * item.numberOfUnits;
      totalItems += item.numberOfUnits
    });

    subTotal.innerHTML = `Total (${totalItems} items): $${totalPrice.toFixed(2)}`;
    totalItemsInCart.innerHTML = totalItems;
  }

  // const minus = document.querySelector(".minus");
  // const plus = document.querySelector(".plus");

  //Render cart items
  function renderCartItems() {
    cartItems.innerHTML = ""; //clear cart
    cart.forEach((item) => {
      cartItems.innerHTML += `
            <div class="cart-item" data-product="${item.id}">
            <div class="item-info" id="remove-item">
                <img src="${item.images[0].src}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small></small>${item.price_html}
            </div>
            <div class="units">
            <div class="btn minus" id="minus">-</div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" id="plus">+</div>          
            </div>
        </div>
            `
      // plus.onclick = changeNumberOfUnits("plus", details.id);
      // minus.onclick = changeNumberOfUnits("minus", details.id);

      document.getElementById("remove-item").addEventListener("click", removeItemFromCart, false);
      // document.getElementById("minus").addEventListener("click", changeNumberOfUnits("minus", item.id));
      // document.getElementById("plus").addEventListener("click", changeNumberOfUnits("plus", item.id));

    });

  }


  //Remove item from cart
  function removeItemFromCart() {
    cart = cart.filter((item) => item.id !== item.id);

    updateCart();
  }




  //Change number of units for an item
  function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;

      console.log(numberOfUnits);

      if (item.id === id) {
        if (action === "minus") {
          numberOfUnits--;
        } else if (action === "plus") {
          numberOfUnits++;
        }
      }
      console.log(numberOfUnits);
      return {
        ...item,
        numberOfUnits,
      };
    });

    updateCart();

  }


  cartButton.onclick = function () {
    if (cartList.style.display === "block") {
      cartList.style.display = "none";
    } else {
      cartList.style.display = "block";
    }
  }

}

fetchProduct();











//for (let i = 0; i < 4; i++) {

//}

/** const button = document.querySelector("button");
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
*/








