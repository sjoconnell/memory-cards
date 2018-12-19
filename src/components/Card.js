import React from "react";
import styled from "styled-components";

const MemoryCard = styled.div`
  height: 100px;
  width: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: orange;
  margin: 10px;
  padding: 0 10px;
  .card-front {
    display: none;
  }
  &:active {
    transform: scale(0.97);
    transition: transform 0.2s;
  }
`;

const Card = ({ value, id, flipped, matched, disabled, handleCardClick }) => {
  return (
    <MemoryCard
      onClick={() =>
        disabled || matched || flipped ? null : handleCardClick(id, value)
      }
    >
      <div className="card-front">{value}</div>
      <div className="card-back">¯\_(ツ)_/¯</div>
    </MemoryCard>
  );
};

export default Card;
