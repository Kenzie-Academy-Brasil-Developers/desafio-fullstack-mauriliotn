import { useForm } from "react-hook-form"
import { Modal } from "../modal"
import { ContactData, ContactSchemaRequest } from "@/schemas/contatc.schema"
import { zodResolver } from '@hookform/resolvers/zod'
import Input from "../inputs/input"
import { Dispatch, SetStateAction, useState } from "react"
import { ImSpinner } from "react-icons/im"
import { ContactCont } from "@/contexts/contactContext"
import InputPhone from "../inputs/inputPhone"



interface ModalProps {
    toggleModal: () => void
    setContact: Dispatch<SetStateAction<ContactData[]>>
}

export const ModalAddContact = ({toggleModal, setContact }: ModalProps) =>{
    const [loading, setLoading] = useState<boolean | null>(false);

    const { contactRegister } = ContactCont();
    
    const {register, handleSubmit, formState: {errors, isDirty, isValid}} = useForm<ContactData>({
        resolver: zodResolver(ContactSchemaRequest)
    })

    const submit = (data: ContactData): void => {
        contactRegister(data);
        setContact(previusContacts => [data, ... previusContacts])
        toggleModal()
    }

    return(
        <Modal toggleModal={toggleModal} animationClass="animate-scale-in-center">
            <form 
            className="min-w-72"
            action="#"
            method="POST"
            onSubmit={handleSubmit(submit)}>
                <Input
                id="fullName"
                label="Nome Completo"
                type="text"
                placeholder="Digite aqui seu nome"
                error={errors.fullName}
                {...register("fullName")}
                />

                <Input
                id="email"
                label="E-mail"
                type="email"
                placeholder="Digite aqui seu nome"
                error={errors.email}
                {...register("email")}
                />
                <InputPhone
                id="telephone"
                label="Telefone"
                mask="(99) 99999-9999"
                type="text"
                placeholder="Digite aqui seu telefone"
                error={errors.telephone}
                {...register("telephone")}
                />
                <div className="w-full p-4">
                <button
                className={!isValid || !isDirty ? "btn negative bg p-4" : "btn bg mt-4"}
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
        </Modal>
    )
}