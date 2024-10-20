import React from "react";
import { useHome } from "./home.hook";

interface Props {}

export const HomePage: React.FunctionComponent<Props> = () => {
  const { user, logout } = useHome();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p className="text-lg">Welcome {user?.name}</p>
      <button
        onClick={logout}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
};
