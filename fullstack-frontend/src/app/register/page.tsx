import { RegisterForm } from "@/components/Forms/registerForm";
import Link from "next/link";

const RegisterPage = () => {
    return (
      <>
        <main className="flex flex-col body">
            <div className=" flex justify-end p-6">
                <Link href={"/"} className="btn-back">
                    Voltar
                </Link>
            </div>
            <div className="animate-slide-in-top min-h-screen">
              <div className="container max-w-sm flex flex-col items-center p-10 pt-3 mt-0 gap-5 rounded bg-gradient-to-b from-gray-800 from-10% to-blue-950 to-80% top-2">
                <h1 className="text-lg font-semibold leading-7" >Crie sua conta</h1>
                <p className="text-sm font-normal">Rapido e grátis, vamos nessa</p>
                <RegisterForm/>
              </div>

            </div>
        </main>
      </>
    );
  };

export default RegisterPage  