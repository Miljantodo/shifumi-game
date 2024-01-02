import React, { useEffect, useState } from 'react';
import Modal from "react-modal";
import classes from "./ScoreBoard.module.scss";

import TableLabels from "../../../components/table-labels/TableLabels";
import TableItem from "../../../components/table-item/TableItem";

const ScoreBoard = ({ buttonText }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [scoreboardData, setScoreboardData] = useState([])

  const getData = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const newData = await response.json();
        setScoreboardData(newData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData('/api');
  }, [])

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const renderTable = () => {
    if (scoreboardData) {
      return scoreboardData.map((score) => (
        <TableItem
          key={score.GameID}
          first={formatDate(score.GameDate)}
          second={score.Username}
          third={score.GameRounds}
          fourth={score.Score}
        />
      ));
    } else {
      return <div className={classes.games_none}>No games played.</div>;
    }
  };


  Modal.setAppElement("#root");

  return (
    <div>
      {
        !!scoreboardData.length && <button onClick={openModal} className={classes.score_board}>
          {buttonText}
        </button>
      }
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={classes.overlay}
        className={classes.modal}
      >
      <div className={classes.table}>
        <TableLabels
          className={classes.border_bot}
          firstLabel={"Date"}
          secondLabel={"Username"}
          thirdLabel={"Rounds"}
          fourthLabel={"Score"}
        />
        <div>{renderTable()}</div>
      </div>
      </Modal>
    </div>
  );
}

export default ScoreBoard