"use client"
import { deleteCookie} from "cookies-next";
import { useRouter } from "next/navigation";

const HeaderDash = () => {

    const router = useRouter()
    function logout(): void {
        deleteCookie("desafio.token")
        deleteCookie("desafio.user")

        router.push("/")
    }

    return(
        <header>
        <div className="container">
          <div className="flex flex-wrap items-center justify-between w-full py-4 px-0 gap-4">
            <h1 className="text-center">Contact List</h1> 
            <button 
                  className="inline-flex items-center btn-back"
                  onClick={logout}
                  >
                      Logout
            </button>
          </div>
        </div>
      </header>
    )
}

HeaderDash.displayName = "HeaderDash";

export default HeaderDash;