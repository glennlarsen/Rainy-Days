const url = "https://rainydays.flopow.eu/wp-json/wc/store/products?featured=true";

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
  
  youMayAlsoLikeContainer.innerHTML = "";

  
  for(let i = 0; i < product.length; i++) {


      youMayAlsoLikeContainer.innerHTML +=         `
      <div class="products">
         <a href="product.html?id=${product[i].id}">
            <img src="${product[i].images[0].src}" alt="${product[i].name}">
            <h4>${product[i].name}</h4>
            <p>${product[i].price_html}</p>
          </a>
      </div>
      
      `;

  }

}

getProducts();