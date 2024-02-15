import { CardDetail } from "@/components/cards/cardDetail"
import { ContactData } from "@/schemas/contatc.schema"
import { api } from "@/services/api"
import Link from "next/link"


interface PageProps {
    params: {id: string}
}
export const revalidate = 90

export async function generateStaticParams() {
    const response = await api.get<ContactData[]>("/contacts")
    return response.data.map((contact) => ({id: contact.id}))
}

const Contact = async ({params}: PageProps) => {
    console.log(params);
    
    const res = await api.get(`/contacts/${params.id}`)
    const contact: ContactData = res.data

    return (
        <>
        <header className="body p-4">
            <h1 className="text-center">Contact Detail</h1>
        </header>
        <main className="flex flex-col body min-h-screen p-4">
            <div className="flex justify-end p-6">
                <Link href={"/dashboard"} className="btn-back">
                    Voltar
                </Link>
            </div>
            <div className="flex items-center justify-center">
                <CardDetail contact={contact}/>
            </div>
        </main>
        </>
    )
}

export default Contact