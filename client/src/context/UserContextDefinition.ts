import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { AuthResponse } from "@/types/api";

export type User = AuthResponse;

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
  openAuthForm: boolean;
  setOpenAuthForm: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
