import { ContactData } from "@/schemas/contatc.schema";
import { api } from "@/services/api";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

interface Props {
  children: ReactNode;
}

interface ContactProvidersProps {
  contactRegister: (contactData: ContactData) => void;
  contactDelete: (deletingID: string) => void;
  contactEdit: (contactData: ContactData, editingID: string) => void;
  contacts: ContactData[];
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
  edit: ContactData[];
  setEdit: Dispatch<SetStateAction<ContactData[]>>;
}

export const ContactContext = createContext({} as ContactProvidersProps);

export const ContactProvider = ({ children }: Props) => {
  const router = useRouter();
  const { isUpdated, setIsUpdated } = useAuth();
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [edit, setEdit] = useState<ContactData[]>([]);

  useEffect(() => {
    const getContact = async () => {
      const response = await api.get("contacts");

      setContacts(response.data);
    };

    getContact();
  }, [isUpdated]);

  const contactRegister = (contactData: ContactData) => {
    const token = getCookie("desafio.token");
    api.post("/contacts", contactData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsUpdated(!isUpdated);
  };

  const contactEdit = async (contactData: ContactData, editingID: string) => {
    const token = getCookie("desafio.token");
    try {
      await api.patch(`/contacts/${editingID}`, contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
    } finally {
      setIsUpdated(!isUpdated);
      router.push("/dashboard");
    }
  };

  const contactDelete = (deletingID: string) => {
    const token = getCookie("desafio.token");
    api.delete(`/contacts/${deletingID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsUpdated(!isUpdated);
  };

  return (
    <ContactContext.Provider
      value={{
        contactRegister,
        contactDelete,
        contactEdit,
        contacts,
        setContacts,
        edit,
        setEdit,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const ContactCont = () => useContext(ContactContext);
