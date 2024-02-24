"use client";
import { useAuth } from "@/contexts/AuthContext";
import { CgLogOut } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { ModalEditUser } from "../ModalEditUser";

const HeaderDash = () => {
  const { isOpenEditModal, setIsOpenEditModal } = useAuth();
  const toggleModal = () => setIsOpenEditModal(!isOpenEditModal);

  const { logout } = useAuth();

  return (
    <>
      {isOpenEditModal && <ModalEditUser toggleModal={toggleModal} />}
      <header>
        <div className="container">
          <div className="flex flex-wrap items-center justify-between w-full py-4 px-0 gap-4">
            <h1 className="text-center">Contact List</h1>
            <div className="flex gap-4">
              <button
                className="flex flex-col justify-center items-center btn-back"
                onClick={(e) => toggleModal()}
              >
                <CgProfile className="text-5xl" />
                Profile
              </button>
              <button
                className="flex flex-col justify-center items-center btn-back"
                onClick={logout}
              >
                <CgLogOut className="text-5xl" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

HeaderDash.displayName = "HeaderDash";

export default HeaderDash;
