import "../scss/explora.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Variables globales
const url = "http://localhost:3000/users";
const search = document.querySelector("#search");

const productList = document.getElementById('productList');

productList.addEventListener("click", (event) => {
  // Asegúrate de que se haga clic dentro de un enlace con el atributo data-id
  const productElement = event.target.closest("a[data-id]");
  if (productElement) {
    const productId = productElement.getAttribute('data-id');  // Utiliza getAttribute para obtener el valor de data-id
    if (productId) {
      localStorage.setItem("productId", productId);  // Guarda el ID en el localStorage
      console.log(`Datos guardados en localStorage: productId=${productId}`);
    } else {
      console.error("No se encontró el atributo data-id.");
    }
  }
});


document.getElementById('profileBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('active');
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('active');
});

const filterForm = document.getElementById('filterForm');
filterForm.addEventListener('submit', function (e) {
  e.preventDefault();
  // Add your authentication logic here
  console.log('Form submitted');

  window.location.href = '/src/views/explora.html';
});

// Fetch products from json-server
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Render a single product card
function renderProductCard(product) {
  return `
    <a href="./product.html?productId=${product.id}" class="col-12 col-md-6 col-lg-3" data-id="${product.id}">
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image1 || 'placeholder.jpg'}" alt="${product.title}" class="w-100 h-100">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-ingredients">
                    ${product.ingredients}
                </div>
                <div class="product-tags">
                    ${product.tags.map(tag => `
                        <span class="product-tag">${tag}</span>
                    `).join('')}
                </div>
                <div class="product-rating">
                    ${Array(5).fill('').map((_, i) => `
                        <i class="bi bi-star${i < product.rating ? '-fill' : ''}"></i>
                    `).join('')}
                </div>
                <div class="product-price">
                    $ ${product.price.toLocaleString('es-CO')} COP
                </div>
                <div class="product-actions">
                    <button class="btn-action" title="Añadir al carrito">
                        <i class="bi bi-cart"></i>
                    </button>
                    <button class="btn-action" title="Añadir a favoritos">
                        <i class="bi bi-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    </a>
  `;
}



// Render all products
async function renderProducts() {
  const products = await fetchProducts();
  productList.innerHTML = products.map(product => renderProductCard(product)).join('');
}

// Initialize
renderProducts();

// Handle search form submission
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Here you would normally filter products based on form values
  // For now, we'll just re-render all products
  await renderProducts();

  // Move carousel to second slide to show results message
  const carousel = new bootstrap.Carousel(document.getElementById('searchCarousel'));
  carousel.next();
});