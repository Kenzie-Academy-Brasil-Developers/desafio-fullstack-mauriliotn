"use client"
import { CreateUser, UserData } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next"
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/input";
import InputPassword from "../inputs/inputPassword";
import { ImSpinner } from "react-icons/im";
import { useCont } from "@/contexts/userContext";
import InputPhone from "../inputs/inputPhone";
import { useRouter } from "next/navigation";

export const RegisterForm: NextPage = () => {
    const [loading, setLoading] = useState<boolean | null>(false);

    const router = useRouter()

    const { userRegister } = useCont()

    const {
        register,
        handleSubmit,
        formState: {errors, isDirty, isValid},
        reset,
    } = useForm<UserData>({
        resolver: zodResolver(CreateUser)
    })

    const submit = (data: UserData): void => {
        userRegister(data);
        router.push("/")
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
                animationClass="animate-slide-name"
                label="Nome Completo"
                type="text"
                placeholder="Digite aqui seu nome"
                error={errors.fullName}
                {...register("fullName")}
                />
            </div>

            <div>
                <Input
                animationClass="animate-slide-email"
                label="E-mail"
                type="email"
                placeholder="Digite aqui seu email"
                error={errors.email}
                {...register("email")}
                />
            </div>

            <div>
                <InputPassword
                label="Senha"
                animationClass="animate-slide-password"
                placeholder="Digite aqui sua senha"
                error={errors.password}
                {...register("password")}
                />
            </div>

            <div>
                <InputPhone
                label="Telefone"
                animationClass="animate-slide-telefone"
                type="text"
                placeholder="Digite aqui seu telefone"
                error={errors.telephone}
                {...register("telephone")}
                />
            </div>
            <div className="w-full p-4">
                <button
                className={!isValid || !isDirty ? "animate-slide-button btn negative bg p-4" : "animate-slide-button btn bg mt-4"}
                type="submit"
                >
                    {loading ? (
                        <span>
                            <ImSpinner size={28} className="animate-rotate" />
                        </span>
                    ) : (
                        "Registrar"
                    )}
                </button>
            </div>
        </form>
    )
}