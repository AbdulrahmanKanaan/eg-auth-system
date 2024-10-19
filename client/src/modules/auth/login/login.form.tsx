import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "./login.schema";
import React from "react";
import { Input, SubmitBtn } from "../../../components";

interface Props {
  onSubmit: (data: LoginSchema) => void;
  loading: boolean;
}

export const LoginForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            className="rounded-lg border p-2"
            error={errors.email?.message || ""}
            autoComplete="username"
            required
            {...register("email")}
          />
          <Input
            type="password"
            placeholder="Password"
            className="rounded-lg border p-2"
            error={errors.password?.message || ""}
            autoComplete="current-password"
            required
            {...register("password")}
          />
          <SubmitBtn loading={loading}>Login</SubmitBtn>
        </div>
      </form>
    </>
  );
};
