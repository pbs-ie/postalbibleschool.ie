import CloseX from "@/Elements/Icons/CloseX";
import { RefObject, useEffect } from "react";

interface ModalProps {
    onClose: () => void;
    size?: "base" | "large";
    innerRef?: RefObject<HTMLDialogElement> | null;
    children?: React.ReactNode;
}
export default function PopupModal({ onClose, innerRef = null, size = "base", children }: ModalProps) {

    const handleCloseModal = () => {
        onClose();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    const getSizeCss = () => {
        switch (size) {
            case "base":
                return "w-1/3";
            case "large":
                return "w-1/2";
        }
    }

    useEffect(() => {
        const modalElement = innerRef?.current;
        let handleMouseEvent: (event: MouseEvent) => void;
        if (modalElement) {
            handleMouseEvent = (mouseEvent: MouseEvent) => {

                const dialogDimensions = modalElement.getBoundingClientRect()
                if (
                    mouseEvent.clientX < dialogDimensions.left ||
                    mouseEvent.clientX > dialogDimensions.right ||
                    mouseEvent.clientY < dialogDimensions.top ||
                    mouseEvent.clientY > dialogDimensions.bottom
                ) {
                    handleCloseModal();
                }
            }
            modalElement.addEventListener('click', handleMouseEvent);
        }
        return () => modalElement?.removeEventListener('click', handleMouseEvent);
    }, []);
    return (
        <dialog onKeyDown={handleKeyDown} ref={innerRef} className={"relative z-10 px-5 pt-10 pb-5 mx-auto bg-white border-2 rounded backdrop:bg-gray-800/50 w-full h-fit " + "md:" + getSizeCss()}>
            <button data-test="classroom_close_button" onClick={() => handleCloseModal()} className="absolute top-4 right-4 hover:bg-gray-200 rounded-full p-1">
                <CloseX className="text-gray-700 w-7 h-7" />
            </button>
            <div className="mx-3 text-left">
                {children}
            </div>
        </dialog>
    )
}