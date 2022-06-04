import React from 'react';
import Modal from 'react-modal';
import Instruments from '../Instruments/Instruments';
import './ButtonInstruments.css';

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
  },
};

const ButtonInstruments = () => {
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
    <div>
      <button className="btn-instruments" onClick={openModal}>
        Инструменты
      </button>
      <Modal
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          className="btn-instruments btn-instruments-close"
          onClick={closeModal}
        >
          Закрыть
        </button>
        <Instruments />
      </Modal>
    </div>
  );
};

export default ButtonInstruments;
