import clsx from "clsx";
import { Spinner } from "./spinner.component";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
}

export const SubmitBtn: React.FC<Props> = ({
  children,
  className,
  disabled,
  loading,
}) => {
  return (
    <button
      type="submit"
      className={clsx(
        "flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600",
        {
          "cursor-not-allowed bg-gray-300 text-gray-500 hover:bg-gray-300":
            disabled || loading,
        },
        className,
      )}
      disabled={disabled || loading}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};
