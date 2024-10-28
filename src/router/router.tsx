import {createBrowserRouter} from "react-router-dom";
import Layout from "@/layout/Layout.tsx";
import Home from "@/pages/home/home.tsx";
import Login from "@/pages/auth/login/login.tsx";
import Register from "@/pages/auth/register/register";

const routes = [
  {
    path: "/",
    element: <Layout/>,
    children: [
      /* Home */
      {
        index: true,
        element: <Home />,
      },

      /* Auth */
      {
        path: '/login',
        element: <Login/>
      },

      /*Registro */
      {
        path: '/register',
        element: <Register/>
      }
    ],
  },
];


const router = createBrowserRouter(routes, {
  basename: '/',
});

export default router;