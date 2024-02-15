"use client"
import { SessionData, SessionFormSchema } from "@/schemas/sessionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/input";
import InputPassword from "../inputs/inputPassword";
import { ImSpinner } from "react-icons/im";
import { NextPage } from "next";
import { useAuth } from "@/contexts/AuthContext";




export const SessionForm: NextPage = () => {
    const [loading, setLoading] = useState(false);

    const {login} = useAuth()

    const {
        register,
        handleSubmit,
        formState: {errors, isDirty, isValid},
        reset,
    } = useForm<SessionData>({
        resolver: zodResolver(SessionFormSchema)
    })

    const submit = (data: SessionData): void => {        
        login(data)
        reset()
    }
    return(
        <form 
        className="min-w-72"
        action="#"
        method="POST"
        onSubmit={handleSubmit(submit)}
        >
            <div>
                <Input
                label="Email"
                type="email"
                placeholder="Digite aqui seu email"
                error={errors.email}
                disabled={loading}
                {...register("email")}
                />
            </div>

            <div>
                <InputPassword
                label="Senha"
                placeholder="Digite aqui sua senha"
                error={errors.password}
                disabled={loading}
                {...register("password")}
                />
            </div>
            <div className="w-full p-4">
                <button
                className={!isValid || !isDirty ? "btn negative bg p-4" : "btn bg"}
                type="submit"
                disabled={loading}
                >
                    {loading ? (
                        <span>
                            <ImSpinner size={28} className="animate-rotate" />
                        </span>
                    ) : (
                        "entrar"
                    )}
                </button>
            </div>
        </form>
    )
}