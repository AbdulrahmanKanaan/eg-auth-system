import React, { PropsWithChildren, useEffect } from "react";
import { Alert } from "../components";
import { FaShieldCat } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores";
import { ROUTES } from "../const";

interface Props extends PropsWithChildren {
  error?: React.ReactNode;
}

export const AuthLayout: React.FunctionComponent<Props> = ({
  children,
  error,
}) => {
  const navigate = useNavigate();

  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) return;

    navigate(ROUTES.HOME);
  }, [navigate, token]);

  return (
    <>
      <main className="flex min-h-dvh justify-center p-4">
        <div className="flex w-full flex-col items-center justify-center gap-4 md:w-[350px]">
          <FaShieldCat size={64} />
          {error && <Alert variant="error">{error}</Alert>}
          {children}
        </div>
      </main>
    </>
  );
};
