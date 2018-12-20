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

  /**
   *
   */
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

  /**
   *
   */
  handleCardClick = id => {
    this.setState({
      freezeGame: true
    });
    if (this.state.flippedCardIds.length === 0) {
      this.setState({
        flippedCardIds: [...this.state.flippedCardIds, id],
        freezeGame: false
      });
    } else {
      if (this.state.flippedCardIds.includes(id)) {
        this.setState({
          freezeGame: false
        });
      } else {
        this.setState({
          flippedCardIds: [...this.state.flippedCardIds, id]
        });
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
            color={"red"}
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
