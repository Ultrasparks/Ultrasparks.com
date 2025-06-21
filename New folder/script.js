const apiKey = "b5d6bbd6e0b819d45f6f720572220110"; // Replace with your GNews API key
const newsSection = document.getElementById("news-articles");
const loadMoreBtn = document.getElementById("load-more-btn");

let page = 1;         // current page
const pageSize = 10;  // articles per page
start = 10, 20
async function loadNews() {
  try {
    loadMoreBtn.disabled = true; // disable button while loading
    loadMoreBtn.textContent = "Loading...";

    const response = await fetch(`https://gnews.io/api/v4/top-headlines?topic=sports&lang=en&country=us&max=${pageSize}&page=${page}&apikey=${apiKey}`);
    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      loadMoreBtn.textContent = "No more articles";
      loadMoreBtn.disabled = true;
      return;
    }

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "article";

      card.innerHTML = `
        <img src="${article.image || 'https://via.placeholder.com/150x90?text=No+Image'}" alt="${article.title}" />
        <div class="article-content">
          <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
          <p>${article.description || 'No description available.'}</p>
        </div>
      `;

      newsSection.appendChild(card);
    });

    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "Load More";
    page++; // increment page for next load

  } catch (error) {
    console.error("Error loading news:", error);
    loadMoreBtn.textContent = "Load More";
    loadMoreBtn.disabled = false;
  }
}

// Initial load
window.addEventListener("DOMContentLoaded", () => {
  loadNews();
});
