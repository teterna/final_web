document.addEventListener('DOMContentLoaded', async function () {
  const productGrid = document.querySelector('.product-grid');
  const searchInput = document.querySelector('.search-bar input');  // Get the search input element
  const searchButton = document.querySelector('.search-bar button'); // Get the search button

  // Function to load products from the server
  async function loadProducts(searchTerm = '') {
    try {
      const url = searchTerm 
        ? `http://localhost:3000/api/search?query=${encodeURIComponent(searchTerm)}` 
        : 'http://localhost:3000/api/products';  // If there's a search term, make a request to /search

      const response = await fetch(url);  // API request
      const products = await response.json();

      // Clear the container before adding products
      productGrid.innerHTML = '';

      // Generate product cards
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Convert price to a number
        const price = parseFloat(product.price);

        // Create a card with an "Add to Cart" button
        productCard.innerHTML = `
          <img src="${product.image_url}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p class="price">$${price.toFixed(2)}</p>
          <button class="button add-to-cart" 
                  data-name="${product.name}" 
                  data-price="${price.toFixed(2)}" 
                  data-image="${product.image_url}">
            Add to Cart
          </button>
        `;
        
        productGrid.appendChild(productCard);
      });

      // Handler for "Add to Cart" buttons
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
          const button = event.target;
          const product = {
            name: button.getAttribute('data-name'),
            price: parseFloat(button.getAttribute('data-price')),
            image: button.getAttribute('data-image'),
            quantity: 1 // Default quantity is 1
          };

          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          
          // Check if the product is already in the cart
          const existingProduct = cart.find(item => item.name === product.name);
          if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity
          } else {
            cart.push(product); // Add a new product
          }

          localStorage.setItem('cart', JSON.stringify(cart));
          alert(`${product.name} has been added to your cart!`);
        });
      });

    } catch (error) {
      console.error('Error loading products:', error);
      productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
  }

  // Load products on page load
  await loadProducts();

  // Handler for the search button
  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();  // Get the value from the search input
    loadProducts(searchTerm);  // Load products matching the search term
  });

  // Optional: add search functionality when typing in the input field
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    loadProducts(searchTerm);  // Load products as the text is entered
  });

});