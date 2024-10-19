import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  variant: "success" | "error" | "warning" | "info";
}

export const Alert: React.FunctionComponent<Props> = ({
  variant,
  children,
}) => {
  return (
    <div
      className={clsx("w-full rounded border p-4 text-center", {
        "border-green-900 bg-green-100 text-green-900": variant === "success",
        "border-red-900 bg-red-100 text-red-900": variant === "error",
        "border-yello-900 bg-yellow-100 text-yellow-900": variant === "warning",
        "border-blue-900 bg-blue-100 text-blue-900": variant === "info",
      })}
    >
      {children}
    </div>
  );
};
