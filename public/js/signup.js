// User Sign-Up -------------------------------------------------
// Function to gather form data
function getFormData() {
  const username = document.getElementById('username-signup').value;
  const email = document.getElementById('email-signup').value;
  const password = document.getElementById('password-signup').value;
  return { username, email, password };
}

// Function to handle form submission
async function submitSignupForm(event) {
  event.preventDefault();

  // Gather form data
  const formData = getFormData();

  try {
    // Send the form data to the server using a fetch request
    const response = await fetch('api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  console.log(response);   //debugging only
  } catch (error) {
    // Handle fetch or other errors
    console.error('Error during signup:', error.message);
  }
}
const signup = document.getElementById('signupBtn');
signup.addEventListener('click', submitSignupForm);