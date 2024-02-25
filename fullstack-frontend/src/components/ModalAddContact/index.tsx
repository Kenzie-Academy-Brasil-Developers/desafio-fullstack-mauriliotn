import { useForm } from "react-hook-form";
import { Modal } from "../modal";
import { ContactData, ContactSchemaRequest } from "@/schemas/contatc.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../inputs/input";
import { useState } from "react";
import { ImSpinner } from "react-icons/im";
import { ContactCont } from "@/contexts/contactContext";
import InputPhone from "../inputs/InputPhone";

interface ModalProps {
  toggleModal: () => void;
}

export const ModalAddContact = ({ toggleModal }: ModalProps) => {
  const [loading, setLoading] = useState(false);

  const { contactRegister } = ContactCont();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ContactData>({
    resolver: zodResolver(ContactSchemaRequest),
  });

  const submit = (data: ContactData): void => {
    contactRegister(data, setLoading);
  };

  return (
    <Modal toggleModal={toggleModal} animationClass="animate-scale-in-center">
      <form
        className="min-w-72"
        action="#"
        method="POST"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          id="fullName"
          label="Nome Completo"
          type="text"
          placeholder="Digite aqui seu nome"
          autoComplete="on"
          error={errors.fullName}
          disabled={loading}
          {...register("fullName")}
        />

        <Input
          id="email"
          label="E-mail"
          type="email"
          placeholder="Digite aqui seu email"
          autoComplete="on"
          error={errors.email}
          disabled={loading}
          {...register("email")}
        />
        <InputPhone
          id="telephone"
          label="Telefone"
          type="text"
          placeholder="Digite aqui seu telefone"
          autoComplete="on"
          error={errors.telephone}
          disabled={loading}
          {...register("telephone")}
        />
        <div className="w-full p-4">
          <button
            className={!isValid || !isDirty ? "btn negative bg p-4" : "btn bg "}
            type="submit"
          >
            {loading ? (
              <span className="inline-flex items-center">
                <ImSpinner size={28} className="animate-spin" />
              </span>
            ) : (
              "Registrar"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
