import { useNavigate } from "react-router-dom";
import add from "../../assets/add.svg";
import sub from "../../assets/subtract.svg";
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import useGameContext from "../../hooks/useGameContext";
import GameRules from "./game-rules/GameRules";
import classes from "./StartPage.module.scss";

const StartPage = () => {
  const { nickname, setNickname, rounds, setRounds } = useGameContext();
  const navigate = useNavigate();

  const onNicknameChange = (evt) => {
    setNickname(evt.target.value);
  };

  const onRoundsChange = (evt) => {
    setRounds(parseInt(evt.target.value));
  };
  return (
    <Layout>
      <div className={classes.frame}>
        <div className={classes.header_text}>ROCK PAPER SCISSOR</div>
        <div className={classes.container}>
          <div className={classes.game_information}>
            <div>
              <label className={classes.label}>Nickname:</label>
              <input
                className={classes.nick_input}
                type="text"
                id="nickname"
                defaultValue={nickname}
                onChange={onNicknameChange}
              />
            </div>
            <div className={classes.rounds}>
              <label className={classes.label}>Number of rounds:</label>
              <div className={classes.rounds_information}>
                <Button
                  className={classes.round_btn}
                  onClick={() => {
                    if (rounds > 1) {
                      setRounds(rounds - 1);
                    }
                  }}
                >
                  <img src={sub} alt="sub-icon" />
                </Button>
                <input
                  className={classes.rounds_input}
                  type="number"
                  id="rounds"
                  value={rounds}
                  onChange={onRoundsChange}
                />
                <Button
                  className={classes.round_btn}
                  onClick={() => {
                    setRounds(rounds + 1);
                  }}
                >
                  <img src={add} alt="add-icon" />
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.game_start}>
            <Button
              className={classes.game_start_btn}
              onClick={() => {
                navigate("/play");
              }}
            >
              START GAME
            </Button>
            <GameRules buttonText={"Game rules"} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StartPage;
