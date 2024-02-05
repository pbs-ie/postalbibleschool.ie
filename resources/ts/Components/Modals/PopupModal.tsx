import CloseX from "@/Elements/Icons/CloseX";
import { RefObject, useEffect } from "react";

interface ModalProps {
    onClose?: () => void;
    innerRef?: RefObject<HTMLDialogElement> | null;
    children?: React.ReactNode;
}
export default function PopupModal({ onClose, innerRef = null, children }: ModalProps) {
    const closeModal = () => {
        innerRef?.current?.close();
    }
    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        closeModal();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

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
        <dialog onKeyDown={handleKeyDown} ref={innerRef} className="relative z-10 px-5 pt-10 pb-5 mx-auto bg-white border-2 rounded backdrop:bg-gray-800/50 md:w-1/3 min-w-96 h-fit">
            <button data-test="classroom_close_button" onClick={() => handleCloseModal()} className="absolute top-5 right-5">
                <CloseX className="text-gray-700 w-7 h-7 hover:text-gray-500" />
            </button>
            <div className="mx-3 text-left">
                {children}
            </div>
        </dialog>
    )
}