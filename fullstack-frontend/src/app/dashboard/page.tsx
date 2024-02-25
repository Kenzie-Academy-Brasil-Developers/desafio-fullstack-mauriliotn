import HeaderDash from "@/components/HeaderDash";
import { ListContacts } from "@/components/listContact";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ClientAddButton from "@/components/ClientAddButton";

const Verifytoken = async () => {
  const token = getCookie("desafio.token", { cookies });

  if (!token) {
    redirect("/");
  }
  return;
};

const DashboardPage = async () => {
  const profile = getCookie("desafio.user", { cookies });
  await Verifytoken();

  return (
    <>
      <main className="body min-h-screen w-full">
        <HeaderDash />
        <section className="body w-full border-y border-gray-600">
          <div className="flex justify-between items-center container py-11 px-4">
            <h1 className="text-lg font-semibold leading-7 ">
              {" "}
              Olá, {profile}
            </h1>
            <ClientAddButton />
          </div>
        </section>
        <ListContacts />
      </main>
    </>
  );
};

export default DashboardPage;
