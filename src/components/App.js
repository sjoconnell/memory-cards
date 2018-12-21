import React, { Component } from "react";
import Card from "./Card";
import createCards from "../util/cardUtil";
import "./styles/App.scss";

class App extends Component {
  state = {
    flippedCardIds: [],
    matchedCardIds: [],
    freezeGame: false,
    cards: createCards()
  };

  areCardsAMatch = id => {
    const firstCardFlipped = this.state.cards.find(
      card => card.id === this.state.flippedCardIds[0]
    );
    const secondCardFlipped = this.state.cards.find(card => card.id === id);
    return secondCardFlipped.value === firstCardFlipped.value;
  };

  resetUnmatchedCards = () => {
    this.setState({
      flippedCardIds: [],
      freezeGame: false
    });
  };

  handleCardClick = id => {
    this.setState({
      freezeGame: true
    });
    // If no cards are flipped, flip the card
    if (this.state.flippedCardIds.length === 0) {
      this.setState({
        flippedCardIds: [...this.state.flippedCardIds, id],
        freezeGame: false
      });
    } else {
      // check if the clicked card is the same as the currently flipped card
      // This should not happen as we disable the click of flipped card but here just in case
      if (this.state.flippedCardIds.includes(id)) {
        this.setState({
          freezeGame: false
        });
      } else {
        // flip the card as it is not the same as the currently flipped card
        this.setState({
          flippedCardIds: [...this.state.flippedCardIds, id]
        });
        // Check if both flipped cards are match
        if (this.areCardsAMatch(id)) {
          this.setState({
            freezeGame: false,
            matchedCardIds: [
              ...this.state.matchedCardIds,
              id,
              this.state.flippedCardIds[0]
            ],
            flippedCardIds: []
          });
        } else {
          // reset both flipped cards since they are not a match
          setTimeout(this.resetUnmatchedCards, 1750);
        }
      }
    }
  };

  render() {
    return (
      <div className="game">
        {this.state.cards.map(card => (
          <Card
            value={card.value}
            id={card.id}
            key={card.id}
            flipped={this.state.flippedCardIds.includes(card.id)}
            matched={this.state.matchedCardIds.includes(card.id)}
            disabled={this.state.freezeGame}
            handleCardClick={this.handleCardClick}
          />
        ))}
      </div>
    );
  }
}

export default App;
