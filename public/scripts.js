// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio Item Sections
document.addEventListener("DOMContentLoaded", function () {
  // Get all toggle buttons and content elements
  const toggles = document.querySelectorAll(".portfolio-item");
  const contents = document.querySelectorAll(".content-items");

  toggles.forEach((toggle, index) => {
    toggle.onclick = function () {
      const targetContent = contents[index];

      // Check if the clicked content is already visible
      if (targetContent.style.display === "block") {
        // Hide the currently visible content
        targetContent.style.display = "none";
      } else {
        // Hide all other content elements
        contents.forEach(content => content.style.display = "none");

        // Show the clicked content
        targetContent.style.display = "block";
      }
    };
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
    document.getElementById("contact-form").reset();  // Reset the form after successful submission
  })
  .catch(error => {
    alert('Error: ' + error);  // Show an error if the request fails
  });
});
