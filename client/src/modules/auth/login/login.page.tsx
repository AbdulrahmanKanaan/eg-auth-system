import React from "react";
import { Link } from "react-router-dom";
import { Card, Or } from "../../../components";
import { ROUTES } from "../../../const";
import { AuthLayout } from "../../../layouts/auth.layout";
import { LoginForm } from "./login.form";
import { useLogin } from "./login.hook";

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  const { loading, onSubmit, error } = useLogin();

  return (
    <>
      <AuthLayout error={error}>
        <Card className="w-full">
          <div className="flex flex-col gap-6">
            <h1 className="text-center text-2xl font-bold">Login</h1>
            <hr />
            <LoginForm onSubmit={onSubmit} loading={loading} />
            <Or />
            <div className="text-center">
              <span>Don't have an account? </span>
              <Link
                to={ROUTES.AUTH.REGISTER}
                className="text-blue-500 underline"
              >
                register
              </Link>
            </div>
          </div>
        </Card>
      </AuthLayout>
    </>
  );
};
