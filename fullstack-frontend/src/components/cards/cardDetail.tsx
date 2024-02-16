"use client"
import { ContactCont } from "@/contexts/contactContext";
import { ContactData } from "@/schemas/contatc.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { ModalEditContact } from "../ModalEditContact";

interface CardProps{
    contact: ContactData
}

export const CardDetail = ({contact}: CardProps) =>{
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { contactDelete,setContacts, contacts } = ContactCont();


    const router = useRouter()

    const handleDelete = () => {
        contactDelete(contact.id)
        router.push("/dashboard")
    }

    const toggleModal = () => setIsOpenModal(!isOpenModal)

    return(
        <>
        {
            isOpenModal && <ModalEditContact toggleModal={toggleModal} setContact={setContacts} contact={contact}/>
        }
        <section className="flex justify-center container animate-scale-in-center"> 
            <div className="flex flex-col justify-center items-center bg-pink-800  min-w-72 max-w-80 h-18 rounded-lg p-4 gap-4">
                <div className="flex flex-row justify-between items-baseline w-full">
                    <h3>{contact.fullName}</h3>
                    <button onClick={toggleModal}>
                        <FaRegEdit className="hover:text-green-400"/>
                    </button>
                </div>
                <div className="flex flex-col p-4 border rounded-md gap-4 w-full">
                    <div className="flex justify-between items-center gap-16">
                        <FaMailBulk/>
                        <p>{contact.email}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <FaPhoneSquareAlt/>
                        <p>
                            {contact.telephone}
                        </p>
                    </div>
                </div>
                <button>
                    <FaRegTrashAlt onClick={() => handleDelete()}
                    className="hover:text-green-400"
                    />    
                </button>
            </div>
        </section>
        </>
        
    )
}