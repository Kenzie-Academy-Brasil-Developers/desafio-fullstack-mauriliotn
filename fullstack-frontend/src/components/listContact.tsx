"use client"
import { ContactData } from "@/schemas/contatc.schema";
import { Card } from "./cards/card";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useEffect, useState } from "react";
import { ModalAddContact } from "./ModalAddContact";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { ContactCont } from "@/contexts/contactContext";



export const ListContacts = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const {contacts , setContacts} = ContactCont()
    

    useEffect(() => {
        (async () => {
            const response = await api.get("/contacts")

            setContacts(response.data)
        })()

    }, [contacts])


    const toggleModal = () => setIsOpenModal(!isOpenModal)

    return(
        <>
        {
            isOpenModal && <ModalAddContact toggleModal={toggleModal} setContacts={setContacts}/>
        }
        <div className="flex flex-col container ">
            <div className="flex justify-end">
                <button type="button" onClick={toggleModal}>
                    <MdOutlineCreateNewFolder className="text-5xl hover:text-pink-800"/>
                </button>


            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 items-center justify-items-start">
                {
                    contacts.map((contact) => {
                        return <Card key={contact.id} setContact={setContacts} contact={contact}/>
                    })
                }
            </div>
            
        </div>
        </>
    )
}