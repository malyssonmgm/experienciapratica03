
document.addEventListener("input", event => {
  const input = event.target;
  if (input.tagName !== "INPUT" && input.tagName !== "TEXTAREA") return;

  if (input.checkValidity()) {
    input.style.border = "2px solid var(--cor-sucesso)";
    removeError(input);
  } else {
    input.style.border = "2px solid var(--cor-erro)";
  }
});

function removeError(element) {
  const next = element.nextElementSibling;
  if (next && next.classList.contains("error")) next.remove();
}

document.addEventListener("submit", event => {
  const form = event.target;
  let valid = true;

  form.querySelectorAll(".error").forEach(e => e.remove());

  form.querySelectorAll("input, textarea").forEach(input => {
    if (!input.checkValidity()) {
      showError(input);
      valid = false;
    }
  });

  if (!valid) event.preventDefault();
});

function showError(input) {
  removeError(input);

  const error = document.createElement("span");
  error.classList.add("error");
  error.style.color = "var(--cor-erro)";
  error.style.fontSize = "0.9rem";
  error.textContent = "Campo obrigatório ou inválido";

  input.insertAdjacentElement("afterend", error);
}
