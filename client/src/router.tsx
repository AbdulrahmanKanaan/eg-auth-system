import { createBrowserRouter } from "react-router-dom";
import { ProtectedLayout, PublicLayout } from "./layouts";
import { LoginPage } from "./modules/auth/login";
import { RegisterPage } from "./modules/auth/register";
import { ROUTES } from "./const";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <ProtectedLayout />,
  },
  {
    path: ROUTES.AUTH.INDEX,
    element: <PublicLayout />,
    children: [
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
]);
