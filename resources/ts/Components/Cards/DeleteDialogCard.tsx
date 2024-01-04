import PrimaryButton from "@/Elements/Buttons/PrimaryButton";
import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import { useEffect, useRef, useState } from "react";
import CloseX from "@/Components//Icons/CloseX";

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onSubmit: () => void;
    message?: string;
    hasCloseButton?: boolean;
}

export default function DeleteDialogCard({ isOpen, onClose, onSubmit, message, hasCloseButton }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setIsModalOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current !== null && !dialogRef.current.contains(event.target as Node)) {
                onClose && onClose();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClose]);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen])

    useEffect(() => {
        const modalElement = dialogRef.current;
        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isModalOpen]);

    if (!isModalOpen)
        return null;

    return (
        <dialog onKeyDown={handleKeyDown} ref={dialogRef} className="relative z-10 px-5 pt-10 pb-5 mx-auto bg-white border-2 rounded md:w-1/3 min-w-96 h-fit">
            <button onClick={handleCloseModal} className="absolute top-5 right-5">
                <CloseX className="text-gray-700 w-7 h-7 hover:text-gray-500" />
            </button>
            <div className="mx-3">
                <h1 className="mb-4 text-lg font-bold">Delete School</h1>
                <p className="mb-4 text-base text-gray-500">{(message ? message : "Are you sure you want to delete this record?") + " The record will be removed permanently. This action cannot be undone."}</p>
            </div>
            <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                <SecondaryButton onClick={handleCloseModal}>Cancel</SecondaryButton>
                <PrimaryButton type="button" className="w-1/3 text-white bg-red-600 hover:bg-red-700 active:bg-red-700 focus:bg-red-700" onClick={() => onSubmit()}>Confirm</PrimaryButton>
            </div>
        </dialog>
    )
}