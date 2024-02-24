"use client";
import { Card } from "./cards/card";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { ModalAddContact } from "./ModalAddContact";
import { ContactCont } from "@/contexts/contactContext";
import { useAuth } from "@/contexts/AuthContext";

export const ListContacts = () => {
  const toggleModal = () => setIsOpenModal(!isOpenModal);
  const { isOpenModal, setIsOpenModal } = useAuth();
  const { contacts } = ContactCont();

  return (
    <>
      {isOpenModal && <ModalAddContact toggleModal={toggleModal} />}
      <div className="flex flex-col container ">
        <div className="flex justify-end">
          <button type="button" onClick={(e) => toggleModal()}>
            <MdOutlineCreateNewFolder className="text-5xl hover:text-pink-800" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 items-center justify-items-start">
          {contacts.map((cont) => (
            <Card key={cont.id} contact={cont} />
          ))}
        </div>
      </div>
    </>
  );
};
