"use client"
import { SessionData } from "@/schemas/sessionSchema";
import { api } from "@/services/api";
import { deleteCookie, setCookie  } from "cookies-next";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";
import { toast } from "react-toastify";



interface ProviderProps {
    children: ReactNode
}

interface AuthProviderProps {
    token: string | undefined
    user: string | undefined
    setToken: (value: string) => void
    login: (UserData: SessionData) => void
    logout: () => void
}

const AuthContext = createContext({} as AuthProviderProps)

export const AuthProvider = ({children}: ProviderProps) => {
    const [token, setToken] = useState<string>("")
    const [user, setUser] = useState<string>("")
    const router = useRouter()

    const login = async(userData: SessionData) => {
        api.post("/login", userData)
        .then((res) => {            
            console.log(res);
            
            setCookie("desafio.token", res.data.token, {maxAge: 60 * 30})
            setCookie("desafio.user", res.data.user, {maxAge: 60 * 30})

            setToken(res.data.token)
            setUser(res.data.user)

            toast.success(`Bem vindo, ${user}`)

            router.push("/dashboard")
            
        })
        .catch((err)=> {
            console.log(err);
            toast.error("Ops! Algo deu errado. Senha ou e-mail inválido");
            
        })
    }
    const logout = () => {
        deleteCookie("desafio.token")
        deleteCookie("desafio.user")

        router.push("/")
    }
    return (
        <AuthContext.Provider value={{ login, logout, token, setToken, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
