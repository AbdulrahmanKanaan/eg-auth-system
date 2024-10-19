import clsx from "clsx";
import React, { forwardRef, useId } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClasses?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      type = "text",
      label,
      name,
      placeholder,
      error,
      containerClasses,
      className,
      ...rest
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={clsx("w-full", containerClasses)}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          className={clsx("w-full border-2", { "border-red-400": !!error }, className)}
          ref={ref}
          {...rest}
        />
        {error && <span className="mt-1 text-red-400">{error}</span>}
      </div>
    );
  },
);
