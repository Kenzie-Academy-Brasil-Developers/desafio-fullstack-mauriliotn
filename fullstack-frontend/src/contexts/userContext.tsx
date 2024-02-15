import { UserData } from "@/schemas/user.schema";
import { api } from "@/services/api";
import { ReactNode, createContext, useContext } from "react";

interface Props {
    children: ReactNode;
}

interface UserProvidersProps{
    userRegister: (userData: UserData) => void
    
}

export const UserContext = createContext({} as UserProvidersProps);


export const UserProvider = ({ children }: Props) => {
    const userRegister = (userData: UserData) => {
        api.post("/users", userData)
    }

    return(
        <UserContext.Provider value={{ userRegister }}>
            {children}
        </UserContext.Provider>
    )

}

export const useCont = () => useContext(UserContext)
