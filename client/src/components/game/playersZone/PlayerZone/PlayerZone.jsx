import React from 'react';
import Modal from 'react-modal';
import './PlayerZone.css';
import Slider from 'react-slick';
import PatternStainedGlass from '../PatternStainedGlass/PatternStainedGlass';
import { useSelector } from 'react-redux';
import StainedGlassOfOtherPlayers from '../StainedGlassOfOtherPlayers/StainedGlassOfOtherPlayers';

const customStyles = {
  content: {
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
  },
};

const PlayerZone = () => {
  const otherPlayers = useSelector((state) => state.game.players);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="container-player-zone">
      <div className="container-btn-other-stained-glass">
        {otherPlayers.length ? (
          <button className="btn-other-stained-glass" onClick={openModal}>
            Игроки
          </button>
        ) : (
          ''
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          className="btn-other-stained-glass btn-other-stained-glass-close"
          onClick={closeModal}
        >
          Закрыть
        </button>
        <Slider {...settings}>
          {otherPlayers
            ? otherPlayers.map((player) => {
                return (
                  <StainedGlassOfOtherPlayers player={player} key={player.id} />
                );
              })
            : ''}
        </Slider>
      </Modal>
      <PatternStainedGlass />
    </div>
  );
};

export default PlayerZone;
