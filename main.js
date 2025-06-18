import axios from "axios";

const output = document.getElementById("output");
const searchInput = document.getElementById("search");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");

let page = 1;
let searchTerm = "";

// Fetch and show characters
function loadCharacters() {
  output.textContent = "Loading...";

  axios
    .get("https://rickandmortyapi.com/api/character", {
      params: { page, name: searchTerm },
    })
    .then((res) => {
      const characters = res.data.results;

      const html = characters.map(
        (c) => `
        <div class="card">
          <h2>${c.name}</h2>
          <img src="${c.image}" alt="${c.name}" />
          <p>${c.species} - ${c.status}</p>
          <p><strong>Location:</strong> ${c.location.name}</p>
        </div>
      `
      );

      output.innerHTML = html.join("");

      // Disable previous button on first page
      prevBtn.disabled = page === 1;
    })
    .catch((err) => {
      output.textContent = "No characters found.";
      console.error(err);

      // Still disable prev button if error (e.g. wrong search)
      prevBtn.disabled = page === 1;
    });
}

// 🔍 Run search on Enter
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchTerm = searchInput.value;
    page = 1;
    loadCharacters();
  }
});

// ⏭️ Next page
nextBtn.addEventListener("click", () => {
  page++;
  loadCharacters();
});

// ⏮️ Previous page
prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
    loadCharacters();
  }
});

// 🔄 First load
loadCharacters();
