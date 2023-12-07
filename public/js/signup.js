// User Sign-Up -------------------------------------------------
  function submitSignupForm() {

// Gather form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;
  
// Send the form data to the server using a fetch request
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {

// Handle the response from the server, e.g., show a success message or redirect
      console.log(data);
    })
    .catch(error => {
      
// Handle errors and show an error message to the user
      console.error('Error:', error);
    });
  }


