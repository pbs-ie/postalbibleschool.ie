import DialogCard from "@/Components/Cards/DialogCard";
import { createPortal } from "react-dom";

export default function ModalComponent({ isOpen = false, message, handleOnClose, handleSubmit }: { isOpen: boolean, message?: string, handleOnClose: () => void, handleSubmit: () => void, onClickOutside?: () => void }) {

    if (!isOpen) {
        return null;
    }
    return createPortal(
        <div className="fixed top-0 flex items-center justify-center w-screen h-screen overflow-auto bg-black bg-opacity-50 overscroll-none backdrop-blur z-10">
            <DialogCard message={message} onClose={handleOnClose} onClickOutside={handleOnClose} onSubmit={handleSubmit}></DialogCard>
        </div>
        , document.getElementById('modal') as Element
    )
}