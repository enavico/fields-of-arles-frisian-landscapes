// Mazzi
const deckA = Array.from({ length: 16 }, (_, i) => `assets/cards/A/Front_A_${String(i + 1).padStart(2, "0")}.png`);
const deckB = Array.from({ length: 16 }, (_, i) => `assets/cards/B/Front_B_${String(i + 1).padStart(2, "0")}.png`);
const deckC = Array.from({ length: 16 }, (_, i) => `assets/cards/C/Front_C_${String(i + 1).padStart(2, "0")}.png`);

const cardsContainer = document.getElementById("cards");
const randomizeBtn = document.getElementById("randomizeBtn");

// Pesca una carta casuale
function drawOne(deck) {
  return deck[Math.floor(Math.random() * deck.length)];
}

// Mostra le carte nel container
function showCards(cards) {
  cardsContainer.innerHTML = "";
  cards.forEach(card => {
    const img = document.createElement("img");
    img.src = card;
    img.className = "card-image";
    cardsContainer.appendChild(img);
  });
}

// Aggiorna l’URL con i parametri della combinazione
function updateURL(cards) {
  const a = cards[0].match(/Front_A_(\d+)\.png$/)[1];
  const b = cards[1].match(/Front_B_(\d+)\.png$/)[1];
  const c = cards[2].match(/Front_C_(\d+)\.png$/)[1];

  const newURL = `${window.location.origin}${window.location.pathname}?a=${a}&b=${b}&c=${c}`;
  window.history.replaceState({}, "", newURL); // aggiorna l’URL senza ricaricare
}

// Randomizza le carte e aggiorna URL
function randomizeCards() {
  const drawn = [
    drawOne(deckA),
    drawOne(deckB),
    drawOne(deckC),
  ];

  showCards(drawn);
  updateURL(drawn);
}

// Carica carte dalla query string se presenti
function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const a = params.get("a");
  const b = params.get("b");
  const c = params.get("c");

  if (a && b && c) {
    const cards = [
      `assets/cards/A/Front_A_${a.padStart(2,"0")}.png`,
      `assets/cards/B/Front_B_${b.padStart(2,"0")}.png`,
      `assets/cards/C/Front_C_${c.padStart(2,"0")}.png`,
    ];
    showCards(cards);
  }
}

// Event listener
randomizeBtn.addEventListener("click", randomizeCards);
window.addEventListener("load", loadFromURL);
