"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import sair from "../../assets/img/logout-icon-transparent-3.jpg";
import sair2 from "../../assets/img/sair.png";
import Image from "next/image";

const HeaderDash = () => {
  const router = useRouter();
  function logout(): void {
    deleteCookie("desafio.token");
    deleteCookie("desafio.user");

    router.push("/");
  }

  return (
    <header>
      <div className="container">
        <div className="flex flex-wrap items-center justify-between w-full py-4 px-0 gap-4">
          <h1 className="text-center">Contact List</h1>
          <button
            className="flex flex-col justify-center items-center btn-back"
            onClick={logout}
          >
            <Image
              src={sair2}
              className="text-white"
              alt="Descrição da imagem"
              width={35}
              height={35}
            />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

HeaderDash.displayName = "HeaderDash";

export default HeaderDash;
