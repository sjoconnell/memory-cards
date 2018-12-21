import React from "react";
import ReactDOM from "react-dom";
import { create } from "react-test-renderer";
import App from "../components/App";

jest.mock("../util/cardUtil.js", () => () => {
  const cardValues = [
    "😃",
    "💩",
    "🤡",
    "🐵",
    "🏀",
    "🌴",
    "👍",
    "👻",
    "🔥",
    "🍕",
    "🏠",
    "🐢"
  ];
  let id = 0;

  return cardValues.reduce(
    (accumulator, value) => [
      ...accumulator,
      { id: id++, value },
      { id: id++, value }
    ],
    []
  );
});

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("App snapshot", () => {
  const c = create(<App />);
  expect(c.toJSON()).toMatchSnapshot();
});

test("first card flipped adds id to flippedCardsIds", () => {
  const c = create(<App />);
  const instance = c.getInstance();

  expect(instance.state.flippedCardIds.length).toBe(0);
  instance.handleCardClick(5);
  expect(instance.state.flippedCardIds.length).toBe(1);
  expect(instance.state.flippedCardIds.includes(5)).toBe(true);
});

test("clicking on a flipped card does not add to flippedCardsIds", () => {
  const c = create(<App />);
  const instance = c.getInstance();

  expect(instance.state.flippedCardIds.length).toBe(0);
  instance.handleCardClick(7);
  expect(instance.state.flippedCardIds.length).toBe(1);
  instance.handleCardClick(7);
  expect(instance.state.flippedCardIds.length).toBe(1);
});

test("matched cards' ids are added to matchedCardIds", () => {
  const c = create(<App />);
  const instance = c.getInstance();

  expect(instance.state.matchedCardIds.length).toBe(0);

  const matchingCards = instance.state.cards
    .filter(card => card.value === "🔥")
    .map(matchedCards => matchedCards.id);

  matchingCards.forEach(card => instance.handleCardClick(card));

  expect(instance.state.matchedCardIds.length).toBe(2);
  expect(
    matchingCards.every(card => instance.state.matchedCardIds.includes(card))
  ).toBe(true);
  expect(instance.state.flippedCardIds.length).toBe(0);
});

test("flipped cards that don't match reset flippedCardIds", async () => {
  const c = create(<App />);
  const instance = c.getInstance();

  const unmatchedCard1 = instance.state.cards.find(card => card.value === "🔥");
  const unmatchedCard2 = instance.state.cards.find(card => card.value === "🌴");

  expect(instance.state.flippedCardIds.length).toBe(0);
  instance.handleCardClick(unmatchedCard1.id);
  expect(instance.state.flippedCardIds.length).toBe(1);
  instance.handleCardClick(unmatchedCard2.id);
  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(instance.state.flippedCardIds.length).toBe(0);
  expect(instance.state.matchedCardIds.length).toBe(0);
});
