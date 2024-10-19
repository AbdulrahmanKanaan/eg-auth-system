import React from "react";

interface Props {}

export const Or: React.FunctionComponent<Props> = () => {
  return (
    <div className="relative">
      <hr />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white px-2 text-xs text-gray-500">
        OR
      </span>
    </div>
  );
};
