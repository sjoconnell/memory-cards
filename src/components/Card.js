import React from "react";
import "./styles/Card.scss";

const Card = ({ value, id, flipped, matched, disabled, handleCardClick }) => {
  return (
    <div
      className={`card ${flipped || matched ? "flip" : ""} ${
        matched ? "matched" : ""
      }`}
      onClick={() =>
        disabled || matched || flipped ? null : handleCardClick(id)
      }
    >
      <div className="card-front">
        <span role="img" aria-label="front-card-icon">
          {value}
        </span>
      </div>
      <div className="card-back">
        <span role="img" aria-label="back-card-icon">
          ❓
        </span>
      </div>
    </div>
  );
};

export default Card;
