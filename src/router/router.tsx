import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "@/pages/loading/loading.tsx";

const Layout = lazy(() => import("@/components/layout/layout.tsx"));
const Home = lazy(() => import("@/pages/home/home.tsx"));
const Login = lazy(() => import("@/pages/auth/login/login.tsx"));
const Register = lazy(() => import("@/pages/auth/register/register.tsx"));
const RequestVerificationEmail = lazy(() => import("@/pages/auth/email/request/request.tsx"));
const EmailVerification = lazy(() => import("@/pages/auth/email/verify/verify.tsx"));
const AccountRecovery = lazy(() => import("@/pages/auth/password/recovery/recovery.tsx"));
const PasswordReset = lazy(() => import("@/pages/auth/password/reset/reset.tsx"));
const DashboardInventario = lazy(() => import("@/pages/dashboard/dashboard/dashboard.tsx"));
const Sell = lazy(() => import("@/pages/dashboard/sell/sell.tsx"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading/>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading/>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/auth',
        children: [
          {
            path: '/auth/login',
            element: (
              <Suspense fallback={<Loading/>}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: '/auth/register',
            element: (
              <Suspense fallback={<Loading/>}>
                <Register />
              </Suspense>
            ),
          },
          {
            path: '/auth/email',
            children: [
              {
                path: '/auth/email/request',
                element: (
                  <Suspense fallback={<Loading/>}>
                    <RequestVerificationEmail />
                  </Suspense>
                ),
              },
              {
                path: '/auth/email/verify',
                element: (
                  <Suspense fallback={<Loading/>}>
                    <EmailVerification />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: '/auth/password',
            children: [
              {
                path: '/auth/password/recovery',
                element: (
                  <Suspense fallback={<Loading/>}>
                    <AccountRecovery />
                  </Suspense>
                ),
              },
              {
                path: '/auth/password/reset',
                element: (
                  <Suspense fallback={<Loading/>}>
                    <PasswordReset />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: '/dashboard',
        children: [
          {
            path: '/dashboard/inventory',
            element: (
              <Suspense fallback={<Loading/>}>
                <DashboardInventario />
              </Suspense>
            ),
          },
          {
            path: '/dashboard/sell',
            element: (
              <Suspense fallback={<Loading/>}>
                <Sell />
              </Suspense>
            ),
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