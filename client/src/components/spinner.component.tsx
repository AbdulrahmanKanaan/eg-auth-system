import { FaSpinner } from "react-icons/fa6";

interface Props {
  size?: "sm" | "md" | "lg";
}

export const Spinner: React.FC<Props> = ({ size = "md" }) => {
  const sizePx = {
    sm: "12px",
    md: "18px",
    lg: "24px",
  }[size];

  return (
    <>
      <FaSpinner className="animate-spin" size={sizePx} />
    </>
  );
};
