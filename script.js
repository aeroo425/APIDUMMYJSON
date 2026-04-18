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
            <div class="card" onclick="showDetail(${product.id})">
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

function showDetail(id) {
    fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(product => {

            document.getElementById("modal-body").innerHTML = `
                <img src="${product.thumbnail}" class="detail-img">
                <h2>${product.title}</h2>
                <p><b>Harga:</b> $${product.price}</p>
                <p><b>Rating:</b> ⭐ ${product.rating}</p>
                <p><b>Brand:</b> ${product.brand}</p>
                <p><b>Stock:</b> ${product.stock}</p>
                <p>${product.description}</p>
            `;

            document.getElementById("modal").style.display = "flex";
        });
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

let allProducts = [];

function getProducts() {
    fetch("https://dummyjson.com/products?limit=200")
        .then(res => res.json())
        .then(data => {
            allProducts = data.products;
            displayProducts(allProducts);
        });
}

function searchProduct() {
    const keyword = document.getElementById("search").value.toLowerCase();

    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(keyword)
    );

    displayProducts(filtered);
}



// WAJIB ADA
getProducts();