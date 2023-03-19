// libs
import { useNavigate } from "react-router-dom";

// assets
import { ReactComponent as Add } from "../../assets/add.svg";
import { ReactComponent as Sub } from "../../assets/subtract.svg";

// components
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import GameRules from "./game-rules/GameRules";

// hooks
import useGameContext from "../../hooks/useGameContext";

// styles
import classes from "./LandingPage.module.scss";
import Header from "../../components/header/Header";

const LandingPage = () => {
  const { nickname, setNickname, totalRounds, setTotalRounds } =
    useGameContext();
  const navigate = useNavigate();

  const onNicknameChange = (evt) => {
    const trimmedNickname = evt.target.value.trim();
    if (trimmedNickname) {
      setNickname(trimmedNickname);
    }
  };

  const onRoundsChange = (evt) => {
    setTotalRounds(parseInt(evt.target.value));
  };

  return (
    <Layout>
      <div className={classes.frame}>
        <Header>Rock Paper Scissors</Header>
        <div className={classes.container}>
          <div className={classes.game_information}>
            <div>
              <label className={classes.label}>Nickname</label>
              <input
                className={classes.nick_input}
                type="text"
                id="nickname"
                placeholder={`${nickname}`}
                maxLength={12}
                onChange={onNicknameChange}
              />
            </div>
            <div className={classes.rounds}>
              <label className={classes.label}>Number of rounds</label>
              <div className={classes.rounds_information}>
                <Button
                  className={classes.round_btn}
                  onClick={() => {
                    if (totalRounds > 1) {
                      setTotalRounds(totalRounds - 1);
                    }
                  }}
                >
                  <Sub />
                </Button>
                <input
                  className={classes.rounds_input}
                  type="number"
                  id="rounds"
                  value={totalRounds}
                  onChange={onRoundsChange}
                />
                <Button
                  className={classes.round_btn}
                  onClick={() => {
                    setTotalRounds(totalRounds + 1);
                  }}
                >
                  <Add />
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
              Start game
            </Button>
            <GameRules buttonText={"Game rules"} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
