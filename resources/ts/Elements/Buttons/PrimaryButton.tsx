import BasicButton from "@/Elements/Buttons/BasicButton";

export default function PrimaryButton({ type = 'submit', className = '', processing = false, children, onClick }: Button) {
    return (
        <BasicButton type={type} processing={processing} onClick={onClick}>{children}</BasicButton>
    );
}
