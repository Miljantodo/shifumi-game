import rock from "../assets/rock.svg";
import paper from "../assets/paper.svg";
import scissors from "../assets/scissors.svg";

export const choices = ["rock", "paper", "scissors"];

export const choiceImages = {
  rock: rock,
  paper: paper,
  scissors: scissors,
};

export const getRandomChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};
