"use client";
import { SessionData } from "@/schemas/sessionSchema";
import { UserData } from "@/schemas/user.schema";
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
  setToken: (value: string) => void;
  userId: string;
  setUserId: (value: string) => void;
  user: UserData | undefined;
  setUser: Dispatch<SetStateAction<UserData | undefined>>;
  loading: boolean | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isOpenEditModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  isOpenModal: boolean;
  setIsOpenEditModal: Dispatch<SetStateAction<boolean>>;
  login: (
    UserData: SessionData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  register: (
    userData: UserData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  editUser: (
    userData: UserData,
    editingID: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  deleteUser: (deletingID: string) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthProviderProps);

export const AuthProvider = ({ children }: ProviderProps) => {
  const [token, setToken] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<UserData>();
  const router = useRouter();

  const register = async (
    userData: UserData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await api.post("/users", userData);
      toast.success(`Usuários "${userData.fullName}", criado com sucesso!!`);
      setTimeout(() => {
        router.push("/");
      }, 2200);
    } catch (error: any) {
      console.log(error.response.data.message);
      if (error.response.data.message === "email already exists") {
        toast.error("usuário ja cadastrado");
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2200);
    }
  };

  const editUser = async (
    userData: UserData,
    editingID: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      const editToken = getCookie("desafio.token");
      setLoading(true);
      const { data } = await api.patch(`/users/${editingID}`, userData, {
        headers: {
          Authorization: `Bearer ${editToken}`,
        },
      });
      setUser(data);
      toast.success(`Usuario "${data.fullName}" editado com sucesso`);
      setTimeout(() => {
        setIsOpenEditModal(false);
        setLoading(false);
      }, 2200);
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(
          "É necessário o preenchimento de todos os campos, verifique se todos foram preenchidos"
        );
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2200);
    }
  };

  const deleteUser = async (deletingID: string) => {
    try {
      const deleteUser = getCookie("desafio.user");
      const deleteToken = getCookie("desafio.token");
      setLoading(true);
      await api.delete(`/users/${deletingID}`, {
        headers: {
          Authorization: `Bearer ${deleteToken}`,
        },
      });
      toast.success(`${deleteUser}, foi deletado com sucesso`);
      deleteCookie("desafio.token");
      deleteCookie("desafio.user");
      deleteCookie("desafio.id");
    } catch (error) {
    } finally {
      setTimeout(() => {
        router.push("/");
      }, 2200);
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
        setUserId(data.id);
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
  }, [router]);

  const logout = () => {
    deleteCookie("desafio.token");
    deleteCookie("desafio.user");
    deleteCookie("desafio.id");

    router.push("/");
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        register,
        setUser,
        isOpenModal,
        isOpenEditModal,
        setIsOpenEditModal,
        setIsOpenModal,
        editUser,
        deleteUser,
        login,
        logout,
        userId,
        setUserId,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
