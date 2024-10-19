import React from "react";
import { Outlet } from "react-router-dom";

interface Props {}

export const ProtectedLayout: React.FunctionComponent<Props> = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};
