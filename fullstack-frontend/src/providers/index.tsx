"use client"
import { ReactNode } from "react"
import { UserProvider } from "@/contexts/userContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { ContactProvider } from "@/contexts/contactContext"
import { AxiosInterceptor } from "@/components/AxiosInterceptor"

export const Providers = ({children}: {children: ReactNode}) => {
    return (
        <>
        <AxiosInterceptor>
            <AuthProvider>
                <UserProvider>
                    <ContactProvider>
                        {children}
                    </ContactProvider>
                </UserProvider>
            </AuthProvider>
        </AxiosInterceptor>
        </>
     )
}