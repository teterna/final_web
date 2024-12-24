// Function to load cart items
function loadCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  cartItemsContainer.innerHTML = ''; // Clear the container

  // If the cart is empty, show a message
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty. Add some products!</p>';
    return;
  }

  // Iterate through all items in the cart
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <div class="item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="item-details">
        <h3>${item.name}</h3>
        <p class="price">$${item.price.toFixed(2)}</p>
        <div class="quantity-control">
          <button class="quantity-btn decrease">-</button>
          <input type="number" value="${item.quantity}" min="1" class="quantity-input">
          <button class="quantity-btn increase">+</button>
        </div>
      </div>
      <button class="remove-item">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  updateSubtotal();
  attachEventListeners();
}

// Update the cart after removing or changing item quantity
function updateCartInStorage() {
  const cartItems = document.querySelectorAll('.cart-item');
  const cart = [];

  cartItems.forEach(item => {
    const name = item.querySelector('h3').textContent;
    const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
    const quantity = parseInt(item.querySelector('input[type="number"]').value);

    cart.push({ name, price, image: item.querySelector('img').src, quantity });
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  updateSubtotal();
}

// Update the subtotal
function updateSubtotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const subtotalElement = document.querySelector('.subtotal');
  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }
}

// Event handlers for buttons in the cart
function attachEventListeners() {
  // Increase product quantity
  document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', (event) => {
      const cartItem = event.target.closest('.cart-item');
      const input = cartItem.querySelector('.quantity-input');
      let quantity = parseInt(input.value);
      quantity++;
      input.value = quantity;
      updateCartInStorage();
    });
  });

  // Decrease product quantity
  document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', (event) => {
      const cartItem = event.target.closest('.cart-item');
      const input = cartItem.querySelector('.quantity-input');
      let quantity = parseInt(input.value);
      if (quantity > 1) {
        quantity--;
        input.value = quantity;
      }
      updateCartInStorage();
    });
  });

  // Remove product from the cart
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (event) => {
      const cartItem = event.target.closest('.cart-item');
      const name = cartItem.querySelector('h3').textContent;
      
      // Remove the product from the cart array
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(item => item.name !== name);

      // Save the updated cart
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart(); // Reload the cart with updated data
    });
  });
}

// Load cart items on page load
document.addEventListener('DOMContentLoaded', loadCart);