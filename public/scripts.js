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
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const modal = document.getElementById("project-modal");
  const modalBody = modal.querySelector(".project-modal-body");
  const closeButton = modal.querySelector(".modal-close");

  function openProject(projectId) {
    const project = document.getElementById(projectId);
    if (!project) return;

    modalBody.innerHTML = project.innerHTML;
    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    history.replaceState(null, '', '#' + projectId);
  }

  function closeProject() {
    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (window.location.hash && window.location.hash.startsWith("#content")) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  portfolioItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
      openProject(item.dataset.project);
    });
  });

  closeButton.addEventListener("click", closeProject);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeProject();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("visible")) {
      closeProject();
    }
  });
});

// Add active transition state for each fullpage section
const fullSections = document.querySelectorAll('.page-section');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      history.replaceState(null, '', '#' + entry.target.id);
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.45 });

fullSections.forEach(section => {
  sectionObserver.observe(section);
});
