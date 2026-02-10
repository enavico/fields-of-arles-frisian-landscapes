const button = document.getElementById("randomizeBtn");
const cardsContainer = document.getElementById("cards");

button.addEventListener("click", () => {
  cardsContainer.innerHTML = `
    <div class="card">
      <h3>Example Goal</h3>
      <p>This is just a placeholder card.</p>
      <strong>10 points</strong>
    </div>
  `;
});
