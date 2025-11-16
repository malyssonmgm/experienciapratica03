
const spaContainer = document.getElementById("spa-container");


const routes = {
  "index.html": "index.html",
  "about.html": "about.html",
  "projects.html": "projects.html",
  "cadastro.html": "cadastro.html",
  "contact.html": "contact.html"
};


document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    
    if (routes[href]) {
      e.preventDefault();
      loadPage(href);
      window.location.hash = href; 
    }
  });
});


async function loadPage(page) {
  try {
    const resp = await fetch(page);
    const html = await resp.text();

    spaContainer.innerHTML = html;

    
    reRunScripts(spaContainer);

  } catch (error) {
    spaContainer.innerHTML = `
      <h2 style="color: var(--cor-erro)">Erro ao carregar a página.</h2>
    `;
  }
}


function reRunScripts(element) {
  const scripts = element.querySelectorAll("script");

  scripts.forEach(oldScript => {
    const script = document.createElement("script");
    if (oldScript.src) {
      script.src = oldScript.src;
    } else {
      script.textContent = oldScript.textContent;
    }
    document.body.appendChild(script);
    oldScript.remove();
  });
}


window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  if (routes[hash]) {
    loadPage(hash);
  } else {
    loadPage("index.html");
  }
});




