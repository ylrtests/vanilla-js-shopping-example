/**
 * Variables
 */
"use strict";
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

let cart = [];
let buttonsDOM = [];

/**
 * Products
 */
class Products {
    async getProducts() {
        try {
            let result = await fetch(`${apiUrl}/scripts/products.json`);
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image };
            })

            return products;
        }
        catch (error) {
            console.error(error);
        }
    }
}

/**
 * UI
 */
class UI {
    displayProducts(products) {
        console.log(products)
        let result = "";
        for (const product of products) {
            result += `
            <article class="product">
                <div class="img-container">
                    <img class="product-img" src="${product.image}" alt="Product">
                    <button class="bag-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        add to bag
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
            </article> 
            `;
        }

        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        const bagButtons = [...document.querySelectorAll(".bag-btn")];
        buttonsDOM = bagButtons;
        bagButtons.forEach((button) => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if (inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }
            button.addEventListener('click', (event) => {
                // get Product from products
                event.target.innerText = "In Cart";
                event.disabled = true;
                // Add product to the cart
                let cartItem = { ...Storage.getProduct(id), amount: 1 };
                cart = [...cart, cartItem];
                // Save cart in local storage
                Storage.saveCart(cart);
                // Set cart values
                this.setCartValues(cart);
            })

        })
    }
    setCartValues() {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
        console.log(cartTotal);
        console.log(cartItems);
    }
}

/**
 * Local Storage
 */
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(item => item.id === id)
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// Document starts
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    // Get all products
    products.getProducts().then(products => {
        ui.displayProducts(products); // Display products
        Storage.saveProducts(products); // Save products
    }).then(() => {
        ui.getBagButtons();
    });
})