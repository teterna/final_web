document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  // Handler for the search button
  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim(); // Get text from the search bar
    if (searchTerm) {
      // Redirect to shop.html with a search parameter
      window.location.href = `shop.html?query=${encodeURIComponent(searchTerm)}`;
    } else {
      // Simply go to shop.html
      window.location.href = 'shop.html';
    }
  });
});