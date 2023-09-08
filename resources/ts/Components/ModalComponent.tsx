import DialogCard from "@/Components/Cards/DialogCard";

export default function ModalComponent({message, handleOnClose, handleSubmit}: {message?: string, handleOnClose: () => void, handleSubmit: () => void}) {
    return (
        <div className="fixed top-0 flex items-center justify-center w-screen h-screen overflow-auto bg-black bg-opacity-50 overscroll-none backdrop-blur">
            <DialogCard message={message} onClose={handleOnClose} onSubmit={handleSubmit}></DialogCard>
        </div>
    )
}