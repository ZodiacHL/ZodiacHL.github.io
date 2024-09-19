// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle form submission via JSON
const form = document.getElementById('submit');
form.addEventListener('click', function(e) {
  e.preventDefault();  // Prevent form from submitting the traditional way

  // Gather form data
  const formData = {
    name: document.querySelector('input[name="name"]').value,
    email: document.querySelector('input[name="email"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };

  console.log(formData);

  // Send the form data as JSON to the backend
  fetch('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Set the Content-Type header to application/json
    },
    body: JSON.stringify(formData),  // Convert form data to JSON
  })
  .then(response => response.text())
  .then(data => {
    alert(data);  // Display the response message
    form.reset();  // Reset the form after successful submission
  })
  .catch(error => {
    alert('Error: ' + error);  // Show an error if the request fails
  });
});
