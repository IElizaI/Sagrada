import React from 'react';
import PropTypes from 'prop-types';
import './CommonGoal.css';

const CommonGoal = ({ card }) => {
  return (
    <div className="container-common-goal">
      <img className="img-common-goal" src={card.src} alt={card.title} />
      <div className="title-common-goal">{card.title}</div>
      <div>{card.text}</div>
    </div>
  );
};

CommonGoal.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    points: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommonGoal;
