// User Sign-Out ------------------------------------------------
function signOut() {
// Send a signout request to the server using a fetch request
    fetch('/signout', {
      method: 'POST',
    })
    .then(response => {
      if (response.ok) {
        
// Handle successful signout
        console.log('Signout successful');
      } else {
        
// Handle signout error, and show an error message to the user
        console.error('Signout failed');
      }
    })
    .catch(error => {
      
// Handle errors and show an error message to the user
      console.error('Error:', error);
    });
  }

//const logout = document.getElementById('signoutBtn');
//logout.addEventListener('click', signOut);