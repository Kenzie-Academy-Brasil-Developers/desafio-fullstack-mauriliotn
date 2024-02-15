"use client"
import { ContactData } from "@/schemas/contatc.schema";
import { Card } from "./cards/card";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { useEffect, useState } from "react";
import { ModalAddContact } from "./ModalAddContact";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";



 export const ListContacts = () => {
    const [contacts, setContact] = useState<ContactData[]>([])
    const [isOpenModal, setIsOpenModal] = useState(false)

    const {logout} = useAuth()
    

    useEffect(() => {
        (async () => {
            const response = await api.get("/contacts")

            setContact(response.data)
        })()

    }, [])


    const toggleModal = () => setIsOpenModal(!isOpenModal)

    return(
        <>
        {
            isOpenModal && <ModalAddContact toggleModal={toggleModal} setContact={setContact}/>
        }
        <div className="flex flex-col w-full">
            <div className="flex justify-between p-8">
                <button type="button" onClick={toggleModal}>
                    <MdOutlineCreateNewFolder className="text-5xl hover:text-pink-800"/>
                </button>

                <button 
                className="inline-flex items-center btn-back"
                onClick={logout}
                >
                    Logout
                </button>

            </div>
            <div className="max-w-8xl grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 p-8 items-center justify-items-center">
                {
                    contacts.map((contact) => {
                        return <Card key={contact.id} setContact={setContact} contact={contact}/>
                    })
                }
            </div>
            
        </div>
        </>
    )
}