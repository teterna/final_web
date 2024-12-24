// Function to handle smooth scrolling to sections
function scrollToSection(event) {
    const sectionId = event.target.getAttribute('data-target');
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    }
  }
  
  // Event listener for links with data-target attributes
  document.querySelectorAll('.scroll-to-section').forEach(link => {
    link.addEventListener('click', scrollToSection);
  });
  
  // Function to toggle menu visibility
  function toggleMenu() {
    const popup = document.getElementById('shop-popup');
    popup.classList.toggle('show');
  }
  