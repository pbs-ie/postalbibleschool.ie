import PrimaryButton from "@/Elements/Buttons/PrimaryButton";

export default function UpdateFormButton({ isDirty }: { isDirty: boolean }) {
    return (
        <div>
            <PrimaryButton processing={!isDirty}>Update</PrimaryButton>
            {isDirty && <span className="text-gray-500 ml-2 italic">You have unsaved changes.</span>}
        </div>
    )
}