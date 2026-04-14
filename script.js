const apiUrl = "https://dummyjson.com/products";

function getProducts() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data); // debug
            displayProducts(data.products);
        })
        .catch(err => console.log(err));
}

function displayProducts(products) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.thumbnail}">
                <h3>${product.title}</h3>
                <p class="price">$${product.price}</p>
                <p>⭐ ${product.rating}</p>
            </div>
        `;
    });
}


function searchProduct() {
    const keyword = document.getElementById("search").value;
// kirim permintaan ke API
    fetch(`https://dummyjson.com/products/search?q=${keyword}`) 
    // ambil jawabn dri server
        .then(res => res.json())
        // tampilkan ke web
        .then(data => displayProducts(data.products));
}

// WAJIB ADA
getProducts();