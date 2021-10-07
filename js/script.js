const url = "https://rainydays.flopow.eu/wp-json/wc/store/products";

const productsContainer = document.querySelector(".grid_container");
const youMayAlsoLikeContainer = document.querySelector(".grid_container2");

async function getProducts() {
  try {
    const response = await fetch(url);

    const product = await response.json();

    createHtml(product);


  } catch (error) {
    productsContainer.innerHTML = displayError(
      "An error occured when calling the API"
    );
  }
}

function createHtml(product) {
  
  productsContainer.innerHTML = "";

    
  for(let i = 0; i < product.length; i++) {

      let starRating = '';
      for (let i = 0; i < product.average_rating; i++) {
  
          starRating += `
          <i class="fa fa-star"></i>`;
  
      }
  
      for (let i = 0; i < 5 - product.average_rating; i++) {
  
          starRating += `
          <i class="far fa-star"></i>`;
  
      }

      console.log(starRating);


      productsContainer.innerHTML +=         `
      <div class="products">
         <a href="product.html?id=${product[i].id}">
            <img src="${product[i].images[0].src}" alt="${product[i].name}">
            <h4>${product[i].name}</h4>
            <p>${product[i].price_html}</p>
            <div class="star-rating">
            ${starRating}
            </div>
          </a>
      </div>
      
      `;

  }


}

getProducts();




