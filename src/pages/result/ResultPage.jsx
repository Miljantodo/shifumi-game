import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import Header from "../../components/header/Header";
import TableLabels from "./table-labels/TableLabels";
import TableList from "./table-list/TableList";
import useGameContext from "../../hooks/useGameContext";
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
        <TableList
          key={`round-${index}`}
          nickname={nickname}
          round={index + 1}
          winner={round.winner}
          userChoice={round.user}
          houseChoice={round.house}
        />
      ));
    } else {
      return <div>No games played.</div>;
    }
  };

  return (
    <Layout>
      <Header>{finalResult}</Header>
      <div className={classes.table}>
        <TableLabels
          firstLabel={"Rounds"}
          secondLabel={"Winner"}
          thirdLabel={`${nickname}`}
          fourthLabel={"House"}
        />
        <hr className={classes.break_line} />
        <div>{renderTable()}</div>
        <hr className={classes.break_line} />
        <TableLabels
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
        New game
      </Button>
    </Layout>
  );
};

export default ResultPage;
