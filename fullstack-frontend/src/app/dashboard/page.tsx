import { ListContacts } from "@/components/listContact";
import { getCookie } from "cookies-next";
import { NextPage } from "next";
import {cookies} from "next/headers"
import { redirect } from "next/navigation";

const Verifytoken = async () => {
  const token = getCookie("desafio.token", { cookies })
  
  if (!token) {
    redirect("/")
  }
  return
}

const DashboardPage: NextPage = async () => {
  
  await Verifytoken()
  
  return (
    <>
      <header className="body p-4">
        <h1 className="text-center">Contact List</h1> 
      </header>
      <main className="body min-h-screen p-4">
        <ListContacts />
      </main>
    </>
  );
};

export default DashboardPage