// User Sign-In ------------------------------------------------
function submitSigninForm() {
// Gather form data
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;
  
// Send the form data to the server using a fetch request
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
      
// Handle the response from the server and show a success message
      console.log(data);
    })
    .catch(error => {
      
// Handle errors and show an error message to the user
      console.error('Error:', error);
    });
  }

//const signin = document.getElementById('loginBtn');
//signin.addEventListener('click', submitSigninForm);