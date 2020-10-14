//js variables

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

//main cart
let cart = [];

//getting the products

class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      //await will help to wait until tis is processed}
      let data = await result.json();
      let product= data.items;

      product=product.map(item =>{

        const {title,price}=item.fields;
        const {id}=item.sys;
        const image=item.fields.image.fields.file.url;
        return {title,price,id,image}
       
    

      })

      return product;
    } 
    catch (error) {
      console.log(error);
    }
  }
}

//displaying the products

class UI {
//many of the methods will be here

  displayProducts(product){
    let result ="";
    //empty string
    product.forEach(product =>{
result +=`

<article class="products">
          <div class="img-container">
            <img
              src=" ${product.image}"
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id="1">
              <i class="fas fa-shopping-cart"></i>
              add
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>${product.price}</h4>
        </article>`
        
;

    });
productsDOM.innerHTML=result;

  }


}

///local storage class

class Storage {}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  //get product

  products.getProducts().then(products => ui.displayProducts(products));
});
