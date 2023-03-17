import React, { useState } from "react";
import Modal from "react-modal";
import classes from "./GameRules.module.scss";
import { ReactComponent as Rules } from "../../../assets/game-rules.svg";

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
        <Rules />
      </Modal>
    </div>
  );
};

export default GameRules;
