
const nav = document.querySelector("nav ul");
const menuBtn = document.createElement("button");
menuBtn.textContent = "☰";
menuBtn.classList.add("menu-btn");
document.querySelector("header").prepend(menuBtn);

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


const highlights = document.querySelectorAll("#highlights article");

if (highlights.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  highlights.forEach(article => {
    article.classList.add("hidden");
    observer.observe(article);
  });
}


const filterButtons = document.querySelectorAll(".project-filters button");
const projects = document.querySelectorAll(".project-list article");

if (filterButtons.length && projects.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      projects.forEach(project => {
        const category = project.getAttribute("data-category");
        project.style.display = (filter === "all" || category === filter)
          ? "block"
          : "none";
      });
    });
  });
}


const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.querySelector(".modal .close");

if (modal) {
  projects.forEach(project => {
    project.addEventListener("click", () => {
      modal.style.display = "block";
      modalTitle.textContent = project.querySelector("h3").textContent;
      modalDescription.textContent = project.querySelector("p").textContent;
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  }
}






