import React from "react";
import { Outlet } from "react-router-dom";

interface Props {}

export const PublicLayout: React.FunctionComponent<Props> = () => {
  return (
    <div className="bg-gray-100">
      <Outlet />
    </div>
  );
};
