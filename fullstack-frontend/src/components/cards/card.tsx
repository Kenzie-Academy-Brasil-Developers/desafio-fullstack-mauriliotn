"use client"
import { ContactData } from "@/schemas/contatc.schema";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface CardProps{
    contact: ContactData
    setContact: Dispatch<SetStateAction<ContactData[]>>
}

export const Card = ({contact, setContact}: CardProps) =>{
         
    return(
        <>
        <Link href={`/contact/${contact.id}`} className="flex flex-col justify-center text-center bg-pink-800 hover:bg-green-400 w-48 min-h-20 rounded-lg">
            <div>
                {contact.fullName}
            </div>
        </Link>
        </>
        
    )
}