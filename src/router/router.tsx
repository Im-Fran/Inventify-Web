import {createBrowserRouter} from "react-router-dom";
import Layout from "@/layout/Layout.tsx";
import Home from "@/pages/home/home.tsx";

const routes = [
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];


const router = createBrowserRouter(routes, {
  basename: '/',
});

export default router;