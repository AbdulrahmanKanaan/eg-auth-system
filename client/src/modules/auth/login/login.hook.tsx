import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { ApiCallException } from "../../../exceptions";
import { authService } from "../../../services";
import { useAuthStore } from "../../../stores";
import { LoginSchema } from "./login.schema";

export const useLogin = () => {
  const { setToken } = useAuthStore();

  const {
    mutateAsync: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: LoginSchema) => {
      // simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await authService.login(data);
    },
  });

  const onSubmit = useCallback(
    async (data: LoginSchema) => {
      const res = await login(data);
      setToken(res.token);
    },
    [login, setToken],
  );

  const errorMessage = useMemo<React.ReactNode>(() => {
    if (!error) return null;

    if (!(error instanceof ApiCallException)) {
      return "An error occurred";
    }

    if (typeof error.data.message === "string") {
      return error.data.message;
    } else if (Array.isArray(error.data.message)) {
      const errs = error.data.message.map((err) => <li>{err}</li>);
      return <ul className="list-inside list-disc text-start">{errs}</ul>;
    }
  }, [error]);

  return { onSubmit, loading: isPending, error: errorMessage };
};
