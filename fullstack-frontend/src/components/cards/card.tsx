"use client";
import { ContactData } from "@/schemas/contatc.schema";
import Link from "next/link";

interface CardProps {
  contact: ContactData;
}

export const Card = ({ contact }: CardProps) => {
  return (
    <>
      <Link
        href={`/contact/${contact.id}`}
        className="flex flex-col justify-center text-center bg-pink-800 hover:bg-green-400 w-48 min-h-20 rounded-lg"
      >
        <div>{contact.fullName}</div>
      </Link>
    </>
  );
};
