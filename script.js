// --- Stan aplikacji (na samej górze, zanim cokolwiek go użyje) ---
function detectDefaultLanguage() {
  const saved = localStorage.getItem("lang");
  if (saved) return saved;
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith("pl") ? "pl" : "en";
}

let currentLang = detectDefaultLanguage();
let currentPage = "about";

// --- Słownik tłumaczeń dla stałych elementów (menu) ---
const translations = {
  pl: {
    brand_name: "Patryk Dreja",
    nav_about: "O mnie",
    nav_about_desc: "Kim jestem, czym się zajmuję",
    nav_projects: "Projekty",
    nav_projects_desc: "Wybrane realizacje",
    nav_contact: "Kontakt",
    nav_contact_desc: "Email, LinkedIn, GitHub",
  },
  en: {
    brand_name: "Patryk Dreja",
    nav_about: "About me",
    nav_about_desc: "Who I am, what I do",
    nav_projects: "Projects",
    nav_projects_desc: "Selected projects",
    nav_contact: "Contact",
    nav_contact_desc: "Email, LinkedIn, GitHub",
  },
};

// --- Ładowanie podstrony w aktualnym języku ---
function loadPage(nazwa) {
  currentPage = nazwa;
  document.getElementById("body").innerHTML = "<p>Ładowanie...</p>";
  fetch(`site/${nazwa}-${currentLang}.html`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("body").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("body").innerHTML =
        "<p>Nie udało się załadować strony.</p>";
    });
}

// --- Zmiana języka: tłumaczy menu ORAZ przeładowuje obecną podstronę ---
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.setAttribute("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  loadPage(currentPage);
}

// --- Podepnij nawigację ---
document.querySelectorAll("[data-page]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    loadPage(link.dataset.page);
  });
});

// --- Motyw ciemny/jasny ---
const toggleBtn = document.getElementById("theme-toggle");
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  htmlEl.setAttribute("data-theme", savedTheme);
}

toggleBtn.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  if (next === "dark") {
    htmlEl.setAttribute("data-theme", "dark");
  } else {
    htmlEl.removeAttribute("data-theme");
  }

  localStorage.setItem("theme", next);
});

// --- Start: ustaw język menu i załaduj domyślną podstronę ---
setLanguage(currentLang);
