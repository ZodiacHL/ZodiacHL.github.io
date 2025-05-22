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

      // If the content is already open, hide it first
      if (targetContent.classList.contains("open")) {
        targetContent.classList.remove("open");
      } else {
        // Hide all other open contents
        contents.forEach(content => {
          if (content.classList.contains("open")) {
            // Close the currently open content with a slide-up effect
            content.classList.remove("open");
          }
        });

        // After all other contents have closed, show the clicked content
        setTimeout(function () {
          targetContent.classList.add("open");
        }, 300); // Delay showing the new content until the hide animation finishes
      }
    };
  });
});
