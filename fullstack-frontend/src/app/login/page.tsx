import { SessionForm } from "@/components/Forms/sessionForm";
import Link from "next/link";

const SessionPage = () => {
  return (
    <>
      <main className="body pageBox ">
        <div className="container max-w-sm flex flex-col items-center p-10 pt-3 mt-0 gap-5 rounded bg-gradient-to-b from-gray-800 from-10% to-blue-950 to-80% top-2 animate-rotate-scale-up">
          <h2 className="animate-slide-left text-2xl mt-3">Login</h2>
          <SessionForm />
          <div>
            <p className="text-xs mb-3 text-center">
              Ainda não possui uma conta?
            </p>

            <Link href={`/register`} className="btn bg disable">
              Cadastre-se
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default SessionPage;
