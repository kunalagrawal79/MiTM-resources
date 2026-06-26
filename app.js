const { filterGroups, resources } = window.MITM_RESOURCE_DATA;

const state = {
  query: "",
  activeTags: new Set(),
};

const resourceGridEl = document.querySelector("#resource-grid");
const resultsCopyEl = document.querySelector("#results-copy");
const emptyStateEl = document.querySelector("#empty-state");
const searchInputEl = document.querySelector("#search-input");
const clearFiltersButtonEl = document.querySelector("#clear-filters");

const filterMounts = {
  types: document.querySelector("#type-filters"),
  ages: document.querySelector("#age-filters"),
  focus: document.querySelector("#focus-filters"),
};

const categoryOrder = [
  "camps",
  "competitions",
  "programs",
  "communities",
  "schools",
  "videos",
  "books",
];

function formatLabel(value) {
  return value.replace(/\b\w/g, char => char.toUpperCase());
}

function renderFilterButtons() {
  Object.entries(filterGroups).forEach(([groupName, tags]) => {
    const mount = filterMounts[groupName];
    mount.innerHTML = tags
      .map(tag => {
        const isActive = state.activeTags.has(tag);
        return `
          <button
            type="button"
            class="chip-button ${isActive ? "is-active" : ""}"
            data-tag="${tag}"
          >
            ${formatLabel(tag)}
          </button>
        `;
      })
      .join("");
  });
}

function resourceMatches(resource) {
  const haystack = [
    resource.title,
    resource.category,
    resource.description,
    resource.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const matchesQuery =
    !state.query || haystack.includes(state.query.trim().toLowerCase());

  const matchesTags = [...state.activeTags].every(tag =>
    resource.tags.includes(tag) || resource.category === tag
  );

  return matchesQuery && matchesTags;
}

function getVisibleResources() {
  return [...resources]
    .filter(resourceMatches)
    .sort((left, right) => {
      const categoryDelta =
        categoryOrder.indexOf(left.category) - categoryOrder.indexOf(right.category);

      if (categoryDelta !== 0) {
        return categoryDelta;
      }

      return left.title.localeCompare(right.title);
    });
}

function renderResourceCard(resource, index) {
  const tagsMarkup = resource.tags
    .map(tag => `<li class="tag-pill">${formatLabel(tag)}</li>`)
    .join("");

  const titleMarkup = resource.link
    ? `<h3><a class="resource-title-link" href="${resource.link}" target="_blank" rel="noreferrer">${resource.title}</a></h3>`
    : `<h3>${resource.title}</h3>`;

  return `
    <article class="resource-card" style="animation-delay: ${index * 18}ms">
      <div class="card-head">
        <span class="category-pill">${formatLabel(resource.category)}</span>
      </div>
      ${titleMarkup}
      <p class="card-description">${resource.description}</p>
      <ul class="tag-list">${tagsMarkup}</ul>
    </article>
  `;
}

function renderResults() {
  const visibleResources = getVisibleResources();

  resourceGridEl.innerHTML = visibleResources
    .map((resource, index) => renderResourceCard(resource, index))
    .join("");

  const filterSummary =
    state.activeTags.size > 0
      ? ` with ${state.activeTags.size} active filter${
          state.activeTags.size === 1 ? "" : "s"
        }`
      : "";

  resultsCopyEl.textContent = `Showing ${visibleResources.length} of ${resources.length} resources${filterSummary}.`;

  emptyStateEl.hidden = visibleResources.length > 0;
}

function toggleTag(tag) {
  if (state.activeTags.has(tag)) {
    state.activeTags.delete(tag);
  } else {
    state.activeTags.add(tag);
  }

  renderFilterButtons();
  renderResults();
}

function handleChipClick(event) {
  const target = event.target.closest("[data-tag]");
  if (!target) {
    return;
  }

  toggleTag(target.dataset.tag);
}

function clearFilters() {
  state.query = "";
  state.activeTags.clear();
  searchInputEl.value = "";
  renderFilterButtons();
  renderResults();
}

Object.values(filterMounts).forEach(mount => {
  mount.addEventListener("click", handleChipClick);
});

searchInputEl.addEventListener("input", event => {
  state.query = event.target.value;
  renderResults();
});

clearFiltersButtonEl.addEventListener("click", clearFilters);

renderFilterButtons();
renderResults();
