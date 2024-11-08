import Errorpage from "../errorpage/Errorpage";
import Main from "../layout/Main";
import About from "../pages/About";
import Login from "../pages/Authentication/Login";
import Registration from "../pages/Authentication/Registration";

import Contact from "../pages/Contact";
import Createevent from "../pages/Createevent";
import Home from "../pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Errorpage />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Registration />
      },
      {
        path: '/about',
        element: <About />
      },
     
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/createevent',
        element: (
          <PrivateRoute>
            <Createevent/>
          </PrivateRoute>
        )

      }
        

    ]
  },
]);
export default router;