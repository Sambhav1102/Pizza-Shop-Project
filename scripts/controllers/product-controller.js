// Product Controller - It is a Glue B/w View and Model
// Controller - I/O View Layer

import productOperations from "../services/product-operations.js";

// Data Exchange B/w View and Model.
async function loadPizzas(){
    const pizzas = await productOperations.loadProducts();
    console.log('Pizzas are ', pizzas);
    for(let pizza of pizzas){
        preparePizzaCard(pizza);
    }
}
loadPizzas();

/*
 <div class="col-4">
                  <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                  </div>
*/

function addToCart(){
  // this - keyword (Current calling object reference)
  console.log('Add to Cart Called...', this);
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');
  console.log('Pizza Id is ', pizzaId);
  var prod=productOperations.search(pizzaId);
  
  if(prod.isAddedInCart==true){
    this.style.backgroundColor='red';
    this.innerText='remove from cart';
  }
  else{
    console.log('blah blah=',prod.isAddedInCart);
    this.style.backgroundColor='green';
    this.innerText=`ADD $${prod.price}`;
  }
  printBasket();
  
}

function printBasket(){
  const cartProducts = productOperations.getProductsInCart();
  const basket = document.querySelector('#basket');
  basket.innerHTML = '';
  var cost = 0;
  var gst;
  for(let product of cartProducts){
      cost += parseFloat(product.price) 
      const li = document.createElement('li');
      li.innerText = `${product.name}        $  ${product.price}`;
      basket.appendChild(li);
  }
  gst = cost + cost*0.18;
  console.log(gst);  
  var abc=0;
  var gsst = document.querySelector('#gst');
  gsst.innerHTML= ' ';
  gsst.innerText=`Applying 18% GST : ${(abc+=gst-cost).toFixed(2)}`;
  var total = document.querySelector('#total');
  total.innerHTML= ' ';
  total.innerText=`Cart Value = $ ${gst.toFixed(2)}`

}

function preparePizzaCard(pizza){
    const outputDiv = document.querySelector('#output');
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4 text-center';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style = "width: 15rem;";
    colDiv.appendChild(cardDiv);
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    const button = document.createElement('button');
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click', addToCart);// Event Bind
    button.innerText= `ADD    $${pizza.price}`;
    button.className = 'btn btn-success w-100';
    button.style.backgroundColor='green';
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);


}