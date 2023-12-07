
// User Sign-Up -------------------------------------------------
 async function submitSignupForm(event) {
event.preventDefault();
// Gather form data
    const username = document.getElementById('username-signup').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;
  
// Send the form data to the server using a fetch request
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
  console.log(response); 
  }

document.querySelector('.signup-form').addEventListener('submit', submitSignupForm);
