import React, { Component } from "react";
import styled from "styled-components";
import Card from "./Card";
import createCards from "../util/cardUtil";

const Game = styled.div`
  max-width: 620px;
  display: flex;
  flex-wrap: wrap;
  background-color: blue;
  justify-content: space-around;
  padding: 20px;
`;

class App extends Component {
  state = {
    flippedCard: null,
    matchedCardIds: [],
    freezeGame: false,
    cards: createCards()
  };

  /**
   *
   */
  areCardsAMatch = id => {
    const secondCardFlipped = this.state.cards.find(card => card.id === id);
    return secondCardFlipped.value === this.state.flippedCard.value;
  };

  resetUnmatchedCards = () => {
    this.setState({
      flippedCard: null,
      freezeGame: false
    });
  };

  /**
   *
   */
  handleCardClick = (id, value) => {
    this.setState({
      freezeGame: true
    });
    if (this.state.flippedCard === null) {
      this.setState({
        flippedCard: { id, value },
        freezeGame: false
      });
    } else {
      if (this.state.flippedCard.id === id) {
        this.setState({
          freezeGame: false
        });
      } else if (this.areCardsAMatch(id)) {
        this.setState({
          freezeGame: false,
          matchedCardIds: [
            ...this.state.matchedCardIds,
            id,
            this.state.flippedCard.id
          ],
          flippedCard: null
        });
      } else {
        setTimeout(this.resetUnmatchedCards, 2000);
      }
    }
  };

  render() {
    return (
      <Game>
        {this.state.cards.map(card => (
          <Card
            value={card.value}
            id={card.id}
            key={card.id}
            flipped={
              this.state.flippedCard === null
                ? false
                : this.state.flippedCard.id === card.id
            }
            matched={this.state.matchedCardIds.includes(card.id)}
            disabled={this.state.freezeGame}
            handleCardClick={this.handleCardClick}
          />
        ))}
      </Game>
    );
  }
}

export default App;
