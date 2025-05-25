import "../scss/product.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Variables globales
const url = "http://localhost:3000/products";
const productInfo = document.querySelector("#product");

// Obtén los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

document.getElementById('profileBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('active');
});

document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('active');
});

document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", async () => {
    if (productId) {
        try {
            await renderProduct(productId);
        } catch (error) {
            console.error("Error rendering product:", error);
        }
    } else {
        console.error("No se encontraron el ID del producto en la URL.");
    }
});

async function renderProduct(productId) {
    if (!productInfo) {
        console.error("No se encontró el contenedor del producto.");
        return;
    }

    productInfo.innerHTML = "";

    try {
        const data = await fetchProducts();

        const product = data.find(product => product.id === productId);
        if (!product) {
            console.error("Producto no encontrado.");
            return;
        }

        const modalId = `myModal-${productId}`;

        // Renderiza el HTML del producto
        productInfo.innerHTML = `
        <!-- Page product -->
        <div class="header text-light">
            <h1>${product.title}</h1>
            <div class="w-100 d-flex align-items-center justify-content-between">
                <p>${product.price}</p>
                <div class="d-flex text-light align-items-center gap-2">
                    <strong>${Array(5).fill('').map((_, i) => `
                        <i class="bi bi-star${i < product.rating ? '-fill' : ''}"></i>
                    `).join('')}</strong>
                </div>
            </div>
        </div>
        <!-- Contenido principal -->
        <div class="main-container">

            <!-- Columna izquierda -->
            <div class="left-column">
                <section class="gallery align-items-center justify-content-center w-100 d-flex gap-3 flex-column">
                    <div class="d-flex align-items-center justify-content-around w-100 gap-3">
                        <img src=${product.image1} alt="Imagen 1">
                        <img src=${product.image2} alt="Imagen 2">
                    </div>
                    <div class="d-flex align-items-center justify-content-around w-100 gap-3">
                        <img src=${product.image3} alt="Imagen 1">
                        <img src=${product.image4} alt="Imagen 2">
                    </div>
                </section>

                <section class="reviews">
                    <article class="button-container">
                        ${product.reviews && product.reviews.map(review => `
                            <a href=${review.url} target="_blank">
                                <div class="review-header">
                                    <button class="avatar btn btn-dark">@</button>
                                    <div>
                                        <h1 class="review-name">${review.autor}</h1>
                                        <p class="review-username">"${review.title}"</p>
                                    </div>
                                </div>
                            </a>`).join("")}
                    </article>
                </section>
            </div>

            <!-- Columna derecha -->
            <div class="right-column">
                <section class="product-info">
                    <article class="button-container">
                        <iframe style="border-radius:10px" 
                            src="https://open.spotify.com/embed/track/6MRElrOE80xkeV2UkNqyL0?utm_source=generator&theme=0"
                            width="100%" height="112" 
                            frameBorder="0" allowfullscreen="" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
                        </iframe>

                        <div class="infoBtn">
                            <div class="d-flex gap-3 mt-1">
                                <i class="bi bi-tag text-dark"></i>
                                <div>
                                    <div class="tags">
                                        ${product.tags && product.tags.map(tag => `<p class="tag-text">#${tag.trim()}</p>`).join("")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
                <section class="product-info">
                    <p class="info-text">${product.ingredients}</p>
                </section>
                <button data-bs-toggle="modal" data-bs-target="#${modalId}" class="btn d-flex align-items-center justify-content-center gap-2 btn-dark w-100 reserveBtn">
                    <i class="bi bi-cart"></i> Hacer Pedido
                </button>
            </div>
        </div>

        <!-- Modal -->
<div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0">
            <!-- Modal Header -->
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title" id="orderModalLabel">Hacer Pedido</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <!-- Modal Body -->
            <div class="modal-body pt-2">
            <p class="w-100 text-center"><strong>Hacer Pedido</strong></p>
                <form id="orderForm">
                    <!-- Product Selection -->
                    <div class="mb-3">
                        <select class="form-select" disabled required>
                            <option value="" selected disabled>-- ${product.id} ${product.title} --</option>
                        </select>
                    </div>

                    <!-- Quantity -->
                    <div class="mb-3">
                        <input type="number" class="form-control" placeholder="Elige la cantidad" min="1" required>
                    </div>

                    <!-- Address -->
                    <div class="mb-3">
                        <input type="text" class="form-control" placeholder="Digita tu dirección actual" required>
                    </div>

                    <!-- Comments -->
                    <div class="mb-4">
                        <textarea class="form-control" rows="3" placeholder="Agrega un comentario especial (opcional)"></textarea>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="btn btn-danger w-100">Al Pago</button>
                </form>
                </div>
        </div>
    </div>
</div>
`;
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

async function fetchProducts() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error obtaining product data from server.");
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        return [];
    }
}
