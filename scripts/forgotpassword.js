// Function to handle form submission
function handleResetPasswordForm(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get the email from the input field
  const emailInput = document.getElementById('email');
  const email = emailInput.value;

  // Simple validation: Check if email is not empty
  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  // Mock sending reset link (in reality, you would make an HTTP request here)
  alert(`A password reset link has been sent to ${email}. Please check your inbox.`);

  // Clear the input field
  emailInput.value = '';
}

// Attach the function to the form's submit event
document.querySelector('form').addEventListener('submit', handleResetPasswordForm);