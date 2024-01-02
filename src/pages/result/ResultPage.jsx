// libs
import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import Header from "../../components/header/Header";
import TableLabels from "../../components/table-labels/TableLabels";
import TableItem from "../../components/table-item/TableItem";

// hooks
import useGameContext from "../../hooks/useGameContext";

// styles
import classes from "./ResultPage.module.scss";


const ResultPage = () => {
  const { username, finalResult, score } = useGameContext();
  const navigate = useNavigate();

  const postData = async (url, data) => {
    try {
       await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  const calculateWinner = () => {
    switch (true) {
      case score.totalUserScore > score.totalHouseScore:
        postData('/submit', { username, score });
        return username;
      case score.totalHouseScore > score.totalUserScore:
        return "House";
      default:
        return "Tie";
    }
  };


  const renderTable = () => {
    if (score.rounds.length) {
      return score.rounds.map((round, index) => (
        <TableItem
          key={`round-${index}`}
          username={username}
          first={index + 1}
          second={round.winner}
          userChoice={round.user}
          houseChoice={round.house}
        />
      ));
    } else {
      return <div className={classes.games_none}>No games played.</div>;
    }
  };

  return (
    <Layout>
      <Header>{finalResult}</Header>
      <div className={classes.table}>
        <TableLabels
          className={classes.border_bot}
          firstLabel={"Rounds"}
          secondLabel={"Winner"}
          thirdLabel={`${username}`}
          fourthLabel={"House"}
        />
        <div>{renderTable()}</div>
        <TableLabels
          className={classes.border_top}
          firstLabel={`${score.rounds.length}`}
          secondLabel={calculateWinner()}
          thirdLabel={`${score.totalUserScore}`}
          fourthLabel={`${score.totalHouseScore}`}
        />
      </div>
      <Button
        className={classes.new_game_btn}
        onClick={() => {
          navigate("/");
        }}
      >
        New Game
      </Button>
    </Layout>
  );
};

export default ResultPage;
