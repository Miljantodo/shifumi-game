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
import ScoreBoard from "./score-board/ScoreBoard";

const LandingPage = () => {
  const { username, setUsername, totalRounds, setTotalRounds } =
    useGameContext();
  const navigate = useNavigate();

  const onUsernameChange = (evt) => {
    const trimmedUsername = evt.target.value.trim();
    if (trimmedUsername) {
      setUsername(trimmedUsername);
    }
  };

  return (
    <Layout>
      <div className={classes.frame}>
        <Header>List kamen makaze</Header>
        <div className={classes.container}>
          <div className={classes.game_information}>
            <div>
              <label className={classes.label}>Korisničko ime</label>
              <input
                className={classes.nick_input}
                type="text"
                id="username"
                placeholder={`${username}`}
                maxLength={12}
                onChange={onUsernameChange}
              />
            </div>
            <div className={classes.rounds}>
              <label className={classes.label}>Broj rundi</label>
              <div className={classes.rounds_information}>
                <Button
                  className={classes.round_btn}
                  disabled={totalRounds === 3}
                  onClick={() => {
                    if (totalRounds > 3) {
                      setTotalRounds(totalRounds - 1);
                    }
                  }}
                >
                  <Sub />
                </Button>
                <div
                  className={classes.rounds_input}
                >{totalRounds}</div>
                <Button
                  className={classes.round_btn}
                  disabled={totalRounds === 15}
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
                if(!totalRounds) setTotalRounds(3)
                navigate("/play");
              }}
            >
              Započni igru
            </Button>
            <GameRules buttonText={"Pravila igre"} />
            <ScoreBoard buttonText={"Najbolji rezultati"}/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
