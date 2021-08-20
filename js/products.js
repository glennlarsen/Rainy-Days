//import { productArray } from "./constants/productList.js";
const productsContainer = document.querySelector(".grid_container");



productArray.forEach(function (product) {

    let starRating = '';
    for (let i = 0; i < product.rating; i++) {

        starRating += `
        <i class="fa fa-star"></i>`;

    }

    for (let i = 0; i < 5 - product.rating; i++) {

        starRating += `
        <i class="far fa-star"></i>`;

    }


    console.log(starRating);

    productsContainer.innerHTML +=
        `
    <div class="products">
       <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>${product.price} Kr</p>
          <div class="star-rating">
          ${starRating}
          </div>
       </a>
    </div>
    
    `
})

