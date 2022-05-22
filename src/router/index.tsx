import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Rank from "../application/Rank";
import { useRoutes, Navigate } from "react-router-dom";

const MyRouter = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Navigate to="/recommend" />,
        },
        {
          path: "/recommend",
          element: <Recommend />,
        },
        {
          path: "/singers",
          element: <Singers />,
        },
        {
          path: "/rank",
          element: <Rank />,
        },
      ],
    },
  ]);
  return element;
};
export default MyRouter;
