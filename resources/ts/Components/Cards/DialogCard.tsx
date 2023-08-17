import { Link } from "@inertiajs/inertia-react";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import { Dispatch, SetStateAction } from "react";
import CloseX from "@/Components//Icons/CloseX";

export default function DialogCard({ onClose, onSubmit }: { onClose: () => void, onSubmit: () => void }) {
    const confirmedDelete = () => {
        alert("Delete");
    }
    return (
        <div className="relative px-5 pt-10 pb-5 mx-2 bg-white border-2 rounded md:w-1/3 min-w-96 h-fit">
            <button onClick={onClose} className="absolute top-5 right-5">
                <CloseX className="text-gray-700 w-7 h-7 hover:text-gray-500" />
            </button>
            <div className="mx-3">
                <h1 className="mb-4 text-lg font-bold">Delete School</h1>
                <p className="mb-4 text-base text-gray-500">Are you sure you want to delete this school? The record will be removed permanently. This action cannot be undone</p>
            </div>
            <div className="inline-flex justify-center w-full gap-2 mt-5 md:justify-end">
                <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
                <PrimaryButton type="submit" className="w-1/3 text-white bg-red-600 hover:bg-red-700 active:bg-red-700 focus:bg-red-700" onClick={() => onSubmit()}>Confirm</PrimaryButton>
            </div>
        </div>
    )
}