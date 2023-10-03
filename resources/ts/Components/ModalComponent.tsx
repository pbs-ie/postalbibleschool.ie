import DeleteDialogCard from "@/Components/Cards/DeleteDialogCard";
import { createPortal } from "react-dom";

export default function ModalComponent({ isOpen = false, message, handleOnClose, handleSubmit }: { isOpen: boolean, message?: string, handleOnClose: () => void, handleSubmit: () => void, onClickOutside?: () => void }) {

    return (
        // <div className="fixed top-0 flex items-center justify-center w-screen h-screen overflow-auto bg-black bg-opacity-50 overscroll-none backdrop-blur z-10">
        <DeleteDialogCard isOpen={isOpen} message={message} onClose={handleOnClose} onSubmit={handleSubmit} hasCloseButton={true}></DeleteDialogCard>
    )
}