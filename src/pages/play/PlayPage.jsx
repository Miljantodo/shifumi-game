import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import useGameContext from "../../hooks/useGameContext";
import classes from "./PlayPage.module.scss";

const PlayPage = () => {
  const { rounds, setScore } = useGameContext();
  const navigate = useNavigate();

  return <Layout>PlayPage</Layout>;
};

export default PlayPage;
