"use client";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";
import { ModalAddContact } from "../ModalAddContact";

const ClientAddButton = () => {
  const toggleModal = () => setIsOpenModal(!isOpenModal);
  const { isOpenModal, setIsOpenModal } = useAuth();
  return (
    <>
      {isOpenModal && <ModalAddContact toggleModal={toggleModal} />}
      <button
        type="button"
        className="flex flex-col justify-center items-center btn-back"
        onClick={(e) => toggleModal()}
      >
        <MdOutlineCreateNewFolder className="text-5xl" />
        Add new
      </button>
    </>
  );
};

ClientAddButton.displayName = "ClientAddButton";

export default ClientAddButton;
