import Home from "../application/Home";
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Rank from "../application/Rank";
import Album from "../application/Album";
import Singer from "../application/Singer";
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
          path: "/recommend/",
          element: <Recommend />,
          children:[
            {
              path: "/recommend/:id",
              element: <Album />,
            }
          ]
        },
        {
          path: "/singers",
          element: <Singers />,
          children:[
            {
              path: "/singers/:id",
              element: <Singer />,
            }
          ]
        },
        {
          path: "/rank",
          element: <Rank />,
          children:[
            {
              path: "/rank/:id",
              element: <Album />,
            }
          ]
        },
      ],
    },
  ]);
  return element;
};
export default MyRouter;
