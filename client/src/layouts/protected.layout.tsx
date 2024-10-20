import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores";
import { ROUTES } from "../const";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../const/api-endpoints";
import { authService } from "../services";
import { Spinner } from "../components";

interface Props {}

export const ProtectedLayout: React.FunctionComponent<Props> = () => {
  const navigate = useNavigate();

  const { token, setUser, delToken } = useAuthStore();

  const { data, error, isPending } = useQuery({
    queryKey: [API_ENDPOINTS.AUTH.ME],
    queryFn: async () => {
      if (!token) return;
      const user = await authService.me({ token });
      return user;
    },
  });

  useEffect(() => {
    if (!token || error) {
      delToken();
      navigate(ROUTES.AUTH.LOGIN);
    }
  }, [delToken, error, navigate, setUser, token]);

  useEffect(() => {
    if (!data) return;

    setUser(data);
  }, [data, setUser]);

  if (isPending) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="bg-gray-100">
      <Outlet />
    </main>
  );
};
