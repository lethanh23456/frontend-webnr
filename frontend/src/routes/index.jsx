import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault/LayoutDefault";
import Home from "../Pages/home/index";
import Register from "../Pages/register/index"
import Bangxh from "../Pages/bangxh/index"

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
        {
        path: "register",   
        element: <Register />,
      },
      {
        path: "home", 
        element: <Home />,
      },
      {
        path: "bangxh", 
        element: <Bangxh />,
      },
    ],
  },
];