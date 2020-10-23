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
//buttons
let buttonsDOM=[];
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
       
    

      }
      )

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
result +=
`<article class="products">
          <div class="img-container">
            <img
              src="images/download.png"
              alt="product"
              class="product-img"/>

<button class="bag-btn" data-id=${product.id}>

              <i class="fas fa-shopping-cart"></i>
              Add
            </button>
          </div>
          <h3>Product Name </h3>
          <h4>Price  </h4>
        
</article>`
        
;

    });
productsDOM.innerHTML=result;

  }


getBagButtons(){
//the three ... dots (spread operator) conver this tp an array.. without these dots btns would be a nodeList

const buttons=[...document.querySelectorAll(".bag-btn")];

buttonsDOM=buttons;


buttons.forEach(
  button=>{
  let id=button.dataset.id;
  // console.log(id);
  let inCart=cart.find(item=>item.id===id);
if(inCart){
  button.innerText="Item in cart ";
  button.disabled=true;//disables the buttton
   
}

button.addEventListener('click',(event)=>{
    // console.log(event);
event.target.innerText="In cart";
event.target.disabled=true;
//getting products whose id is matched
let cartItem={...Storage.getProduct(id),
amount:1};
//adding it to the cart
cart=[...cart,cartItem];

//cart will be saved in local storage
Storage.saveCart(cart)

//set cart values
this.setCartValues(cart);


//display cart items
this.addCartItem(cartItem);

// show the cart



  });


});

  }
setCartValues(cart){
  let tempTotal=0;
  let itemsTotal=0;
  cart.map(item=>
    {
      tempTotal +=item.amount*item.price;
      itemsTotal+=item.amount;

      
    })
    cartTotal.innerText=parseFloat(tempTotal.toFixed(2));
    cartItems.innerText=itemsTotal;
    // console.log(cartTotal,cartItems);
    
}
addCartItem(item){

 const div=document.createElement('div');
 div.classList.add('cart-item');

 //this below is called tempelate literal

 div.innerHTML=
 `
 <img src=${item.image} alt="product"/>

            <div>
              <h4>${item.title}</h4>
              <h5>${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>Remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id=${item.id}> </i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-chevron-down" data-id=${item.id}> </i>
            </div>
`;
cartContent.appendChild(div);

} 

showCart(){

  cartOverlay.classList.add('transparentBcg');
  cartDOM.classList.add('showCart');

}
setupAPP(){
cart=Storage.getCart();
this.setCartValues(cart);
this.populateCart(cart);
cartBtn.addEventListener('click',this.showCart);
closeCartBtn.addEventListener('click',this.hideCart);
}

populateCart(cart){
  cart.forEach(item=>this.addCartItem(item));
}


hideCart(){
  cartOverlay.classList.remove('transparentBcg');
  cartDOM.classList.remove('showCart'); 

}
cartLogic(){
   
  clearCartBtn.addEventListener('click',()=>{
    this.clearCart();

 
    });
cartContent.addEventListener('click',event=>{

  if(event.target.classList.contains('remove-item')){
    let removeItem=event.target;
    let id=removeItem.dataset.id;
    cartContent.removeChild(removeItem.parentElement.parentElement);

    this.removeItem(id);
  }else if(event.target.classList.contains("fa-chevron-up")){
    let addAmount=event.target;
    let id=addAmount.dataset.id;
    let tempItem=cart.find(item=>item.id===id);
    tempItem.amount=tempItem.amount+1;
    Storage.saveCart(cart);
    this.setCartValues(cart);
    addAmount.nextElementSibling.innerText=tempItem.amount;
  }else if(event.target.classList.contains("fa-chevron-down")){
    let lowerAmount=event.target;
    let id=lowerAmount.dataset.id;
    let tempItem=cart.find(item=>item.id===id);
    tempItem.amount=tempItem.amount-1;
    if(tempItem.amount > 0){
     Storage.saveCart(cart);
    this.setCartValues(cart);

    lowerAmount.previousElementSibling.innerText=tempItem.amount;

      
    }else{
      cartContent.removeChild(lowerAmount.parentElement.parentElement);
       this.removeItem(id);
    }
   
}
});

}
clearCart(){


  let cartItems=cart.map(item => item.id);
  cartItems.forEach(id => this.removeItem(id));
   
while(cartContent.childern.length>0){
  cartContent.removeChild(cartContent.children[0]);
  
}
this.hideCart();

}
removeItem(id){

  cart=cart.filter(item => item.id !== id);
  this.setCartValues(cart);
  Storage.saveCart(cart);
  let button = this.getSingleButton(id);
  button.disabled=false;
  button.innerHTML=`<i class="fas fa-shopping-cart">
  </i>Add`;
}

getSingleButton(id){
  return buttonsDOM.find(button => button.dataset.id===id);
}
 
}

///local storage class

class Storage {

static saveProducts(products){

localStorage.setItem("products",JSON.stringify(products));

}
static  getProduct(id){
  let products=JSON.parse(localStorage.getItem('products'));

  return products.find(product=>product.id===id);

}
//saving the cart
static saveCart(cart){

  localStorage.setItem('cart',JSON.stringify(cart));
}
static getCart(){
  return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
}
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
//setup app before get products
ui.setupAPP();
  //get product
 
  products.getProducts().then(products =>{
    ui.displayProducts(products)
      Storage.saveProducts(products);} ).then(()=>{

  ui.getBagButtons();
  ui.cartLogic();

});


});
