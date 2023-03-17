import { ReactComponent as Rock } from "../assets/rock.svg";
import { ReactComponent as Paper } from "../assets/paper.svg";
import { ReactComponent as Scissors } from "../assets/scissors.svg";

export const choices = ["rock", "paper", "scissors"];

export const choiceImages = {
  rock: <Rock />,
  paper: <Paper />,
  scissors: <Scissors />,
};

export const getRandomChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};
