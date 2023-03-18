// libs
import { useNavigate } from "react-router-dom";

// components
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import Header from "../../components/header/Header";
import TableLabels from "./table-labels/TableLabels";
import TableItem from "./table-item/TableItem";

// hooks
import useGameContext from "../../hooks/useGameContext";

// styles
import classes from "./ResultPage.module.scss";

const ResultPage = () => {
  const { nickname, finalResult, score } = useGameContext();
  const navigate = useNavigate();

  const calculateWinner = () => {
    if (score.totalUserScore > score.totalHouseScore) {
      return nickname;
    } else if (score.totalHouseScore > score.totalUserScore) {
      return "House";
    } else {
      return "Tie";
    }
  };

  const renderTable = () => {
    if (score.rounds.length) {
      return score.rounds.map((round, index) => (
        <TableItem
          key={`round-${index}`}
          nickname={nickname}
          round={index + 1}
          winner={round.winner}
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
          thirdLabel={`${nickname}`}
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
