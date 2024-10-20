import { useAuthStore } from "../../../stores";

export const useHome = () => {
  const { user, delToken } = useAuthStore();

  const logout = () => {
    delToken();
  };

  return { logout, user };
};
