const button = document.getElementById("randomizeBtn");
const cardsContainer = document.getElementById("cards");

let allCards = [];

fetch("cards.json")
  .then(response => response.json())
  .then(data => {
    allCards = data;
  });

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

button.addEventListener("click", () => {
  if (allCards.length === 0) return;

  const groupA = allCards.filter(c => c.group === "A");
  const groupB = allCards.filter(c => c.group === "B");

  const selected = [
    shuffle(groupA)[0],
    shuffle(groupB)[0]
  ];

  cardsContainer.innerHTML = "";
  selected.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <strong>${card.points} points</strong>
    `;
    cardsContainer.appendChild(div);
  });
});
