import { useForm } from "react-hook-form";
import { Modal } from "../modal";
import Input from "../inputs/input";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import InputTelep from "../inputs/InputPhone";
import { UserData } from "@/schemas/user.schema";
import { useAuth } from "@/contexts/AuthContext";
import InputPassword from "../inputs/inputPassword";

interface ModalProps {
  toggleModal: () => void;
}

export const ModalEditUser = ({ toggleModal }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const { editUser, deleteUser, user: userForm, userId } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<UserData>();

  useEffect(() => {
    const userToHandler = { ...userForm, password: "" };

    if (!userToHandler) {
      return;
    }
    reset(userToHandler);
  }, [userForm, reset]);

  const submit = (data: UserData): void => {
    editUser(data, userId, setLoading);
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
          placeholder="Digite aqui seu email"
          autoComplete="on"
          error={errors.email}
          disabled={loading}
          {...register("email")}
        />
        <InputPassword
          label="Senha"
          placeholder="Digite aqui sua senha"
          autoComplete="new-password"
          error={errors.password}
          {...register("password")}
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
            className={!isValid || !isDirty ? "btn negative bg p-4" : "btn bg"}
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
        <div className="w-full p-4">
          <button
            onClick={(e) => deleteUser(userId)}
            className="btn disable bg p-4"
            type="button"
          >
            {loading ? (
              <span className="inline-flex items-center">
                <ImSpinner size={28} className="animate-spin" />
              </span>
            ) : (
              <p className="text-red-500">Excluir a conta</p>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
