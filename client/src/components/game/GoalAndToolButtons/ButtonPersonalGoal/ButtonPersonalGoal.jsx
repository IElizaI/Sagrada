import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import './ButtonPersonalGoal.css';
import PersonalGoal from '../PersonalGoal/PersonalGoal';

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

const ButtonPersonalGoal = () => {
  const dispatch = useDispatch();
  const statePersonalGoal = useSelector((state) => state.player.personalGoal);

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
      <button className="btn-personal-goal" onClick={openModal}>
        Личная цель
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button
          className="btn-personal-goal btn-personal-goal-close"
          onClick={closeModal}
        >
          Закрыть
        </button>
        <PersonalGoal />
      </Modal>
    </div>
  );
};

export default ButtonPersonalGoal;
