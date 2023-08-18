import React from 'react';

interface CardProps {
  text: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ text, imageUrl, ...props }) => {
  return (
    <div {...props}>
      <h2>{text}</h2>
      <img src={imageUrl} alt={text} />
    </div>
  );
};

export default Card;
