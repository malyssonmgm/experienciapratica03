// ===========================
// MENU MOBILE TOGGLE
// ===========================
const nav = document.querySelector('nav ul');
const menuBtn = document.createElement('button');
menuBtn.textContent = '☰';
menuBtn.classList.add('menu-btn');
document.querySelector('header').prepend(menuBtn);

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// ===========================
// SCROLL SUAVE PARA LINKS INTERNOS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===========================
// ANIMAÇÃO DOS DESTAQUES AO SCROLL
// ===========================
const highlights = document.querySelectorAll('#highlights article');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

highlights.forEach(article => {
  article.classList.add('hidden');
  observer.observe(article);
});

// ===========================
// VALIDAÇÃO FORMULÁRIOS
// ===========================
const contactForm = document.querySelector('.contact-form');
const cadastroForm = document.getElementById('cadastro-form');

function applyFormValidation(form) {
  if(!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('.error').forEach(err => err.remove());

    form.querySelectorAll('input, textarea, select').forEach(input => {
      if(!input.checkValidity()) {
        showError(input, `Campo inválido ou obrigatório`);
        valid = false;
      }
    });

    if(valid) {
      alert('Formulário enviado com sucesso!');
      form.reset();
    }
  });
}

function showError(input, message) {
  const error = document.createElement('span');
  error.classList.add('error');
  error.style.color = 'red';
  error.style.fontSize = '0.9rem';
  error.textContent = message;
  input.insertAdjacentElement('afterend', error);
}

applyFormValidation(contactForm);
applyFormValidation(cadastroForm);

// ===========================
// FILTRO DE PROJETOS
// ===========================
const filterButtons = document.querySelectorAll('.project-filters button');
const projects = document.querySelectorAll('.project-list article');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    projects.forEach(project => {
      if(filter === 'all' || project.getAttribute('data-category') === filter) {
        project.style.display = 'block';
      } else project.style.display = 'none';
    });
  });
});

// ===========================
// MODAL DE DETALHES DO PROJETO
// ===========================
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.modal .close');

projects.forEach(project => {
  project.addEventListener('click', () => {
    if(modal) {
      modal.style.display = 'block';
      modalTitle.textContent = project.querySelector('h3').textContent;
      modalDescription.textContent = project.querySelector('p').textContent;
    }
  });
});

if(closeModal) {
  closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });
}





