import SecondaryButton from "@/Elements/Buttons/SecondaryButton";
import { RefObject } from "react";
import PopupModal from "@/Components/Modals/PopupModal";
import BasicButton from "@/Elements/Buttons/BasicButton";
import Heading2Nospace from "@/Components/Typography/Heading2Nospace";

interface DeleteDialogCardProps {
    dialogRef: RefObject<HTMLDialogElement> | null;
    closeModal: () => void;
    onSubmit: () => void;
    title: string;
    message: string;
    nameToDelete?: string;
}

export default function DeleteDialogCard({ dialogRef, closeModal, onSubmit, title, message, nameToDelete }: DeleteDialogCardProps) {

    return (
        <PopupModal innerRef={dialogRef} onClose={closeModal} >
            <article className="flex flex-col max-w-screen-sm gap-4 lg:max-w-screen-lg">
                <Heading2Nospace>{title}</Heading2Nospace>
                <p>{message}</p>
                {nameToDelete &&
                    <p className="font-bold">{`"${nameToDelete}"`}</p>
                }
                <div className="flex justify-end w-full gap-2">
                    <SecondaryButton onClick={() => closeModal()}>Cancel</SecondaryButton>
                    <BasicButton dataTest="confirm_delete_button" hierarchy="delete" onClick={onSubmit}>Delete</BasicButton>
                </div>
            </article>
        </PopupModal>
    )
}