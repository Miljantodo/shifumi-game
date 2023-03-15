import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GameContextProvider } from "./context/GameContext";
import PlayPage from "./pages/play/PlayPage";
import ResultPage from "./pages/result/ResultPage";
import StartPage from "./pages/start/StartPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <StartPage />,
    },
    {
      path: "/play",
      element: <PlayPage />,
    },
    {
      path: "/result",
      element: <ResultPage />,
    },
  ]);

  return (
    <GameContextProvider>
      <RouterProvider router={router} />
    </GameContextProvider>
  );
};

export default App;
