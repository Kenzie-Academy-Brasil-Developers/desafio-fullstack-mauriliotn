"use client";
import { Card } from "./cards/card";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { ModalAddContact } from "./ModalAddContact";
import { ContactCont } from "@/contexts/contactContext";
import { useState } from "react";

export const ListContacts = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);

  const { contacts, setContacts } = ContactCont();

  return (
    <>
      {isOpenModal && (
        <ModalAddContact toggleModal={toggleModal} setContacts={setContacts} />
      )}
      <div className="flex flex-col container ">
        <div className="flex justify-end">
          <button type="button" onClick={toggleModal}>
            <MdOutlineCreateNewFolder className="text-5xl hover:text-pink-800" />
          </button>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 items-center justify-items-start">
          {contacts.map((contact) => {
            return <Card key={contact.id} contact={contact} />;
          })}
        </div>
      </div>
    </>
  );
};
