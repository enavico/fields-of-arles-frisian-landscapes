// Mazzi di carte
const deckA = Array.from({ length: 16 }, (_, i) => String(i + 1).padStart(2, "0"));
const deckB = Array.from({ length: 16 }, (_, i) => String(i + 1).padStart(2, "0"));
const deckC = Array.from({ length: 16 }, (_, i) => String(i + 1).padStart(2, "0"));
const noTeaTradeCheckbox = document.getElementById("noTeaTrade");
const cardsContainer = document.getElementById("cards");
const randomizeBtn = document.getElementById("randomizeBtn");

// Costruisci percorso immagine da mazzo e numero
function getCardImage(deck, num) {
  return `assets/cards/${deck}/Front_${deck}_${num}.png`;
}

// Mostra le carte
function showCards(cards) {
  cardsContainer.innerHTML = "";
  cards.forEach(card => {
    const img = document.createElement("img");
    img.src = card;
    img.className = "card-image";
    cardsContainer.appendChild(img);
  });
}

// Pesca casualmente
function drawOne(deck) {
  return deck[Math.floor(Math.random() * deck.length)];
}

// Randomizza carte e aggiorna URL
function randomizeCards() {
  let availableDeckA = [...deckA];
  let availableDeckB = [...deckB];
  let availableDeckC = [...deckC];

  // Opzione: Play without Tea & Trade
  if (noTeaTradeCheckbox.checked) {
    // Front_A_11.png
    availableDeckA = availableDeckA.filter(card => card !== "11");
    // Front_B_09.png
    availableDeckB = availableDeckB.filter(card => card !== "09");
  }

  const a = drawOne(availableDeckA);
  const b = drawOne(availableDeckB);
  const c = drawOne(availableDeckC);

  const drawn = [
    getCardImage("A", a),
    getCardImage("B", b),
    getCardImage("C", c)
  ];

  showCards(drawn);

  // aggiorna URL (se già lo usavi)
  const newUrl = `${location.origin}${location.pathname}?a=${a}&b=${b}&c=${c}`;
  history.replaceState(null, "", newUrl);
}
// Carica setup da URL se presente
function loadFromUrl() {
  const params = new URLSearchParams(location.search);
  let a = params.get("a");
  let b = params.get("b");
  let c = params.get("c");

  if (!a || !b || !c) {
    // Nessun setup in URL, pesca a caso
    randomizeCards();
    return;
  }

  const drawn = [
    getCardImage("A", a),
    getCardImage("B", b),
    getCardImage("C", c)
  ];

  showCards(drawn);
}

// Event listener
randomizeBtn.addEventListener("click", randomizeCards);
window.addEventListener("load", loadFromUrl);
