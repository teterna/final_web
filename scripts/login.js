document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('#loginForm');

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Stop the standard behavior of the form

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Login successful! Welcome, ${data.user.firstName}`);
        // Redirect to main page
        window.location.href = 'index.html';
      } else {
        alert(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при авторизации.');
    }
  });
});