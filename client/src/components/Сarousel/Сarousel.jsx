import React from 'react';
import './Сarousel.css';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import CommonGoal from '../game/GoalAndToolButtons/CommonGoal/CommonGoal';

const Сarousel = ({ arrayCommonGoals }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {arrayCommonGoals.map((card) => {
        return <CommonGoal card={card} key={card.id} />;
      })}
    </Slider>
  );
};

Сarousel.propTypes = {
  arrayCommonGoals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      points: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Сarousel;
