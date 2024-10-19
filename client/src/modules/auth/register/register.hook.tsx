import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { ApiCallException } from "../../../exceptions";
import { authService } from "../../../services";
import { useAuthStore } from "../../../stores";
import { RegisterSchema } from "./register.schema";

export const useRegister = () => {
  const { setToken } = useAuthStore();

  const {
    mutateAsync: register,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      // simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await authService.register(data);
    },
  });

  const onSubmit = useCallback(
    async (data: RegisterSchema) => {
      const res = await register(data);
      setToken(res.token);
    },
    [register, setToken],
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
