import React from "react";
import { Link } from "react-router-dom";
import { Card, Or } from "../../../components";
import { ROUTES } from "../../../const";
import { RegisterForm } from "./register.form";
import { useRegister } from "./register.hook";
import { AuthLayout } from "../../../layouts/auth.layout";

interface Props {}

export const RegisterPage: React.FC<Props> = () => {
  const { loading, onSubmit, error } = useRegister();

  return (
    <>
      <AuthLayout error={error}>
        <Card className="w-full">
          <div className="flex flex-col gap-6">
            <h1 className="text-center text-2xl font-bold">Register</h1>
            <hr />
            <RegisterForm onSubmit={onSubmit} loading={loading} />
            <Or />
            <div className="text-center">
              <span>Already a user? </span>
              <Link to={ROUTES.AUTH.LOGIN} className="text-blue-500 underline">
                login
              </Link>
            </div>
          </div>
        </Card>
      </AuthLayout>
    </>
  );
};
