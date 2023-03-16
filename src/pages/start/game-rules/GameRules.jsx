import React, { useState } from "react";
import Modal from "react-modal";
import classes from "./GameRules.module.scss";

const GameRules = ({ buttonText }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement("#root");

  return (
    <div className="center">
      {
        <button onClick={openModal} className={classes.game_rules}>
          {buttonText}
        </button>
      }
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={classes.overlay}
        className={classes.modal}
      >
        <div className={classes.modal_content}>
          Rock wins against scissors; paper wins against rock; and scissors wins
          against paper. If both players throw the same hand signal, it is
          considered a tie, and play resumes until there is a clear winner.
        </div>
      </Modal>
    </div>
  );
};

export default GameRules;
