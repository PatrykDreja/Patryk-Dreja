function loadPage(nazwa) {
  fetch(`site/${nazwa}.html`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("body").innerHTML = html;
    })
    .catch((error) => {
      document.getElementById("body").innerHTML =
        "<p>Nie udało się załadować strony.</p>";
    });
}

// Załaduj domyślną stronę przy pierwszym wejściu
loadPage("about");

const toggleBtn = document.getElementById("theme-toggle");
const html = document.documentElement;

// Wczytaj zapisany motyw przy starcie strony
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
}

toggleBtn.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  if (next === "dark") {
    html.setAttribute("data-theme", "dark");
  } else {
    html.removeAttribute("data-theme");
  }

  localStorage.setItem("theme", next);
});
