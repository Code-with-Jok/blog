import { createContext, type Dispatch, type SetStateAction } from "react";

export interface User {
  token: string;
  role: "admin" | "member";
  name: string;
  email: string;
  profileImageUrl: string;
  bio: string;
}

export interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User) => void;
  clearUser: () => void;
  openAuthForm: boolean;
  setOpenAuthForm: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | null>(null);
