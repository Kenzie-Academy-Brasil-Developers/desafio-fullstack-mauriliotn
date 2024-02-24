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
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

interface Props {
  children: ReactNode;
}

interface ContactProvidersProps {
  contactRegister: (
    contactData: ContactData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  contactDelete: (deletingID: string) => void;
  contactEdit: (
    contactData: ContactData,
    editingID: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  contacts: ContactData[];
  setContacts: Dispatch<SetStateAction<ContactData[]>>;
}

export const ContactContext = createContext({} as ContactProvidersProps);

export const ContactProvider = ({ children }: Props) => {
  const router = useRouter();
  const { setIsOpenModal } = useAuth();
  const [contacts, setContacts] = useState<ContactData[]>([]);

  useEffect(() => {
    const getContact = async () => {
      try {
        const { data } = await api.get("contacts");
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getContact();
  }, []);

  const contactRegister = async (
    contactData: ContactData,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      const token = getCookie("desafio.token");
      setLoading(true);
      const { data } = await api.post("/contacts", contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`Contato "${data.fullName}" criado com sucesso`);
      setContacts([...contacts, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsOpenModal(false);
        router.push("/dashboard");
      }, 2200);
    }
  };

  const contactEdit = async (
    contactData: ContactData,
    editingID: string,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      const token = getCookie("desafio.token");
      setLoading(true);
      const { data } = await api.patch(`/contacts/${editingID}`, contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newContactList = contacts.map((cont) => {
        if (cont.id === editingID) {
          return data;
        } else {
          return cont;
        }
      });
      setContacts(newContactList);
      toast.success(`Contato "${data.fullName}", editado com sucesso`);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsOpenModal(false);
        router.push("/dashboard");
      }, 2200);
    }
  };

  const contactDelete = async (deletingID: string) => {
    try {
      const token = getCookie("desafio.token");
      await api.delete(`/contacts/${deletingID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newContactList = contacts.filter((cont) => cont.id !== deletingID);
      setContacts(newContactList);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsOpenModal(false);
      }, 2200);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contactRegister,
        contactDelete,
        contactEdit,
        contacts,
        setContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const ContactCont = () => useContext(ContactContext);
