import {createBrowserRouter} from "react-router-dom";
import Layout from "@/components/layout/layout.tsx";
import Home from "@/pages/home/home.tsx";
import Login from "@/pages/auth/login/login.tsx";
import Register from "@/pages/auth/register/register.tsx";
import RequestVerificationEmail from "@/pages/auth/email/request/request.tsx";
import EmailVerification from "@/pages/auth/email/verify/verify.tsx";
import AccountRecovery from "@/pages/auth/password/recovery/recovery.tsx";
import PasswordReset from "@/pages/auth/password/reset/reset.tsx";

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
        path: '/auth',
        children: [
          {
            path: '/auth/login',
            element: <Login/>
          },
          {
            path: '/auth/register',
            element: <Register/>
          },
          {
            path: '/auth/email',
            children: [
              {
                path: '/auth/email/request',
                element: <RequestVerificationEmail/>
              },
              {
                path: '/auth/email/verify',
                element: <EmailVerification/>
              }
            ],
          },
          {
            path: '/auth/password',
            children: [
              {
                path: '/auth/password/recovery',
                element: <AccountRecovery/>
              },
              {
                path: '/auth/password/reset',
                element: <PasswordReset/>
              }
            ]
          },
        ],
      },
    ],
  },
];


const router = createBrowserRouter(routes, {
  basename: '/',
});

export default router;