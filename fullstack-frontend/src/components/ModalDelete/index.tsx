import { useAuth } from "@/contexts/AuthContext";
import { ContactCont } from "@/contexts/contactContext";
import { ContactData } from "@/schemas/contatc.schema";
import { useEffect } from "react";
import { Modal } from "../modal";

interface ModalProps {
  toggleModal: () => void;
  contact: ContactData;
}

export const ModalDelete = ({ toggleModal, contact }: ModalProps) => {
  const { contacts, contactEdit } = ContactCont();
  const { loading, setLoading } = useAuth();

  return <Modal toggleModal={toggleModal}> teste </Modal>;
};
