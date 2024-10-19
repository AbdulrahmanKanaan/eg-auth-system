import { useForm } from "react-hook-form";
import { Input, SubmitBtn } from "../../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema, registerSchema } from "./register.schema";

interface Props {
  onSubmit: (data: RegisterSchema) => void;
  loading: boolean;
}

export const RegisterForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Full Name"
            className="rounded-lg border p-2"
            error={errors.name?.message}
            required
            autoComplete="off"
            {...register("name")}
          />
          <Input
            type="email"
            placeholder="Email"
            className="rounded-lg border p-2"
            error={errors.email?.message}
            required
            autoComplete="off"
            {...register("email")}
          />
          <Input
            type="password"
            placeholder="Password"
            className="rounded-lg border p-2"
            error={errors.password?.message}
            autoComplete="off"
            required
            {...register("password")}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            className="rounded-lg border p-2"
            error={errors.confirm_password?.message?.toString()}
            autoComplete="off"
            required
            {...register("confirm_password")}
          />
          <SubmitBtn loading={loading}>Register</SubmitBtn>
        </div>
      </form>
    </>
  );
};
