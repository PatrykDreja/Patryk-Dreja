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
loadPage("o-mnie");
