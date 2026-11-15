// Academic program data for the ISPSC Main Campus promotional prototype.
const academicPrograms = [
  { name: "BS Computer Science", category: "science", area: "Computing", icon: "⌘" },
  { name: "BS Nursing", category: "health", area: "Health Sciences", icon: "✚" },
  { name: "BS Midwifery", category: "health", area: "Health Sciences", icon: "✚" },
  { name: "BS Business Administration", category: "business", area: "Business", icon: "▤" },
  { name: "BS Office Administration", category: "business", area: "Business", icon: "▤" },
  { name: "BA English Language", category: "arts", area: "Arts and Sciences", icon: "Aa" },
  { name: "BA Political Science", category: "arts", area: "Arts and Sciences", icon: "§" },
  { name: "Bachelor of Elementary Education", category: "education", area: "Teacher Education", icon: "✎" },
  { name: "Bachelor of Secondary Education", category: "education", area: "Teacher Education", icon: "✎" },
  { name: "Bachelor of Culture and Arts Education", category: "education", area: "Teacher Education", icon: "✎" },
  { name: "Bachelor of Physical Education", category: "education", area: "Physical Education", icon: "⚑" },
  { name: "BS Criminology", category: "public", area: "Criminal Justice", icon: "◈" }
];

// Render program cards based on the current search and category filters.
function renderPrograms() {
  const grid = document.getElementById("programGrid");
  if (!grid) return;

  const searchValue = (document.getElementById("programSearch")?.value || "").trim().toLowerCase();
  const selectedCategory = document.getElementById("programFilter")?.value || "all";

  const filteredPrograms = academicPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchValue) ||
      program.area.toLowerCase().includes(searchValue);
    const matchesCategory = selectedCategory === "all" || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  grid.innerHTML = "";

  if (filteredPrograms.length === 0) {
    grid.innerHTML = '<div class="col-12"><p class="text-secondary py-4">No matching programs found. Try another search.</p></div>';
    return;
  }

  filteredPrograms.forEach(program => {
    const cardColumn = document.createElement("div");
    cardColumn.className = "col-sm-6 col-lg-4";
    cardColumn.innerHTML = `
      <article class="program-card">
        <div class="program-icon" aria-hidden="true">${program.icon}</div>
        <span class="program-category">${program.area}</span>
        <h3>${program.name}</h3>
        <a href="https://ispsc.edu.ph/" target="_blank" rel="noopener">Official school information <span>↗</span></a>
      </article>`;
    grid.appendChild(cardColumn);
  });
}

// Populate the inquiry form's program selection.
function populateProgramOptions() {
  const select = document.getElementById("interest");
  if (!select) return;

  academicPrograms.forEach(program => {
    const option = document.createElement("option");
    option.value = program.name;
    option.textContent = program.name;
    select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPrograms();
  populateProgramOptions();
  document.getElementById("programSearch")?.addEventListener("input", renderPrograms);
  document.getElementById("programFilter")?.addEventListener("change", renderPrograms);
});
