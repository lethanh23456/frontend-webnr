import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault/LayoutDefault";
import Home from "../Pages/home/index";
import Register from "../Pages/register/index";
import Bangxh from "../Pages/bangxh/index";
import DienDan from "../Pages/diendan/index";
import SuKien from "../Pages/sukien/index";
import VongQuay from "../Pages/vongquay/index";
import User from "../Pages/user/index";
import Login from "../Pages/login/index";
import Admin from "../Pages/admin/index";
import Shop from "../Pages/shop/index";



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
      {
        path: "diendan", 
        element: <DienDan />,
      },
      {
        path: "sukien", 
        element: <SuKien />,
      },
      {
        path: "vongquay", 
        element: <VongQuay />,
      },
       {
        path: "user", 
        element: <User />,
      },
       {
        path: "login", 
        element: <Login />,
      },
    ],
  },


  {
    path: "/admin",
    element: <Admin />, 
    
  },

  {
    path: "/shop",
    element: <Shop />, 
    
  },

];