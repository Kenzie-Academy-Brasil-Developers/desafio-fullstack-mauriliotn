import { useRouter } from "next/navigation"
import { Modal } from "../modal"



interface ModalProps {
    toggleModal: () => void
}

export const ModalError = ({ toggleModal }: ModalProps) => {

    const router = useRouter()

    const handleClick = () => {
        toggleModal()
        router.push("/")
    }


    return (
        <Modal toggleModal={toggleModal} blockClosing>
            Você não está autenticado !!!
            <button className="btn negative" onClick={handleClick}>Ir para o Login</button>
        </Modal>
    )
}