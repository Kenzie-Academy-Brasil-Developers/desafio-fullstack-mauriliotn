import HeaderDash from "@/components/HeaderDash";
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
  const user = getCookie("desafio.user", { cookies })
  
  await Verifytoken()
  
  return (
    <>
      <main className="body min-h-screen w-full">
        <HeaderDash/>
        <section className="body w-full border-y border-gray-600">
          <div className="container py-11 px-4">
            <h1 className="text-lg font-semibold leading-7 "> Olá, {user}</h1>
          </div>
        </section>
          <ListContacts />
      </main>
    </>
  );
};

export default DashboardPage