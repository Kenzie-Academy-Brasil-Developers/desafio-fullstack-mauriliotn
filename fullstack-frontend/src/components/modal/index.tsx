import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  toggleModal: () => void;
  blockClosing?: boolean;
  children: ReactNode;
  animationClass?: string;
}

export const Modal = ({
  children,
  toggleModal,
  blockClosing,
  animationClass,
}: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }
      if (!event.target) {
        return;
      }

      if (!ref.current.contains(event.target as HTMLElement)) {
        toggleModal();
      }
    };
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleModal]);

  return createPortal(
    <div className="top-0 left-0 bg-black bg-opacity-50 w-screen h-screen fixed flex justify-center items-center">
      <div
        ref={blockClosing ? null : ref}
        className={`bg-gray-800 p-5 shadow-lg rounded-md border-solid ${animationClass}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
