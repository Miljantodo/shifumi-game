import * as Label from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import useGameContext from "../../hooks/useGameContext";
import classes from "./StartPage.module.scss";

const StartPage = () => {
  const { nickname, setNickname, rounds, setRounds } = useGameContext();
  const navigate = useNavigate();

  const onNicknameChange = (evt) => {
    setNickname(evt.target.value);
  };

  const onRoundsChange = (evt) => {
    setRounds(evt.target.value);
  };
  return (
    <Layout>
      <Label.Root className={classes.LabelRoot} htmlFor="nickname">
        Nickname
      </Label.Root>
      <input
        className={classes.Input}
        type="text"
        id="nickname"
        defaultValue={nickname}
        onChange={onNicknameChange}
      />
      <Label.Root className={classes.LabelRoot} htmlFor="rounds">
        # of Rounds
      </Label.Root>
      <input
        className={classes.Input}
        type="number"
        id="rounds"
        defaultValue={rounds}
        min={1}
        max={30}
        onChange={onRoundsChange}
      />
      <Button
        onClick={() => {
          navigate("/play");
        }}
        style={{ margin: "10px" }}
      >
        Start
      </Button>
    </Layout>
  );
};

export default StartPage;
