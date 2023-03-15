import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import useGameContext from "../../hooks/useGameContext";
import classes from "./PlayPage.module.scss";

const PlayPage = () => {
  const { nickname, rounds, setScore } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    setScore({ user: rounds - 2, house: 2 });

    navigate("/result");
  }, []);
  return <Layout>PlayPage</Layout>;
};

export default PlayPage;
