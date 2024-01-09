// Variables globales para almacenar los campeones y la información de paginación
let champions = [];
let currentPage = 1;
let championsPerPage = 20;

function displayPage(pageNumber) {
  const championsContainer = document.getElementById("championsContainer");
  const champions = championsContainer.querySelectorAll(".champion");
  const itemsPerPage = 20;

  champions.forEach((champion, index) => {
    if (index >= (pageNumber - 1) * itemsPerPage && index < pageNumber * itemsPerPage) {
      champion.style.display = "";
    } else {
      champion.style.display = "none";
    }
  });
}

function renderPagination(totalPages) {
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => displayPage(i));
    paginationContainer.appendChild(button);
  }
}

async function fetchData() {
  try {
    const response = await fetch("http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json");

    if (response.status === 200) {
      const data = await response.json();
      const championsData = data.data;

      // Limpia la lista de campeones
      const championsContainer = document.getElementById("championsContainer");
      championsContainer.innerHTML = "";

      // Itera sobre cada campeón en los datos
      for (const championKey in championsData) {
        const champion = championsData[championKey];

        // Crea una nueva card
        const championElement = document.createElement("div");
        championElement.classList.add("champion");

        // Añade los elementos a la card
        const championImage = document.createElement("img");
        championImage.src = `http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/${encodeURIComponent(champion.image.full)}`;

        const championNameElement = document.createElement("h2");
        championNameElement.textContent = champion.name;

        const championTitleElement = document.createElement("p");
        championTitleElement.textContent = `Título: ${champion.title}`;

        const championDetailsElement = document.createElement("div");
        championDetailsElement.classList.add("champion-details");

        // Añade la información de stats si está disponible
        if (champion.info) {
          const stats = champion.info;
          championDetailsElement.innerHTML = `
            <p>Ataque: ${stats.attack}</p>
            <p>Defensa: ${stats.defense}</p>
            <p>Magia: ${stats.magic}</p>
            <p>Dificultad: ${stats.difficulty}</p>
          `;
        }

        const championRolesElement = document.createElement("p");
        championRolesElement.classList.add("champion-roles");
        championRolesElement.textContent = `Roles: ${champion.tags.join(", ")}`;

        const championRegionElement = document.createElement("p");
        championRegionElement.classList.add("champion-partype");
        championRegionElement.textContent = `Región: ${champion.partype}`;

        championElement.appendChild(championImage);
        championElement.appendChild(championNameElement);
        championElement.appendChild(championTitleElement);
        championElement.appendChild(championDetailsElement);
        championElement.appendChild(championRolesElement);
        championElement.appendChild(championRegionElement);

        // Añade la card a la lista
        championsContainer.appendChild(championElement);
      }
      
      // Calcula el número total de páginas
      const totalPages = Math.ceil(championsContainer.children.length / 20);

      // Muestra la primera página por defecto
      displayPage(1);

      // Renderiza los botones de paginación
      renderPagination(totalPages);
    } else {
      throw new Error(`Error de la API: código de respuesta ${response.status}`);
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}
function searchByResource() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resourceSelector = document.getElementById("resourceSelector");
  const selectedResource = resourceSelector.value.toLowerCase();

  const champions = document.querySelectorAll(".champion");

  champions.forEach(champion => {
    const championName = champion.querySelector("h2").textContent.toLowerCase();
    const championResource = champion.querySelector(".champion-partype").textContent.toLowerCase();

    if ((championName.startsWith(input) || input === "") &&
        (selectedResource === "" || championResource.includes(selectedResource))) {
      champion.style.display = "";
    } else {
      champion.style.display = "none";
    }
  });
}

function searchByRole() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const roleSelector = document.getElementById("roleSelector");
  const selectedRole = roleSelector.value.toLowerCase();

  const champions = document.querySelectorAll(".champion");

  champions.forEach(champion => {
    const championName = champion.querySelector("h2").textContent.toLowerCase();
    const championRoles = champion.querySelector(".champion-roles").textContent.toLowerCase();

    if ((championName.startsWith(input) || input === "") &&
        (selectedRole === "" || championRoles.includes(selectedRole))) {
      champion.style.display = "";
    } else {
      champion.style.display = "none";
    }
  });
  // Calcula el número total de páginas
  const totalPages = Math.ceil(championsContainer.children.length / 20);

  // Renderiza los botones de paginación
  renderPagination(totalPages);
}

function searchChampions() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const champions = document.querySelectorAll(".champion");

  champions.forEach(champion => {
    const championName = champion.querySelector("h2").textContent.toLowerCase();

    if (championName.startsWith(input)) {
      champion.style.display = "";
    } else {
      champion.style.display = "none";
    }     
  });
}