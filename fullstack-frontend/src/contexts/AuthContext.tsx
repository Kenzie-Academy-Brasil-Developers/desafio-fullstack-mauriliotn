"use client";
import { SessionData } from "@/schemas/sessionSchema";
import { EditData, UserData } from "@/schemas/user.schema";
import { api } from "@/services/api";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

interface ProviderProps {
  children: ReactNode;
}

interface AuthProviderProps {
  token: string | undefined;
  userId: string;
  setToken: (value: string) => void;
  setUserId: (value: string) => void;
  user: UserData | undefined;
  setUser: Dispatch<SetStateAction<UserData | undefined>>;
  loading: boolean | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  login: (
    UserData: SessionData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  register: (
    userData: UserData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  editUser: (userData: UserData, editingID: string) => void;
  deleteUser: (deletingID: string) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthProviderProps);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<UserData>();
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

  const editUser = async (userData: UserData, editingID: string) => {
    try {
      const editToken = getCookie("desafio.token");
      setLoading(true);
      await api.patch(`/users/${editingID}`, userData, {
        headers: {
          Authorization: `Bearer ${editToken}`,
        },
      });
    } catch (error) {
    } finally {
      setIsUpdated(!isUpdated);
      router.push("/dashboard");
    }
  };

  const deleteUser = async (deletingID: string) => {
    try {
      const deleteToken = getCookie("desafio.token");
      setLoading(true);
      await api.delete(`/users/${deletingID}`, {
        headers: {
          Authorization: `Bearer ${deleteToken}`,
        },
      });
      deleteCookie("desafio.token");
      deleteCookie("desafio.user");
      deleteCookie("desafio.id");
    } catch (error) {
    } finally {
      setIsUpdated(!isUpdated);
      router.push("/");
    }
  };

  const login = async (
    userData: SessionData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post("/login", userData);
      toast.success(`Bem vindo, ${data.user.fullName}`);

      setCookie("desafio.token", data.token, { maxAge: 60 * 30 });
      setCookie("desafio.user", data.user.fullName, { maxAge: 60 * 30 });
      setCookie("desafio.id", data.user.id, { maxAge: 60 * 30 });

      setToken(data.token);
      setUser(data.user);
      setUserId(data.user.id);

      setTimeout(() => {
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

  useEffect(() => {
    const profileToken = getCookie("desafio.token");
    const profileId = getCookie("desafio.id");
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/users/${profileId}`);
        setUser(data);
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (profileToken) {
      getUser();
    }
  }, [isUpdated, router]);

  const logout = () => {
    deleteCookie("desafio.token");
    deleteCookie("desafio.user");
    deleteCookie("desafio.id");

    router.push("/");
  };
  return (
    <AuthContext.Provider
      value={{
        register,
        editUser,
        deleteUser,
        login,
        logout,
        token,
        setToken,
        user,
        userId,
        setUserId,
        setUser,
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
