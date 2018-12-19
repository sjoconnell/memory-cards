export default function createCards() {
  const cardValues = [
    "😃",
    "💩",
    "🤡",
    "💯",
    "🏀",
    "🌴",
    "👍",
    "👻",
    "🔥",
    "🍕",
    "🎯",
    "🐢"
  ];
  let id = 0;

  const cards = cardValues.reduce(
    (accumulator, value) => [
      ...accumulator,
      { id: id++, value },
      { id: id++, value }
    ],
    []
  );

  return shuffe(cards);
}

function shuffe(cards) {
  const newCards = [...cards];
  for (let i = newCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
  }
  return newCards;
}
