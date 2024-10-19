import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={clsx("rounded-lg border bg-white p-4 shadow-sm", className)}
    >
      {children}
    </div>
  );
};
