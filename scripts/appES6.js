/**
 * Variables
 */

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
const apiUrl = 'http://127.0.0.1:5500';

var cart = [];
var products = [];

/**
 * Product
 */
class Product {
    constructor(id, title, price, image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
    }
}

// Get products
async function getProducts() {
    await fetch(`${apiUrl}/scripts/products.json`)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let jsonProducts = myJson.items;
            for (const product of jsonProducts) {
                let tempProduct = new Product(
                    product.sys.id,
                    product.fields.title,
                    product.fields.price,
                    product.fields.image
                );
                this.products.push(tempProduct)
            }
            console.log(this.products)
        });
}

/**
 * UI
 */
class UI {

}

/**
 * Local Storage
 */
class Storage {

}

// Document starts
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    getProducts();
})