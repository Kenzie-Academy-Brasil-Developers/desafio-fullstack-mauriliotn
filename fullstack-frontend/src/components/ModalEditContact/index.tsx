import { useForm } from "react-hook-form";
import { Modal } from "../modal";
import { ContactData } from "@/schemas/contatc.schema";
import Input from "../inputs/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { ContactCont } from "@/contexts/contactContext";
import InputTelep from "../inputs/InputPhone";

interface ModalProps {
  toggleModal: () => void;
  setContact: Dispatch<SetStateAction<ContactData[]>>;
  contact: ContactData;
}

export const ModalEditContact = ({ toggleModal, contact }: ModalProps) => {
  const [loading, setLoading] = useState(false);

  const { contacts, contactEdit } = ContactCont();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<ContactData>();

  useEffect(() => {
    const contactToHandler = contacts.find((cont) => cont.id === contact.id);
    if (!contactToHandler) {
      return;
    }

    reset(contactToHandler);
  }, [contact.id, contacts, reset]);

  const submit = (data: ContactData): void => {
    contactEdit(data, contact.id, setLoading);
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
          error={errors.fullName}
          disabled={loading}
          {...register("fullName")}
        />

        <Input
          id="email"
          label="E-mail"
          type="email"
          placeholder="Digite aqui seu nome"
          error={errors.email}
          disabled={loading}
          {...register("email")}
        />
        <InputTelep
          id="telephone"
          label="Telefone"
          type="text"
          placeholder="Digite aqui seu telefone"
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
              "Editar"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
