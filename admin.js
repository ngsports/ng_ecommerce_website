/* ==========================================
   NG SPORTS ADMIN PANEL
========================================== */

import {
    db,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc
} from "./firebase.js";

const form = document.getElementById("productForm");
const container = document.getElementById("admin-products");

/* ==========================================
   ADD PRODUCT
========================================== */

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const product = {

            name: document.getElementById("name").value.trim(),

            category: document.getElementById("category").value,

            brand: document.getElementById("brand")
                ? document.getElementById("brand").value.trim()
                : "",

            price: Number(
                document.getElementById("price").value
            ),

            stock: Number(
                document.getElementById("stock").value
            ),

            image: document.getElementById("image").value.trim(),

            description: document.getElementById("description").value.trim(),

            createdAt: new Date()

        };

        try {

            await addDoc(
                collection(db, "products"),
                product
            );

            alert("✅ Product Added Successfully");

            form.reset();

            loadProducts();

        } catch (error) {

            alert(error.message);

        }

    });

}

/* ==========================================
   LOAD PRODUCTS
========================================== */

async function loadProducts() {

    if (!container) return;

    container.innerHTML = "<p>Loading Products...</p>";

    const snapshot = await getDocs(
        collection(db, "products")
    );

    container.innerHTML = "";
    snapshot.forEach((item) => {

        const product = item.data();

        container.innerHTML += `

        <div class="admin-product">

            <img
                src="${product.image}"
                alt="${product.name}"
                width="90">

            <div class="admin-info">

                <h3>${product.name}</h3>

                <p><strong>Category :</strong> ${product.category}</p>

                <p><strong>Brand :</strong> ${product.brand || "-"}</p>

                <p><strong>Price :</strong> ₹${product.price}</p>

                <p><strong>Stock :</strong> ${product.stock}</p>

                <p>${product.description}</p>

            </div>

            <div class="admin-buttons">

                <button
                    class="edit-btn"
                    onclick="editProduct('${item.id}')">

                    <i class="fa-solid fa-pen"></i>
                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="removeProduct('${item.id}')">

                    <i class="fa-solid fa-trash"></i>
                    Delete

                </button>

            </div>

        </div>

        `;

    });

}
/* ==========================================
   EDIT PRODUCT
========================================== */

window.editProduct = async function(id) {

    try {

        const productRef = doc(db, "products", id);

        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {

            alert("Product Not Found");

            return;

        }

        const data = productSnap.data();

        const newPrice = prompt(
            "Enter New Price",
            data.price
        );

        if (newPrice === null) return;

        await updateDoc(productRef, {

            price: Number(newPrice)

        });

        alert("✅ Product Updated Successfully");

        loadProducts();

    } catch (error) {

        alert(error.message);

    }

};

/* ==========================================
   DELETE PRODUCT
========================================== */

window.removeProduct = async function(id) {

    if (!confirm("Delete this product?")) return;

    try {

        await deleteDoc(
            doc(db, "products", id)
        );

        alert("✅ Product Deleted");

        loadProducts();

    } catch (error) {

        alert(error.message);

    }

};

/* ==========================================
   LOGOUT
========================================== */

window.logout = function() {

    if (confirm("Logout Admin Panel?")) {

        window.location.href = "index.html";

    }

};

/* ==========================================
   INITIAL LOAD
========================================== */

loadProducts();

/* Auto Refresh Every 10 Seconds */

setInterval(() => {

    loadProducts();

}, 10000);

/* ==========================================
   ADMIN READY
========================================== */

console.log("✅ NG SPORTS Admin Panel Ready");