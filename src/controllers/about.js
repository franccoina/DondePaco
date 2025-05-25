import "../scss/about.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

document.getElementById('profileBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('active');
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('active');
});

document.getElementById('year').textContent = new Date().getFullYear();