// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//------------------------ Funciones del Navbar para open y click ------------------------

document.getElementById('profileBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('active');
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('active');
});

const authForm = document.getElementById('authForm');
const filterForm = document.getElementById('filterForm');
filterForm.addEventListener('submit', function (e) {
  e.preventDefault();
  // Add your authentication logic here
  console.log('Form submitted');

  window.location.href = '/src/views/explora.html';
});
authForm.addEventListener('submit', function (e) {
  e.preventDefault();
  // Add your authentication logic here
  console.log('Form submitted');
  authModal.hide();

  window.location.reload();
});