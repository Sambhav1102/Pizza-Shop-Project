// Contains the Logic for Fetching ,
// Adding, Sorting, Searching,
 // Deletion , Updation
 /*
  It talk to Network Layer to Bring the JSON, and
  convert JSON into Objects vice-versa

 */
import Product from '../models/product.js';
import makeNetworkCall from './api-client.js';

const productOperations = {
    products:[], // Key:value
    search(pizzaId){
        const product = this.products.
        find(currentProduct=>currentProduct.id==pizzaId);
        product.count++;
        if ((product.count %2)==0){
            product.isAddedInCart = false;
        }
        else{
            product.isAddedInCart = true;
        }
        
        console.log('Product Found ', product);
        console.log('Array ', this.products);
        return product;
    },
    getProductsInCart(){
        const productInBasket = this.products.filter(product=>product.isAddedInCart);
        return productInBasket;
    },

    async loadProducts(){
        const pizzas = await makeNetworkCall();
        const pizzaArray = pizzas['Vegetarian'];
        const productsArray = pizzaArray.map(pizza=>{
            const currentPizza = new Product(pizza.id, pizza.name,
                 pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);
                return currentPizza;
                })
                console.log('********Product Array ', productsArray);
                this.products = productsArray;
                return productsArray;  // Wrap in Promise
            },
    sortProducts(){

    },
    searchProducts(){

    }
}
export default productOperations;