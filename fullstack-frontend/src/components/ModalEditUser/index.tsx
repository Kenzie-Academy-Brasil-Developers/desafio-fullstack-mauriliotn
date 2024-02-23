import { useForm } from "react-hook-form";
import { Modal } from "../modal";
import Input from "../inputs/input";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import InputTelep from "../inputs/InputPhone";
import { EditData, UserData } from "@/schemas/user.schema";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import InputPassword from "../inputs/inputPassword";

interface ModalProps {
  toggleModal: () => void;
  user?: UserData;
}

export const ModalEditUser = ({ toggleModal, user }: ModalProps) => {
  const [loading, setLoading] = useState<boolean | null>(false);

  const { editUser, deleteUser, user: userForm, userId, setUserId } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<UserData>();

  useEffect(() => {
    const userToHandler = userForm;
    if (!userToHandler) {
      return;
    }
    setUserId(userToHandler.id);
    reset(userToHandler);
  }, [userForm, reset, setUserId]);

  const submit = (data: UserData): void => {
    editUser(data, userId);
    setLoading;
    toast.success(`Usuario "${data.fullName}" editado com sucesso`);
    toggleModal();
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
          {...register("telephone")}
        />
        <div className="w-full p-4">
          <button
            className={
              !isValid || !isDirty ? "btn negative bg p-4" : "btn bg mt-4"
            }
            type="submit"
          >
            {loading ? (
              <ImSpinner size={28} className="animate-rotate" />
            ) : (
              "Editar"
            )}
          </button>
        </div>
        <div className="w-full p-4">
          <button
            onClick={(e) => deleteUser(userId)}
            className={
              !isValid || !isDirty ? "btn disable bg p-4" : "btn bg mt-4"
            }
            type="button"
          >
            {loading ? (
              <ImSpinner size={28} className="animate-rotate" />
            ) : (
              <p className="text-red-500">Excluir a conta</p>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
