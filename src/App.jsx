// libs
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// context
import { GameContextProvider } from "./context/GameContext";

// pages
import GameplayPage from "./pages/play/GameplayPage";
import ResultPage from "./pages/result/ResultPage";
import LandingPage from "./pages/start/LandingPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/play",
      element: <GameplayPage />,
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
