// Function to filter products based on category
function filterCategory(category) {
    // Get all category cards
    const cards = document.querySelectorAll('.category-card');
  
    // Loop through each card
    cards.forEach(card => {
      // Check if the card's category matches the selected category
      if (card.getAttribute('data-category') === category || category === 'all') {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Event listener for category selection buttons
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', (event) => {
      const category = event.target.getAttribute('data-category');
      filterCategory(category);
    });
  });