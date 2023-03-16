import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import useGameContext from "../../hooks/useGameContext";
import classes from "./ResultPage.module.scss";

const ResultPage = () => {
  const { nickname, rounds, score } = useGameContext();
  const navigate = useNavigate();

  return (
    <Layout>
      <label className={classes.LabelRoot} htmlFor="nickname">
        Nickname: {nickname}
      </label>
      <br />
      <label className={classes.LabelRoot} htmlFor="nickname">
        Rounds: {rounds}
      </label>
      <br />
      <label className={classes.LabelRoot} htmlFor="nickname">
        Score: <br />
        {nickname} wins: {score.user}
        <br /> House wins: {score.house}
      </label>
      <br />
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Play again
      </Button>
    </Layout>
  );
};

export default ResultPage;
