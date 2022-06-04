import React from 'react';
import Modal from 'react-modal';
import './ButtonCommonGoals.css';
import CommonGoalCards from '../CommonGoalCards/CommonGoalCards';

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

const ButtonCommonGoals = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className="btn-common-goals" onClick={openModal}>
        Общие цели
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          className="btn-common-goals btn-common-goals-close"
          onClick={closeModal}
        >
          Закрыть
        </button>
        <CommonGoalCards />
      </Modal>
    </div>
  );
};

export default ButtonCommonGoals;
