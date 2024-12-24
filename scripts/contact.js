// Function to handle form submission
function handleContactForm(event) {
    // Prevent default form submission behavior
    event.preventDefault();
  
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
  
    // Get the values from the inputs
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
  
    // Basic validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Simple email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // Mock form submission (replace with actual HTTP request)
    alert(`Message sent! Thank you, ${name}, for contacting us. We'll get back to you soon.`);
  
    // Clear the form after submission
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
  }
  
  // Attach the function to the form's submit event
  document.querySelector('.contact-us-form form').addEventListener('submit', handleContactForm);
  