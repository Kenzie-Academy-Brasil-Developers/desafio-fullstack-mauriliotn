"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { ModalEditUser } from "../ModalEditUser";
import { UserData } from "@/schemas/user.schema";

interface HeaderProps {
  user?: UserData;
}

const HeaderDash = ({ user }: HeaderProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);

  const { logout, user: userForm } = useAuth();

  return (
    <>
      {isOpenModal && <ModalEditUser toggleModal={toggleModal} user={user} />}
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
