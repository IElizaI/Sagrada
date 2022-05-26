import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './ButtonCommonGoals.css';
import { useDispatch, useSelector } from 'react-redux';
import { randomCommonGoals } from '../../../../features/gameFeatures';
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
// Modal.setAppElement('#yourAppElement');

const ButtonCommonGoals = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // console.log('1');
  //   if (stateCommonGoals.length === 0) {
  //     // console.log('2');
  //     // console.log('asdsadd');
  //     const goals = randomCommonGoals(3, CommonGoals);
  //   }
  // }, []);

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
