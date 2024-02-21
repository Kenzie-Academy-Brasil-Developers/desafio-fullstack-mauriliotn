"use client";
import { SessionData } from "@/schemas/sessionSchema";
import { UserData } from "@/schemas/user.schema";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";

interface ProviderProps {
  children: ReactNode;
}

interface AuthProviderProps {
  token: string | undefined;
  user: string | undefined;
  loading: boolean | null;
  isUpdated: boolean;
  setToken: (value: string) => void;
  login: (
    UserData: SessionData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  register: (
    userData: UserData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  logout: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext({} as AuthProviderProps);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const router = useRouter();

  const register = async (
    userData: UserData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await api.post("/users", userData);
      toast.success(`Usuários "${userData.fullName}", criado com sucesso!!`);
      router.push("/");
    } catch (error: any) {
      console.log(error.response.data.message);
      if (error.response.data.message === "email already exists") {
        toast.error("usuário ja cadastrado");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    userData: SessionData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post("/login", userData);
      toast.success(`Bem vindo, ${data.user}`);

      setCookie("desafio.token", data.token, { maxAge: 60 * 30 });
      setCookie("desafio.user", data.user, { maxAge: 60 * 30 });

      setToken(data.token);
      setUser(data.user);
      setTimeout(() => {
        setUser(data.user);
        router.push("/dashboard");
      }, 2200);
    } catch (error) {
      toast.error("Ops! Algo deu errado. Senha ou e-mail inválido");
    } finally {
      setTimeout(() => {
        setIsUpdated(!isUpdated);
        setLoading(false);
      }, 2200);
    }
  };

  const logout = () => {
    deleteCookie("desafio.token");
    deleteCookie("desafio.user");

    router.push("/");
  };
  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        token,
        setToken,
        user,
        isUpdated,
        setIsUpdated,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
