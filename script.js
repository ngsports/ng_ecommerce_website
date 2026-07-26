/* =====================================
   NG SPORTS - script.js (Part 1)
===================================== */

// Cart & Wishlist

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* ===========================
Cart Counter
=========================== */

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

}

updateCartCount();

/* ===========================
Add To Cart
=========================== */

function addToCart(product) {

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(product.name + " added to cart.");

}

/* ===========================
Wishlist
=========================== */

function addToWishlist(product) {

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert(product.name + " added to wishlist.");

}

/* ===========================
Search Products
=========================== */

const searchInput = document.getElementById("search");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(value)
                ? "block"
                : "none";

        });

    });

}

/* ===========================
WhatsApp Order
=========================== */

function orderOnWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    let message = "🏏 NG SPORTS Order%0A%0A";

    cart.forEach((item, index) => {

        message +=
            (index + 1) +
            ". " +
            item.name +
            " - ₹" +
            item.price +
            "%0A";

    });

    window.open(

        "https://wa.me/919352199077?text=" + message,

        "_blank"

    );

}

/* ===========================
View Product
=========================== */

function viewProduct(product) {

    localStorage.setItem(

        "selectedProduct",

        JSON.stringify(product)

    );

    window.location.href = "product.html";

}
/* ===================
===================================== */

/* ===========================
Load Cart
=========================== */

function loadCart() {

    const cartContainer = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += Number(item.price);

        cartContainer.innerHTML += `

        <div class="cart-product">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-details">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <div class="qty-box">

                    <button onclick="decreaseQty(${index})">-</button>

                    <span>1</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

            </div>

            <button class="remove-btn"
                onclick="removeCartItem(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

    });

    if (totalPrice) {

        totalPrice.textContent = "₹" + total;

    }

}

/* ===========================
Remove Product
=========================== */

function removeCartItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    loadCart();

}

/* ===========================
Quantity
=========================== */

function increaseQty(index) {

    alert("Quantity feature coming soon.");

}

function decreaseQty(index) {

    alert("Quantity feature coming soon.");

}

/* ===========================
Clear Cart
=========================== */

function clearCart() {

    if (!confirm("Clear cart?")) return;

    cart = [];

    localStorage.removeItem("cart");

    updateCartCount();

    loadCart();

}

/* ===========================
Checkout
=========================== */

function checkout() {

    orderOnWhatsApp();

}

/* ===========================
Page Load
=========================== */

window.onload = function () {

    updateCartCount();

    loadCart();

};

/* ===========================
Global Functions
=========================== */

window.addToCart = addToCart;
window.addToWishlist = addToWishlist;
window.viewProduct = viewProduct;
window.removeCartItem = removeCartItem;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.clearCart = clearCart;
window.checkout = checkout;
window.orderOnWhatsApp = orderOnWhatsApp;
/* =====================================
   Load Products From products.json
===================================== */
async function loadProducts() {

    const productContainer = document.getElementById("product-list");

    if (!productContainer) return;

    try {

        const response = await fetch("products.json");

        const products = await response.json();

        productContainer.innerHTML = "";

        products.forEach(product => {
        console.log(product);
            productContainer.innerHTML += `
            
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p class="price">₹${product.price}</p>

                <p class="description">${product.description}</p>

    
                
        <div class="product-buttons">
    <button>Add To Cart</button>
    <button>View</button>

       </div> 

            </div>

            `;
        });
                
         }  catch (error) {
            console.error(error);
          productContainer.innerHTML =
        "<p>Products failed to load.</p>";

    
    }
        

    
        

}

/* ===========================
Load Products On Home Page
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    loadProducts();

});