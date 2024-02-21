import HeaderDash from "@/components/HeaderDash";
import { CardDetail } from "@/components/cards/cardDetail";
import { ContactData } from "@/schemas/contatc.schema";
import { api } from "@/services/api";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}
export const revalidate = 90;

export async function generateStaticParams() {
  const response = await api.get<ContactData[]>("/contacts");
  return response.data.map((contact) => ({ id: contact.id }));
}

const Contact = async ({ params }: PageProps) => {
  const user = getCookie("desafio.user", { cookies });

  const res = await api.get(`/contacts/${params.id}`);

  const contact: ContactData = res.data;

  return (
    <>
      <main className="flex flex-col body min-h-screen">
        <HeaderDash />
        <section className="body w-full border-y border-gray-600">
          <div className="container flex justify-between items-center py-11 px-4 ">
            <h1 className="text-lg font-semibold leading-7 "> Olá, {user}</h1>
            <Link href={"/dashboard"} className="btn-back">
              Voltar
            </Link>
          </div>
        </section>
        <div className="flex items-center justify-center">
          <CardDetail contact={contact} />
        </div>
      </main>
    </>
  );
};

export default Contact;
