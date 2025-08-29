// ✅ Replace with your Render backend URL
const backendURL = "https://luxsphere-backend.onrender.com";

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}

// Load posts
async function loadPosts() {
  try {
    const res = await fetch(`${backendURL}/posts`);
    const posts = await res.json();
    const feed = document.getElementById('feed');
    if (feed) {
      feed.innerHTML = '';
      posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'feed-item';
        div.innerHTML = `<p>${post.content}</p>
                         ${post.image ? `<img src='${backendURL}${post.image}' style='max-width:200px;'>` : ''}`;
        feed.appendChild(div);
      });
    }
  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

// Load products
async function loadProducts() {
  try {
    const res = await fetch(`${backendURL}/products`);
    const products = await res.json();
    const list = document.getElementById('productList');
    if (list) {
      list.innerHTML = '';
      products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `<h3>${p.title}</h3>
                         <p>${p.description}</p>
                         <p>Price: $${p.price}</p>
                         ${p.image ? `<img src='${backendURL}${p.image}' style='max-width:200px;'>` : ''}`;
        list.appendChild(div);
      });
    }
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

// Run when page loads
window.onload = () => {
  loadPosts();
  loadProducts();
};
