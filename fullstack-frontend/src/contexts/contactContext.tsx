import { ContactData } from "@/schemas/contatc.schema";
import { api } from "@/services/api";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState} from "react";
import { getCookie } from "cookies-next";



interface Props {
    children: ReactNode;
}

interface ContactProvidersProps {
    contactRegister: (contactData: ContactData) => void
    contactDelete: (deletingID: string) => void
    contactEdit: (contactData: ContactData, editingID: string) => void
    contacts: ContactData[]
    setContacts: Dispatch<SetStateAction<ContactData[]>>
    edit: ContactData []
    setEdit: Dispatch<SetStateAction<ContactData[]>>
}

const token = getCookie("desafio.token")

export const ContactContext =  createContext({} as ContactProvidersProps)

export const ContactProvider = ({children}: Props) => {

    const [contacts, setContacts] = useState<ContactData[]>([])
    const [edit, setEdit] = useState<ContactData[]>([])
    
    

    useEffect(() => {
        (async () => {
            const response = await api.get("contacts")

            setContacts(response.data)
        })()

    }, [])

    const contactRegister = (contactData: ContactData) => {
        api.post("/contacts", contactData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    }

    const contactEdit = async (contactData: ContactData, editingID: string) => {
        const {data} = await api.patch(`/contacts/${editingID}`,
            contactData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
            }
        })
        const newContact = contacts.map((contact) => {
            if (contact.id === editingID) {
                return data
            } else {
                return contact
            }
        })
        setContacts(newContact)
    }

    const contactDelete = (deletingID: string) => {
        api.delete(`/contacts/${deletingID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    
    
    return (
        <ContactContext.Provider value={{ contactRegister, contactDelete, contactEdit, contacts, setContacts, edit, setEdit }}>
            {children}
        </ContactContext.Provider>
    )
}

export const ContactCont = () => useContext(ContactContext)