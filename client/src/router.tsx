import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "./const";
import { ProtectedLayout, PublicLayout } from "./layouts";
import { HomePage } from "./modules/app/home";
import { LoginPage } from "./modules/auth/login";
import { RegisterPage } from "./modules/auth/register";
import { NotFoundPage } from "./modules/errors";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <ProtectedLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
    ],
  },
  {
    path: ROUTES.AUTH.INDEX,
    element: <PublicLayout />,
    children: [
      {
        path: ROUTES.AUTH.INDEX,
        element: <Navigate to={ROUTES.AUTH.LOGIN} />,
      },
      {
        path: ROUTES.AUTH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.AUTH.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
